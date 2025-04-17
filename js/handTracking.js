function initHandTracking() {
    const videoElement = document.getElementsByClassName('input_video')[0];
    const effectImage = document.getElementsByClassName('effect-video')[0];
    const canvasElement = document.getElementsByClassName('output_canvas')[0];

    // 创建文字容器
    const textContainer = document.createElement('div');
    textContainer.style.position = 'fixed';
    textContainer.style.top = '0';
    textContainer.style.left = '0';
    textContainer.style.width = '100%';
    textContainer.style.height = '100%';
    textContainer.style.pointerEvents = 'none';
    textContainer.style.overflow = 'hidden';
    document.body.appendChild(textContainer);

    // 随机文字数组
    const randomTexts = [
        '功德+1', '好运+1', '福气+1', '智慧+1',
        '财运+1', '健康+1', '平安+1', '快乐+1',
        '幸福+1', '吉祥+1', '如意+1', '顺心+1'
    ];

    // 随机颜色数组
    const randomColors = [
        'rgba(20, 79, 173, 1)',
        'rgba(255, 150, 139, 1)',
        'rgba(237, 255, 149, 1)',
        'rgba(255, 255, 255, 1)'
    ];

    // 上一次的手部位置
    let lastHandY = null;
    let lastUpdateTime = 0;

    // 创建随机文字元素
    function createRandomText() {
        const text = document.createElement('div');
        text.textContent = randomTexts[Math.floor(Math.random() * randomTexts.length)];
        text.style.position = 'absolute';
        text.style.fontFamily = '方正姚体';
        text.style.color = randomColors[Math.floor(Math.random() * randomColors.length)];
        text.style.fontSize = `${Math.random() * 20 + 20}px`;
        text.style.fontWeight = 'bold';
        text.style.left = `${Math.random() * window.innerWidth}px`;
        text.style.top = `${Math.random() * window.innerHeight}px`;
        text.style.opacity = '0';
        text.style.transition = 'opacity 0.5s, transform 2s';
        textContainer.appendChild(text);

        // 显示文字
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(-100px)';
        }, 10);

        // 移除文字
        setTimeout(() => {
            text.style.opacity = '0';
            setTimeout(() => text.remove(), 500);
        }, 2000);
    }

    // 确保所有必需的元素都存在
    if (!videoElement || !effectImage || !canvasElement) {
        console.error('Required elements not found:', {
            videoElement: !!videoElement,
            effectImage: !!effectImage,
            canvasElement: !!canvasElement
        });
        return;
    }

    const canvasCtx = canvasElement.getContext('2d');
    if (!canvasCtx) {
        console.error('Could not get canvas context');
        return;
    }

    // 确保图片加载完成
    effectImage.onload = () => {
        console.log('Effect image loaded successfully');
    };
    
    effectImage.onerror = (e) => {
        console.error('Error loading effect image:', e);
    };

    // 初始化 MediaPipe Hands
    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    hands.onResults(onResults);

    // 初始化摄像头
    const camera = new Camera(videoElement, {
        onFrame: async () => {
            try {
                await hands.send({ image: videoElement });
            } catch (error) {
                console.error('Error processing frame:', error);
            }
        },
        width: 1280,
        height: 720
    });

    // 启动摄像头
    camera.start().catch((error) => {
        console.error('Error starting camera:', error);
    });

    function onResults(results) {
        // 设置画布尺寸
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        
        // 清除画布
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        
        // 绘制手部关键点
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                // 计算手部区域
                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                for (const landmark of landmarks) {
                    minX = Math.min(minX, landmark.x * canvasElement.width);
                    minY = Math.min(minY, landmark.y * canvasElement.height);
                    maxX = Math.max(maxX, landmark.x * canvasElement.width);
                    maxY = Math.max(maxY, landmark.y * canvasElement.height);
                }
                
                // 添加一些边距
                const margin = 50;
                minX = Math.max(0, minX - margin);
                minY = Math.max(0, minY - margin);
                maxX = Math.min(canvasElement.width, maxX + margin);
                maxY = Math.min(canvasElement.height, maxY + margin);
                
                // 绘制手部区域
                canvasCtx.drawImage(
                    videoElement,
                    minX, minY, maxX - minX, maxY - minY,
                    minX, minY, maxX - minX, maxY - minY
                );

                // 检测手部上下移动
                const currentTime = Date.now();
                if (lastHandY !== null && currentTime - lastUpdateTime > 200) {
                    const handCenterY = (minY + maxY) / 2;
                    const movement = Math.abs(handCenterY - lastHandY);
                    
                    if (movement > 20) { // 如果手部移动超过20像素
                        createRandomText();
                        lastUpdateTime = currentTime;
                    }
                }
                lastHandY = (minY + maxY) / 2;

                // 在指尖显示图片
                const fingertip = {
                    x: landmarks[8].x * window.innerWidth,
                    y: landmarks[8].y * window.innerHeight
                };

                // 计算手部尺寸并动态调整GIF大小
                const handWidth = maxX - minX;
                const handHeight = maxY - minY;
                const handSize = Math.max(handWidth, handHeight);
                const baseSize = 700;
                const scaleFactor = handSize / 200;
                const scaledSize = baseSize * scaleFactor;

                // 设置图片位置和大小
                effectImage.style.display = 'block';
                effectImage.style.position = 'absolute';
                effectImage.style.left = `${fingertip.x}px`;
                effectImage.style.top = `${fingertip.y}px`;
                effectImage.style.width = `${scaledSize}px`;
                effectImage.style.height = `${scaledSize}px`;
                effectImage.style.transform = 'translate(-50%, -50%)';
                effectImage.style.zIndex = '4';
            }
        } else {
            effectImage.style.display = 'none';
            lastHandY = null;
        }
    }
}

// 当页面加载完成后初始化手势识别
document.addEventListener('DOMContentLoaded', initHandTracking); 
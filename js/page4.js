document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const scene = document.querySelector('.scene');
    const video = document.querySelector('.background-video');
    const overlay = document.querySelector('.overlay');
    const dropZone = document.querySelector('.drop-zone');
    const dropText = document.querySelector('.drop-text');
    const lightEffect = document.querySelector('.light-effect');
    const textLines = document.querySelectorAll('.text-line');
    const speechText = document.querySelector('.speech-text');
    const word = document.querySelector('.speech-text .word');
    const banner = document.querySelector('.banner');
    const continueText = document.querySelector('.continue-text');

    // 初始隐藏"开"字
    speechText.style.opacity = '0';
    speechText.style.visibility = 'hidden';

    // 检查浏览器是否支持语音识别
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.error('您的浏览器不支持语音识别功能');
        alert('您的浏览器不支持语音识别功能，请使用Chrome浏览器');
        return;
    }

    // 初始化语音识别
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;

    // 目标文本
    const targetText = '开';
    let isAnimationStarted = false;
    let isImageDropped = false;
    let isRecognitionStarted = false;

    // 语音识别结果处理
    recognition.onresult = function(event) {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript.trim();
        console.log('识别到的文本:', transcript);
        
        // 检查是否匹配目标字
        if (transcript.includes(targetText) && !isAnimationStarted && isImageDropped) {
            console.log('检测到"开"字，开始动画');
            isAnimationStarted = true;
            
            // 更新引导文本
            textLines[0].textContent = '光至，愿成，灵气加持。';
            gsap.to(textLines[0], {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // 添加动画类
            word.classList.add('recognized');
            console.log('已添加动画类');
            
            // 监听动画结束
            const handleAnimationEnd = function() {
                console.log('动画结束，开始开光效果');
                word.style.visibility = 'hidden';
                startConsecrationAnimation();
            };

            word.addEventListener('animationend', handleAnimationEnd, { once: true });
            word.addEventListener('webkitAnimationEnd', handleAnimationEnd, { once: true });
            
            // 设置超时作为备用
            setTimeout(() => {
                if (!word.classList.contains('animation-complete')) {
                    console.log('动画超时，强制开始开光效果');
                    word.classList.add('animation-complete');
                    startConsecrationAnimation();
                }
            }, 2000);
            
            // 停止语音识别
            recognition.stop();
        }
    };

    // 开始开光动画
    function startConsecrationAnimation() {
        console.log('开始开光动画');
        
        // 播放视频
        video.play();
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // 显示光效
        lightEffect.style.display = 'block';
        gsap.to(lightEffect, {
            opacity: 1,
            scale: 1.5,
            duration: 1.5,
            ease: "power2.out",
            onComplete: function() {
                console.log('光效动画完成');
            }
        });

        // 显示横幅
        banner.style.display = 'block';
        gsap.to(banner, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: function() {
                console.log('横幅动画完成');
            }
        });

        // 显示继续按钮
        continueText.style.display = 'block';
        gsap.to(continueText, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: function() {
                console.log('继续按钮动画完成');
            }
        });
    }

    // 处理文件拖放
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.style.backgroundColor = 'transparent';
        
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = function() {
                        // 清除拖放区域内容
                        dropZone.innerHTML = '';
                        // 添加图片
                        dropZone.appendChild(img);
                        // 调整图片大小以适应容器
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        
                        isImageDropped = true;
                        
                        // 播放视频
                        video.play();
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                        
                        // 显示"开"字
                        speechText.style.visibility = 'visible';
                        gsap.to(speechText, {
                            opacity: 1,
                            duration: 1,
                            ease: "power2.out"
                        });
                        
                        // 更新引导文本
                        textLines[0].textContent = '请念出"开"';
                        gsap.to(textLines[0], {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                        
                        // 开始语音识别
                        startRecognition();
                    };
                };
                reader.readAsDataURL(file);
            } else {
                alert('请拖入图片文件');
            }
        }
    });

    // 开始语音识别
    function startRecognition() {
        try {
            if (!isRecognitionStarted) {
                recognition.start();
                isRecognitionStarted = true;
                console.log('语音识别已启动');
            }
        } catch (error) {
            console.error('启动语音识别失败:', error);
            handleRecognitionError(error);
        }
    }

    // 处理语音识别错误
    function handleRecognitionError(error) {
        console.error('语音识别错误:', error);
        
        if (error === 'network') {
            console.error('网络错误，请检查网络连接');
            alert('语音识别服务暂时不可用，请检查网络连接');
        } else if (error === 'not-allowed') {
            alert('请允许使用麦克风');
        }
    }

    // 语音识别错误处理
    recognition.onerror = function(event) {
        handleRecognitionError(event.error);
    };

    // 语音识别结束处理
    recognition.onend = function() {
        console.log('语音识别结束');
        if (!isAnimationStarted && isImageDropped) {
            setTimeout(() => {
                startRecognition();
            }, 1000);
        }
    };

    // 设置视频首帧静止
    video.pause();
    video.currentTime = 0;

    // 引导语动画
    textLines.forEach((line, index) => {
        gsap.to(line, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.5,
            ease: "power2.out"
        });
    });

    // 显示语音识别文字
    gsap.to(speechText, {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power2.out"
    });

    // 拖放相关事件
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        dropZone.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }

    function unhighlight(e) {
        dropZone.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        dropZone.style.backgroundColor = 'transparent';
    }

    // 添加继续按钮点击事件
    if (continueText) {
        // 确保按钮可见
        continueText.style.display = 'block';
        continueText.style.opacity = '1';
        
        continueText.addEventListener('click', function() {
            // 添加淡出动画
            document.querySelector('.scene').style.animation = 'sceneEntrance 1.5s ease reverse forwards';
            
            // 延迟关闭页面
            setTimeout(() => {
                window.close();
            }, 1500);
        });
    }

    // 开始语音识别
    startRecognition();
}); 
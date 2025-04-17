document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    const continueButton = document.querySelector('.continue-text');
    const totalItems = items.length;
    const angle = 360 / totalItems;
    const radius = 900; // 轮播半径放大3倍
    let currentRotation = angle * 3; // 初始旋转3个位置
    let currentIndex = 3; // 跟踪当前位置

    // 创建过渡图片容器
    const transitionContainer = document.createElement('div');
    transitionContainer.style.position = 'fixed';
    transitionContainer.style.top = '0';
    transitionContainer.style.left = '0';
    transitionContainer.style.width = '100%';
    transitionContainer.style.height = '100%';
    transitionContainer.style.pointerEvents = 'none';
    transitionContainer.style.zIndex = '0'; // 调整z-index为0，位于轮播图之下但不会被完全遮挡
    document.body.appendChild(transitionContainer);

    // 创建过渡图片
    const transitionImage = document.createElement('img');
    transitionImage.style.position = 'absolute';
    transitionImage.style.top = '50%';
    transitionImage.style.left = '50%';
    transitionImage.style.transform = 'translate(-50%, -50%)';
    transitionImage.style.maxWidth = '80%';
    transitionImage.style.maxHeight = '80%';
    transitionImage.style.width = 'auto';
    transitionImage.style.height = 'auto';
    transitionImage.style.display = 'block'; // 改为block
    transitionImage.style.opacity = '1'; // 初始设置为可见
    transitionImage.style.transition = 'opacity 0.5s ease-in-out';
    transitionContainer.appendChild(transitionImage);

    // 图片映射关系
    const imageMap = {
        '3': '411',  // 41号图片
        '4': '466',  // 46号图片
        '5': '455',  // 45号图片
        '0': '444',  // 44号图片
        '1': '433',  // 43号图片
        '2': '422'   // 42号图片
    };

    // 更新过渡图片
    function updateTransitionImage() {
        if (imageMap[currentIndex]) {
            // 先淡出
            transitionImage.style.opacity = '0';
            
            // 等待淡出完成后再更新图片并淡入
            setTimeout(() => {
                transitionImage.src = `images/${imageMap[currentIndex]}.png`;
                // 使用setTimeout确保图片加载完成后再淡入
                setTimeout(() => {
                    transitionImage.style.opacity = '1';
                }, 50);
            }, 500);
        }
    }

    // 初始化轮播项位置
    items.forEach((item, index) => {
        const rotation = angle * index;
        const x = Math.sin(rotation * Math.PI / 180) * radius;
        const z = Math.cos(rotation * Math.PI / 180) * radius;
        item.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotation}deg) scaleX(-1)`;
    });

    // 设置初始旋转位置
    container.style.transform = `translateZ(900px) rotateY(${currentRotation}deg)`;

    // 左箭头点击事件
    leftArrow.addEventListener('click', () => {
        // 添加按钮点击动画
        if (typeof gsap !== 'undefined') {
            gsap.to(leftArrow, {
                scale: 0.8,
                duration: 0.1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(leftArrow, {
                        scale: 1,
                        duration: 0.2,
                        ease: "elastic.out(1, 0.5)"
                    });
                }
            });

            // 使用GSAP动画旋转容器
            gsap.to(container, {
                rotationY: currentRotation + angle,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    currentRotation += angle;
                    currentIndex = (currentIndex + 1) % 6;
                    updateTransitionImage();
                }
            });
        } else {
            // 如果没有GSAP，使用普通方式
            currentRotation += angle;
            currentIndex = (currentIndex + 1) % 6;
            container.style.transform = `translateZ(900px) rotateY(${currentRotation}deg)`;
            updateTransitionImage();
        }
    });

    // 右箭头点击事件
    rightArrow.addEventListener('click', () => {
        // 添加按钮点击动画
        if (typeof gsap !== 'undefined') {
            gsap.to(rightArrow, {
                scale: 0.8,
                duration: 0.1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(rightArrow, {
                        scale: 1,
                        duration: 0.2,
                        ease: "elastic.out(1, 0.5)"
                    });
                }
            });

            // 使用GSAP动画旋转容器
            gsap.to(container, {
                rotationY: currentRotation - angle,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    currentRotation -= angle;
                    currentIndex = (currentIndex - 1 + 6) % 6;
                    updateTransitionImage();
                }
            });
        } else {
            // 如果没有GSAP，使用普通方式
            currentRotation -= angle;
            currentIndex = (currentIndex - 1 + 6) % 6;
            container.style.transform = `translateZ(900px) rotateY(${currentRotation}deg)`;
            updateTransitionImage();
        }
    });

    // 添加继续按钮点击事件
    continueButton.addEventListener('click', () => {
        // 添加溶解动画效果
        const scene = document.querySelector('.scene');
        scene.style.opacity = '0';
        scene.style.transition = 'opacity 1.5s ease';
        
        // 延迟跳转，让动画有时间播放
        setTimeout(() => {
            window.location.href = 'experience.html';
            window.close(); // 关闭当前窗口
        }, 1500);
    });

    // 初始化时显示第一张过渡图片
    updateTransitionImage();
}); 
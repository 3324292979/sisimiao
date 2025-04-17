document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'sk-1eb8e3fb7c344fac9d6a31bc34753daa';
    const foregroundImage = document.querySelector('.foreground-image');
    const scene = document.querySelector('.scene');
    const overlay = document.querySelector('.overlay');
    const image7 = document.querySelector('.image-7');
    const image54 = document.querySelector('.image-54');
    const interpretBtn = document.querySelector('.interpret-btn');
    const lightRings = document.querySelectorAll('.light-ring');
    const lightDots = document.querySelectorAll('.light-dot');
    const stars = document.querySelectorAll('.star');
    const petalsContainer = document.querySelector('.petals-container');
    const leavesContainer = document.querySelector('.leaves-container');
    const poemContainer = document.querySelector('.poem-container');
    const poemText = document.querySelector('.poem-text');
    const interpretationContainer = document.querySelector('.interpretation-container');
    const interpretationText = document.querySelector('.interpretation-text');
    const fortuneVideo = document.querySelector('.fortune-video');

    // 添加视频事件监听
    fortuneVideo.addEventListener('loadeddata', function() {
        console.log('视频加载完成');
    });

    fortuneVideo.addEventListener('error', function(e) {
        console.error('视频加载错误:', e);
    });

    fortuneVideo.addEventListener('play', function() {
        console.log('视频开始播放');
    });

    // 初始化光圈动画
    function initLightEffects() {
        // 确保光圈元素可见
        lightRings.forEach(ring => {
            ring.style.display = 'block';
            ring.style.opacity = '0.3';
        });
        
        lightDots.forEach(dot => {
            dot.style.display = 'block';
            dot.style.opacity = '0.2';
        });
        
        stars.forEach(star => {
            star.style.display = 'block';
            star.style.opacity = '0.4';
        });

        // 设置光圈动画
        lightRings.forEach((ring, index) => {
            const delay = index * 0.2;
            gsap.fromTo(ring, 
                {
                    scale: 0.7,
                    opacity: 0.3
                },
                {
                    scale: 1,
                    opacity: 0.7,
                    duration: 2,
                    delay: delay,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );
        });

        // 设置光点动画
        lightDots.forEach((dot, index) => {
            const delay = index * 0.15;
            gsap.fromTo(dot, 
                {
                    opacity: 0.2
                },
                {
                    opacity: 0.8,
                    duration: 1.5,
                    delay: delay,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );
        });

        // 设置星星动画
        stars.forEach((star, index) => {
            const delay = index * 0.1;
            gsap.fromTo(star, 
                {
                    scale: 0.8,
                    opacity: 0.4
                },
                {
                    scale: 1,
                    opacity: 0.9,
                    duration: 1,
                    delay: delay,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );
        });
    }

    // 创建中心圈
    const centerCircle = document.createElement('div');
    centerCircle.className = 'center-circle';
    scene.appendChild(centerCircle);

    // 创建签文显示元素
    const fortuneText = document.createElement('div');
    fortuneText.className = 'fortune-text';
    scene.appendChild(fortuneText);

    // 初始化图片54的状态
    image54.style.display = 'none';
    image54.style.opacity = '0';
    image54.style.transform = 'rotateY(-90deg) scale(1.3)';

    // 监听鼠标移动
    scene.addEventListener('mousemove', function(e) {
        const rect = scene.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // 计算鼠标到中心的距离
        const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + 
            Math.pow(mouseY - centerY, 2)
        );
        
        // 如果鼠标在中心圈内
        if (distance <= 200) {
            gsap.to(foregroundImage, {
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            gsap.to(foregroundImage, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });

    // 点击事件处理
    foregroundImage.addEventListener('click', function(e) {
        const rect = scene.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // 计算鼠标到中心的距离
        const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + 
            Math.pow(mouseY - centerY, 2)
        );

        if (distance <= 200) {
            // 显示覆盖层
            overlay.style.display = 'block';
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            // 生成随机签文
            const fortunes = ['上上签', '上签', '中签', '下签', '下下签'];
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            
            // 根据签文选择视频
            let videoPath = '';
            if (randomFortune === '上上签' || randomFortune === '上签') {
                videoPath = 'images/61.mp4';
            } else if (randomFortune === '中签') {
                videoPath = 'images/63.mp4';
            } else if (randomFortune === '下签' || randomFortune === '下下签') {
                videoPath = 'images/62.mp4';
            }

            // 预加载视频
            const video = document.createElement('video');
            video.src = videoPath;
            video.preload = 'auto';
            
            // 等待视频加载完成
            video.addEventListener('loadeddata', function() {
                // 设置视频源
                fortuneVideo.src = videoPath;
                fortuneVideo.load();
                
                // 确保视频在播放前已经加载
                fortuneVideo.addEventListener('canplay', function() {
                    // 显示视频
                    fortuneVideo.style.display = 'block';
                    fortuneVideo.classList.add('visible');
                    
                    // 淡入视频
                    gsap.to(fortuneVideo, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    // 播放视频
                    fortuneVideo.play();

                    // 视频开始播放后，淡出覆盖层
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: function() {
                            overlay.style.display = 'none';
                        }
                    });
                }, { once: true });
            });

            // 立即开始生成诗句和解签内容
            console.log('开始生成诗句和解签内容...');
            const poemPrompt = `请根据签文"${randomFortune}"生成一首10个字的诗，要求：
            1. 内容要符合寺庙求签的意境
            2. 每句5个字，共2句
            3. 诗句要押韵
            4. 语言要优美典雅
            5. 使用标点符号分隔句子
            6. 不要出现换行符
            7. 不要出现任何解释或说明文字
            8. 直接输出诗句内容`;

            const interpretationPrompt = `请为签文"${randomFortune}"生成解签内容，要求：
            1. 以寺庙主持的口吻进行解读
            2. 解释要通俗易懂
            3. 包含对运势的预测
            4. 给出具体的建议
            5. 语言要庄重但不失亲切
            6. 使用标点符号分隔句子
            7. 不要出现换行符
            8. 字数必须是94字
            9. 直接输出解签内容`;

            // 同时发送两个请求
            Promise.all([
                fetch('https://api.deepseek.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "deepseek-chat",
                        messages: [{ role: "user", content: poemPrompt }],
                        temperature: 0.7,
                        max_tokens: 100
                    })
                }),
                fetch('https://api.deepseek.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "deepseek-chat",
                        messages: [{ role: "user", content: interpretationPrompt }],
                        temperature: 0.7,
                        max_tokens: 100
                    })
                })
            ]).then(([poemResponse, interpretationResponse]) => {
                console.log('收到API响应');
                console.log('诗句响应状态:', poemResponse.status);
                console.log('解签响应状态:', interpretationResponse.status);

                if (!poemResponse.ok || !interpretationResponse.ok) {
                    throw new Error(`API请求失败: 诗句状态 ${poemResponse.status}, 解签状态 ${interpretationResponse.status}`);
                }
                return Promise.all([poemResponse.json(), interpretationResponse.json()]);
            }).then(([poemData, interpretationData]) => {
                console.log('解析API响应数据');
                console.log('诗句数据:', poemData);
                console.log('解签数据:', interpretationData);

                const poem = poemData.choices[0].message.content.trim();
                const interpretation = interpretationData.choices[0].message.content.trim();
                
                console.log('生成的诗句:', poem);
                console.log('生成的解签:', interpretation);

                // 存储生成的内容
                poemText.textContent = poem;
                interpretationText.textContent = interpretation;
            }).catch(error => {
                console.error('API请求失败:', error);
                // 显示错误信息
                const errorText = document.createElement('div');
                errorText.className = 'error-text';
                errorText.textContent = '生成内容失败，请稍后重试';
                document.body.appendChild(errorText);
            });

            // 4秒后显示图片7和其他效果
            setTimeout(() => {
                console.log('4秒后显示图片7');
                // 显示图片7
                image7.classList.add('visible');
                gsap.fromTo(image7, 
                    {
                        opacity: 0,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }
                );

                // 显示签文
                fortuneText.textContent = randomFortune;
                fortuneText.classList.add('visible');
                gsap.fromTo(fortuneText,
                    {
                        opacity: 0,
                        y: 20
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    }
                );

                // 延迟显示按钮
                setTimeout(() => {
                    console.log('显示解签按钮');
                    interpretBtn.classList.add('visible');
                    gsap.fromTo(interpretBtn,
                        {
                            opacity: 0,
                            scale: 0.8,
                            y: 50
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "elastic.out(1, 0.3)"
                        }
                    );
                }, 500);

                // 在显示54图片后显示继续按钮
                showContinueButton();
            }, 4000);
        }
    });

    // 解签按钮点击事件
    interpretBtn.addEventListener('click', function() {
        // 隐藏视频
        fortuneVideo.classList.remove('visible');
        fortuneVideo.pause();
        fortuneVideo.currentTime = 0;

        // 隐藏签文和按钮
        fortuneText.classList.remove('visible');
        interpretBtn.classList.remove('visible');

        // 开始光圈动画
        initLightEffects();

        // 图片7翻卡动画
        gsap.to(image7, {
            rotationY: 90,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: function() {
                // 隐藏图片7
                image7.style.display = 'none';
                
                // 显示图片54
                image54.style.display = 'block';
                image54.style.transform = 'translate(-50%, -50%) rotateY(-90deg) scale(1.3)';
                gsap.to(image54, {
                    rotationY: 0,
                    opacity: 1,
                    scale: 1.3,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: function() {
                        // 图片54显示完成后，显示解签内容
                        poemContainer.classList.add('visible');
                        interpretationContainer.classList.add('visible');
                        
                        // 显示诗句
                        gsap.to(poemContainer, {
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out"
                        });

                        // 显示解签内容
                        gsap.to(interpretationContainer, {
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out"
                        });

                        // 在54图片完全显示后显示继续按钮
                        showContinueButton();
                    }
                });
            }
        });
    });

    // 在显示54图片后显示继续按钮
    function showContinueButton() {
        const continueBtn = document.querySelector('.continue-btn');
        continueBtn.style.display = 'block';
        gsap.fromTo(continueBtn, 
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    }

    // 添加继续按钮点击事件
    document.querySelector('.continue-btn').addEventListener('click', function() {
        window.close();
    });
}); 
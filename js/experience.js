let isScrollEnabled = false;

// 页面加载完成后显示内容
window.addEventListener('load', () => {
    const container = document.getElementById('container');
    const content = document.querySelector('.content');
    
    // 添加active类触发动画
    container.classList.add('active');
    
    // 显示初始提示文字
    setTimeout(() => {
        content.classList.add('visible');
    }, 500);
    
    // 滚动到最底部
    setTimeout(() => {
        window.scrollTo({
            top: container.scrollHeight - window.innerHeight,
            behavior: 'instant'
        });
    }, 100);

    console.log('页面加载完成');
    setupScrollListener();
});

const container = document.querySelector('.container');
const scene2 = document.querySelector('.scene2');
const scene3 = document.querySelector('.scene3');
const scene4 = document.querySelector('.scene4');
const customCursor = document.querySelector('.custom-cursor');

// 自定义鼠标指针
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';

    if (!isScrollEnabled) {
        const rightThird = window.innerWidth * 2/3;
        if (e.clientX > rightThird) {
            scene3.classList.add('visible');
        } else {
            scene3.classList.remove('visible');
        }
    }
});

// 点击图片3启用滚动
scene3.addEventListener('click', () => {
    console.log('点击图片22，启用滚动');
    isScrollEnabled = true;
    container.classList.add('scroll-enabled');
    document.body.style.overflow = 'auto';
    scene3.style.pointerEvents = 'none';
    scene3.style.opacity = '0';
    
    const content = document.querySelector('.content');
    content.classList.remove('visible');
    content.classList.add('hidden');
    
    setTimeout(() => {
        content.textContent = '向上滑动，拾阶而上';
        content.classList.remove('hidden');
        content.classList.add('visible');
    }, 500);
    
    customCursor.classList.add('changed');
    
    // 确保滚动功能被启用
    container.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    
    // 添加滚动监听
    container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const scene2Rect = scene2.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        console.log('滚动信息:', {
            '当前滚动位置': scrollTop + 'px',
            '图片21顶部位置': scene2Rect.top + 'px',
            '图片21底部位置': scene2Rect.bottom + 'px',
            '图片21总高度': scene2Rect.height + 'px',
            '视窗高度': viewportHeight + 'px',
            '图片21在视窗中的位置': Math.round((scene2Rect.top / viewportHeight) * 100) + '%'
        });

        // 当滚动到4608px时，给image221添加视觉差动画
        if (scrollTop >= 4608) {
            console.log('触发视觉差动画');
            image221.style.transform = 'translateY(-200px)';
        } else {
            image221.style.transform = 'translateY(0)';
        }
    });
});

// 添加滚动位置监听
function setupScrollListener() {
    console.log('设置滚动监听器');
    const scene2 = document.querySelector('.scene2');
    
    if (!scene2) {
        console.error('找不到图片21元素');
        return;
    }

    // 获取已存在的image71元素并设置点击事件
    const image71 = document.getElementById('image71');
    image71.style.cursor = 'pointer';
    image71.style.display = 'block'; // 确保按钮始终显示
    image71.addEventListener('click', () => {
        console.log('按钮71被点击');
        // 添加溶解动画效果
        const container = document.querySelector('.container');
        container.classList.add('dissolve');
        
        // 延迟跳转，让动画有时间播放
        setTimeout(() => {
            window.open('incense.html', '_blank');
            // 恢复容器透明度
            container.classList.remove('dissolve');
        }, 1500);
    });

    // 获取已存在的image72元素并设置点击事件
    const image72 = document.getElementById('image72');
    image72.style.cursor = 'pointer';
    image72.style.display = 'block'; // 确保按钮始终显示
    image72.addEventListener('click', () => {
        console.log('按钮72被点击');
        // 添加溶解动画效果
        const container = document.querySelector('.container');
        container.classList.add('dissolve');
        
        // 延迟跳转，让动画有时间播放
        setTimeout(() => {
            window.open('page4.html', '_blank');
            // 恢复容器透明度
            container.classList.remove('dissolve');
        }, 1500);
    });

    // 获取已存在的image73元素并设置点击事件
    const image73 = document.getElementById('image73');
    image73.style.cursor = 'pointer';
    image73.style.display = 'block'; // 确保按钮始终显示
    image73.addEventListener('click', () => {
        console.log('按钮73被点击');
        // 添加溶解动画效果
        const container = document.querySelector('.container');
        container.classList.add('dissolve');
        
        // 延迟跳转，让动画有时间播放
        setTimeout(() => {
            window.open('pray.html', '_blank');
            // 恢复容器透明度
            container.classList.remove('dissolve');
        }, 1500);
    });

    // 创建第一段文字元素
    const textElement1 = document.createElement('div');
    textElement1.className = 'text-element';
    textElement1.textContent = '钟鼓初鸣，香路已开。';
    document.body.appendChild(textElement1);

    // 创建第二段文字元素
    const textElement2 = document.createElement('div');
    textElement2.className = 'text-element';
    textElement2.textContent = '你将循香登山，入阁礼佛，启物开光，占签问卜。\n一步一愿，一香一心。';
    document.body.appendChild(textElement2);

    // 创建第三段文字元素
    const textElement3 = document.createElement('div');
    textElement3.className = 'text-element';
    textElement3.textContent = '香气隐隐，自阁而来。再走一步，便可抵达香火之源。';
    document.body.appendChild(textElement3);

    // 将第一段文字固定在6286px的位置
    textElement1.style.position = 'absolute';
    textElement1.style.top = '6286px';
    textElement1.style.left = 'calc(50% - 200px)';
    textElement1.style.transform = 'translateX(-50%)';

    // 将第二段文字固定在5740px的位置，与第一段文字镜像对称
    textElement2.style.position = 'absolute';
    textElement2.style.top = '5740px';
    textElement2.style.left = 'calc(50% + 200px)';
    textElement2.style.transform = 'translateX(-50%)';

    // 将第三段文字固定在5225px的位置
    textElement3.style.position = 'absolute';
    textElement3.style.top = '5225px';
    textElement3.style.left = 'calc(50% - 200px)';
    textElement3.style.transform = 'translateX(-50%)';

    // 创建新图层
    const imageLayer = document.createElement('div');
    imageLayer.className = 'image-layer';
    document.body.appendChild(imageLayer);

    // 创建图片241元素
    const image241 = document.createElement('div');
    image241.className = 'scene-image';
    image241.id = 'image241';
    image241.style.backgroundImage = 'url("../images/241.png")';
    image241.style.width = '100%';
    image241.style.height = 'auto';
    image241.style.position = 'fixed';
    image241.style.top = '0';
    image241.style.left = '50%';
    image241.style.transform = 'translateX(-50%)';
    image241.style.opacity = '1';
    image241.style.zIndex = '8';
    document.body.appendChild(image241);

    // 创建图片232元素
    const image232 = document.createElement('div');
    image232.className = 'scene-image';
    image232.id = 'image232';
    image232.style.backgroundImage = 'url("../images/232.png")';
    image232.style.width = '100%';
    image232.style.height = 'auto';
    image232.style.position = 'fixed';
    image232.style.top = '0';
    image232.style.left = '50%';
    image232.style.transform = 'translateX(-50%)';
    image232.style.opacity = '1';
    image232.style.zIndex = '7';
    document.body.appendChild(image232);

    // 创建图片231元素
    const image231 = document.createElement('div');
    image231.className = 'scene-image';
    image231.id = 'image231';
    image231.style.backgroundImage = 'url("../images/231.png")';
    image231.style.width = '100%';
    image231.style.height = 'auto';
    image231.style.position = 'fixed';
    image231.style.top = '0';
    image231.style.left = '50%';
    image231.style.transform = 'translateX(-50%)';
    image231.style.opacity = '1';
    image231.style.zIndex = '6';
    document.body.appendChild(image231);

    // 创建图片222元素
    const image222 = document.createElement('div');
    image222.className = 'scene-image';
    image222.id = 'image222';
    image222.style.backgroundImage = 'url("../images/222.png")';
    image222.style.width = '100%';
    image222.style.height = 'auto';
    image222.style.position = 'fixed';
    image222.style.top = '0';
    image222.style.left = '50%';
    image222.style.transform = 'translateX(-50%)';
    image222.style.opacity = '1';
    image222.style.zIndex = '5';
    document.body.appendChild(image222);

    // 创建图片221元素
    const image221 = document.createElement('div');
    image221.id = 'image221';
    image221.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 7899px;
        background-image: url('../images/221.png');
        background-size: 100% 7899px;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 5;
        pointer-events: none;
        transform: translateY(0);
        transition: transform 0.5s ease-out;
    `;
    scene2.appendChild(image221);

    // 创建图片210元素
    const image210 = document.createElement('div');
    image210.className = 'scene-image';
    image210.id = 'image210';
    image210.style.backgroundImage = 'url("../images/210.png")';
    image210.style.width = '100%';
    image210.style.height = 'auto';
    image210.style.position = 'fixed';
    image210.style.top = '0';
    image210.style.left = '50%';
    image210.style.transform = 'translateX(-50%)';
    image210.style.opacity = '1';
    image210.style.zIndex = '3';
    document.body.appendChild(image210);

    // 创建图片211元素
    const image211 = document.createElement('div');
    image211.id = 'image211';
    image211.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 7899px;
        background-image: url('../images/211.png');
        background-size: 100% 7899px;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 2;
        pointer-events: none;
        opacity: 0;
    `;
    scene2.appendChild(image211);

    // 创建图片212元素
    const image212 = document.createElement('div');
    image212.className = 'scene-image';
    image212.id = 'image212';
    image212.style.backgroundImage = 'url("../images/212.png")';
    image212.style.width = '100%';
    image212.style.height = 'auto';
    image212.style.position = 'fixed';
    image212.style.top = '0';
    image212.style.left = '50%';
    image212.style.transform = 'translateX(-50%)';
    image212.style.opacity = '1';
    image212.style.zIndex = '1';
    document.body.appendChild(image212);

    // 立即显示所有图片
    image241.style.display = 'block';
    image232.style.display = 'block';
    image231.style.display = 'block';
    image222.style.display = 'block';
    image221.style.display = 'block';
    image210.style.display = 'block';
    image211.style.display = 'block';
    image212.style.display = 'block';

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const scene2Rect = scene2.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const image212 = document.getElementById('image212');
        const image211 = document.getElementById('image211');
        const image221 = document.getElementById('image221');
        const image232 = document.getElementById('image232');
        
        console.log('滚动信息:', {
            '当前滚动位置': scrollTop + 'px',
            '图片21顶部位置': scene2Rect.top + 'px',
            '图片21底部位置': scene2Rect.bottom + 'px',
            '图片21总高度': scene2Rect.height + 'px',
            '视窗高度': viewportHeight + 'px',
            '图片21在视窗中的位置': Math.round((scene2Rect.top / viewportHeight) * 100) + '%'
        });

        // 当滚动到文字位置时显示文字
        if (scrollTop >= 6286) {
            console.log('触发第一段文字显示，当前滚动位置:', scrollTop);
            textElement1.classList.add('visible');
            gsap.fromTo(textElement1, 
                { opacity: 0, y: 20, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
            );
        } else {
            textElement1.classList.remove('visible');
        }

        if (scrollTop >= 5740) {
            console.log('触发第二段文字显示，当前滚动位置:', scrollTop);
            textElement2.classList.add('visible');
            gsap.fromTo(textElement2, 
                { opacity: 0, y: 20, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
            );
        } else {
            textElement2.classList.remove('visible');
        }

        if (scrollTop >= 5225) {
            console.log('触发第三段文字显示，当前滚动位置:', scrollTop);
            textElement3.classList.add('visible');
            gsap.fromTo(textElement3, 
                { opacity: 0, y: 20, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
            );
        } else {
            textElement3.classList.remove('visible');
        }

        // 第四段文字显示逻辑
        if (scrollTop >= 963) {
            console.log('触发第四段文字显示，当前滚动位置:', scrollTop);
            const textElement4 = document.querySelector('.text-element[style*="top: 963px"]');
            if (textElement4) {
                textElement4.classList.add('visible');
                gsap.fromTo(textElement4, 
                    { opacity: 0, y: 20, scale: 0.8 },
                    { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
                );
            }
        } else {
            const textElement4 = document.querySelector('.text-element[style*="top: 963px"]');
            if (textElement4) {
                textElement4.classList.remove('visible');
            }
        }

        // 第五段文字显示逻辑
        if (scrollTop >= 3764) {
            console.log('触发第五段文字显示，当前滚动位置:', scrollTop);
            const textElement5 = document.querySelector('.text-element[style*="top: 3764px"]');
            if (textElement5) {
                textElement5.classList.add('visible');
                gsap.fromTo(textElement5, 
                    { opacity: 0, y: 20, scale: 0.8 },
                    { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
                );
            }
        } else {
            const textElement5 = document.querySelector('.text-element[style*="top: 3764px"]');
            if (textElement5) {
                textElement5.classList.remove('visible');
            }
        }

        // 添加第六段文字的显示逻辑
        if (scrollTop >= 2670) {
            console.log('触发第六段文字显示，当前滚动位置:', scrollTop);
            const textElement6 = document.querySelector('.text-element[style*="top: 2670px"]');
            if (textElement6) {
                textElement6.classList.add('visible');
                gsap.fromTo(textElement6, 
                    { opacity: 0, y: 20, scale: 0.8 },
                    { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
                );
            }
        } else {
            const textElement6 = document.querySelector('.text-element[style*="top: 2670px"]');
            if (textElement6) {
                textElement6.classList.remove('visible');
            }
        }

        // 当滚动到3200px时，给image221添加视觉差动画
        if (scrollTop >= 3200) {
            console.log('触发image221视觉差动画');
            gsap.to(image221, {
                y: -200,
                duration: 1,
                ease: "power2.out",
                onComplete: () => console.log('image221动画完成')
            });
        } else {
            gsap.to(image221, {
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        }

        // 当滚动到4508px时，给image212添加视觉差动画，并让image211渐隐入场
        if (scrollTop >= 4508) {
            console.log('触发视觉差动画');
            gsap.to(image212, {
                y: -200,
                duration: 1,
                ease: "power2.out",
                onComplete: () => console.log('动画完成')
            });
            
            // image211渐隐入场
            gsap.to(image211, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                onStart: () => console.log('开始渐隐入场'),
                onComplete: () => console.log('渐隐入场完成')
            });
        } else {
            gsap.to(image212, {
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
            
            // 当滚动回上方时，image211保持透明
            image211.style.opacity = '0';
        }

        // 当滚动到1908px时，给image232添加视觉差动画
        if (scrollTop >= 1908) {
            console.log('触发image232视觉差动画');
            gsap.to(image232, {
                y: -200,
                duration: 1,
                ease: "power2.out",
                onComplete: () => console.log('image232动画完成')
            });
        } else {
            gsap.to(image232, {
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        }
    });

    // 初始化按钮显示状态
    image71.style.display = 'none';

    // 立即触发一次，检查初始状态
    console.log('初始状态:', {
        '窗口滚动位置': window.scrollY + 'px',
        '图片21位置': scene2.getBoundingClientRect()
    });
}

function logLayoutInfo() {
    const container = document.getElementById('container');
    const textElement = document.querySelector('.text-element');
    const image221 = document.getElementById('image221');
    
    if (textElement) {
        const rect = textElement.getBoundingClientRect();
        console.log('Text element position:', rect.top);
        
        // 当滚动到4608px时，给image221添加视觉差动画
        if (container.scrollTop >= 4608) {
            gsap.to(image221, {
                y: -100, // 向上移动100px
                duration: 1,
                ease: "power2.out"
            });
        } else {
            gsap.to(image221, {
                y: 0, // 回到原位
                duration: 1,
                ease: "power2.out"
            });
        }
    }
} 
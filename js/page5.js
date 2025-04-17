document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const scene = document.querySelector('.scene');
    const foregroundImage = document.querySelector('.foreground-image');
    const overlay = document.querySelector('.overlay');
    const lightRings = document.querySelectorAll('.light-ring');
    const lightDots = document.querySelectorAll('.light-dot');
    const stars = document.querySelectorAll('.star');
    const contentContainer = document.querySelector('.content-container');
    const title = document.querySelector('.title');
    const text = document.querySelector('.text');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // 初始化光效元素位置
    function initLightElements() {
        lightRings.forEach((ring, index) => {
            const angle = index * 120;
            const radius = 150 + (index % 3) * 100;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            ring.style.left = `${x}px`;
            ring.style.top = `${y}px`;
        });
        
        lightDots.forEach((dot, index) => {
            const angle = index * 45;
            const radius = 100 + (index % 4) * 50;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
        });
        
        stars.forEach((star, index) => {
            const angle = index * 45;
            const radius = 50 + (index % 4) * 25;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
        });
    }

    // 光效动画
    function animateLightElements() {
        lightDots.forEach((dot, index) => {
            const angle = (index * 45) + (Date.now() * 0.001 * 180);
            const radius = 100 + (index % 4) * 50;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            gsap.to(dot, {
                x: x,
                y: y,
                duration: 0.1,
                ease: 'none'
            });
        });
        
        lightRings.forEach((ring, index) => {
            const angle = (index * 30) + (Date.now() * 0.001 * 90);
            const radius = 150 + (index % 3) * 100;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            gsap.to(ring, {
                x: x,
                y: y,
                rotation: angle,
                duration: 0.1,
                ease: 'none'
            });
        });
        
        stars.forEach((star, index) => {
            const angle = (index * 45) + (Date.now() * 0.001 * 360);
            const radius = 50 + (index % 4) * 25;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            gsap.to(star, {
                x: x,
                y: y,
                rotation: angle,
                duration: 0.1,
                ease: 'none'
            });
        });
        
        requestAnimationFrame(animateLightElements);
    }

    // 前景图片点击事件
    foregroundImage.addEventListener('click', function() {
        // 显示覆盖层
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });

        // 显示光效元素
        lightRings.forEach((ring, index) => {
            gsap.to(ring, {
                display: 'block',
                opacity: 1,
                scale: 1.2,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        lightDots.forEach((dot, index) => {
            gsap.to(dot, {
                display: 'block',
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        stars.forEach((star, index) => {
            gsap.to(star, {
                display: 'block',
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        // 开始光效动画
        animateLightElements();

        // 显示内容
        gsap.to(contentContainer, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // 导航按钮点击事件
    prevBtn.addEventListener('click', function() {
        window.location.href = 'page4.html';
    });

    nextBtn.addEventListener('click', function() {
        window.location.href = 'page6.html';
    });

    // 初始化
    initLightElements();
}); 
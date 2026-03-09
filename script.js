// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // 汉堡菜单动画
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// 点击菜单项关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// 平滑滚动和活动菜单项
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// 表单提交处理
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // 这里可以添加实际的表单提交逻辑
    console.log('表单数据:', formData);
    
    // 显示成功消息
    alert('感谢您的咨询！我们会尽快与您联系。');
    
    // 重置表单
    contactForm.reset();
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .advantage-item, .case-item, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 数字动画效果
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('x')) {
            element.textContent = Math.floor(current) + 'x24';
        }
    }, 16);
}

// 当统计数字进入视口时触发动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const text = statNumber.textContent;
            
            if (text.includes('+')) {
                const num = parseInt(text.replace('+', ''));
                animateNumber(statNumber, num);
            } else if (text.includes('%')) {
                const num = parseInt(text.replace('%', ''));
                animateNumber(statNumber, num);
            } else if (text.includes('x')) {
                animateNumber(statNumber, 7);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// 页面加载完成后添加动画
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 返回顶部功能
let scrollTopBtn;

function createScrollTopButton() {
    scrollTopBtn = document.createElement('div');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
        transition: all 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px)';
        scrollTopBtn.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0)';
        scrollTopBtn.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.3)';
    });
    
    document.body.appendChild(scrollTopBtn);
}

// 显示/隐藏返回顶部按钮
window.addEventListener('scroll', () => {
    if (!scrollTopBtn) return;
    
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// 初始化返回顶部按钮
createScrollTopButton();

// 表单验证增强
document.getElementById('email').addEventListener('blur', (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#e2e8f0';
    }
});

document.getElementById('phone').addEventListener('blur', (e) => {
    const phone = e.target.value;
    const phoneRegex = /^1[3-9]\d{9}$/;
    
    if (phone && !phoneRegex.test(phone)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#e2e8f0';
    }
});

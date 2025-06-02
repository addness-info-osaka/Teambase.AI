document.addEventListener('DOMContentLoaded', () => {
    // フェードインアニメーションの実装
    const fadeEls = document.querySelectorAll('.fade-in, .slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    fadeEls.forEach(el => observer.observe(el));

    // スムーズスクロールの実装
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // フォーム送信の処理
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 送信ボタンを無効化
            const submitButton = form.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
            
            // 入力値の検証
            const name = form.querySelector('[name="name"]').value.trim();
            const company = form.querySelector('[name="company"]').value.trim();
            const email = form.querySelector('[name="email"]').value.trim();
            const phone = form.querySelector('[name="phone"]').value.trim();
            
            if (!name || !company || !email || !phone) {
                alert('すべての項目を入力してください。');
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-robot"></i> モニターに応募する';
                return;
            }
            
            // 隠しiframeを作成してGASに送信
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = 'gas_response';
            document.body.appendChild(iframe);
            
            // フォームのtargetを設定してGASに送信
            form.target = 'gas_response';
            
            // 元のaction属性を保存
            const originalAction = form.action;
            
            // フォームを送信
            form.submit();
            
            // 送信完了後、サンクスページに遷移
            setTimeout(() => {
                window.location.href = 'https://school.addness.co.jp/p/VN9zsz2DZgDM';
            }, 1500);
            
            // iframeを削除
            setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
                // フォームを元に戻す
                form.target = '';
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-robot"></i> モニターに応募する';
            }, 3000);
        });
    }

    // ボタンの波紋アニメーション
    document.querySelectorAll('.btn, .cta-button, .submit-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.top = `${e.offsetY}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// 波紋アニメーション用CSSを自動挿入
(function(){
    const style = document.createElement('style');
    style.innerHTML = `
        .btn, .cta-button, .submit-button { position: relative; overflow: hidden; }
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background: rgba(255,255,255,0.5);
            pointer-events: none;
            width: 120px;
            height: 120px;
            left: 50%;
            top: 50%;
            margin-left: -60px;
            margin-top: -60px;
            z-index: 2;
        }
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})(); 
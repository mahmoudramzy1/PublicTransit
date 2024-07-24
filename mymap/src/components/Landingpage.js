import React from 'react';
import './style/Landingpage.css';

const LandingPage = () => {
  return (
  <div>
    <body>
        <header>
            <nav>
                <div class="logo">النقل العام</div>
                <ul>
                    <li><a href="#about">عن المشروع</a></li>
                    <li><a href="#features">الميزات</a></li>
                    <li><a href="#contact">تواصل معنا</a></li>
                </ul>
            </nav>
        </header>
        
        <section id="hero">
            <div class="hero-content">
                <h1>مرحباً بكم في النقل العام</h1>
                <p>الحل الذكي للتنقل في المدينة.</p>
                <a href="#features" class="btn">اعرف المزيد</a>
            </div>
        </section>
        
        <section id="about">
            <h2>عن مشروع النقل العام</h2>
            <p>النقل العام هو منصة مبتكرة مصممة لجعل التنقل في المدن أسهل وأكثر كفاءة. سواء كنت مسافراً يومياً أو سائحاً، فإن خدمتنا توفر معلومات النقل العامة في الوقت الحقيقي لمساعدتك على التنقل في المدينة بسهولة.</p>
        </section>
        
        <section id="features">
            <h2>الميزات</h2>
            <div class="feature-box">
                <h3>تحديثات في الوقت الحقيقي</h3>
                <p>احصل على تحديثات حية حول جداول الحافلات والقطارات.</p>
            </div>
            <div class="feature-box">
                <h3>تخطيط المسار</h3>
                <p>خطط رحلتك باستخدام مخطط المسار التفاعلي الخاص بنا.</p>
            </div>
            <div class="feature-box">
                <h3>محطات قريبة</h3>
                <p>اعثر على أقرب محطات النقل بسهولة.</p>
            </div>
        </section>
        
        <footer id="contact">
            <h2>تواصل معنا</h2>
            <p>البريد الإلكتروني: mahmoud.ahmed.ramzy@outlook.com</p>
            <p>الهاتف: +123 456 7890</p>
            <p>العنوان: 123 شارع النقل، المدينة، البلد</p>
        </footer>
        
        <script src="script.js"></script>
    </body>
    </div>
  );
};

export default LandingPage;
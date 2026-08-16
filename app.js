function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle("active");
            
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove("active");
                }
            });
        });
    });
});
// تسجيل Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('تم تسجيل Service Worker بنجاح:', reg.scope))
      .catch((err) => console.log('فشل تسجيل Service Worker:', err));
  });
}

// معالجة حدث التثبيت PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // إظهار زر التثبيت في الشريط العلوي
  if (installBtn) {
    installBtn.style.display = 'inline-block';
  }
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('وافق المستخدم على تثبيت التطبيق');
      }
      deferredPrompt = null;
      if (installBtn) {
        installBtn.style.display = 'none';
      }
    });
  }
}
// دالة المشاركة المتقدمة والمضمونة
async function shareApp() {
    const shareData = {
        title: 'عالم الكناري وهجينه',
        text: 'تطبيق موسوعة الكناري وهجينه - دليلك الشامل لتربية وتدريب الطيور المغردة',
        url: window.location.href
    };

    // التحقق من دعم المتصفح لميزة المشاركة الأصلية
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            console.log('تمت المشاركة بنجاح');
        } catch (err) {
            // تجاهل إلغاء المستخدم للمشاركة دون إظهار خطأ
            if (err.name !== 'AbortError') {
                console.error('حدث خطأ أثناء المشاركة:', err);
                fallbackCopyUrl();
            }
        }
    } else {
        // الخيار الاحتياطي في حال عدم دعم الميزة أو العمل على بيئة محلية HTTP
        fallbackCopyUrl();
    }
}

// دالة النسخ الاحتياطية
function fallbackCopyUrl() {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('تم نسخ رابط التطبيق بنجاح! يمكنك مشاركته الآن.'))
            .catch(() => legacyCopyUrl());
    } else {
        legacyCopyUrl();
    }
}

// دالة النسخ للمتصفحات القديمة والبيئات المحلية
function legacyCopyUrl() {
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert('تم نسخ رابط التطبيق بنجاح!');
    } catch (err) {
        alert('تعذّر نسخ الرابط تلقائياً، يمكنك نسخه مباشرة من شريط العنوان.');
    }
    document.body.removeChild(textArea);
}
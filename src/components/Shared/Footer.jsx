import React from 'react';

const Footer = () => {
    // বর্তমান বছরটি ডাইনামিকভাবে পাওয়ার জন্য এই লাইনটি যোগ করা হয়েছে
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content font-montserrat">
            <aside>
                {/* এখানে ডাইনামিক currentYear ভ্যারিয়েবলটি ব্যবহার করা হচ্ছে */}
                <p>Copyright © {currentYear} - All right reserved by <a href="https://github.com/einadid" target="_blank" rel="noopener noreferrer">einadid</a></p>
            </aside>
        </footer>
    );
};

export default Footer;
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    
    // --- 1. ระบบป้องกันการเข้าใช้งาน (Route Guard) ---
    // เช็คว่าหน้าปัจจุบันมีคำว่า login.html หรือไม่ (รองรับ path แปลกๆ)
    const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname.endsWith('/');
    
    // ถ้ายังไม่ได้ล็อกอิน และไม่ได้อยู่หน้า login.html
    // (หมายเหตุ: ปล่อยให้หน้าแรกเข้าได้ถ้าชื่อไฟล์คือ index.html แต่โจทย์คือล็อกทุกหน้า ต้องเข้าสู่ระบบเท่านั้น)
    if (isLoggedIn !== 'true' && !window.location.pathname.includes('login.html')) {
        // แอบเด้งไปหน้า login โดยไม่ต้อง alert เพื่อความลื่นไหล
        window.location.replace('login.html');
        return; 
    }

    // --- 2. ระบบอัปเดตปุ่ม Navbar ---
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const loginBtn = navbar.querySelector('a.btn-primary');
    
    if (isLoggedIn === 'true' && userName && loginBtn) {
        
        // ถ้าอยู่หน้า login ให้เด้งไปหน้า index ทันทีเพราะล็อกอินแล้ว
        if(window.location.pathname.includes('login.html')) {
            window.location.replace('index.html');
            return;
        }

        // สร้างปุ่มใหม่ครอบปุ่มเดิม
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '10px';
        btnContainer.style.alignItems = 'center';

        // ปุ่มแสดงชื่อ (คลิกไม่ได้แค่โชว์)
        const profileBtn = document.createElement('div');
        profileBtn.className = 'btn-primary';
        profileBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        profileBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        profileBtn.style.color = '#fff';
        profileBtn.style.cursor = 'default';
        profileBtn.innerHTML = `<i class="fa-solid fa-user-circle"></i> ${userName}`;

        // ปุ่มออกจากระบบ
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.className = 'btn-primary';
        logoutBtn.style.backgroundColor = '#e74c3c'; // สีแดง
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> ออกจากระบบ`;
        
        // ใช้ onclick แบบง่ายที่สุด ป้องกันปัญหา Event ไม่ทำงาน
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            // ล้างข้อมูลการล็อกอินทิ้งทั้งหมด
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            // เด้งกลับไปหน้าเข้าสู่ระบบทันที โดยแทนที่ประวัติ (ไม่ให้กดย้อนกลับได้)
            window.location.replace('login.html');
        };

        btnContainer.appendChild(profileBtn);
        btnContainer.appendChild(logoutBtn);

        // แทนที่ปุ่มเดิมด้วย Container ใหม่
        loginBtn.parentNode.replaceChild(btnContainer, loginBtn);
    }
});

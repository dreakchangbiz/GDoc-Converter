/* js/common.js */
/* ---------------------------------- */
/* 1. 全局DOM加載完成後執行 */
/* ---------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

    console.log("GDoc Converter Global JS Loaded.");

    // ----------------------------------
    // 2. 登出按鈕邏輯 (用於 dashboard.html)
    // ----------------------------------
    const logoutButton = document.getElementById('logout-btn');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // 開發說明：
            // 這裡是前端的模擬登出。
            // 實際應用中，這裡應該調用後端API、清除Session或Token，
            // 然後再跳轉到登入頁。

            console.log("用戶點擊了登出。");
            
            // 模擬：顯示提示並跳轉到登入頁
            alert("您已成功登出。");
            window.location.href = 'login.html';
        });
    }

    // ----------------------------------
    // 3. 導航欄 active 狀態處理 (可選)
    // ----------------------------------
    // (在當前設計中，我們直接在HTML中硬編碼了 'active' class)
    // 如果需要動態處理，可以在此處添加邏輯：
    // const currentLocation = window.location.pathname;
    // const navLinks = document.querySelectorAll('.main-nav a');
    // navLinks.forEach(link => {
    //     if (link.href.includes(currentLocation)) {
    //         link.classList.add('active');
    //     }
    // });

});

/* ---------------------------------- */
/* 4. 全局輔助函數 (未來擴展) */
/* ---------------------------------- */

// 示例：顯示全局通知
function showGlobalNotification(message, type = 'success') {
    // (此處可實現一個動態的通知組件)
    console.log(`[${type}] ${message}`);
}

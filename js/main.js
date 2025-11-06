/* js/main.js */
/* ---------------------------------- */
/* 1. 核心 - index.html 轉換頁交互 */
/* ---------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

    // 僅在 index.html 頁面執行
    if (document.body.querySelector('#converter-section')) {
        
        console.log("GDoc Converter Main JS (index.html) Loaded.");

        // ----------------------------------
        // 2. 獲取所有 DOM 元素
        // ----------------------------------
        // 狀態容器
        const initialStateDiv = document.getElementById('upload-initial-state');
        const selectedStateDiv = document.getElementById('file-selected-state');
        const convertingStateDiv = document.getElementById('converting-state');
        const successStateDiv = document.getElementById('success-state');
        const errorStateDiv = document.getElementById('error-state');

        // 上傳區域
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        
        // 按鈕
        const convertBtn = document.getElementById('convert-btn');
        const removeFileBtn = document.getElementById('remove-file-btn');
        const convertAnotherBtn = document.getElementById('convert-another-btn');
        const tryAgainBtn = document.getElementById('try-again-btn');

        // 顯示元素
        const fileNameDisplay = document.getElementById('file-name-display');
        const convertingFilename = document.getElementById('converting-filename');
        const successFilename = document.getElementById('success-filename');
        const openGdocLink = document.getElementById('open-gdoc-link');
        const errorMessage = document.getElementById('error-message');
        
        // 進度條
        const progressBarInner = document.querySelector('.progress-bar-inner');

        // ----------------------------------
        // 3. 狀態管理
        // ----------------------------------
        let currentFile = null;

        // 狀態切換函數
        function showState(stateName) {
            // 隱藏所有狀態
            [initialStateDiv, selectedStateDiv, convertingStateDiv, successStateDiv, errorStateDiv].forEach(div => {
                if(div) div.style.display = 'none';
            });

            // 顯示指定狀態
            switch (stateName) {
                case 'initial':
                    initialStateDiv.style.display = 'block';
                    selectedStateDiv.style.display = 'none'; // 特殊處理：初始狀態包含文件選中
                    convertBtn.disabled = true;
                    currentFile = null;
                    fileInput.value = null; // 清除文件輸入
                    break;
                case 'selected':
                    initialStateDiv.style.display = 'block'; // 仍然顯示上傳框
                    selectedStateDiv.style.display = 'flex'; // 顯示文件信息
                    convertBtn.disabled = false;
                    fileNameDisplay.textContent = currentFile.name;
                    break;
                case 'converting':
                    convertingStateDiv.style.display = 'block';
                    convertingFilename.textContent = currentFile.name;
                    // 模擬進度
                    simulateProgress();
                    // 模擬後端轉換
                    simulateConversion();
                    break;
                case 'success':
                    successStateDiv.style.display = 'block';
                    successFilename.textContent = currentFile.name;
                    // 模擬 GDoc 連結
                    openGdocLink.href = 'https://docs.google.com'; 
                    break;
                case 'error':
                    errorStateDiv.style.display = 'block';
                    errorMessage.textContent = '抱歉，處理文件時發生未知錯誤。';
                    break;
            }
        }

        // ----------------------------------
        // 4. 上傳邏輯 (拖拽 + 點擊)
        // ----------------------------------
        
        // 點擊上傳
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        // 拖拽上傳
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault(); // 阻止瀏覽器默認行為
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        // 統一文件處理
        function handleFile(file) {
            // 驗證文件類型 (PDF) 和大小 (10MB)
            if (file.type !== 'application/pdf') {
                alert('請上傳 PDF 格式的文件。');
                return;
            }
            if (file.size > 10 * 1024 * 1024) { // 10MB
                alert('文件大小不能超過 10MB。');
                return;
            }
            
            currentFile = file;
            showState('selected');
        }

        // ----------------------------------
        // 5. 按鈕事件監聽
        // ----------------------------------

        // 移除文件
        removeFileBtn.addEventListener('click', () => {
            showState('initial');
        });

        // 開始轉換 (核心按鈕)
        convertBtn.addEventListener('click', () => {
            if (currentFile) {
                showState('converting');
            }
        });

        // 轉換另一個
        convertAnotherBtn.addEventListener('click', () => {
            showState('initial');
        });

        // 失敗後重試 (返回到選中狀態)
        tryAgainBtn.addEventListener('click', () => {
            // 這裡模擬重試，實際應用中可能是重新上傳
            // 為了演示，我們返回初始狀態
            showState('initial');
        });


        // ----------------------------------
        // 6. 模擬後端處理 (!!! 開發說明 !!!)
        // ----------------------------------
        // 
        // 這裡是前端的 **模擬**。
        // 實際項目中，handleFile() 之後，點擊 "開始轉換" 按鈕
        // 應該將 currentFile (File 對象) 通過 FormData 
        // POST 到您的後端 API (例如 /api/convert)。
        //
        // 後端 API 接收 PDF -> 處理 -> 調用 Google Drive API -> 返回 GDoc 連結。
        // 前端在此期間應等待 API 響應。
        //

        // 模擬進度條
        function simulateProgress() {
            progressBarInner.style.width = '0%';
            // 隨機模擬加載
            setTimeout(() => { progressBarInner.style.width = '30%'; }, 500);
            setTimeout(() => { progressBarInner.style.width = '70%'; }, 1500);
            setTimeout(() => { progressBarInner.style.width = '100%'; }, 2500);
        }

        // 模擬轉換 (API 調用)
        function simulateConversion() {
            console.log("模擬：開始轉換文件 " + currentFile.name);
            
            // 模擬 3 秒的後端處理時間
            setTimeout(() => {
                // 模擬 90% 成功, 10% 失敗
                if (Math.random() > 0.1) {
                    console.log("模擬：轉換成功");
                    showState('success');
                } else {
                    console.log("模擬：轉換失敗");
                    showState('error');
                }
            }, 3000); // 3 秒後返回結果
        }


        // ----------------------------------
        // 7. 初始狀態
        // ----------------------------------
        showState('initial');
    }
});

# ROSE California Lottery Pro V1.3.0

California Fantasy 5 獨立研究專案。

- 畫面版本：ROSE-CA-F5-V1.3
- Service Worker cache：rose-ca-f5-v1.3.0
- GitHub Pages：支援
- 離線：首次成功開啟後，核心 UI、JS、CSS、manifest 與內建歷史資料可離線使用。
- 本機資料：手動新增、CSV 匯入、每日研究筆記保存在瀏覽器 localStorage。
- Walk-forward：每個測試期只使用該期以前資料。
- 研究統計不是中獎率。
- 不含台灣 539 Firebase 設定或正式資料。

## 內建資料
內建資料包含 California State Lottery 官方網站已核對的 Fantasy 5 歷史資料；V1.3 新增核對 2026-09-09 (#11995)、2026-09-10 (#11996)、2026-09-11 (#11997)。為避免冒充官方資料，未核對的新期別不硬寫入。可由「歷史資料」手動新增或 CSV 匯入。

## 部署
將 ZIP 解壓後的檔案全部覆蓋到 GitHub repository 根目錄，Pages 使用 main / (root)。部署後第一次請在線開啟一次，之後可測試飛航模式離線。

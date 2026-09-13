# ROSE California Lottery Pro V1.2

獨立 California Lottery Fantasy 5 研究專案。繁體中文 GitHub Pages 版。

## V1.2
- 內建 20 期 California State Lottery 官方頁面核對之 Fantasy 5 真實歷史資料樣本（2026-08-08 至 2026-08-27）。
- 歷史資料表與 CSV 匯入（date,draw,n1,n2,n3,n4,n5）。
- 紙本研究、號碼頻次/遺漏、奇偶/和值/連號/Gap、鄰期重複、Pair 共現。
- Walk-forward 示範：每個測試期只使用當期以前資料；輸出命中碼數，不稱為中獎率。
- 每日研究本機存檔（localStorage）。
- California 專案獨立；不連接、不寫入台灣 539 Firebase。

## 資料說明
內建資料是可驗證的官方資料樣本，不宣稱是完整歷史庫。若要擴充，可由歷史資料頁匯入 CSV。後續版本再建立完整官方歷史同步層。

## 部署
將本資料夾內容上傳 GitHub repository 根目錄，GitHub Pages 使用 main / (root)。

版本：1.2.0  
畫面：ROSE-CA-F5-V1.2  
Service Worker cache：rose-ca-f5-v1.2.0

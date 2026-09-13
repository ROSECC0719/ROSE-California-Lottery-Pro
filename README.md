# ROSE California Lottery Pro V1.4

California Fantasy 5 獨立研究專案。與台灣 539 專案完全分離。

## V1.4
- 將版本與「01～39 選5碼」移至頂部標題列，移除原本佔空間的 Hero 區塊。
- 內建資料由原本停在 2026-08-27，補至 California Lottery 官方已確認的 2026-09-12 Draw #11998。
- 首頁最新資料直接顯示日期、期號與五碼。
- 離線核心資產與內建歷史資料使用 Service Worker cache `rose-ca-f5-v1.4.0`。
- 研究功能仍以歷史描述與 Walk-forward 盲測為主；研究分數不得稱為真實中獎率。

## 部署
解壓縮後將本資料夾內容覆蓋 GitHub Pages repository 根目錄。首次更新請保持連網並重新整理；新版 Service Worker 啟用後可離線使用核心功能。

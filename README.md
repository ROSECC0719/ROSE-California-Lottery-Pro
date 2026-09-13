# ROSE California Lottery Pro V1.1

California Fantasy 5 獨立研究專案（繁體中文 GitHub Pages UI）。

- APP_VERSION: 1.1.0
- UI_VERSION: ROSE-CA-F5-V1.1
- Service Worker cache: rose-california-lottery-pro-v1.1
- ZIP: ROSE_California_Lottery_Pro_V1.1.zip

## V1.1
新增可直接部署至 GitHub Pages 的 `index.html`、`style.css`、`app.js` 與 PWA manifest。首頁提供歷史資料、紙本研究、號碼、結構、拖牌轉移、組合、Walk-forward、每日研究入口。

目前為 UI/架構版，尚未宣稱已完成真實分析引擎。研究分數不得稱為真實中獎率。Walk-forward 每一期只能使用該期以前資料。

## Firebase 隔離
本專案不連接、不寫入台灣 539 正式 Firebase。`firebase.example.json` 僅為 California 專案範例設定。

## GitHub Pages
將本資料夾「裡面的檔案」放在 repository 根目錄，Settings → Pages → Deploy from a branch → main / (root)。

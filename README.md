# ROSE California Lottery Pro V2.1

California Fantasy 5 獨立研究專案。

- UI: ROSE-CA-F5-V2.1
- App: 2.1.0
- Cache: rose-ca-f5-v2.1.0
- 首頁改為手機優先的緊湊 Header。
- 合併「號碼研究／結構研究」為「統計分析」，移除重複的紙本入口。
- 新增「今日嚴選五組」：可輸入必選、排除、奇偶、鄰期重複與和值規則，每次固定產生 5 組研究號碼。
- 研究分數不是中獎機率。
- Walk-forward 嚴禁使用未來資料。
- Service Worker 快取核心檔與內建歷史資料，首次成功載入後可離線使用。


V2.1：內建 200 期歷史資料；Walk-forward 最新在上；拖牌顯示實際號碼與轉移；規則輸入預設首頁直接顯示；Header 版本資訊移至右側。


## V2.1
- Header version/game badge moved to the upper-right on desktop.
- History and Walk-forward numbers use separated mini-balls for readability.
- Drag research explains what a dragged/repeated number means and shows the actual repeated numbers.
- Daily research accepts persistent fixed-rule text such as `09 14 27 | 3期至少出1碼` and drag rules such as `34 -> 27 37 33`.
- Rules persist locally for offline use.

## V2.1
- Mobile header badge is positioned at the lower-right; desktop remains upper-right.
- Pair/Triple, drag ranking, and transfer relations use circular number badges.
- Mobile drag-history layout stacks 本期 above 前一期 to avoid horizontal scrolling and misreading.

## V2.1
- 修正拖牌規則解析：每一行獨立一條規則。
- 支援「01開下期出03、05、27」與「34拖27、37、33」格式。
- 同期多條規則可同時觸發，並顯示各觸發來源。
- 同一目標被多條規則指向時顯示共同指向次數。

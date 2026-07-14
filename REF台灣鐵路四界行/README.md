# 🚄 台灣鐵路四界行 — 交通台語互動教學 WebApp

這是一個專為兒童與初學者設計的**台語交通學習互動網頁**。本網頁以「台灣環島鐵路」為主題，將台語的縣市地名、交通工具、數字張數、票價金額、月台數字與發車時間（鐘點）融入豐富生動的互動遊戲與語音朗讀中，讓學習台語變得無比有趣！

---

## 🌟 核心功能特色

1. **購票大冒險 (Ticket Adventure)**
   - 全台環島 14 個縣市車站起訖點選擇，具備**雙向最短路徑演算法**，自動判斷順時針或逆時針行車軌跡。
   - 地圖火車沿軌跡動態前行，並生成完整的台語發音語句（如：「我想欲去台南，買自強號兩張票，一共七百元。」）。
   - 包含火車票價、乘車時間、候車月台與車次種類等與數字、時間相關的學習資訊。

2. **交通詞彙牆 (Vocabulary Station)**
   - 精選 16 個最常用的交通工具與鐵路場景詞彙卡片。
   - 每張卡片均附帶精美 Emoji、中文、英文與教育部台羅拼音。
   - 支援點擊發音與分類篩選（全部、交通工具、鐵路場景）。

3. **時間鐘點師 (Clock Trainer)**
   - **互動式指針時鐘**：支援點擊微調與常見 presets，時針分針隨時間轉動。
   - 即時顯示時間的數位格式、台語漢字說法與台羅拼音。
   - 點擊發音按鈕即時播放對應的時間台語讀音（例如：「下午三點半」、「早上十點十五分」）。

4. **台語大檢定 (Challenge Mode)**
   - **售票員聽力挑戰**：聆聽旅客的台語購票需求（去哪裡、買幾張票），在時限內選出正確卡片。
   - **發車時刻聽力挑戰**：聆聽火車發車時間的台語朗讀，選出正確的數位時間。
   - 每關隨機 10 題，包含 20 秒倒數計時，答對 8 題以上可獲得隱藏的鐵道紀念章。

5. **我的鐵道集章冊 (Stamp Album)**
   - 展示全台 14 個縣市車站的精美數字紀念章（如：台北大樓、台南古蹟、花蓮山脈、高雄港口）。
   - 點擊已解鎖印章可直接聆聽該縣市地名的台語發音。
   - 集章進度將安全地儲存於瀏覽器的 `localStorage` 中。

---

## 🛠️ 技術架構與語音發音引擎

本專案為**純前端網頁應用程式**，採用 HTML5, Vanilla CSS 與原生 JavaScript 編寫，無須安裝額外後端依賴。

* **雙語支持 (Localization)**：支援華語 (Traditional Chinese) 與英語 (English) 的一鍵即時切換。
* **高精準雙模語音引擎 (TTS Engine)**：
  1. **教育部台語常用詞辭典真人發音拼接**：採用中華民國教育部《臺灣台語常用詞辭典》官方真人語音（由 ChhoeTaigi 社群開源維護的 [KipSutianDataMirror](https://github.com/ChhoeTaigi/KipSutianDataMirror) 鏡像庫），將站名、數字、時間、語法接續詞依序動態排入非同步音軌播放佇列（Sequential Audio Queue Player），播放出 100% 正宗、口語的台語真人發音。
  2. **本地離線擬真備援**：若網路斷線或語音伺服器連線失敗，系統會自動降級切換至本地 Web Speech API 語音引擎（`zh-TW`），並透過精準設計的「台語同音字對照表」替換，以國語同音字發音（如將「台北」模擬為「台八」發音），確保在離線狀態下依然保有語音學習功能。
* **響應式網頁設計 (RWD)**：支援手機、平板與桌上型電腦，並特別對觸控事件與字體對比度進行了無障礙優化。

---

## 📂 檔案目錄結構

* [index.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/index.html) — 主要頁面佈局與 SVG 地圖/時鐘骨架
* [index_single.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/index_single.html) — 整合了 HTML, CSS 與 JavaScript 的單一自適應檔案，適合上傳至 Google Drive 進行行動端直接預覽或離線分享
* [blogger_base64_embed.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/blogger_base64_embed.html) — [NEW] Blogger 專用之免託管 Iframe Base64 嵌入代碼檔，徹底隔離 Blogger 主題 CSS/JS 干擾，100% 保證選單與觸控運作正常且不擠壓破版
* [style.css](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/style.css) — 視覺美學系統、漸層、玻璃擬物化設計及動態動畫
* [app.js](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/app.js) — 環島路徑計算、時鐘指針角度換算、語音引擎、挑戰賽計分與本地儲存控制
* [README.md](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/README.md) — 使用手冊
* [OPTIMIZATION_LOG.md](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/OPTIMIZATION_LOG.md) — 優化日誌

---

## 🚀 本地啟動與運行方式

本應用程式非常輕量，您可以透過以下任一方式開啟：

### 方式一：直接雙擊開啟
雙擊 [index.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/index.html) 即可在預設瀏覽器中執行。*(注意：部分舊版瀏覽器可能因本機安全限制阻擋 CORS 音訊載入，若語音無法播放，推薦使用方式二。)*

### 方式二：使用本機伺服器啟動 (推薦)
在專案根目錄下使用終端機執行本機伺服器：
```bash
# 使用 Python 內建伺服器
python -m http.server 8000

# 或使用 Node.js 輕量伺服器
npx -y live-server ./
```
接著在瀏覽器中輸入 `http://localhost:8000` (或 live-server 自動開啟的頁面)，即可獲得最完整流暢的音訊與動畫體驗！

---

## ☁️ 雲端分享與網誌嵌入方式 (Google Drive & Blogger)

如果您想將這個教學工具分享給他人，或嵌入到個人部落格（如 Google Blogger）中，我們提供了已整合 HTML、CSS 與 JS 的單一網頁檔 **`index_single.html`**，此檔案特別適合以下情境：

### 1. 使用 Google Drive 行動端預覽分享
* **問題背景**：若將多個檔案直接上傳 Google Drive，在手機 App 中點擊 `index.html` 會因安全沙盒阻擋，無法載入外部 `style.css` 與 `app.js`，導致網頁按鈕完全失效。
* **解決方式**：請直接將單一檔案 **`index_single.html`** 上傳至 Google Drive。
* **手機開啟步驟**：
  1. 在手機 Google Drive App 中點擊 `index_single.html` 開啟。
  2. 點選右上角的 **「...」** 更多按鈕。
  3. 選擇 **「在 Safari 中開啟」** 或 **「在 Chrome 中開啟」** 瀏覽器，即可 100% 正常點選並播放台語真人發音。

### 2. 嵌入至 Google Blogger（部落格）
我們提供了兩種方式將遊戲嵌入 Blogger 中：

#### 方法 A：使用 `<iframe>` 嵌入（最推薦，100% 不會破版且無衝突）
1. **託管單一網頁檔**：將 `index_single.html` 上傳至免費的靜態空間（如 GitHub Pages、Vercel、Netlify 或利用 Google Drive 配合 [drv.tw](https://drv.tw)），取得公開的專屬網址。
2. **在 Blogger 插入代碼**：
   - 開啟 Blogger 文章編輯器，切換至 **「HTML 檢視」**（左上角 `<>` 符號）。
   - 在想要呈現遊戲的位置，貼上以下嵌入代碼（請將 `src` 網址替換為您的網頁公開網址）：
     ```html
     <iframe src="您的網頁公開網址" width="100%" height="1200px" style="border: none; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: block;" scrolling="auto"></iframe>
     ```

#### 方法 B：直接貼上 HTML5 srcdoc 嵌入代碼（Blogger 專用免託管，100% 正常運行且不破版）
如果您不想將網頁檔案上傳到其他託管空間，想**直接複製貼上代碼**到 Blogger 中，且能徹底避免 Blogger 範本干擾、破版與選單失效問題，我們特別編譯了 `srcdoc` 獨立嵌入版 **`blogger_base64_embed.html`**：
* **這個嵌入代碼的優勢**：
  1. **免伺服器託管**：整套 HTML, CSS 與 JS 都被加密與轉譯，以 HTML5 的 `srcdoc` 屬性直接嵌入。
  2. **100% 獨立運行且支援外部資源**：代碼將在內置的獨立 Iframe 中運行，**繼承您部落格的網域（Origin），因此能完美加載 FontAwesome 圖標、Google 字型與教育部真人音檔，且下拉選單、按鈕、時鐘觸控拖動 100% 正常工作！**
  3. **自動響應式版型**：因為運行於獨立 Viewport 下，網頁會依據 Blogger 的文章寬度自動計算尺寸。在桌機上呈現寬闊的兩欄式版面，在手機上則自動折疊成精緻的單欄直式排版，完全不擠壓。
  4. **相容性雙重備援**：同時包含 Base64 編碼作為舊版瀏覽器的 fallback 備援。
* **操作與貼上步驟**：
  1. 開啟專案根目錄下的 [blogger_base64_embed.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/台灣鐵路四界行/blogger_base64_embed.html)。
  2. **全選並複製**裡面的所有嵌入代碼（Ctrl+A, Ctrl+C）。
  3. 進入 Blogger 撰寫新文章，將編輯器切換為 **「HTML 檢視」**（左上角 `<>` 符號）。
  4. 將複製的代碼直接貼在您文章中想要顯示的位置。
  5. 發布文章即可！

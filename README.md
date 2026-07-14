# 🗣️ Taiwanese Lô-má-jī Tone Sandhi Trainer

An interactive, self-contained web tool designed for practicing, visualizing, and listening to Taiwanese Hokkien Tone Sandhi (台語變調) and Neutral Tones (輕聲). 

Designed and engineered for **@史秀里冊房 Tō͘ Sìn-liông 製作 2026**.

---

## 🌟 Key Features

1. **Multi-Syllable Interactive Builder**: 
   - Supports **1-Syllable (一字組)**, **2-Syllable (二字組)**, **3-Syllable (三字組)**, and **4-Syllable (四字組)** configurations.
   - In **1-Syllable Mode (一字組)**, the word does not change tone and retains its base tone (本調).
   - Dynamically selects Initials (18 standard), Rhymes (categorized into Vowels, Diphthongs, Nasalized, Nasals, Syllabic, and Entering Stop Codas), and Tones (T1, T2, T3, T4, T5, T7, T8) for each syllable card.
   - Dynamic tone filtering: Selecting a stop-coda rhyme (`-p`, `-t`, `-k`, `-h`) filters available tones to entering tones 4 & 8; other rhymes filter to standard tones 1, 2, 3, 5, 7.

2. **Slot Machine Randomizer (隨機組合)**:
   - Click the **Random (隨機組合)** button to spin through random initials, rhymes, and tones for all active syllables with a smooth slot-machine animation.
   - Automatically plays the audio sequence of the randomized phrase once the spin finishes.

3. **Bidirectional Quick Type Input (快速輸入)**:
   - Type any syllable in numeric Romanization (e.g. `goa2`, `tsit8`) or with diacritic marks directly (e.g. `góa`, `tsi̍t`) in any active syllable text box.
   - The parser splits the string into Initial, Rhyme, and Tone, updates the dropdown selections, and computes the sandhi flow in real-time.
   - Updates the text box automatically when selections change, with focus checks to avoid input loops or cursor jumps.

4. **Linguistic Tone Sandhi Engine**:
   - Computes standard sandhi rules: `1 ➔ 7`, `2 ➔ 1`, `3 ➔ 2`, `5 ➔ 7`, `7 ➔ 3`.
   - Computes entering stop codas: `4` (ending in `-p`, `-t`, `-k`) ➔ `8`; `8` (ending in `-p`, `-t`, `-k`) ➔ `4`.
   - Computes glottal stop codas: `4` (ending in `-h`) ➔ drops `-h` and becomes Tone `2`; `8` (ending in `-h`) ➔ drops `-h` and becomes Tone `3`.
   - Handles multi-syllable flows:
     - **3-Syllable Sequential**: Word 1 (sandhi), Word 2 (sandhi), Word 3 (base).
     - **4-Syllable Sequential**: Word 1 (sandhi), Word 2 (sandhi), Word 3 (sandhi), Word 4 (base).
     - **4-Syllable 2+2 Split (兩兩變調)**: Word 1 (sandhi) + Word 2 (base); Word 3 (sandhi) + Word 4 (base) - designed for compound word training (e.g., `Tâi-oân Tāi-ha̍k`).

5. **Neutral Tone (輕聲 --) Support**:
   - Type `--` at the beginning of the last syllable (e.g., `--khì` or `--khi3`) or check the "Neutral Tone" box.
   - Computes the neutral tone rule: The preceding syllable retains its **base tone** (no sandhi) and the last word is marked with a double hyphen prefix `--` and spoken softly. All preceding syllables before that undergo standard sandhi normally.

6. **Pure Authentic Audio Engine (No Mandarin Fallback)**:
   - Contains an embedded database of **1,855 unique syllables** mapped to Ministry of Education voice recordings.
   - Performs sequential queue playback for all active syllables (sandhi tone or base/neutral tone) back-to-back.
   - Multi-stage tone fallback search: if the exact sandhi tone recording is missing, it falls back to the base tone, and then to other available tones for that syllable, guaranteeing native speaker voice output instead of Mandarin TTS.
   - Soft/Short audio modifier: If any syllable is a neutral tone, its playback volume is lowered to `0.55` and speed increased to `1.25x` to simulate a real neutral tone mouthfeel.

7. **Chao Tone Pitch Grid (聲調五度譜格)**:
   - Features SVG grid cards representing the pitch contour of the 7 tones using Chao's 5-level pitch system (五度標音法) from level 1 (lowest) to level 5 (highest).

8. **Blogger Embed Ready**:
   - Generates a wrapped base64 HTML file that can be pasted directly into Blogger's HTML view without encountering script blocks or cross-origin restrictions.

---

## 📂 File Directory

- `lmj tone sandhi tool.html` - The main, self-contained offline application. Open in any modern web browser.
- `blogger_embed.html` - HTML code block containing the main application nested within an escaped `iframe srcdoc` wrapper. Copy-paste this entire file's content into Google Blogger to embed.

---

## 🔄 Linguistic Formula References

### 1. Standard Tone Sandhi Loop
```
  [1 (高平 55)] ➔ [7 (中平 33)] ➔ [3 (低降 21)] ➔ [2 (高降 51)] ➔ [1]
```
- **T5 Branch**: `5 (低升 24) ➔ 7 (中平 33)`

### 2. Entering Tone Sandhi (入聲變調)
- **Stop Codas (-p, -t, -k)**: 
  - `4 (中入 3) ➔ 8 (高入 5)`
  - `8 (高入 5) ➔ 4 (中入 3)`
- **Glottal Stop Coda (-h)**: 
  - `4h (中入 3) ➔ drops -h ➔ 2 (高降 51)`
  - `8h (高入 5) ➔ drops -h ➔ 3 (低降 21)`

### 3. Neutral Tone Rule (輕聲變調)
- `Syllable 1 + --Syllable 2`
- Syllable 1 keeps **base tone (本調)**.
- Syllable 2 drops to a low, soft short pitch.
- For longer sequences (e.g. `Syllable 1 + Syllable 2 + --Syllable 3`), the syllable immediately preceding the neutral tone (`Syllable 2`) keeps its base tone, and the earlier syllable (`Syllable 1`) undergoes standard sandhi.

### 4. Multi-Syllable Sandhi Structure
- **Sequential (N-Syllable)**: `Word 1 (sandhi) ➔ Word 2 (sandhi) ➔ ... ➔ Word N-1 (sandhi) ➔ Word N (base)`
- **2+2 Split (4-Syllable)**: `(Word 1 (sandhi) ➔ Word 2 (base)) + (Word 3 (sandhi) ➔ Word 4 (base))`

### 5. Triplicate AAA Sandhi (三字疊字變調)
When three identical syllables are inputted in 3-Syllable Mode (e.g. `âng-âng-âng` 紅紅紅, `oo-oo-oo` 烏烏烏), the trainer automatically detects the triplicate adjective structure and applies the following special rules:
- **Word 3 (Last word)**: retains its original **base tone** (本調).
- **Word 2 (Middle word)**: undergoes standard **general tone sandhi** (一般變調).
- **Word 1 (First word)**:
  - If the base tone is **1, 5, 7, or 8**: It changes to a **mid-rising tone (中升調, Tone 5)**. For entering Tone 8 ending in `-h`, it also drops the glottal stop `-h` and becomes Tone 5.
  - If the base tone is **2, 3, or 4**: It undergoes standard **general tone sandhi** (一般變調).
  - **中升調語音對應說明 (Mid-rising Tone Mapping Details)**:
    1. **教育部音檔限制**: 教育部官方語音庫僅錄製 7 個基本本調（T1, T2, T3, T4, T5, T7, T8），並無單獨錄製「中升變調」（調值 `35`）這個僅在變調中出現的特殊調值音檔。
    2. **以第 5 聲 (T5) 代替播放**: 由於台語「第 5 聲 (陽平)」本身即為升調（低升 `24` 或中升 `35`），聽感與三疊字首字變調後的中升調最為契合。因此，在練習器的拼寫與語音播放設計中，中升調均統一對應並調用「第 5 聲 (T5)」的音檔進行播放（例如：`紅紅紅` 首字中升調會調用 `âng5` 音檔播放）。

---

## 🛠️ Build and Compilation

The project includes a build script to compile the main HTML file into the escaped Blogger embed version:

- `build.js` - Escapes the compiled HTML code and packages it inside the Blogger iframe container (`blogger_embed.html`).

To compile changes:
```bash
node build.js
```

## ⚠️ Known Issues / Limitations (已知問題與限制)

1. **Audio Fallback to Base Tone (語音變調降級播放)**:
   - **教育部辭典錄音設計規則 (MoE Database Design Rule)**: 
     教育部在錄製《臺灣台語常用詞辭典》語音檔時，採取**「單字不成詞者不單獨錄音」**的原則（例如單字「糟」、「傑」、「秫」在現代台語中不單獨成詞，必須組成「紅糟」、「傑出」、「秫米」等詞彙）。
     根據對教典全部 29,606 條資料的統計分析：
     - 分類為「單字不成詞者」的條目共有 **3,098 個**。
     - 其中**高達 3,096 個 (99.93%) 皆無單字音檔 (null)**。
   - **變調降級影響 (Impact on Tone Sandhi)**: 
     當使用者在練習器中拼出變調字詞時，若變調後的讀音屬於「單字不成詞者」，在語音庫中將完全找不到該羅馬字陰平或陽入調的單音檔。
     
     | 變調漢字 | 本調拼音 | 變調後拼音 | 對應漢字與類別 | 音檔狀態 | 播放時的降級 (Fallback) |
     | :--- | :--- | :--- | :--- | :--- | :--- |
     | **走** | `tsáu` (T2) | **`tsau` (T1)** | **糟 / 蹧** (單字不成詞) | ❌ 無音檔 | 降級播放本調 `tsáu` (T2) |
     | **出** | `tshut` (T4) | **`tshu̍t` (T8)** | **秫** (單字不成詞) | ❌ 無音檔 | 降級播放本調 `tshut` (T4) |
     | **結** | `kiat` (T4) | **`kia̍t` (T8)** | **傑 / 杰 / 桀** (單字不成詞) | ❌ 無音檔 | 降級播放本調 `kiat` (T4) |
     | **馬** | `má` (T2) | **`ma` (T1)** | **馬 / 媽** (無對應之獨立主詞目) | ❌ 無音檔 | 降級播放本調 `má` (T2) |

    - **避空降級播放 (Fallback Behavior)**: 為避免播放時產生無聲空檔，播放引擎會進行多階段降級。若缺乏變調音檔，優先以降級該音節的「本調」播放；若該音節本調音檔亦缺損（如單字組模式或辭典未收錄之本調），則以語音庫中該音節之「其他可用相似聲調」代替播放（如 `ngiau5` 播放 `ngiau1`）。
    - **UI 提示機制 (UI Warning Indicators)**: 
      - 當有降級發生時，播放狀態標籤會依降級類型動態顯示 `🔊 MoE Audio (部份音節使用本調)` 或 `🔊 MoE Audio (部份音節使用相似聲調)`。
      - 計算說明欄會動態顯示警告提示（`.fallback-warning-box`），清晰列出哪些音節因為缺乏特定錄音而降級播放本調或以相似聲調代替。

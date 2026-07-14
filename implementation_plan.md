# Implementation Plan - Taiwanese Lô-má-jī Tone Sandhi Tool

This plan describes the upgrades to the [lmj tone sandhi tool.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/Taiwanese Lô-má-jī Tone Sandhi Tool/lmj tone sandhi tool.html) to support correct Taiwanese pronunciation via a Mandarin homophones speech synthesis fallback, enable building arbitrary syllables (covering all Romanized combinations), and automatically compute correct tone sandhi (including entering tone stop codas).

## User Review Required

> [!IMPORTANT]
> The browser's native `speechSynthesis` does not typically include a built-in Taiwanese voice. To resolve this, we will use a **Mandarin homophones algorithm** (similar to the one in the railway reference app). This maps Taiwanese Romanization syllables to Mandarin words that sound like Taiwanese when read by a `zh-TW` Mandarin voice.

## Proposed Changes

We will modify the single-file HTML app to replace the hardcoded syllable list with a full Syllable Builder and integrate the speech synthesis engine.

### Core Architecture & UI

#### [MODIFY] [lmj tone sandhi tool.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/Taiwanese Lô-má-jī Tone Sandhi Tool/lmj tone sandhi tool.html)
- **UI Upgrades**:
  - Add Google Fonts (`Outfit` and `Inter`) for typography.
  - Re-design the interface with a modern, glassmorphic look, including a theme toggle (Light/Dark).
  - Replace the fixed `select` dropdowns with a **Syllable Builder** for Word 1 and Word 2 containing three dropdowns each:
    - **Initial (聲母)**: `[none]`, `b`, `g`, `h`, `j`, `k`, `kh`, `l`, `m`, `n`, `ng`, `p`, `ph`, `s`, `t`, `th`, `ts`, `tsh`
    - **Rhyme (韻母)**: Structured into Vowels, Diphthongs, Triphthongs, Nasalized, Nasal Codas, Syllabic, and Entering (Stop Codas).
    - **Tone (聲調)**: `1`, `2`, `3`, `4`, `5`, `7`, `8`
  - **Dynamic Tone Filtering**: If the selected Rhyme is an entering tone (ends in `p`, `t`, `k`, `h`), filter the Tone dropdown to show only `4` and `8`. Otherwise, show `1`, `2`, `3`, `5`, `7`.
  - Add a **Speech Rate (Speed) Slider** (0.5x - 1.5x).

- **Tone Sandhi Engine**:
  - Implement a Tâi-lô diacritic placement algorithm (`applyToneMark(initial, rhyme, tone)`) using standard vowel priority: `a` > `oo` / `o͘` > `e` > `o` > `i` / `u` (with special rule for `iu`/`ui` where mark goes on the second vowel).
  - Implement full Tone Sandhi rules:
    - `1` ➔ `7`
    - `2` ➔ `1`
    - `3` ➔ `2`
    - `5` ➔ `7` (standard Tâi-lô)
    - `7` ➔ `3`
    - `4` (ending in `-h`) ➔ drops `-h` and becomes Tone `2`
    - `4` (ending in `-p`, `-t`, `-k`) ➔ becomes Tone `8`
    - `8` (ending in `-h`) ➔ drops `-h` and becomes Tone `3`
    - `8` (ending in `-p`, `-t`, `-k`) ➔ becomes Tone `4`

- **Taiwanese Speech Synthesizer**:
  - Convert selected Taiwanese syllables into Mandarin pinyin via linguistic approximations (unaspirated stops `p`/`t`/`k`/`ts` ➔ Mandarin `b`/`d`/`g`/`z`; aspirated stops `ph`/`th`/`kh`/`tsh` ➔ Mandarin `p`/`t`/`k`/`c`, etc.).
  - Palatalize velars `g`/`k`/`kh` to `j`/`q` before `i`/`e`.
  - Map Taiwanese tones to Mandarin tones to preserve the pitch contour:
    - Taiwanese `1` (high flat) ➔ Mandarin Tone 1
    - Taiwanese `2` (high falling) ➔ Mandarin Tone 4
    - Taiwanese `3` (low flat) ➔ Mandarin Tone 3
    - Taiwanese `4` (short entering) ➔ Mandarin Tone 4 (short)
    - Taiwanese `5` (rising) ➔ Mandarin Tone 2
    - Taiwanese `7` (mid flat) ➔ Mandarin Tone 3
    - Taiwanese `8` (high entering) ➔ Mandarin Tone 4 (short)
  - Map the final Pinyin to a Mandarin character and speak it using `speechSynthesis` with `zh-TW` locale.

## Verification Plan

### Manual Verification
- Open the updated `lmj tone sandhi tool.html` in a web browser.
- Verify that selecting initials, rhymes, and tones updates the syllable spelling with correct diacritics.
- Check that entering rhymes (like `ap`, `iah`) limit the tone choices to Tones 4 and 8.
- Test combinations:
  - `kiaⁿ` (Tone 1) + `lâng` (Tone 5) ➔ `kiāⁿ-lâng` (pronounced "jiă láng")
  - `kiat` (Tone 4) + `kiaⁿ` (Tone 1) ➔ `kia̍t-kiaⁿ` (pronounced "jié jiā")
  - `kia̍h` (Tone 8) + `kiaⁿ` (Tone 1) ➔ `kià-kiaⁿ` (pronounced "jià jiā")
- Adjust the speed slider and verify that the playback rate changes.

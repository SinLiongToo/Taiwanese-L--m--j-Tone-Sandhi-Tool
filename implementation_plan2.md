# Implementation Plan - Taiwanese Lô-má-jī Tone Sandhi Tool with MoeDict Audio

We are upgrading the [lmj tone sandhi tool.html](file:///c:/Users/tu-hs/OneDrive/文件/2022_0308_MASA/2022-0708/Projects_antigravity/Taiwanese Lô-má-jī Tone Sandhi Tool/lmj tone sandhi tool.html) to play real Taiwanese voice recordings fetched from the Ministry of Education's dictionary (hosted via the ChhoeTaigi mirror). This replaces the Mandarin-sounding text-to-speech synthesis with authentic Taiwanese recordings while keeping the TTS as a smart fallback for custom/nonsense syllables.

## Proposed Changes

We have designed and prepared the following upgrades:

### 1. Audio Database Integration
- We downloaded the Ministry of Education's Taiwanese dictionary database (`KipSutianData.json`) and extracted a mapping of **1,855 unique Taiwanese syllables** (including tones) to their corresponding audio recording IDs.
- We normalized the database's Tâi-lô spellings to a clean, ASCII-based representation (e.g. converting `ⁿ` to `nn` and `o͘` to `oo`, and stripping tone diacritics) for robust, lightweight client-side matching.
- We embed this 1,855-syllable mapping directly inside the single-file HTML app as `syllableAudioMap` (adding only ~40KB of code size).

### 2. Audio Queue Player
- We implemented a sequential player `playAudioSequence([id1, id2], fallbackText)` that plays the audios for Word 1 (in its sandhi tone) and Word 2 (in its base tone) one after another.
- It utilizes the browser's native `Audio` object and listens to the `onended` event to trigger the next syllable seamlessly.
- It respects the **Speech Rate (Speed) Slider** by adjusting `playbackRate`.

### 3. Smart TTS Fallback & UI Status
- If either built syllable is not present in the dictionary (e.g., custom nonsense combinations), it falls back to the Mandarin homophones TTS engine for consistent playback of the entire phrase.
- We added a **Voice Engine Status Badge** in the UI to indicate whether the user is hearing the authentic Ministry of Education voice (`🔊 MoE Audio`) or the phonetic fallback (`🔊 TTS Fallback`).

### 4. Expanded Syllables Dropdown
- We expanded the Rhyme selector list to cover **every single rhyme** present in the dictionary, including nasalized rhymes (`iaⁿ`, `iuⁿ`, `aiⁿ`, `uaiⁿ`), entering nasalized rhymes (`aⁿh`, `eⁿh`, `iaⁿh`), and entering vowel codas (`aih`, `auh`, `iauh`, `ioh`, `ooh`, `ueh`, `uih`, `iuh`, `mh`, `ngh`).

## Verification Plan

### Manual Verification
- Open the updated `lmj tone sandhi tool.html` in a web browser.
- Select `k` + `iaⁿ` (Tone 1) + `lâng` (Tone 5) and verify it plays **real Taiwanese recordings** (which sounds like `kiāⁿ-lâng` with the sandhi tone).
- Confirm the status badge displays `🔊 MoE Audio (教育部真人口音)`.
- Select a nonsense syllable (e.g., `ts` + `uaiⁿ` + Tone 2) and verify it falls back cleanly to the Mandarin TTS engine with the status badge changing to `🔊 TTS Fallback (華語音似備援)`.
- Change the Speech Rate slider and verify that the audio playback rate is updated.

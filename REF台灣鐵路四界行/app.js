// ==========================================
// 1. 全台環島鐵路車站資料庫 (All Taiwan Cities)
// ==========================================
const stations = [
    { id: "keelung", nameZH: "基隆", nameEN: "Keelung", poj: "Kî-liông", cx: 200, cy: 50, dist: 0, stamp: "⚓" },
    { id: "taipei", nameZH: "台北", nameEN: "Taipei", poj: "Tâi-pak", cx: 165, cy: 68, dist: 28, stamp: "🏢" },
    { id: "taoyuan", nameZH: "桃園", nameEN: "Taoyuan", poj: "Thô-hn̂g", cx: 130, cy: 82, dist: 57, stamp: "✈️" },
    { id: "hsinchu", nameZH: "新竹", nameEN: "Hsinchu", poj: "Sin-tek", cx: 95, cy: 110, dist: 106, stamp: "🔬" },
    { id: "miaoli", nameZH: "苗栗", nameEN: "Miaoli", poj: "Biâu-le̍k", cx: 80, cy: 150, dist: 154, stamp: "🍓" },
    { id: "taichung", nameZH: "台中", nameEN: "Taichung", poj: "Tâi-tiong", cx: 85, cy: 200, dist: 193, stamp: "⛲" },
    { id: "changhua", nameZH: "彰化", nameEN: "Changhua", poj: "Chiong-hoà", cx: 75, cy: 235, dist: 210, stamp: "🪷" },
    { id: "chiayi", nameZH: "嘉義", nameEN: "Chiayi", poj: "Ka-gī", cx: 70, cy: 295, dist: 291, stamp: "🪵" },
    { id: "tainan", nameZH: "台南", nameEN: "Tainan", poj: "Tâi-lâm", cx: 65, cy: 350, dist: 352, stamp: "🏯" },
    { id: "kaohsiung", nameZH: "高雄", nameEN: "Kaohsiung", poj: "Ko-hiông", cx: 78, cy: 400, dist: 399, stamp: "🚢" },
    { id: "pingtung", nameZH: "屏東", nameEN: "Pingtung", poj: "Pîn-tong", cx: 98, cy: 438, dist: 420, stamp: "🍍" },
    { id: "taitung", nameZH: "台東", nameEN: "Taitung", poj: "Tâi-tang", cx: 180, cy: 360, dist: 580, stamp: "🎈" },
    { id: "hualien", nameZH: "花蓮", nameEN: "Hualien", poj: "Hoa-liân", cx: 205, cy: 220, dist: 730, stamp: "⛰️" },
    { id: "yilan", nameZH: "宜蘭", nameEN: "Yilan", poj: "Gî-lân", cx: 200, cy: 105, dist: 810, stamp: "🥣" }
];

const totalCircumference = 870; // 宜蘭到基隆 60km，總長 870km

// ==========================================
// 2. 交通台語詞彙庫 (漢字與台羅拼音對照)
// ==========================================
const vocabData = [
    { zh: "火車", tw: "hoé-chhia", en: "Train", emoji: " Train 🚄", type: "vehicles" },
    { zh: "捷運", tw: "chia̍t-ūn", en: "MRT/Metro", emoji: " Metro 🚇", type: "vehicles" },
    { zh: "公車", tw: "kong-chhia", en: "Bus", emoji: " Bus 🚌", type: "vehicles" },
    { zh: "飛機", tw: "poe-ki", en: "Airplane", emoji: " Plane ✈️", type: "vehicles" },
    { zh: "鐵馬", tw: "thih-bé", en: "Bicycle", emoji: " Bike 🚲", type: "vehicles" },
    { zh: "船", tw: "chûn", en: "Ship/Boat", emoji: " Ship 🚢", type: "vehicles" },
    { zh: "計程車", tw: "kè-thêng-chhia", en: "Taxi", emoji: " Taxi 🚕", type: "vehicles" },
    { zh: "高鐵", tw: "ko-thih", en: "HSR", emoji: " Bullet 🚅", type: "vehicles" },
    { zh: "月台", tw: "gue̍h-tâi", en: "Platform", emoji: " Platform 🚉", type: "stations" },
    { zh: "火車頭", tw: "hoé-chhia-thâu", en: "Station", emoji: " Station 🏠", type: "stations" },
    { zh: "票口", tw: "phiò-khó͘", en: "Ticket Gate", emoji: " Gate 🎟️", type: "stations" },
    { zh: "車廂", tw: "chhia-siang", en: "carriage", emoji: " Carriage 🚃", type: "stations" },
    { zh: "車票", tw: "chhia-phiò", en: "Ticket", emoji: " Ticket 🎫", type: "stations" },
    { zh: "司機", tw: "su-ki", en: "Driver", emoji: " Driver 🧑‍✈️", type: "stations" },
    { zh: "售票機", tw: "siū-phiò-ki", en: "Ticket Machine", emoji: " Machine 🤖", type: "stations" },
    { zh: "鐵路", tw: "thih-lōo", en: "Railway", emoji: " Rail 🛤️", type: "stations" }
];

// ==========================================
// 3. 語音對照字典與同音字 (本地離線備援使用)
// ==========================================
const twHomophones = {
    // 站點
    "基隆": "給龍", "台北": "台八", "桃園": "逃橫", "新竹": "心ㄉㄟ",
    "苗栗": "苗列", "台中": "台中心", "彰化": "江華", "嘉義": "尬意",
    "台南": "台南", "高雄": "勾雄", "屏東": "屏東", "台東": "台東",
    "花蓮": "花連", "宜蘭": "宜蘭",
    // 詞彙
    "火車": "毀車", "捷運": "基溫", "公車": "公車", "飛機": "杯機",
    "鐵馬": "鐵杯", "船": "寸", "計程車": "給聽車", "高鐵": "高鐵",
    "月台": "月台", "火車頭": "毀車頭", "票口": "標口", "車廂": "車相",
    "車票": "車標", "司機": "司機", "售票機": "休標基", "鐵路": "鐵路",
    // 票券/乘車資訊
    "區間車": "區間車", "自強號": "自強號", "一張": "基張", "兩張": "冷張",
    "三張": "三張", "四張": "細張", "五張": "奧張", "六張": "拉張",
    "七張": "七張", "八張": "北張", "九張": "告張", "十張": "雜張",
    "票": "標", "箍": "科", "元": "科", "攏總": "龍總", "一共": "龍總", "去": "去", "出發": "七滑",
    "開": "虧", "開車": "虧車", "候車": "好車",
    // 時間/數字
    "早起": "載起", "早起時": "載起西", "早上": "載起", "下晡": "誒撥", "下午": "誒撥", "暗時": "暗喜", "晚上": "暗喜", 
    "第一": "碟伊", "第二": "碟利", "第三": "碟衫", "第四": "碟細",
    "點半": "點半", "半": "半", "點": "點", "分": "昏", "小時": "點鐘", "分鐘": "昏晶",
    "兩": "兩", "二": "吉", "三": "衫", "四": "細", "五": "喔", "六": "辣",
    "七": "七", "八": "北", "九": "狗", "十": "雜", "百": "百", "千": "千",
    "五十": "奧雜", "一百": "基百", "兩百": "冷百", "三百": "三百", "四百": "四百",
    "五百": "奧百", "六百": "辣百", "七百": "七百", "八百": "北百", "九百": "告百",
    "十分": "雜昏", "十五分": "雜奧昏", "二十分": "吉雜昏", "三分": "三雜昏",
    "四十分": "細雜昏", "四十五分": "細雜奧昏", "五十分": "奧雜昏",
    // 答題反饋
    "著矣": "丟啊", "毋著喔": "嗯丟喔", "答對了": "丟啊", "答錯了": "嗯丟喔"
};

// ==========================================
// 4. UI 雙語字典
// ==========================================
const uiStrings = {
    ZH: {
        title: "台灣鐵路四界行", subtitle: "歡喜學台語 / Fun Taiwanese Railway Adventure",
        tabAdventure: "購票大冒險", tabVocab: "交通詞彙牆", tabTime: "時間鐘點師", tabQuiz: "台語大檢定", tabStamps: "我的集章冊",
        boothTitle: "售票亭 Ticket Booth", labelFrom: "起點站 From:", labelTo: "終點站 To:",
        labelClass: "火車種類 Class:", labelPassengers: "張數 Tickets:", labelDepTime: "發車時間 Departure:",
        infoDirection: "行車方向 Direction:", infoDuration: "乘車時間 Duration:",
        infoCost: "總票價 Total Cost:", infoPlatform: "候車月台 Platform:",
        btnPlayJourney: "播放台語購票語音", mapTitle: "環島鐵道路線圖 Map",
        vocabTitle: "交通台語詞彙牆 Vocabulary", clockTitle: "撥撥看時鐘 Clock Trainer",
        timeLearnTitle: "時間台語發音教室", labelAdjustTime: "微調時間 Adjust Time:", labelPresetTime: "常見火車發車時間 Presets:",
        btnPlayClock: "播放台語時間發音", quizTitle: "台語大檢定 Challenge Mode",
        quizWelcomeTitle: "準備接受台語大挑戰了嗎？",
        quizWelcomeDesc: "我們提供兩大交通檢定關卡！點選按鈕後將隨機播放 10 題台語語音，在時限內選出正確答案。答對 8 題以上即可解鎖該城市的精美火車紀念印章喔！",
        quizSellerName: "售票員聽力挑戰", quizTimeName: "發車時刻聽力挑戰",
        btnRetry: "返回檢定選單", stampsTitle: "我的鐵道集章冊 Stamp Album",
        stampsDesc: "在「台語大檢定」中答對 8 題以上即可隨機獲得一個城市的限定紀念章。收集越多，代表你已經搭著火車玩遍了全台灣！",
        clockwise: "順時針方向 ➡️", counterclockwise: "逆時針方向 ⬅️", sameStation: "同站出發 🚉",
        platformNum: "第 {0} 月台", ticketCount: "{0} 張", priceUnit: "{0} 元",
        hours: "{0} 小時", mins: "{0} 分鐘", durationFormat: "{0}小時 {1}分鐘",
        langBtnText: "Language: 台語"
    },
    EN: {
        title: "Taiwan Railway Tour", subtitle: "歡喜學台語 / Fun Taiwanese Railway Adventure",
        tabAdventure: "Ticket Adventure", tabVocab: "Vocab Wall", tabTime: "Time Trainer", tabQuiz: "Quiz Challenge", tabStamps: "Stamp Album",
        boothTitle: "Ticket Booth", labelFrom: "Origin:", labelTo: "Destination:",
        labelClass: "Train Class:", labelPassengers: "Tickets:", labelDepTime: "Departure Time:",
        infoDirection: "Direction:", infoDuration: "Travel Duration:",
        infoCost: "Total Fare:", infoPlatform: "Platform:",
        btnPlayJourney: "Play Voice (Taiwanese)", mapTitle: "Railway Map",
        vocabTitle: "Transport Vocab Wall", clockTitle: "Interactive Clock",
        timeLearnTitle: "Time Pronunciation Class", labelAdjustTime: "Adjust Time:", labelPresetTime: "Train Departure Presets:",
        btnPlayClock: "Play Clock Voice", quizTitle: "Taiwanese Quiz Challenge",
        quizWelcomeTitle: "Ready for the Taiwanese Challenge?",
        quizWelcomeDesc: "Choose a challenge! We have 2 listening quizzes. Listen to 10 Taiwanese audio clips and choose the correct answer under the timer. Score 8+ to unlock a beautiful commemorative train stamp!",
        quizSellerName: "Ticket Seller Quiz", quizTimeName: "Departure Time Quiz",
        btnRetry: "Back to Menu", stampsTitle: "My Stamp Album",
        stampsDesc: "Score 8+ in any quiz challenge to collect a commemorative city station stamp. Collect them all to complete your island journey!",
        clockwise: "Clockwise ➡️", counterclockwise: "Counter-Clockwise ⬅️", sameStation: "Same Station 🚉",
        platformNum: "Platform {0}", ticketCount: "{0} Ticket(s)", priceUnit: "NT$ {0}",
        hours: "{0} hr", mins: "{0} min", durationFormat: "{0}h {1}m",
        langBtnText: "Language: English"
    }
};

// ==========================================
// 5. 狀態變數 (App State)
// ==========================================
let currentLang = "ZH";
let passengers = 1;
let selectedTab = "adventure";
let clockHour = 15;
let clockMinute = 30;
let speechRate = 1.0;

// Quiz State
let quizType = "seller"; // 'seller' or 'time'
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizScore = 0;
let quizTimeLeft = 20;
let quizTimerInterval = null;
let currentCorrectAnswer = null;
let quizHasAnswered = false;

// Audio States
let activeAudio = null;
let voiceEngineMode = "google"; // "google" or "local"

// ==========================================
// 6. 初始化 (On Load)
// ==========================================
window.onload = () => {
    // 載入 localStorage 設定
    if (localStorage.getItem("app_lang")) {
        currentLang = localStorage.getItem("app_lang");
    }
    if (localStorage.getItem("app_theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector("#theme-toggle-btn i").className = "fa-solid fa-sun";
    }
    if (localStorage.getItem("app_speech_rate")) {
        speechRate = parseFloat(localStorage.getItem("app_speech_rate"));
        const rateSlider = document.getElementById("speech-rate");
        if (rateSlider) {
            rateSlider.value = speechRate;
            document.getElementById("speech-rate-label").textContent = `${speechRate.toFixed(1)}x`;
        }
    }

    populateDropdowns();
    renderTaiwanMap();
    renderVocabWall();
    renderStampsAlbum();
    updateClockHands();
    updateClockReadout();
    updateUI();
    
    // 初始化路程計算
    calculateJourney();
    
    // 設置時鐘拖動事件 (Pointer Events)
    setupClockDragging();
    
    // 動態綁定所有交互事件（解決 WordPress/Blogger 等平台的屬性過濾問題）
    bindDynamicEvents();
};

// ==========================================
// 7. 介面渲染與操作
// ==========================================
function populateDropdowns() {
    const startSelect = document.getElementById("start-station");
    const endSelect = document.getElementById("end-station");
    
    startSelect.innerHTML = "";
    endSelect.innerHTML = "";

    stations.forEach((station, idx) => {
        let opt1 = document.createElement("option");
        let opt2 = document.createElement("option");
        opt1.value = opt2.value = station.id;
        
        const label = `${station.nameZH} (${station.poj} / ${station.nameEN})`;
        opt1.textContent = opt2.textContent = label;
        
        startSelect.appendChild(opt1);
        endSelect.appendChild(opt2);
    });
    
    // 預設起點：台北，終點：高雄
    startSelect.selectedIndex = 1; // Taipei
    endSelect.selectedIndex = 9;   // Kaohsiung
}

// 渲染環島鐵路地圖 SVG
function renderTaiwanMap() {
    const railTrack = document.getElementById("svg-rail-track");
    const railTrackDashed = document.getElementById("svg-rail-track-dashed");
    const stationsGroup = document.getElementById("svg-stations-group");
    
    // 產生環島鐵路軌道路徑 (閉合環線 SVG Path)
    let dPath = `M ${stations[0].cx} ${stations[0].cy}`;
    for (let i = 1; i < stations.length; i++) {
        dPath += ` L ${stations[i].cx} ${stations[i].cy}`;
    }
    dPath += " Z"; // 閉合回基隆
    
    railTrack.setAttribute("d", dPath);
    railTrackDashed.setAttribute("d", dPath);
    
    // 清空站點 DOM 並重繪
    stationsGroup.innerHTML = "";
    stations.forEach(st => {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("class", "station-point");
        group.setAttribute("id", `svg-node-${st.id}`);
        group.onclick = () => {
            // 點選地圖站點直接播放該城市台語發音 (傳入 POJ 使其唸出完美台語)
            playTaigiTTS(st.nameZH, st.poj);
            highlightNode(st.id);
        };
        
        // 畫小圓點
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", st.cx);
        circle.setAttribute("cy", st.cy);
        circle.setAttribute("r", "6");
        
        // 標記站名
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", st.cx + (st.cx > 150 ? 12 : -12));
        text.setAttribute("y", st.cy + 4);
        text.setAttribute("text-anchor", st.cx > 150 ? "start" : "end");
        text.textContent = st.nameZH;
        
        group.appendChild(circle);
        group.appendChild(text);
        stationsGroup.appendChild(group);
    });
}

function highlightNode(stationId) {
    stations.forEach(st => {
        const el = document.getElementById(`svg-node-${st.id}`);
        if (el) el.classList.remove("active");
    });
    const activeEl = document.getElementById(`svg-node-${stationId}`);
    if (activeEl) activeEl.classList.add("active");
}

// 渲染詞彙學堂
function renderVocabWall() {
    const vocabContainer = document.getElementById("vocab-container");
    vocabContainer.innerHTML = "";
    
    vocabData.forEach(item => {
        const card = document.createElement("div");
        card.className = "vocab-card";
        card.setAttribute("data-type", item.type);
        card.onclick = () => playTaigiTTS(item.zh, item.tw);
        
        card.innerHTML = `
            <span class="vocab-emoji">${item.emoji.split(' ')[1]}</span>
            <div class="vocab-zh">${item.zh}</div>
            <div class="vocab-pinyin">${item.tw}</div>
            <div class="vocab-en">${item.en}</div>
        `;
        vocabContainer.appendChild(card);
    });
}

function filterVocab(type) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    
    if (type === 'all') {
        document.getElementById("btn-filter-all").classList.add("active");
        document.querySelectorAll(".vocab-card").forEach(card => card.style.display = "block");
    } else {
        document.getElementById(`btn-filter-${type}`).classList.add("active");
        document.querySelectorAll(".vocab-card").forEach(card => {
            if (card.getAttribute("data-type") === type) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
}

// 變更張數
function changePassengers(amount) {
    passengers += amount;
    if (passengers < 1) passengers = 1;
    if (passengers > 10) passengers = 10;
    
    document.getElementById("passenger-count").textContent = passengers;
    calculateJourney();
}

// ==========================================
// 8. 購票路程計算邏輯 (順逆時針環島計算)
// ==========================================
function calculateJourney() {
    const startId = document.getElementById("start-station").value;
    const endId = document.getElementById("end-station").value;
    
    const startIndex = stations.findIndex(s => s.id === startId);
    const endIndex = stations.findIndex(s => s.id === endId);
    
    const startStation = stations[startIndex];
    const endStation = stations[endIndex];
    
    // 地圖節點樣式重置
    stations.forEach(s => {
        const el = document.getElementById(`svg-node-${s.id}`);
        if (el) el.classList.remove("active", "in-route");
    });
    
    // 高亮起迄點
    const startNode = document.getElementById(`svg-node-${startId}`);
    const endNode = document.getElementById(`svg-node-${endId}`);
    if (startNode) startNode.classList.add("active");
    if (endNode) endNode.classList.add("active");

    const t = uiStrings[currentLang];
    
    if (startId === endId) {
        document.getElementById("info-direction").textContent = t.sameStation;
        document.getElementById("info-duration").textContent = "0 mins";
        document.getElementById("info-cost").textContent = "NT$ 0";
        document.getElementById("info-platform").textContent = "-";
        document.getElementById("play-journey-btn").disabled = true;
        document.getElementById("journey-sentence-box").classList.remove("active");
        
        // 隱藏火車標誌
        document.getElementById("train-marker").classList.remove("active");
        
        // 移除高亮路徑 SVG
        document.getElementById("svg-rail-active-path").setAttribute("d", "");
        return;
    }
    
    // 計算雙向最短路徑
    const n = stations.length;
    
    // 1. 順時針 (Clockwise)
    let cwPath = [];
    let cwDist = 0;
    let currIdx = startIndex;
    while (currIdx !== endIndex) {
        let nextIdx = (currIdx + 1) % n;
        let d = (stations[nextIdx].dist - stations[currIdx].dist + totalCircumference) % totalCircumference;
        cwDist += d;
        cwPath.push(stations[currIdx]);
        currIdx = nextIdx;
    }
    cwPath.push(stations[endIndex]);
    
    // 2. 逆時針 (Counter-Clockwise)
    let ccwPath = [];
    let ccwDist = 0;
    currIdx = startIndex;
    while (currIdx !== endIndex) {
        let prevIdx = (currIdx - 1 + n) % n;
        let d = (stations[currIdx].dist - stations[prevIdx].dist + totalCircumference) % totalCircumference;
        ccwDist += d;
        ccwPath.push(stations[currIdx]);
        currIdx = prevIdx;
    }
    ccwPath.push(stations[endIndex]);
    
    let chosenRoute = [];
    let distance = 0;
    let dirText = "";
    
    if (cwDist <= ccwDist) {
        chosenRoute = cwPath;
        distance = cwDist;
        dirText = t.clockwise;
    } else {
        chosenRoute = ccwPath;
        distance = ccwDist;
        dirText = t.counterclockwise;
    }
    
    // 高亮中途站點
    for (let i = 1; i < chosenRoute.length - 1; i++) {
        const midNode = document.getElementById(`svg-node-${chosenRoute[i].id}`);
        if (midNode) midNode.classList.add("in-route");
    }
    
    // 繪製高亮 SVG 軌道線
    let activeD = `M ${chosenRoute[0].cx} ${chosenRoute[0].cy}`;
    for (let i = 1; i < chosenRoute.length; i++) {
        activeD += ` L ${chosenRoute[i].cx} ${chosenRoute[i].cy}`;
    }
    const activePath = document.getElementById("svg-rail-active-path");
    activePath.setAttribute("d", "");
    setTimeout(() => {
        activePath.setAttribute("d", activeD);
    }, 10);
    
    // 模擬計算車資與時間
    const trainClass = document.getElementById("train-class").value;
    const rate = trainClass === "express" ? 3.5 : 2.0;
    const cost = Math.round(distance * rate * passengers);
    
    const speed = trainClass === "express" ? 1.5 : 1.0;
    const durationMinutes = Math.round(distance / speed);
    const durationHrs = Math.floor(durationMinutes / 60);
    const durationMins = durationMinutes % 60;
    
    const platformNum = (startIndex % 4) + 1;
    
    // 更新網頁欄位
    document.getElementById("info-direction").textContent = dirText;
    
    const durationStr = durationHrs > 0 
        ? t.durationFormat.replace("{0}", durationHrs).replace("{1}", durationMins)
        : t.mins.replace("{0}", durationMins);
    document.getElementById("info-duration").textContent = durationStr;
    document.getElementById("info-cost").textContent = t.priceUnit.replace("{0}", cost);
    document.getElementById("info-platform").textContent = t.platformNum.replace("{0}", platformNum);
    
    document.getElementById("play-journey-btn").disabled = false;
    
    animateTrainOnMap(chosenRoute);
}

// 讓火車在 SVG 地圖上循序移動
function animateTrainOnMap(route) {
    const train = document.getElementById("train-marker");
    train.classList.add("active");
    
    let currentStop = 0;
    
    function moveNext() {
        if (currentStop >= route.length) return;
        const targetSt = route[currentStop];
        train.style.left = `${(targetSt.cx / 320) * 100}%`;
        train.style.top = `${(targetSt.cy / 500) * 100}%`;
        
        currentStop++;
        setTimeout(moveNext, 450);
    }
    
    moveNext();
}

// ==========================================
// 9. 語音朗讀合成模組 (Speech Synthesis)
// ==========================================
// Audio States
let activeQueueAudio = null;

const taigiAudioMap = {
    // 站名
    "基隆": "20752(1)",
    "台北": "20637(1)",
    "臺北": "20637(1)",
    "桃園": "20643(1)",
    "新竹": "20652(1)",
    "苗栗": "20658(1)",
    "台中": "20666(1)",
    "臺中": "20666(1)",
    "彰化": "20670(1)",
    "嘉義": "20684(1)",
    "台南": "20696(1)",
    "臺南": "20696(1)",
    "高雄": "20705(1)",
    "屏東": "20731(1)",
    "台東": "20818(1)",
    "臺東": "20818(1)",
    "花蓮": "20790(1)",
    "宜蘭": "20770(1)",
    
    // 數字
    "一_quantity": "1(1)", // tsi̍t (一張, 一箍)
    "一_digit": "2(1)",    // it (第一, 十一)
    "二": "44(1)",
    "三": "163(1)",
    "四": "1408(1)",
    "五": "565(1)",
    "六": "578(1)",
    "七": "40(1)",
    "八": "49(1)",
    "九": "41(1)",
    "十": "54(1)",
    "兩": "3584(1)",      // nn̄g
    "百": "2585(1)",      // pah
    "千": "180(1)",       // tshian
    
    // 時間與單位
    "早起": "2517(1)",
    "下晡": "432(1)",
    "暗時": "9598(1)",
    "點": "12451(1)",
    "半": "1387(1)",
    "分": "584(1)",
    "點鐘": "12472(1)",
    "分鐘": "768(1)",
    "箍": "10682(1)",     // 元
    
    // 詞彙
    "火車": "1242(1)",
    "捷運": "7397(1)",
    "公車": "23445(1)",
    "鐵馬": "13148(1)",
    "船": "7784(1)",
    "計程車": "5537(1)",
    "高鐵": "24834(1)",
    "月台": "24426(1)",
    "火車頭": "13946(1)",
    "車廂": "23725(1)",
    "車票": "3459(1)",
    "司機": "1608(1)",
    "鐵路": "24177(1)",
    "飛行機": "5591(1)",
    "口": "183(1)",
    "賣": "11390(1)",
    "票": "7683(1)",
    "自強": "2721(1)",
    "號": "9978(1)",
    "區間": "25732(1)",
    "車": "3394(1)",
    
    // 銜接與文法
    "我": "3139(1)",
    "欲": "7469(1)",
    "去": "1395(1)",
    "買": "9037(1)",
    "張": "7179(1)",
    "開車": "9170(1)",
    "攏總": "12790(1)",
    "佇": "2858(1)",
    "第": "7691(1)",
    "第一": "7693(1)",
    "等": "8817(1)",
    
    // 回饋
    "著": "8981(1)",
    "矣": "3336(1)",
    "毋著": "1089(1)",
    "喔": "8172(1)",
    "對": "10442(1)",
    "同": "2115(1)"
};

// 數字轉實體音檔陣列
function numberToAudioSegments(num, isQuantity = false) {
    let segments = [];
    
    // 千位
    if (num >= 1000) {
        const thousands = Math.floor(num / 1000);
        if (thousands === 1) {
            segments.push(taigiAudioMap["一_digit"]);
        } else if (thousands === 2) {
            segments.push(taigiAudioMap["兩"]);
        } else {
            segments.push(taigiAudioMap[numberToKanjiDigit(thousands)]);
        }
        segments.push(taigiAudioMap["千"]);
        num %= 1000;
    }
    
    // 百位
    if (num >= 100) {
        const h = Math.floor(num / 100);
        if (h === 1) {
            segments.push(taigiAudioMap["一_digit"]);
        } else if (h === 2) {
            segments.push(taigiAudioMap["兩"]);
        } else {
            segments.push(taigiAudioMap[numberToKanjiDigit(h)]);
        }
        segments.push(taigiAudioMap["百"]);
        num %= 100;
    }
    
    // 十位與個位
    if (num > 0) {
        if (num < 10) {
            if (num === 2 && isQuantity) {
                segments.push(taigiAudioMap["兩"]);
            } else if (num === 1 && isQuantity) {
                segments.push(taigiAudioMap["一_quantity"]);
            } else {
                segments.push(taigiAudioMap[numberToKanjiDigit(num)]);
            }
        } else if (num === 10) {
            segments.push(taigiAudioMap["十"]);
        } else if (num < 20) {
            segments.push(taigiAudioMap["十"]);
            segments.push(taigiAudioMap[numberToKanjiDigit(num % 10)]);
        } else {
            const tens = Math.floor(num / 10);
            const units = num % 10;
            segments.push(taigiAudioMap[numberToKanjiDigit(tens)]);
            segments.push(taigiAudioMap["十"]);
            if (units > 0) {
                if (units === 1) {
                    segments.push(taigiAudioMap["一_digit"]);
                } else {
                    segments.push(taigiAudioMap[numberToKanjiDigit(units)]);
                }
            }
        }
    }
    
    return segments;
}

function numberToKanjiDigit(digit) {
    const map = {
        1: "一_digit",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九"
    };
    return map[digit] || "";
}

// 時間轉實體音檔陣列
function timeToAudioSegments(timeStr) {
    const parts = timeStr.split(":");
    const hour = parseInt(parts[0]);
    const min = parseInt(parts[1]);
    
    let segments = [];
    
    // 時間段
    let periodKey = "早起";
    let displayHour = hour;
    if (hour >= 12 && hour < 18) {
        periodKey = "下晡";
        displayHour = hour === 12 ? 12 : hour - 12;
    } else if (hour >= 18) {
        periodKey = "暗時";
        displayHour = hour === 12 ? 12 : hour - 12;
    } else if (hour === 0) {
        displayHour = 12;
    }
    
    segments.push(taigiAudioMap[periodKey]);
    
    // 小時
    if (displayHour === 2) {
        segments.push(taigiAudioMap["兩"]);
    } else {
        segments.push(taigiAudioMap[numberToKanjiDigit(displayHour)]);
    }
    segments.push(taigiAudioMap["點"]);
    
    // 分鐘
    if (min === 30) {
        segments.push(taigiAudioMap["半"]);
    } else if (min > 0) {
        segments = segments.concat(numberToAudioSegments(min, false));
        segments.push(taigiAudioMap["分"]);
    }
    
    return segments;
}

// 音訊佇列非同步播放器
let queueCancelToken = 0;
function playAudioQueue(audioIds, fallbackText) {
    queueCancelToken++;
    const token = queueCancelToken;

    if (activeAudio) { activeAudio.pause(); activeAudio = null; }
    if (activeQueueAudio) { activeQueueAudio.pause(); activeQueueAudio = null; }
    if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }

    const speed = speechRate;
    const cleanIds = audioIds.filter(id => id);
    
    if (cleanIds.length === 0) {
        playOfflineVoiceFallback(fallbackText);
        return;
    }

    updateBadge("google");
    
    let index = 0;
    
    function playNext() {
        if (token !== queueCancelToken) return;
        if (index >= cleanIds.length) return;
        
        const id = cleanIds[index];
        const cdnUrl = `https://chhoetaigi.github.io/KipSutianDataMirror/public/20260503-2330/imtong/sutiau/${id}.mp3`;
        
        const audio = new Audio(cdnUrl);
        activeQueueAudio = audio;
        audio.playbackRate = speed;
        
        audio.onended = () => {
            if (token !== queueCancelToken) return;
            index++;
            playNext();
        };
        
        audio.onerror = (e) => {
            console.warn(`Audio playback error for ID ${id}, fallback to Web Speech...`, e);
            if (token !== queueCancelToken) return;
            playOfflineVoiceFallback(fallbackText);
        };
        
        audio.play().catch(err => {
            console.warn(`Audio play failed for ID ${id}, fallback to Web Speech...`, err);
            if (token !== queueCancelToken) return;
            playOfflineVoiceFallback(fallbackText);
        });
    }
    
    playNext();
}

function playTaigiTTS(phraseText, audioIds) {
    let ids = [];
    if (Array.isArray(audioIds)) {
        ids = audioIds;
    } else if (typeof audioIds === 'string') {
        const cleanPhrase = phraseText.replace(/[【】]/g, '');
        if (cleanPhrase === "票口") {
            ids = [taigiAudioMap["票"], taigiAudioMap["口"]];
        } else if (cleanPhrase === "售票機") {
            ids = [taigiAudioMap["賣"], taigiAudioMap["票"]];
        } else if (cleanPhrase === "飛機") {
            ids = [taigiAudioMap["飛行機"]];
        } else if (cleanPhrase === "著矣") {
            ids = [taigiAudioMap["著"], taigiAudioMap["矣"]];
        } else if (cleanPhrase === "毋著喔") {
            ids = [taigiAudioMap["毋著"], taigiAudioMap["喔"]];
        } else {
            const mappedId = taigiAudioMap[cleanPhrase];
            if (mappedId) {
                ids = [mappedId];
            }
        }
    }
    
    if (ids.length > 0) {
        playAudioQueue(ids, phraseText);
    } else {
        playOfflineVoiceFallback(phraseText);
    }
}

function playOfflineVoiceFallback(text) {
    if (!('speechSynthesis' in window)) return;
    
    updateBadge("local");
    
    // 同音字轉換
    let phoneticText = text;
    const sortedKeys = Object.keys(twHomophones).sort((a, b) => b.length - a.length);
    sortedKeys.forEach(key => {
        phoneticText = phoneticText.replace(new RegExp(key, 'g'), twHomophones[key]);
    });
    
    console.log(`Speech synthesis translation: "${text}" -> "${phoneticText}"`);
    
    const utterance = new SpeechSynthesisUtterance(phoneticText);
    utterance.lang = "zh-TW"; // 使用繁體中文引擎
    utterance.rate = speechRate;
    
    const voices = window.speechSynthesis.getVoices();
    const twVoice = voices.find(v => v.lang.includes("zh-TW"));
    if (twVoice) utterance.voice = twVoice;
    
    window.speechSynthesis.speak(utterance);
}

function updateBadge(mode) {
    const badge = document.getElementById("speech-engine-badge");
    if (!badge) return;
    if (mode === "google") {
        badge.innerText = "🔊 實體台語 (教育部)";
        badge.className = "speech-badge badge-google";
    } else {
        badge.innerText = "🔊 本地合成 (擬真備援)";
        badge.className = "speech-badge badge-local";
    }
}

// 數字台語讀音轉換庫
const digitsZH = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const digitsPOJ = ["lîng", "chi̍t", "jī/nn̄g", "sann", "sì", "gōo", "la̍k", "tshit", "peh", "káu", "tsa̍p"];

// 將數字轉換成台語漢字字串
function numberToTaigiText(num) {
    if (num === 0) return "零";
    if (num <= 10) return num === 2 ? "兩" : digitsZH[num];
    if (num < 20) {
        const units = num % 10;
        return "十" + (units > 0 ? (units === 2 ? "二" : digitsZH[units]) : "");
    }
    const tens = Math.floor(num / 10);
    const units = num % 10;
    let result = (tens === 2 ? "兩" : digitsZH[tens]) + "十";
    if (units > 0) {
        result += (units === 2 ? "二" : digitsZH[units]);
    }
    return result;
}

// 將數字轉換成台羅拼音 (POJ)
function numberToTaigiPOJ(num, isQuantity = false) {
    const pojDigits = ["lîng", "chi̍t", "jī", "sann", "sì", "gōo", "la̍k", "tshit", "peh", "káu", "tsa̍p"];
    if (num === 0) return "lîng";
    if (num <= 10) {
        if (num === 2 && isQuantity) return "nn̄g";
        return pojDigits[num];
    }
    if (num < 20) {
        const units = num % 10;
        return "tsa̍p" + (units > 0 ? "-" + (units === 2 ? "jī" : pojDigits[units]) : "");
    }
    const tens = Math.floor(num / 10);
    const units = num % 10;
    let result = (tens === 2 ? "jī" : pojDigits[tens]) + "-tsa̍p";
    if (units > 0) {
        result += "-" + (units === 2 ? "jī" : pojDigits[units]);
    }
    return result;
}

// 序數第一到第十讀法 (例如月台、車廂)
function ordinalToTaigiText(num) {
    const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    return "第" + digits[num];
}

// 價格台語漢字金額讀法
function costToTaigiText(cost) {
    if (cost === 0) return "零箍";
    if (cost < 100) return numberToTaigiText(cost) + "箍";
    
    let result = "";
    let tempCost = cost;
    
    if (tempCost >= 1000) {
        const thousands = Math.floor(tempCost / 1000);
        result += (thousands === 2 ? "兩" : digitsZH[thousands]) + "千";
        tempCost = tempCost % 1000;
        if (tempCost > 0 && tempCost < 100) {
            result += "零";
        }
    }
    if (tempCost >= 100) {
        const hundreds = Math.floor(tempCost / 100);
        result += (hundreds === 2 ? "兩" : digitsZH[hundreds]) + "百";
        tempCost = tempCost % 100;
        if (tempCost > 0 && tempCost < 10) {
            result += "零";
        }
    }
    if (tempCost > 0) {
        result += numberToTaigiText(tempCost);
    }
    return result + "箍";
}

// 價格台羅拼音 (POJ) 金額讀法
function costToTaigiPOJ(cost) {
    if (cost === 0) return "lîng kho͘";
    
    const pojDigitsList = ["lîng", "chi̍t", "jī", "sann", "sì", "gōo", "la̍k", "tshit", "peh", "káu", "tsa̍p"];
    
    let parts = [];
    let tempCost = cost;
    
    if (tempCost >= 1000) {
        const thousands = Math.floor(tempCost / 1000);
        const prefix = thousands === 2 ? "nn̄g" : pojDigitsList[thousands];
        parts.push(prefix + " tsian");
        tempCost = tempCost % 1000;
        if (tempCost > 0 && tempCost < 100) {
            parts.push("lîng");
        }
    }
    
    if (tempCost >= 100) {
        const hundreds = Math.floor(tempCost / 100);
        const prefix = hundreds === 2 ? "nn̄g" : pojDigitsList[hundreds];
        parts.push(prefix + " pah");
        tempCost = tempCost % 100;
        if (tempCost > 0 && tempCost < 10) {
            parts.push("lîng");
        }
    }
    
    if (tempCost > 0) {
        parts.push(numberToTaigiPOJ(tempCost, false)); // 幾十元用 jī-tsa̍p
    }
    
    return parts.join(" ") + " kho͘";
}

// 播放購票語音句型
function playFullJourneyAudio() {
    const startId = document.getElementById("start-station").value;
    const endId = document.getElementById("end-station").value;
    const trainClass = document.getElementById("train-class").value;
    const depTimeSelect = document.getElementById("departure-time");
    const depTimeText = depTimeSelect.options[depTimeSelect.selectedIndex].text;
    
    const startStation = stations.find(s => s.id === startId);
    const endStation = stations.find(s => s.id === endId);
    
    // 計算票價
    const distance = getDistanceBetween(startId, endId);
    const rate = trainClass === "express" ? 3.5 : 2.0;
    const cost = Math.round(distance * rate * passengers);
    const platform = (stations.findIndex(s => s.id === startId) % 4) + 1;
    
    // 1. 台語漢字文稿 (用於展示)
    const trainClassZH = trainClass === "express" ? "自強號" : "區間車";
    const passengerZH = numberToTaigiText(passengers) + "張";
    const costZH = costToTaigiText(cost); // xxx箍
    
    const rawTimeZH = depTimeText.split(" ")[0]; // 早上/下午/晚上
    let periodZH = "早起";
    if (rawTimeZH === "下午") periodZH = "下晡";
    else if (rawTimeZH === "晚上") periodZH = "暗時";
    
    const hourMin = depTimeSelect.value.split(":");
    const h = parseInt(hourMin[0]);
    const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    const hourZH = (displayH === 2 ? "兩" : numberToTaigiText(displayH)) + "點";
    const minZH = hourMin[1] === "30" ? "半" : (hourMin[1] === "00" ? "" : numberToTaigiText(parseInt(hourMin[1])) + "分");
    
    const endName = endStation.nameZH === "台北" ? "臺北" : (endStation.nameZH === "台中" ? "臺中" : (endStation.nameZH === "台南" ? "臺南" : (endStation.nameZH === "台東" ? "臺東" : endStation.nameZH)));
    const taigiSpeechText = `我欲去${endName}，買${passengerZH}${trainClassZH}票，${periodZH}${hourZH}${minZH}開車，攏總${costZH}。佇${ordinalToTaigiText(platform)}月台等車。`;
    
    // 2. 產出純台語音軌 ID 陣列
    let audioSegments = [];
    audioSegments.push(taigiAudioMap["我"]);
    audioSegments.push(taigiAudioMap["欲"]);
    audioSegments.push(taigiAudioMap["去"]);
    
    // 車站名在字典中常為繁體「臺」
    const endStationAudio = taigiAudioMap[endName];
    if (endStationAudio) audioSegments.push(endStationAudio);
    
    audioSegments.push(taigiAudioMap["買"]);
    audioSegments = audioSegments.concat(numberToAudioSegments(passengers, true));
    audioSegments.push(taigiAudioMap["張"]);
    
    if (trainClass === "express") {
        audioSegments.push(taigiAudioMap["自強"]);
        audioSegments.push(taigiAudioMap["號"]);
    } else {
        audioSegments.push(taigiAudioMap["區間"]);
        audioSegments.push(taigiAudioMap["車"]);
    }
    audioSegments.push(taigiAudioMap["票"]);
    
    // 時間處理
    const m = parseInt(hourMin[1]);
    let periodHour = h;
    let periodKey = "早起";
    if (h >= 12 && h < 18) {
        periodKey = "下晡";
        periodHour = h === 12 ? 12 : h - 12;
    } else if (h >= 18) {
        periodKey = "暗時";
        periodHour = h === 12 ? 12 : h - 12;
    } else if (h === 0) {
        periodHour = 12;
    }
    audioSegments.push(taigiAudioMap[periodKey]);
    
    if (periodHour === 2) {
        audioSegments.push(taigiAudioMap["兩"]);
    } else {
        audioSegments.push(taigiAudioMap[numberToKanjiDigit(periodHour)]);
    }
    audioSegments.push(taigiAudioMap["點"]);
    
    if (m === 30) {
        audioSegments.push(taigiAudioMap["半"]);
    } else if (m > 0) {
        audioSegments = audioSegments.concat(numberToAudioSegments(m, false));
        audioSegments.push(taigiAudioMap["分"]);
    }
    
    audioSegments.push(taigiAudioMap["開車"]);
    audioSegments.push(taigiAudioMap["攏總"]);
    audioSegments = audioSegments.concat(numberToAudioSegments(cost, false));
    audioSegments.push(taigiAudioMap["箍"]);
    
    audioSegments.push(taigiAudioMap["佇"]);
    audioSegments.push(taigiAudioMap["第"]);
    audioSegments.push(taigiAudioMap[numberToKanjiDigit(platform)]);
    audioSegments.push(taigiAudioMap["月台"]);
    audioSegments.push(taigiAudioMap["等"]);
    audioSegments.push(taigiAudioMap["車"]);
    
    // 字幕對照台羅
    const trainClassPOJ = trainClass === "express" ? "tsū-kiông-hō" : "khu-kan-chhia";
    const passengerPOJ = getPassengerPOJ(passengers);
    const hStr = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    const periodPOJ = h < 12 ? "tsá-khí" : (h < 18 ? "ē-po͘" : "am-sî");
    const hourPOJStr = hStr === 2 ? "nn̄g tiám" : numberToTaigiPOJ(hStr) + " tiám";
    const minPOJStr = m === 30 ? " puàn" : (m === 0 ? "" : " " + numberToTaigiPOJ(m) + " hun");
    const pinyinBreakdown = `Ùi ${startStation.poj} kàu ${endStation.poj}, ${trainClassPOJ} ${passengerPOJ} phiò, ${periodPOJ} ${hourPOJStr}${minPOJStr} khui-chhia, lóng-chóng ${cost} khōo. tī tē-${platform} gue̍h-tâi.`;
    const mandarinZHText = `從 ${startStation.nameZH} 到 ${endStation.nameZH}，${trainClassZH}票 ${passengers} 張，${depTimeSelect.options[depTimeSelect.selectedIndex].text.split(' ')[0]} ${depTimeSelect.value} 開車，總共 ${cost} 元。請到第 ${platform} 月台候車。`;
    
    // 顯示字幕框
    const sentenceBox = document.getElementById("journey-sentence-box");
    document.getElementById("journey-sentence-zh").textContent = mandarinZHText;
    document.getElementById("journey-sentence-tw").textContent = taigiSpeechText + " \n(" + pinyinBreakdown + ")";
    sentenceBox.classList.add("active");
    
    // 播放語音：傳送音標陣列以取得 100% 精準台語
    playTaigiTTS(taigiSpeechText, audioSegments);
}

function getDistanceBetween(startId, endId) {
    const startIndex = stations.findIndex(s => s.id === startId);
    const endIndex = stations.findIndex(s => s.id === endId);
    if (startIndex === endIndex) return 0;
    
    const n = stations.length;
    let cwDist = 0;
    let curr = startIndex;
    while (curr !== endIndex) {
        let next = (curr + 1) % n;
        cwDist += (stations[next].dist - stations[curr].dist + totalCircumference) % totalCircumference;
        curr = next;
    }
    
    let ccwDist = totalCircumference - cwDist;
    return Math.min(cwDist, ccwDist);
}

function getPassengerPOJ(num) {
    const map = {
        1: "chi̍t tiunn", 2: "nn̄g tiunn", 3: "sann tiunn", 4: "sì tiunn", 5: "gōo tiunn",
        6: "la̍k tiunn", 7: "tshit tiunn", 8: "peh tiunn", 9: "káu tiunn", 10: "tsa̍p tiunn"
    };
    return map[num] || "";
}

function getTimePOJ(timeStr) {
    const parts = timeStr.split(":");
    const h = parseInt(parts[0]);
    const m = parts[1];
    let period = h < 12 ? "tsá-khí" : (h < 18 ? "ē-po͘" : "am-sî");
    let hourPoj = (h > 12 ? h - 12 : (h === 0 ? 12 : h)) === 2 ? "nn̄g tiám" : numberToTaigiPOJ(h > 12 ? h - 12 : (h === 0 ? 12 : h)) + " tiám";
    let minPoj = m === "30" ? " puàn" : (m === "00" ? "" : " " + numberToTaigiPOJ(parseInt(m)) + " hun");
    return `${period} ${hourPoj}${minPoj}`;
}

// ==========================================
// 10. 互動式時鐘與時間調整
// ==========================================
function setupClockDragging() {
    const clock = document.getElementById("interactive-clock");
    let isDragging = false;
    
    function handlePointer(e) {
        if (!isDragging && e.type === "pointermove") return;
        
        const rect = clock.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        let angleRad = Math.atan2(dy, dx);
        let angleDeg = angleRad * (180 / Math.PI) + 90;
        if (angleDeg < 0) angleDeg += 360;
        
        let mins = Math.round(angleDeg / 6) % 60;
        mins = Math.round(mins / 5) * 5 % 60;
        
        clockMinute = mins;
        
        updateClockHands();
        updateClockReadout();
    }
    
    clock.addEventListener("pointerdown", (e) => {
        isDragging = true;
        clock.setPointerCapture(e.pointerId);
        handlePointer(e);
    });
    
    clock.addEventListener("pointermove", handlePointer);
    
    const stopDrag = (e) => {
        isDragging = false;
    };
    
    clock.addEventListener("pointerup", stopDrag);
    clock.addEventListener("pointercancel", stopDrag);
}

function updateClockHands() {
    const hourHand = document.getElementById("clock-hour-hand");
    const minHand = document.getElementById("clock-min-hand");
    
    const minAngle = clockMinute * 6;
    const hourAngle = ((clockHour % 12) * 30) + (clockMinute * 0.5);
    
    hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    minHand.style.transform = `translateX(-50%) rotate(${minAngle}deg)`;
}

// 更新時鐘數位跟台語文字顯示
function updateClockReadout() {
    const formattedTime = `${clockHour.toString().padStart(2, '0')}:${clockMinute.toString().padStart(2, '0')}`;
    document.getElementById("clock-time-digital").textContent = formattedTime;
    
    // 台語口語時間轉換 (早起、下晡、暗時)
    const period = clockHour < 12 ? "早起" : (clockHour < 18 ? "下晡" : "暗時");
    const periodEN = clockHour < 12 ? "tsán-khí" : (clockHour < 18 ? "ē-po͘" : "am-sî");
    
    const displayHour = clockHour > 12 ? clockHour - 12 : (clockHour === 0 ? 12 : clockHour);
    const hourText = displayHour === 2 ? "兩點" : numberToTaigiText(displayHour) + "點";
    const hourPOJ = (displayHour === 2 ? "nn̄g" : digitsPOJ[displayHour]) + " tiám";
    
    let minText = "";
    let minPOJ = "";
    if (clockMinute === 30) {
        minText = "半";
        minPOJ = " puàn";
    } else if (clockMinute > 0) {
        minText = numberToTaigiText(clockMinute) + "分";
        minPOJ = " " + getMinutePOJ(clockMinute) + " hun";
    }
    
    const twReadout = `${period}${hourText}${minText}`;
    const twPinyin = `${periodEN} ${hourPOJ}${minPOJ}`;
    
    document.getElementById("clock-time-tw").innerHTML = `${twReadout}<br><small>${twPinyin}</small>`;
}

function getMinutePOJ(min) {
    if (min === 15) return "tsa̍p-gōo";
    if (min === 45) return "sì-tsa̍p-gōo";
    return min.toString();
}

function adjustClockTime(amount) {
    let totalMins = clockHour * 60 + clockMinute + amount;
    if (totalMins < 0) totalMins += 24 * 60;
    totalMins = totalMins % (24 * 60);
    
    clockHour = Math.floor(totalMins / 60);
    clockMinute = totalMins % 60;
    
    updateClockHands();
    updateClockReadout();
}

function setClockTime(h, m) {
    clockHour = h;
    clockMinute = m;
    updateClockHands();
    updateClockReadout();
    
    const clock = document.getElementById("interactive-clock");
    clock.classList.add("bounce-effect");
    setTimeout(() => clock.classList.remove("bounce-effect"), 600);
}

function playClockAudio() {
    const timeStr = `${clockHour.toString().padStart(2, '0')}:${clockMinute.toString().padStart(2, '0')}`;
    const timeSegments = timeToAudioSegments(timeStr);
    
    const period = clockHour < 12 ? "早起" : (clockHour < 18 ? "下晡" : "暗時");
    const displayHour = clockHour > 12 ? clockHour - 12 : (clockHour === 0 ? 12 : clockHour);
    
    const hourText = displayHour === 2 ? "兩點" : numberToTaigiText(displayHour) + "點";
    let minText = "";
    if (clockMinute === 30) {
        minText = "半";
    } else if (clockMinute > 0) {
        minText = numberToTaigiText(clockMinute) + "分";
    }
    const text = period + hourText + minText;
    
    playTaigiTTS(text, timeSegments);
}

// ==========================================
// 11. 檢定挑戰模式 (Quiz Engine)
// ==========================================
function startQuiz(type) {
    quizType = type;
    quizScore = 0;
    quizCurrentIndex = 0;
    quizQuestions = [];
    
    document.getElementById("quiz-welcome-panel").style.display = "none";
    document.getElementById("quiz-result-panel").style.display = "none";
    document.getElementById("quiz-game-panel").classList.add("active");
    
    generateQuizPool();
    loadQuizQuestion();
}

function generateQuizPool() {
    for (let i = 0; i < 10; i++) {
        if (quizType === "seller") {
            const randomStation = stations[Math.floor(Math.random() * stations.length)];
            const randomTickets = Math.floor(Math.random() * 5) + 1; // 1~5張
            
            const speechText = `我想欲去${randomStation.nameZH}，買${numberToTaigiText(randomTickets)}張票。`;
            const questionPrompt = "請問語音中，旅客想欲去叨位？買幾張車票？";
            
            // 實體台語音標拼接
            let audioSegments = [];
            audioSegments.push(taigiAudioMap["我"]);
            audioSegments.push(taigiAudioMap["欲"]);
            audioSegments.push(taigiAudioMap["去"]);
            
            const stName = randomStation.nameZH === "台北" ? "臺北" : (randomStation.nameZH === "台中" ? "臺中" : (randomStation.nameZH === "台南" ? "臺南" : (randomStation.nameZH === "台東" ? "臺東" : randomStation.nameZH)));
            const stationAudio = taigiAudioMap[stName];
            if (stationAudio) audioSegments.push(stationAudio);
            
            audioSegments.push(taigiAudioMap["買"]);
            audioSegments = audioSegments.concat(numberToAudioSegments(randomTickets, true));
            audioSegments.push(taigiAudioMap["張"]);
            audioSegments.push(taigiAudioMap["票"]);
            
            const correctAnswer = `${randomStation.nameZH}，${randomTickets}張票`;
            
            let options = [correctAnswer];
            while (options.length < 4) {
                const altStation = stations[Math.floor(Math.random() * stations.length)];
                const altTickets = Math.floor(Math.random() * 5) + 1;
                const altOption = `${altStation.nameZH}，${altTickets}張票`;
                if (!options.includes(altOption)) {
                    options.push(altOption);
                }
            }
            options.sort(() => Math.random() - 0.5);
            
            quizQuestions.push({
                speech: speechText,
                speechPOJ: audioSegments, // 儲存音標陣列以播放實體台語
                prompt: questionPrompt,
                options: options,
                answer: correctAnswer,
                cityId: randomStation.id
            });
            
        } else {
            const randomHour = Math.floor(Math.random() * 12) + 1; // 1~12點
            const minsPresets = [0, 15, 30, 45];
            const randomMin = minsPresets[Math.floor(Math.random() * minsPresets.length)];
            const period = Math.random() > 0.5 ? "下晡" : "早起";
            
            const hourText = randomHour === 2 ? "兩點" : numberToTaigiText(randomHour) + "點";
            const minText = randomMin === 30 ? "半" : (randomMin === 0 ? "" : numberToTaigiText(randomMin) + "分");
            
            const speechText = `火車${period}${hourText}${minText}開車。`;
            const questionPrompt = "請問語音中，火車是幾點開車？";
            
            // 實體台語音標拼接
            let audioSegments = [];
            audioSegments.push(taigiAudioMap["火車"]);
            
            let h = randomHour;
            if (period === "下晡") {
                h = randomHour === 12 ? 12 : randomHour + 12;
            } else if (period === "早起") {
                h = randomHour === 12 ? 0 : randomHour;
            }
            
            const timeSegments = timeToAudioSegments(`${h.toString().padStart(2, '0')}:${randomMin.toString().padStart(2, '0')}`);
            audioSegments = audioSegments.concat(timeSegments);
            audioSegments.push(taigiAudioMap["開車"]);
            
            const digitalTime = `${period} ${randomHour.toString().padStart(2, '0')}:${randomMin.toString().padStart(2, '0')}`;
            const correctAnswer = digitalTime;
            
            let options = [correctAnswer];
            while (options.length < 4) {
                const altHour = Math.floor(Math.random() * 12) + 1;
                const altMin = minsPresets[Math.floor(Math.random() * minsPresets.length)];
                const altPeriod = Math.random() > 0.5 ? "下晡" : "早起";
                const altOption = `${altPeriod} ${altHour.toString().padStart(2, '0')}:${altMin.toString().padStart(2, '0')}`;
                if (!options.includes(altOption)) {
                    options.push(altOption);
                }
            }
            options.sort(() => Math.random() - 0.5);
            
            const rewardStation = stations[Math.floor(Math.random() * stations.length)];
            
            quizQuestions.push({
                speech: speechText,
                speechPOJ: audioSegments, // 儲存音標陣列以播放實體台語
                prompt: questionPrompt,
                options: options,
                answer: correctAnswer,
                cityId: rewardStation.id
            });
        }
    }
}

function loadQuizQuestion() {
    quizHasAnswered = false;
    document.getElementById("quiz-feedback-text").textContent = "";
    document.getElementById("quiz-feedback-text").className = "quiz-feedback";
    
    const q = quizQuestions[quizCurrentIndex];
    currentCorrectAnswer = q.answer;
    
    document.getElementById("quiz-progress-text").textContent = `問題 ${quizCurrentIndex + 1} / 10`;
    document.getElementById("quiz-question-prompt").textContent = q.prompt;
    
    const container = document.getElementById("quiz-options-container");
    container.innerHTML = "";
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => submitQuizAnswer(opt, btn);
        container.appendChild(btn);
    });
    
    setTimeout(() => {
        playTaigiTTS(q.speech, q.speechPOJ);
    }, 400);
    
    quizTimeLeft = 20;
    document.getElementById("quiz-timer-display").innerHTML = `<i class="fa-solid fa-hourglass-half animate-pulse"></i> 剩餘: ${quizTimeLeft}s`;
    
    const bar = document.getElementById("quiz-timer-bar");
    bar.style.transition = "none";
    bar.style.width = "100%";
    
    clearInterval(quizTimerInterval);
    setTimeout(() => {
        bar.style.transition = "width 20s linear";
        bar.style.width = "0%";
    }, 50);
    
    quizTimerInterval = setInterval(() => {
        quizTimeLeft--;
        document.getElementById("quiz-timer-display").innerHTML = `<i class="fa-solid fa-hourglass-half"></i> 剩餘: ${quizTimeLeft}s`;
        
        if (quizTimeLeft <= 0) {
            clearInterval(quizTimerInterval);
            handleQuizTimeout();
        }
    }, 1000);
}

function playQuizQuestionAudio() {
    if (quizQuestions[quizCurrentIndex]) {
        playTaigiTTS(quizQuestions[quizCurrentIndex].speech, quizQuestions[quizCurrentIndex].speechPOJ);
    }
}

function submitQuizAnswer(selectedOpt, selectedBtn) {
    if (quizHasAnswered) return;
    quizHasAnswered = true;
    clearInterval(quizTimerInterval);
    
    const bar = document.getElementById("quiz-timer-bar");
    const computedWidth = window.getComputedStyle(bar).width;
    bar.style.transition = "none";
    bar.style.width = computedWidth;
    
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
    
    const feedback = document.getElementById("quiz-feedback-text");
    const gameCard = document.getElementById("panel-quiz");
    
    if (selectedOpt === currentCorrectAnswer) {
        quizScore++;
        feedback.textContent = "👍 讚喔！答對矣！ (Tio̍h ah!)";
        feedback.className = "quiz-feedback success";
        selectedBtn.classList.add("correct");
        
        gameCard.classList.add("bounce-effect");
        setTimeout(() => gameCard.classList.remove("bounce-effect"), 600);
        triggerConfettiParticles();
        
        playTaigiTTS("著矣", "tio̍h-ah");
    } else {
        feedback.textContent = "❌ 毋對喔！加油！ (M̄-tio̍h--ooh!)";
        feedback.className = "quiz-feedback error";
        selectedBtn.classList.add("wrong");
        
        document.querySelectorAll(".option-btn").forEach(btn => {
            if (btn.textContent === currentCorrectAnswer) {
                btn.classList.add("correct");
            }
        });
        
        gameCard.classList.add("shake");
        setTimeout(() => gameCard.classList.remove("shake"), 500);
        
        playTaigiTTS("毋著喔", "m̄-tio̍h-ooh");
    }
    
    document.getElementById("quiz-score-display").innerHTML = `<i class="fa-solid fa-star" style="color: var(--accent);"></i> 分數: ${quizScore}`;
    setTimeout(nextQuizQuestion, 1800);
}

function handleQuizTimeout() {
    if (quizHasAnswered) return;
    quizHasAnswered = true;
    
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentCorrectAnswer) {
            btn.classList.add("correct");
        }
    });
    
    const feedback = document.getElementById("quiz-feedback-text");
    feedback.textContent = "⏰ 時間到！毋對喔！";
    feedback.className = "quiz-feedback error";
    
    playTaigiTTS("毋著喔", "m̄-tio̍h-ooh");
    setTimeout(nextQuizQuestion, 1800);
}

function nextQuizQuestion() {
    quizCurrentIndex++;
    if (quizCurrentIndex < 10) {
        loadQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById("quiz-game-panel").classList.remove("active");
    document.getElementById("quiz-result-panel").style.display = "block";
    
    document.getElementById("quiz-result-score").textContent = `您的最終得分：${quizScore} / 10 題`;
    
    const rewardsBox = document.getElementById("quiz-rewards-box");
    const stampDisplay = document.getElementById("quiz-unlocked-stamp-display");
    
    if (quizScore >= 8) {
        rewardsBox.style.display = "block";
        
        let unlockedStamps = JSON.parse(localStorage.getItem("rail_stamps")) || [];
        const lockedStations = stations.filter(st => !unlockedStamps.includes(st.id));
        
        let newStampStation = null;
        if (lockedStations.length > 0) {
            newStampStation = lockedStations[Math.floor(Math.random() * lockedStations.length)];
            unlockedStamps.push(newStampStation.id);
            localStorage.setItem("rail_stamps", JSON.stringify(unlockedStamps));
        } else {
            newStampStation = stations[Math.floor(Math.random() * stations.length)];
        }
        
        stampDisplay.innerHTML = `
            <div class="stamp-item unlocked">
                <span class="stamp-icon">${newStampStation.stamp}</span>
                <span class="stamp-name">${newStampStation.nameZH}站</span>
                <span class="stamp-city-zh">${newStampStation.nameEN}</span>
            </div>
            <p style="font-weight:700; color:var(--text); margin-top:10px;">恭喜解鎖【${newStampStation.nameZH}站】紀念印章！已加入您的集章冊！</p>
        `;
        
        triggerConfettiParticles();
        renderStampsAlbum();
    } else {
        rewardsBox.style.display = "none";
        stampDisplay.innerHTML = "";
        
        const failText = document.createElement("p");
        failText.style.margin = "20px 0";
        failText.style.color = "var(--text-light)";
        failText.style.fontWeight = "700";
        failText.textContent = "💡 還差一點點！需要答對 8 題以上才能解鎖印章喔，再接再厲！";
        
        rewardsBox.parentNode.insertBefore(failText, rewardsBox);
    }
}

function resetQuizInterface() {
    clearInterval(quizTimerInterval);
    document.getElementById("quiz-result-panel").style.display = "none";
    document.getElementById("quiz-game-panel").classList.remove("active");
    document.getElementById("quiz-welcome-panel").style.display = "block";
    
    const siblings = document.getElementById("quiz-result-panel").childNodes;
    for (let i = siblings.length - 1; i >= 0; i--) {
        if (siblings[i] && siblings[i].tagName === "P" && siblings[i].textContent.includes("還差一點點")) {
            siblings[i].remove();
        }
    }
}

// ==========================================
// 12. 紀念章集章冊展示
// ==========================================
function renderStampsAlbum() {
    const container = document.getElementById("stamps-container");
    container.innerHTML = "";
    
    const unlockedStamps = JSON.parse(localStorage.getItem("rail_stamps")) || [];
    
    stations.forEach(st => {
        const isUnlocked = unlockedStamps.includes(st.id);
        
        const stampEl = document.createElement("div");
        stampEl.className = `stamp-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        stampEl.title = isUnlocked ? `點擊聆聽【${st.nameZH}】台語發音` : "尚未解鎖";
        
        stampEl.onclick = () => {
            if (isUnlocked) {
                // 傳入 POJ 發音
                playTaigiTTS(st.nameZH, st.poj);
                stampEl.classList.add("bounce-effect");
                setTimeout(() => stampEl.classList.remove("bounce-effect"), 600);
            }
        };
        
        stampEl.innerHTML = `
            <span class="stamp-icon">${isUnlocked ? st.stamp : "🔒"}</span>
            <span class="stamp-name">${st.nameZH}站</span>
            <span class="stamp-city-zh">${st.nameEN}</span>
        `;
        
        container.appendChild(stampEl);
    });
}

// ==========================================
// 13. 微互動粒子效果 (Confetti Particles)
// ==========================================
function triggerConfettiParticles() {
    const mainElement = document.querySelector("main");
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "confetti-particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = "10%";
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, 60%)`;
        particle.style.setProperty("--x", `${(Math.random() - 0.5) * 300}px`);
        particle.style.setProperty("--rot", `${Math.random() * 360}deg`);
        
        mainElement.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
}

// ==========================================
// 14. 系統主題與語系切換
// ==========================================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("app_theme", targetTheme);
    
    const icon = document.querySelector("#theme-toggle-btn i");
    icon.className = targetTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

function toggleLanguage() {
    currentLang = currentLang === "ZH" ? "EN" : "ZH";
    localStorage.setItem("app_lang", currentLang);
    
    updateUI();
    calculateJourney();
    updateClockReadout();
}

function updateSpeechRate(val) {
    speechRate = parseFloat(val);
    localStorage.setItem("app_speech_rate", speechRate);
    updateSpeechRateLabel(val);
}

function updateSpeechRateLabel(val) {
    const label = document.getElementById("speech-rate-label");
    if (label) {
        label.textContent = `${parseFloat(val).toFixed(1)}x`;
    }
}

function switchTab(tabId) {
    selectedTab = tabId;
    
    document.querySelectorAll(".tab-trigger").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`tab-${tabId}-btn`).classList.add("active");
    
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
    document.getElementById(`panel-${tabId}`).classList.add("active");
    
    if (tabId === "stamps") {
        renderStampsAlbum();
    }
}

function updateUI() {
    const t = uiStrings[currentLang];
    
    document.getElementById("ui-title").innerHTML = `<i class="fa-solid fa-train-subway"></i> ${t.title}`;
    document.getElementById("ui-subtitle").textContent = t.subtitle;
    document.getElementById("lang-toggle-text").textContent = t.langBtnText;
    
    document.getElementById("ui-tab-adventure").textContent = t.tabAdventure;
    document.getElementById("ui-tab-vocab").textContent = t.tabVocab;
    document.getElementById("ui-tab-time").textContent = t.tabTime;
    document.getElementById("ui-tab-quiz").textContent = t.tabQuiz;
    document.getElementById("ui-tab-stamps").textContent = t.tabStamps;
    
    document.getElementById("ui-booth-title").innerHTML = `<i class="fa-solid fa-ticket"></i> ${t.boothTitle}`;
    document.getElementById("ui-label-from").textContent = t.labelFrom;
    document.getElementById("ui-label-to").textContent = t.labelTo;
    document.getElementById("ui-label-class").textContent = t.labelClass;
    document.getElementById("ui-label-passengers").textContent = t.labelPassengers;
    document.getElementById("ui-label-dep-time").textContent = t.labelDepTime;
    
    document.getElementById("ui-info-direction").textContent = t.infoDirection;
    document.getElementById("ui-info-duration").textContent = t.infoDuration;
    document.getElementById("ui-info-cost").textContent = t.infoCost;
    document.getElementById("ui-info-platform").textContent = t.infoPlatform;
    
    document.getElementById("ui-btn-play-journey").textContent = t.btnPlayJourney;
    document.getElementById("ui-map-title").innerHTML = `<i class="fa-solid fa-compass"></i> ${t.mapTitle}`;
    
    document.getElementById("ui-vocab-title").innerHTML = `<i class="fa-solid fa-book-open"></i> ${t.vocabTitle}`;
    
    document.getElementById("ui-clock-title").innerHTML = `<i class="fa-solid fa-circle-notch"></i> ${t.clockTitle}`;
    document.getElementById("ui-time-learn-title").innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${t.timeLearnTitle}`;
    document.getElementById("ui-label-adjust-time").textContent = t.labelAdjustTime;
    document.getElementById("ui-label-preset-time").textContent = t.labelPresetTime;
    document.getElementById("ui-btn-play-clock").textContent = t.btnPlayClock;
    
    document.getElementById("ui-quiz-title").innerHTML = `<i class="fa-solid fa-gamepad"></i> ${t.quizTitle}`;
    document.getElementById("ui-quiz-welcome-title").textContent = t.quizWelcomeTitle;
    document.getElementById("ui-quiz-welcome-desc").textContent = t.quizWelcomeDesc;
    document.getElementById("ui-quiz-seller-name").textContent = t.quizSellerName;
    document.getElementById("ui-quiz-time-name").textContent = t.quizTimeName;
    document.getElementById("ui-btn-retry").textContent = t.btnRetry;
    
    document.getElementById("ui-stamps-title").innerHTML = `<i class="fa-solid fa-stamp"></i> ${t.stampsTitle}`;
    document.getElementById("ui-stamps-desc").textContent = t.stampsDesc;
}

// 動態綁定所有點擊與選單變更事件，以繞過 Blogger、WordPress 等安全過濾器
function bindDynamicEvents() {
    const bindClick = (id, callback) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("click", callback);
            el.removeAttribute("onclick");
        }
    };
    const bindChange = (id, callback) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", callback);
            el.removeAttribute("onchange");
        }
    };

    // 頂部控制列
    bindClick("theme-toggle-btn", toggleTheme);
    bindClick("lang-toggle-btn", toggleLanguage);

    // 主分頁頁籤
    bindClick("tab-adventure-btn", () => switchTab('adventure'));
    bindClick("tab-vocab-btn", () => switchTab('vocab'));
    bindClick("tab-time-btn", () => switchTab('time'));
    bindClick("tab-quiz-btn", () => switchTab('quiz'));
    bindClick("tab-stamps-btn", () => switchTab('stamps'));

    // 售票亭起訖站與下拉選單
    bindChange("start-station", calculateJourney);
    bindChange("end-station", calculateJourney);
    bindChange("train-class", calculateJourney);
    bindChange("departure-time", calculateJourney);
    bindClick("btn-dec-passengers", () => changePassengers(-1));
    bindClick("btn-inc-passengers", () => changePassengers(1));
    bindClick("play-journey-btn", playJourney);

    // 詞彙學堂篩選按鈕
    bindClick("btn-filter-all", () => filterVocab('all'));
    bindClick("btn-filter-vehicles", () => filterVocab('vehicle'));
    bindClick("btn-filter-stations", () => filterVocab('station'));

    // 時間微調按鈕
    bindClick("btn-clock-dec-1h", () => adjustClockTime(-60));
    bindClick("btn-clock-dec-15m", () => adjustClockTime(-15));
    bindClick("btn-clock-inc-15m", () => adjustClockTime(15));
    bindClick("btn-clock-inc-1h", () => adjustClockTime(60));

    // 時間快捷預設按鈕
    bindClick("btn-clock-preset-8-0", () => setClockTime(8, 0));
    bindClick("btn-clock-preset-10-30", () => setClockTime(10, 30));
    bindClick("btn-clock-preset-12-15", () => setClockTime(12, 15));
    bindClick("btn-clock-preset-15-30", () => setClockTime(15, 30));
    bindClick("btn-clock-preset-17-45", () => setClockTime(17, 45));
    bindClick("btn-clock-preset-20-0", () => setClockTime(20, 0));

    // 播放時間語音按鈕
    bindClick("play-clock-btn", playClockAudio);

    // 檢定挑戰按鈕
    bindClick("btn-quiz-seller", () => startQuiz('seller'));
    bindClick("btn-quiz-time", () => startQuiz('time'));
    bindClick("quiz-audio-play-btn", playQuizQuestionAudio);
    bindClick("quiz-retry-btn", resetQuizInterface);
}


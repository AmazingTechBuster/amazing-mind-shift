// ==========================================
// 1. GLOBALS & INIT (FIXED SCOPE TIMERS)
// ==========================================
let moodChartInstance = null;
let breathTimer = null; 
const dbName = "AmazingMindShiftDB";
const storeName = "visionBoard";
let db;

window.onload = function() {
    if (localStorage.getItem('appTheme') === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').innerText = '🌙';
    }
    
    updateTimeVibe();
    getThoughtOfTheDay();
    initDB();
    
    renderCalendar();
    loadDailyReflection();
    loadTodayJournal();
    loadMoods();
    renderHabits();
    
    ['333', '369', '555'].forEach(m => renderManifestList(m));
    loadManifestHistory(); // Ensure history is loaded on startup
};

function switchTab(tabId, clicked) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active-tab'));
    document.getElementById(tabId).classList.add('active-tab');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active-nav'));
    clicked.classList.add('active-nav');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if(tabId === 'tab-tools') { setTimeout(renderMoodChart, 100); }
}

function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function updateWordCount(el, targetId) {
    const words = el.value.trim() === '' ? 0 : el.value.trim().split(/\s+/).length;
    const el2 = document.getElementById(targetId);
    if (el2) el2.innerText = `${words} word${words !== 1 ? 's' : ''}`;
    localStorage.setItem(el.id, el.value);
}

// ==========================================
// 2. TIMELINE DATA
// ==========================================
const dailyThoughts = [
    "Your subconscious mind is a garden. What you plant today, you will harvest tomorrow.",
    "Do not let the behavior of others destroy your inner peace.",
    "You are entirely up to you. Make your mindset your strongest asset.",
    "Focus on the step in front of you, not the whole staircase.",
    "The energy you put into the universe is exactly what comes back to you.",
    "Healing is not linear. Be proud of the small steps you take every day.",
    "You are writing your own story. Make today a beautiful chapter.",
    "Silence is not empty. It is full of answers.",
    "Your only limit is your mind. Break it. Rebuild it. Rise."
];

const wisdomData = {
    anxiety: { shlok: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", meaning: "Focus on action, not the outcome.", quote: "\"Overthinking ruins you. Action cures fear.\"", affirmation: "I breathe in peace and breathe out tension. I am safe, and I am in control of my mind." },
    anger: { shlok: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।", meaning: "Anger leads to clouding of judgment.", quote: "\"For every minute you are angry, you lose sixty seconds of peace.\"", affirmation: "I choose peace over perfection. I release this anger and reclaim my inner calm." },
    sadness: { shlok: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।", meaning: "Pleasures and pains are temporary.", quote: "\"Tears are just a reminder that you have a heart. Healing takes time.\"", affirmation: "I honor my feelings, but I do not let them consume me. Joy is returning to my life." },
    confusion: { shlok: "तस्मादज्ञानसम्भूतं हृत्स्थं ज्ञानासिनात्मनः।", meaning: "Cut apart doubts with the sword of knowledge.", quote: "\"Clarity comes from engagement, not just thought.\"", affirmation: "I trust my intuition. Clarity is coming to me easily and effortlessly." },
    fear: { shlok: "अभयं सत्त्वसंशुद्धिः ज्ञानयोगव्यवस्थितिः।", meaning: "Fearlessness is a divine quality.", quote: "\"Everything you've ever wanted is sitting on the other side of fear.\"", affirmation: "I am stronger than my fears. I step forward with absolute courage and faith." },
    greed: { shlok: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।", meaning: "Lust, anger, and greed lead to downfall.", quote: "\"He who is not contented with what he has, will never be contented.\"", affirmation: "I am deeply grateful for all I have. Abundance flows to me naturally when I let go of lack." },
    ego: { shlok: "अहङ्कारं बलं दर्पं कामं क्रोधं च संश्रिताः।", meaning: "False ego and pride cause you to fall.", quote: "\"Ego is the false self. True confidence requires zero arrogance.\"", affirmation: "I am grounded and humble. My true worth comes from my soul, not my status." },
    laziness: { shlok: "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।", meaning: "Doing your duty is better than doing nothing.", quote: "\"Motivation gets you going, but discipline keeps you growing.\"", affirmation: "I am filled with focus and energy. I take purposeful action toward my dreams today." },
    happiness: { shlok: "योऽन्तःसुखोऽन्तरारामस्तथान्तर्ज्योतिरेव यः।", meaning: "True happiness comes from within.", quote: "\"True happiness is not out there, it's in you.\"", affirmation: "I embrace this joy. I am a magnet for beautiful moments and positive energy." },
    peace: { shlok: "आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत्।", meaning: "An undisturbed mind achieves pure peace.", quote: "\"Peace is the result of retraining your mind to process life as it is.\"", affirmation: "My mind is a sanctuary of calmness. I radiate peace to everyone around me." },
    selflove: { shlok: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।", meaning: "Elevate yourself through your mind.", quote: "\"You yourself deserve your love and affection more than anyone.\"", affirmation: "I am worthy, I am enough, and I unconditionally love the person I am becoming." },
    confidence: { shlok: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।", meaning: "Do not yield to weakness. Arise!", quote: "\"Confidence isn't thinking you are better; it's realizing you don't need to compare.\"", affirmation: "I believe in my abilities. I am unstoppable, capable, and ready to conquer my goals." },
    positivity: { shlok: "प्रसादे सर्वदुःखानां हानिरस्योपजायते।", meaning: "A positive mind destroys all sorrows.", quote: "\"A positive mindset brings positive things.\"", affirmation: "I choose to see the good in every situation. My optimistic mindset creates miracles." },
    jealousy: { shlok: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।", meaning: "Be a kind friend to all, without envy.", quote: "\"A flower does not think of competing with the flower next to it.\"", affirmation: "I celebrate the success of others, knowing there is unlimited abundance for me too." },
    guilt: { shlok: "अपि चेत्सुदुराचारो भजते मामनन्यभाक्।", meaning: "Return to the right path and be forgiven.", quote: "\"Your past mistakes are meant to guide you, not define you.\"", affirmation: "I forgive myself for past mistakes. I am learning, growing, and moving forward." },
    loneliness: { shlok: "सर्वभूतस्थमात्मानं सर्वभूतानि चात्मनि।", meaning: "You are connected to all beings. You are never alone.", quote: "\"Solitude is dangerous. It's very addictive.\"", affirmation: "I am deeply connected to the universe. I am whole and perfectly fine on my own." },
    grief: { shlok: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च।", meaning: "Do not grieve over the inevitable.", quote: "\"Grief is just love with no place to go.\"", affirmation: "I allow myself to heal at my own pace. Love surrounds me, even in moments of loss." },
    distraction: { shlok: "व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन।", meaning: "Resolute minds have one focused aim.", quote: "\"Starve your distractions. Feed your focus.\"", affirmation: "My mind is sharp and laser-focused. I am committed to my goals and my vision." },
    impatience: { shlok: "शनैः शनैरुपरमेद्बुद्ध्या धृतिगृहीतया।", meaning: "With patience, attain mental stillness.", quote: "\"Patience is the ability to keep a good attitude while waiting.\"", affirmation: "I trust the timing of my life. Everything is unfolding perfectly for my highest good." },
    failure: { shlok: "सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते।", meaning: "Abandon attachment to success or failure.", quote: "\"Failure is a detour, not a dead-end street.\"", affirmation: "Failure is just feedback. I use my setbacks as stepping stones to massive success." },
    success: { shlok: "नाहं प्रकाशः सर्वस्य योगमायासमावृतः।", meaning: "Stay humble in success.", quote: "\"Success is empty if you arrive at the finish line alone and arrogant.\"", affirmation: "I remain humble in success. I use my achievements to uplift and inspire others." },
    betrayal: { shlok: "आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः।", meaning: "You alone are your best friend.", quote: "\"Sometimes good things fall apart so better things can fall together.\"", affirmation: "I release the pain of the past. I protect my peace and welcome only loyal energy." },
    insult: { shlok: "तुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित्।", meaning: "Remain calm in praise and blame.", quote: "\"How people treat you is their karma; how you react is yours.\"", affirmation: "My self-worth is untouchable. Other people's words do not define my reality." },
    comparison: { shlok: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।", meaning: "Walk your own path, not another's.", quote: "\"Comparison is the thief of joy.\"", affirmation: "I am on my own unique journey. I only compare myself to who I was yesterday." },
    overwhelm: { shlok: "मच्चित्तः सर्वदुर्गाणि मत्प्रसादात्तरिष्यसि।", meaning: "By higher consciousness, you will pass all obstacles.", quote: "\"Take it one day, one step, and one breath at a time.\"", affirmation: "I tackle one thing at a time. I am highly capable of handling whatever comes my way." },
    lust: { shlok: "काम एष क्रोध एष रजोगुणसमुद्भवः।", meaning: "Lust transforms into wrath.", quote: "\"Master your senses, or your senses will master your future.\"", affirmation: "I am in complete control of my desires. I seek deep, meaningful connections." },
    unforgiving: { shlok: "क्षमा सत्यं दमः शमः...", meaning: "Forgiveness elevates a human.", quote: "\"To forgive is to set a prisoner free and discover that the prisoner was you.\"", affirmation: "I release the heavy burden of resentment. Forgiveness frees my soul to fly." },
    uncertainty: { shlok: "अज्ञानेनावृतं ज्ञानं तेन मुह्यन्ति जन्तवः।", meaning: "Ignorance causes bewilderment.", quote: "\"The quality of your life is related to how much uncertainty you can handle.\"", affirmation: "I embrace the unknown. I trust that the universe has a magnificent plan for me." },
    purposeless: { shlok: "स्वे स्वे कर्मण्यभिरतः संसिद्धिं लभते नरः।", meaning: "Follow your natural qualities to find purpose.", quote: "\"Your purpose will find you when you start building yourself.\"", affirmation: "My true purpose is unfolding every single day. I am meant for great things." },
    unappreciated: { shlok: "कर्मण्येवाधिकारस्ते... मा ते सङ्गोऽस्त्वकर्मणि।", meaning: "Work without expecting praise.", quote: "\"Work hard in silence. Let your success be your noise.\"", affirmation: "I value and validate myself. My hard work is seen by the universe and will be rewarded." },
    hate: { shlok: "निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव।", meaning: "Achieve peace by removing hate.", quote: "\"Holding onto hate is like drinking poison and expecting the other person to die.\"", affirmation: "I cleanse my heart of negativity. I choose love, empathy, and understanding." },
    helplessness: { shlok: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।", meaning: "Divine energy uplifts the helpless.", quote: "\"Rock bottom has built more heroes than privilege ever did.\"", affirmation: "I have the power to change my story. I am resilient, resourceful, and incredibly strong." },
    toxic_attachment: { shlok: "सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते।", meaning: "Toxic attachment leads to anger.", quote: "\"Letting go doesn't mean you don't care.\"", affirmation: "I release ties that no longer serve my highest good. I attract healthy, supportive energy." },
    stubbornness: { shlok: "अहङ्कारमाश्रित्य न योत्स्य इति मन्यसे।", meaning: "Stubborn pride is in vain.", quote: "\"Flexibility is the greatest strength. A tree that bends survives the storm.\"", affirmation: "I am open to new perspectives. Flexibility allows me to grow and thrive." },
    complaining: { shlok: "अनाश्रितः कर्मफलं कार्यं कर्म करोति यः।", meaning: "Work silently without complaining.", quote: "\"If you have time to whine, you have time to do something about it.\"", affirmation: "I shift my focus from problems to solutions. Gratitude is my default state of mind." },
    materialistic: { shlok: "भोगाश्वर्यप्रसक्तानां तयापहृतचेतसाम्।", meaning: "Material attachment destroys determination.", quote: "\"Things you own end up owning you. Detach to be free.\"", affirmation: "I find true happiness within. My spirit is rich, and my joy is not tied to objects." },
    gossip: { shlok: "अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।", meaning: "Speak truthfully and beneficially.", quote: "\"Great minds discuss ideas; small minds discuss people.\"", affirmation: "I speak life and positivity. I use my words to heal, inspire, and uplift others." },
    judgemental: { shlok: "विद्याविनयसम्पन्ने... पण्डिताः समदर्शिनः।", meaning: "Humble sages see with equal vision.", quote: "\"When you judge another, you define yourself.\"", affirmation: "I look at others with compassion and empathy. We are all doing our best." },
    revenge: { shlok: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।", meaning: "Set an example. Do not fall to revenge.", quote: "\"The best revenge is massive success and total internal peace.\"", affirmation: "I focus my energy on building my own beautiful life, not on destroying others." },
    fake: { shlok: "कर्मेन्द्रियाणि संयम्य... स मिथ्याचार उच्यते।", meaning: "Hypocrisy ruins spiritual progress.", quote: "\"Authenticity is the most attractive quality. Stop pretending.\"", affirmation: "I am authentic and unapologetically myself. I attract people who love the real me." },
    dependency: { shlok: "उद्धरेदात्मनात्मानं...", meaning: "Elevate yourself. Do not depend on others.", quote: "\"No one is coming to save you. This life is 100% your responsibility.\"", affirmation: "I am completely self-sufficient. I trust my own ability to create a beautiful life." },
    perfectionism: { shlok: "सर्वारम्भा हि दोषेण धूमेनाग्निरिवावृताः।", meaning: "Do not halt action seeking perfection.", quote: "\"Done is better than perfect. Execute and iterate.\"", affirmation: "I value continuous progress over perfection. I am proud of my daily efforts." },
    boredom: { shlok: "युक्ताहारविहारस्य... योगो भवति दुःखहा।", meaning: "Regulate your habits to find joy.", quote: "\"Boredom is a lack of attention, not a lack of activities.\"", affirmation: "I am surrounded by endless opportunities to learn, grow, and experience joy." },
    nervousness: { shlok: "मयि सर्वाणि कर्माणि सन्न्यस्याध्यात्मचेतसा।", meaning: "Fight without mental fever.", quote: "\"Nervousness is just excitement without breath. Breathe deeply.\"", affirmation: "I transform my nerves into pure excitement. I am fully prepared and ready to shine." },
    bad_habits: { shlok: "इन्द्रियस्येन्द्रियस्यार्थे रागद्वेषौ व्यवस्थितौ।", meaning: "Do not come under the control of bad habits.", quote: "\"You are what you repeatedly do. Build habits that build you.\"", affirmation: "I am breaking old chains. I build healthy habits that align with my highest self." },
    financial_stress: { shlok: "योगक्षेमं वहाम्यहम्।", meaning: "I carry what they lack, and I preserve what they have.", quote: "\"Abundance is a mindset. Focus on creating value, and money will follow.\"", affirmation: "Money flows to me easily and frequently. I am financially secure, smart, and abundant." },
    health_anxiety: { shlok: "शरीरं यदवाप्नोति...।", meaning: "The soul is eternal. Do not let bodily fears consume you.", quote: "\"Your body hears everything your mind says. Stay positive to heal.\"", affirmation: "Every cell in my body vibrates with energy and perfect health. I am deeply healed." },
    trust_issues: { shlok: "संशयात्मा विनश्यति।", meaning: "The doubting person goes to ruin.", quote: "\"Trust takes years to build, seconds to break. Trust wisely.\"", affirmation: "I trust my intuition to guide me to honest, loving, and highly trustworthy people." },
    surrender: { shlok: "सर्वधर्मान्परित्यज्य..." , meaning: "Surrender completely and you will be protected.", quote: "\"Sometimes the greatest power is simply letting go and trusting the universe.\"", affirmation: "I surrender my worries to the universe. I am supported, guided, and divinely protected." }
};

const moodAdvice = {
    Happy: { emotion: 'happiness', bgClass: 'mood-happy-bg', tip: '✨ Is khushi ko affirmations mein use karo!', title: 'Khushi ka Geeta Gyaan' },
    Calm: { emotion: 'peace', bgClass: 'mood-calm-bg', tip: '🧘 Yeh perfect waqt hai deep work ke liye.', title: 'Shanti ka Sandesh' },
    Motivated: { emotion: 'confidence', bgClass: 'mood-motivated-bg', tip: '🚀 Is energy ko zaaya mat karo! Abhi Manifestation shuru karo.', title: 'Josh mein shakti' },
    Stressed: { emotion: 'anxiety', bgClass: 'mood-stressed-bg', tip: '🌬️ Breathing Exercise try karo aur journal mein stress release karo.', title: 'Tension door karo' },
    Sad: { emotion: 'sadness', bgClass: 'mood-sad-bg', tip: '💜 Evening journal mein sirf 3 cheezein likho jo theek rahi.', title: 'Udaasi mein Geeta ka sahara' }
};

const reflections = [
    "What made you smile today?", "What fear did you face?", "What are you grateful for right now?",
    "What is one thing you learned today?", "How did you show love to yourself today?",
    "What energy are you releasing tonight?", "What was the most peaceful moment today?",
    "If today was a chapter, what would its title be?", "Who made a positive impact on you today?",
    "What is one goal you made progress on?", "How did you handle stress today?",
    "What is something beautiful you saw?", "What habit are you proud of keeping today?",
    "What do you need to forgive yourself for?", "What are you looking forward to tomorrow?",
    "What challenged you today and how did you grow?", "How did you take care of your body today?",
    "What is one small win you had today?", "What made you feel powerful today?",
    "What did you let go of today?", "How can you be kinder to yourself tomorrow?",
    "What is a boundary you set or need to set?", "What gave you energy today?",
    "What drained your energy today?", "What are you proud of achieving this week?",
    "Who are you most grateful for right now?", "What is a negative thought you reframed today?",
    "What is a simple pleasure you enjoyed?", "How did you stay true to yourself today?",
    "What is one word that describes your mood today?"
]; 

const timeBasedVibes = {
    morning: { greeting: "Good Morning", icon: "🌅", quote: "\"A beautiful day begins with a beautiful mindset!\"" },
    afternoon: { greeting: "Good Afternoon", icon: "☀️", quote: "\"Pause, take a deep breath. Peace is a continuous process.\"" },
    evening: { greeting: "Good Evening", icon: "🌙", quote: "\"End the day with a grateful heart. Let go of today.\"" }
};

// ==========================================
// 3. JOURNAL & CALENDAR
// ==========================================
function updateTimeVibe() {
    const hours = new Date().getHours();
    const card = document.getElementById('timeVibeCard');
    card.classList.remove('bg-morning', 'bg-afternoon', 'bg-evening');
    let vibe;
    if (hours >= 4 && hours < 12) { card.classList.add('bg-morning'); vibe = timeBasedVibes.morning; }
    else if (hours >= 12 && hours < 17) { card.classList.add('bg-afternoon'); vibe = timeBasedVibes.afternoon; }
    else { card.classList.add('bg-evening'); vibe = timeBasedVibes.evening; }
    document.getElementById('vibeGreeting').innerText = vibe.greeting;
    document.getElementById('vibeIcon').innerText = vibe.icon;
    document.getElementById('timeQuote').innerText = vibe.quote;
}

function getThoughtOfTheDay() {
    const idx = new Date().getDate() % dailyThoughts.length;
    document.getElementById('dailyThoughtText').innerText = `"${dailyThoughts[idx]}"`;
}

function loadDailyReflection() {
    const day = new Date().getDate();
    const prompt = reflections[day % reflections.length];
    document.getElementById('dailyReflectionPrompt').innerText = prompt;
    
    const todayData = JSON.parse(localStorage.getItem('journal_' + getTodayStr()) || '{}');
    const el = document.getElementById('dailyReflectionInput');
    if(todayData.reflection) {
        el.value = todayData.reflection;
        updateWordCount(el, 'wc-reflection');
    }
}

function loadTodayJournal() {
    const todayData = JSON.parse(localStorage.getItem('journal_' + getTodayStr()) || '{}');
    const mEl = document.getElementById('morningJournal');
    const eEl = document.getElementById('eveningJournal');
    
    if(todayData.morning) { mEl.value = todayData.morning; updateWordCount(mEl, 'wc-morning'); }
    if(todayData.evening) { eEl.value = todayData.evening; updateWordCount(eEl, 'wc-evening'); }
}

function saveTodayData() {
    const today = getTodayStr();
    const data = {
        morning: document.getElementById('morningJournal').value,
        evening: document.getElementById('eveningJournal').value,
        reflection: document.getElementById('dailyReflectionInput').value
    };
    localStorage.setItem('journal_' + today, JSON.stringify(data));
    
    const lastSave = localStorage.getItem('lastJournalDate');
    let streak = parseInt(localStorage.getItem('journalStreak') || '0');
    if (lastSave !== today) {
        streak++;
        localStorage.setItem('journalStreak', streak);
        localStorage.setItem('lastJournalDate', today);
    }
    
    let count = parseInt(localStorage.getItem('journalEntryCount') || '0') + 1;
    localStorage.setItem('journalEntryCount', count);
    
    document.getElementById('streakCount').innerText = streak;
    document.getElementById('journalCount').innerText = count;
    
    const ind = document.getElementById('saveIndicator');
    ind.classList.add('visible');
    setTimeout(() => ind.classList.remove('visible'), 2500);
    renderCalendar(); 
}

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    if(!grid) return;
    grid.innerHTML = '';
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    document.getElementById('calendarMonthYear').innerText = `${monthNames[currentMonth]} ${currentYear}`;
    
    const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    days.forEach(d => {
        let el = document.createElement('div');
        el.className = 'cal-day-header'; el.innerText = d; grid.appendChild(el);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();

    for(let i=0; i<firstDay; i++) { grid.appendChild(document.createElement('div')); }

    for(let i=1; i<=daysInMonth; i++) {
        const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
        const hasJournal = localStorage.getItem('journal_' + dateStr);
        const moodLogs = JSON.parse(localStorage.getItem('moodLogs') || '{}');
        
        let el = document.createElement('div');
        el.className = 'cal-date';
        el.innerText = i;
        
        if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            el.classList.add('today');
        }
        if (hasJournal) el.classList.add('has-entry');
        if (moodLogs[dateStr]) {
            let emoji = document.createElement('span');
            emoji.className = 'cal-mood-emoji';
            emoji.innerText = moodLogs[dateStr].emoji;
            el.appendChild(emoji);
        }
        
        el.onclick = () => openCalendarEntry(dateStr);
        grid.appendChild(el);
    }
}

function changeMonth(dir) {
    currentMonth += dir;
    if(currentMonth > 11) { currentMonth = 0; currentYear++; }
    if(currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
}

function openCalendarEntry(dateStr) {
    document.getElementById('calendarEntryModal').classList.add('active');
    document.getElementById('calModalDateTitle').innerText = dateStr;
    
    const j = JSON.parse(localStorage.getItem('journal_'+dateStr) || '{}');
    const m = JSON.parse(localStorage.getItem('moodLogs') || '{}')[dateStr];
    
    document.getElementById('calModalMorning').innerText = j.morning || "No entry";
    document.getElementById('calModalEvening').innerText = j.evening || "No entry";
    document.getElementById('calModalReflection').innerText = j.reflection || "No entry";
    document.getElementById('calModalMood').innerText = m ? `${m.emoji} ${m.label}` : "None";
}
function closeCalendarEntry() { document.getElementById('calendarEntryModal').classList.remove('active'); }

// ==========================================
// 4. VISION BOARD (IndexedDB)
// ==========================================
function initDB() {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (e) => {
        db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
        }
    };
    request.onsuccess = (e) => { db = e.target.result; loadVisionImages(); };
    request.onerror = (e) => { console.error("IndexedDB error:", e); };
}

function addVisionItem() {
    const file = document.getElementById('visionImageInput').files[0];
    const title = document.getElementById('visionTitle').value.trim();
    if(!file) { alert("Please choose an image!"); return; }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const item = { id: Date.now(), title: title, imgData: e.target.result };
        const tx = db.transaction(storeName, "readwrite");
        tx.objectStore(storeName).add(item);
        tx.oncomplete = () => {
            document.getElementById('visionTitle').value = '';
            document.getElementById('visionImageInput').value = '';
            loadVisionImages();
        };
    };
    reader.readAsDataURL(file);
}

function loadVisionImages() {
    if(!db) return;
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => {
        const items = req.result;
        const grid = document.getElementById('visionGrid');
        const empty = document.getElementById('visionEmptyState');
        if(!grid) return;
        grid.innerHTML = '';
        if(items.length === 0) { empty.style.display = 'block'; } 
        else { empty.style.display = 'none'; }
        
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'vision-item';
            div.innerHTML = `
                <img src="${item.imgData}" alt="Vision Goal">
                ${item.title ? `<p>${item.title}</p>` : ''}
                <div class="delete-overlay">Hold to Delete</div>
            `;
            
            let timer = null;
            let isLongPress = false;
            
            const startPress = () => {
                isLongPress = false;
                div.classList.add('deleting');
                timer = setTimeout(() => {
                    isLongPress = true;
                    deleteVisionItem(item.id);
                }, 800); 
            };
            
            const endPress = () => {
                div.classList.remove('deleting');
                if (timer) clearTimeout(timer);
            };
            
            div.addEventListener('touchstart', startPress);
            div.addEventListener('touchend', (e) => {
                endPress();
                if(isLongPress) e.preventDefault(); 
            });
            div.addEventListener('mousedown', startPress);
            div.addEventListener('mouseup', endPress);
            div.addEventListener('mouseleave', endPress);
            
            div.querySelector('img').addEventListener('click', () => {
                if (!isLongPress) {
                    openFullscreen(item.imgData, item.title);
                }
            });
            
            grid.appendChild(div);
        });
    }
}

function deleteVisionItem(id) {
    div = document.querySelector('.vision-item.deleting');
    if(div) div.classList.remove('deleting');
    
    setTimeout(() => {
        if(confirm("Delete this vision from your board?")) {
            const tx = db.transaction(storeName, "readwrite");
            tx.objectStore(storeName).delete(id);
            tx.oncomplete = () => loadVisionImages();
        }
    }, 50);
}

function openFullscreen(src, title) {
    document.getElementById('fullscreenImg').src = src;
    document.getElementById('fullscreenTitle').innerText = title || '';
    document.getElementById('fullscreenImageModal').classList.add('active');
}
function closeFullscreen() { document.getElementById('fullscreenImageModal').classList.remove('active'); }

// ==========================================
// 5. GEETA WISDOM
// ==========================================
function showGeetaQuote() {
    const emotion = document.getElementById('emotionSelect').value;
    const resultDiv = document.getElementById('geetaResult');
    if (emotion !== 'none' && wisdomData[emotion]) {
        document.getElementById('shlokText').innerText = wisdomData[emotion].shlok;
        document.getElementById('meaningText').innerText = wisdomData[emotion].meaning;
        document.getElementById('modernQuote').innerText = wisdomData[emotion].quote;
        document.getElementById('emotionAffirmation').innerText = `"${wisdomData[emotion].affirmation}"`;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else { resultDiv.style.display = 'none'; }
}

function copyAffirmation() {
    const text = document.getElementById('emotionAffirmation').innerText.replace(/"/g, '');
    navigator.clipboard.writeText(text).then(() => {
        alert("✨ Affirmation copied! Ab Manifest tab (🚀) mein jaakar isko paste karein.");
    }).catch(err => { console.error('Copy failed: ', err); });
}

// ==========================================
// 6. MOOD ANALYTICS & SUGGESTIONS
// ==========================================
function logMood(btn, score, emoji, label) {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    let logs = JSON.parse(localStorage.getItem('moodLogs') || '{}');
    logs[getTodayStr()] = { score, emoji, label };
    localStorage.setItem('moodLogs', JSON.stringify(logs));
    localStorage.setItem('todayMood', JSON.stringify({ mood: label, emoji, date: new Date().toDateString() }));
    
    showMoodSuggestion(label, emoji);
    renderMoodChart();
    renderCalendar(); 
}

function showMoodSuggestion(mood, emoji) {
    const card = document.getElementById('moodSuggestionCard');
    const data = moodAdvice[mood];
    if (!data) return;
    const geeta = wisdomData[data.emotion];
    if (!geeta) return;

    card.className = 'mood-suggestion-card ' + data.bgClass;
    document.getElementById('moodSuggEmoji').innerText = emoji;
    document.getElementById('moodSuggTitle').innerText = data.title;
    document.getElementById('moodSuggShlok').innerText = geeta.shlok;
    document.getElementById('moodSuggMeaning').innerText = geeta.meaning;
    document.getElementById('moodSuggQuote').innerText = geeta.quote;
    document.getElementById('moodSuggTip').innerHTML = data.tip;
    card.style.display = 'block';
}

function loadMoods() {
    const saved = localStorage.getItem('todayMood');
    if (!saved) return;
    const data = JSON.parse(saved);
    if (data.date !== new Date().toDateString()) return;
    document.querySelectorAll('.mood-btn').forEach(btn => {
        if (btn.innerText.includes(data.emoji)) btn.classList.add('selected');
    });
    showMoodSuggestion(data.mood, data.emoji);
}

function renderMoodChart() {
    const canvas = document.getElementById('moodChart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const logs = JSON.parse(localStorage.getItem('moodLogs') || '{}');
    
    const today = new Date();
    let labels = [];
    let data = [];
    
    for(let i=6; i>=0; i--) {
        let d = new Date(today); d.setDate(today.getDate() - i);
        let dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        labels.push(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]);
        data.push(logs[dateStr] ? logs[dateStr].score : null);
    }
    
    if(moodChartInstance) moodChartInstance.destroy();
    
    Chart.defaults.color = '#94a3b8';
    moodChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mood Level', data: data, borderColor: '#06b6d4',
                backgroundColor: 'rgba(6,182,212,0.2)', borderWidth: 3, tension: 0.4, fill: true,
                pointBackgroundColor: '#7c3aed', pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: { y: { min: 1, max: 5, ticks: { stepSize: 1, callback: function(val){ return ['','Sad','Stressed','Motivated','Calm','Happy'][val] || ''; } } } },
            plugins: { legend: { display: false } }
        }
    });

    let loggedDays = Object.keys(logs).length;
    document.getElementById('moodStatText').innerText = `You have logged your mood for ${loggedDays} total days. Keep going!`;
}

// ==========================================
// 7. HABIT TRACKER
// ==========================================
let defaultHabits = [
    { id: 1, name: 'Drink Water', logs: {} },
    { id: 2, name: 'Meditate', logs: {} },
    { id: 3, name: 'Practice Java/BCA Computer Science', logs: {} }
];

function getHabits() {
    let saved = localStorage.getItem('habits');
    if(!saved) { localStorage.setItem('habits', JSON.stringify(defaultHabits)); return defaultHabits; }
    return JSON.parse(saved);
}

function renderHabits() {
    const habits = getHabits();
    const list = document.getElementById('habitList');
    if(!list) return;
    list.innerHTML = '';
    
    const today = new Date();
    let dates = [];
    for(let i=6; i>=0; i--) {
        let d = new Date(today); d.setDate(today.getDate() - i);
        dates.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
    }

    habits.forEach(h => {
        let streak = 0;
        for(let i=dates.length-1; i>=0; i--) { if(h.logs[dates[i]]) streak++; else break; }

        let html = `<div class="habit-item">
            <button class="delete-habit-btn" onclick="deleteHabit(${h.id})">✖</button>
            <div class="habit-header">
                <span class="habit-name">${h.name}</span>
                <span class="habit-streak">🔥 ${streak}</span>
            </div>
            <div class="habit-days">`;
            
        dates.forEach((date, i) => {
            const isDone = h.logs[date];
            const isToday = (i === 6);
            const dayLabel = ["S","M","T","W","T","F","S"][new Date(date).getDay()];
            html += `<div class="habit-day-circle ${isDone ? 'done' : ''} ${isToday ? 'today-circle' : ''}" 
                        onclick="toggleHabit(${h.id}, '${date}')">${isDone ? '✓' : dayLabel}</div>`;
        });
        html += `</div></div>`;
        list.innerHTML += html;
    });
}

function addHabit() {
    const val = document.getElementById('newHabitInput').value.trim();
    if(!val) return;
    let habits = getHabits();
    habits.push({ id: Date.now(), name: val, logs: {} });
    localStorage.setItem('habits', JSON.stringify(habits));
    document.getElementById('newHabitInput').value = '';
    renderHabits();
}

function deleteHabit(id) {
    if(confirm("Remove this habit?")) {
        let habits = getHabits().filter(h => h.id !== id);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    }
}

function toggleHabit(id, dateStr) {
    let habits = getHabits();
    let h = habits.find(x => x.id === id);
    if(h) {
        if(h.logs[dateStr]) delete h.logs[dateStr];
        else h.logs[dateStr] = true;
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    }
}

// ==========================================
// 8. FIXED SYNCED BREATHING, SMASHER & MANIFEST
// ==========================================
function startBreathing() {
    if (breathTimer) {
        clearTimeout(breathTimer);
        breathTimer = null;
    }
    
    const circle = document.getElementById('breathCircle');
    const instr = document.getElementById('breathInstruct');
    
    circle.className = 'breath-circle';
    void circle.offsetWidth; 
    
    const steps = [
        { phase: 'inhale', label: 'Inhale...', dur: 4000, text: 'Naak se gehri saans andar lo (4 sec)' },
        { phase: 'hold', label: 'Hold...', dur: 7000, text: 'Saans ko andar hi roko (7 sec)' },
        { phase: 'exhale', label: 'Exhale...', dur: 8000, text: 'Muh se dhire dhire bahar chodho (8 sec)' }
    ];
    
    let i = 0;
    function runStep() {
        const step = steps[i % steps.length];
        circle.className = 'breath-circle ' + step.phase;
        circle.innerText = step.label;
        instr.innerText = step.text;
        
        breathTimer = setTimeout(() => {
            i++;
            if (i < steps.length * 3) {
                runStep();
            } else { 
                circle.className = 'breath-circle'; 
                circle.innerText = 'Done ✓'; 
                instr.innerText = 'Aap bohot relaxed feel karoge ab. Wonderful! 🌿'; 
                breathTimer = null;
            }
        }, step.dur);
    }
    runStep();
}

function smashStress() {
    const input = document.getElementById('stressInput');
    if (!input.value.trim()) return;
    const particles = document.getElementById('smashParticles');
    particles.innerHTML = '';
    const emojis = ['💥', '✨', '⚡', '🔥'];
    for (let i = 0; i < 6; i++) {
        const p = document.createElement('span'); p.className = 'particle'; p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.setProperty('--fly-to', `translate(${(Math.random()-0.5)*200}px, -${Math.random()*100+50}px)`);
        p.style.left = `${Math.random()*80+10}%`; p.style.top = '0'; particles.appendChild(p);
    }
    input.classList.remove('smash-hit-anim'); void input.offsetWidth; input.classList.add('smash-hit-anim');
    setTimeout(() => { input.value = ''; input.className = ''; }, 800);
}

function addManifestEntry(method, targetCount) {
    const input = document.getElementById(`input${method}`);
    const text = input.value.trim();
    if (!text) return;
    let entries = JSON.parse(localStorage.getItem(`listData${method}`)) || [];
    if (entries.length >= targetCount) { alert('Target already achieved!'); return; }
    entries = Array(targetCount).fill(text);
    localStorage.setItem(`listData${method}`, JSON.stringify(entries));
    input.value = ''; renderManifestList(method);
    setTimeout(() => archiveCompletedManifest(method, text, targetCount), 400);
}

function renderManifestList(method) {
    const container = document.getElementById(`list${method}`);
    const badge = document.getElementById(`count${method}`);
    if(!container) return;
    const entries = JSON.parse(localStorage.getItem(`listData${method}`)) || [];
    const target = method === '333' ? 33 : method === '369' ? 18 : 55;
    if(badge) badge.innerText = `${entries.length} / ${target}`;
    container.innerHTML = '';
    entries.forEach((text, i) => { container.innerHTML += `<div class="manifest-row"><span class="row-index-badge">#${i + 1}</span><span>${text}</span></div>`; });
}

function archiveCompletedManifest(method, coreDesire, totalCount) {
    let history = JSON.parse(localStorage.getItem('manifestHistoryLogs')) || [];
    history.push({ method, text: coreDesire, date: getTodayStr(), reps: totalCount });
    localStorage.setItem('manifestHistoryLogs', JSON.stringify(history));
    localStorage.removeItem(`listData${method}`);
    const mBadge = document.getElementById('manifestCount');
    if(mBadge) mBadge.innerText = history.length;
    alert(`✨ Success! You completed ${totalCount} reps!`);
    renderManifestList(method);
    loadManifestHistory();
}

// ==== NEW: MANIFESTATION HISTORY LOGIC ====
function loadManifestHistory() {
    const box = document.getElementById('manifestHistoryBox');
    const listArea = document.getElementById('historyLogList');
    if(!listArea) return;
    
    const history = JSON.parse(localStorage.getItem('manifestHistoryLogs') || '[]');
    
    if (history.length > 0) {
        if(box) box.style.display = 'block';
        listArea.innerHTML = '';
        
        [...history].reverse().forEach((log, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.style.borderLeft = "4px solid #38bdf8";
            div.style.marginBottom = "10px";
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <b style="color:var(--accent2);">Method ${log.method}</b>
                    <small style="color:var(--muted); font-size:0.75rem;">${log.date}</small>
                </div>
                <p style="font-size:0.95rem; font-style:italic; margin-bottom:10px; color:var(--text);">"${log.text}"</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.75rem; background:rgba(56,189,248,0.1); padding:4px 8px; border-radius:10px; color:#38bdf8; font-weight:700;">
                        ${log.reps} Repetitions
                    </span>
                    <button onclick="deleteHistoryItem(${history.length - 1 - index})" style="background:var(--icon-bg); border:1px solid var(--card-border); color:var(--danger); padding:4px 10px; border-radius:8px; cursor:pointer; font-size:0.75rem; font-weight:700;">Delete</button>
                </div>
            `;
            listArea.appendChild(div);
        });
    } else {
        if(box) box.style.display = 'none';
        listArea.innerHTML = '<p style="color:var(--muted); font-size:0.85rem; text-align:center;">No history yet. Start manifesting!</p>';
    }
}

function deleteHistoryItem(index) {
    if(confirm("Delete this manifestation record?")) {
        let history = JSON.parse(localStorage.getItem('manifestHistoryLogs') || '[]');
        history.splice(index, 1);
        localStorage.setItem('manifestHistoryLogs', JSON.stringify(history));
        loadManifestHistory();
        
        const mBadge = document.getElementById('manifestCount');
        if(mBadge) mBadge.innerText = history.length;
    }
}

function clearManifest(method) { if(confirm("Clear entries?")) { localStorage.removeItem(`listData${method}`); renderManifestList(method); } }

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('appTheme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    document.getElementById('themeToggle').innerText = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
}
function toggleReminder() { alert("🔔 Reminders active!"); }

function openAffirmationVault() { document.getElementById('affirmationVault').classList.add('active'); }
function closeAffirmationVault() { document.getElementById('affirmationVault').classList.remove('active'); }
function scrollToCategory(id) { document.getElementById('affModalBody').scrollTo({ top: document.getElementById(id).offsetTop - 20, behavior: 'smooth' }); }
function copyQuickAff(el) { navigator.clipboard.writeText(el.innerText); alert("✨ Copied!"); }
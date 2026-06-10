// =====================================
// ---- 1. THEME & REMINDER ----
// =====================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('appTheme', isLight ? 'light' : 'dark');
    document.getElementById('themeToggle').innerText = isLight ? '🌙' : '☀️';
}

function toggleReminder() {
    if (!("Notification" in window)) {
        alert("Aapka browser notifications support nahi karta.");
        return;
    }
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            alert("🔔 Daily Reminder set ho gaya hai! Aapko gratitude likhne ka notification aayega.");
            localStorage.setItem('dailyReminder', 'enabled');
            new Notification("Amazing Mind Shift ✨", { body: "Your reminders are now active!" });
        } else {
            alert("Notifications block hain. Please browser settings se allow karein.");
        }
    });
}

// =====================================
// ---- 2. 50 THOUGHTS & 50 WISDOMS ----
// =====================================

const dailyThoughts = [
    "Your subconscious mind is a garden. What you plant today, you will harvest tomorrow.",
    "Do not let the behavior of others destroy your inner peace.",
    "You are entirely up to you. Make your mindset your strongest asset.",
    "Focus on the step in front of you, not the whole staircase.",
    "The energy you put into the universe is exactly what comes back to you.",
    "Healing is not linear. Be proud of the small steps you take every day.",
    "You are writing your own story. Make today a beautiful chapter.",
    "Silence is not empty. It is full of answers.",
    "Your only limit is your mind. Break it. Rebuild it. Rise.",
    "Small steps every day lead to massive change over time.",
    "What you consume daily shapes your reality. Feed your mind with greatness.",
    "Stop trying to control everything. Let go, and let the universe do its magic.",
    "You attract what you are, not what you want. Elevate your vibration.",
    "Pain is temporary, but the lessons it brings are permanent upgrades.",
    "Your future needs you. Your past doesn't. Keep moving forward.",
    "If you want to fly, you have to give up the things that weigh you down.",
    "Self-discipline is the highest form of self-love.",
    "Tough times never last, but tough people do.",
    "Don't lower your goals to the level of your abilities. Grow your abilities to the height of your goals.",
    "Everything you've ever wanted is sitting on the other side of fear.",
    "A negative mind will never give you a positive life.",
    "Be a voice, not an echo. Create your own path.",
    "Sometimes redirection feels like rejection. Trust the journey.",
    "You don't have to have it all figured out to move forward.",
    "Speak to yourself like someone you love.",
    "Gratitude changes the frequency of your entire day.",
    "Don't compare your Chapter 1 to someone else's Chapter 20.",
    "Your focus determines your reality. Where focus goes, energy flows.",
    "Success is hidden in your daily routine.",
    "Be afraid of standing still, not of moving slowly.",
    "The way you treat yourself sets the standard for others.",
    "Worrying is using your imagination to create something you don't want.",
    "Forgive them, not because they deserve it, but because you deserve peace.",
    "Comfort is the enemy of progress. Step out of your bubble.",
    "Your peace is more important than proving you are right.",
    "Doubt kills more dreams than failure ever will.",
    "Take a deep breath. You are doing better than you think.",
    "The hardest walk is walking alone, but it makes you the strongest.",
    "You are allowed to outgrow people, places, and mindsets.",
    "Make your mental health your number one priority.",
    "Never let a bad day make you feel like you have a bad life.",
    "Life is 10% what happens to you and 90% how you react to it.",
    "Stop shrinking to fit in places you've outgrown.",
    "The universe responds to your frequency. Stay high.",
    "Every day is a second chance to reset your goals.",
    "Respect yourself enough to walk away from anything that no longer serves you.",
    "Master your emotions, or they will master you.",
    "You are the CEO of your life. Fire the negative thoughts.",
    "Whatever you hold in your mind on a consistent basis is exactly what you will experience."
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
    judgemental: { shlok: "विद्याविनयसम्पन्ने... पण्डिताः समदर्शिनः।", meaning: "Humble sages do not judge superficially.", quote: "\"When you judge another, you define yourself.\"", affirmation: "I look at others with compassion and empathy. We are all doing our best." },
    revenge: { shlok: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।", meaning: "Do not fall to the level of revenge. Set an example.", quote: "\"The best revenge is massive success and total internal peace.\"", affirmation: "I focus my energy on building my own beautiful life, not on destroying others." },
    fake: { shlok: "कर्मेन्द्रियाणि संयम्य... स मिथ्याचार उच्यते।", meaning: "Hypocrisy ruins spiritual progress.", quote: "\"Authenticity is the most attractive quality. Stop pretending.\"", affirmation: "I am authentic and unapologetically myself. I attract people who love the real me." },
    dependency: { shlok: "उद्धरेदात्मनात्मानं...", meaning: "Elevate yourself. Do not depend on others.", quote: "\"No one is coming to save you. This life is 100% your responsibility.\"", affirmation: "I am completely self-sufficient. I trust my own ability to create a beautiful life." },
    perfectionism: { shlok: "सर्वारम्भा हि दोषेण धूमेनाग्निरिवावृताः।", meaning: "Do not halt action seeking perfection.", quote: "\"Done is better than perfect. Execute and iterate.\"", affirmation: "I value continuous progress over perfection. I am proud of my daily efforts." },
    boredom: { shlok: "युक्ताहारविहारस्य... योगो भवति दुःखहा।", meaning: "Regulate your habits to find joy.", quote: "\"Boredom is a lack of attention, not a lack of activities.\"", affirmation: "I am surrounded by endless opportunities to learn, grow, and experience joy." },
    nervousness: { shlok: "मयि सर्वाणि कर्माणि सन्न्यस्याध्यात्मचेतसा।", meaning: "Fight without mental fever.", quote: "\"Nervousness is just excitement without breath. Breathe deeply.\"", affirmation: "I transform my nerves into pure excitement. I am fully prepared and ready to shine." },
    bad_habits: { shlok: "इन्द्रियस्येन्द्रियस्यार्थे रागद्वेषौ व्यवस्थितौ।", meaning: "Do not come under the control of bad habits.", quote: "\"You are what you repeatedly do. Build habits that build you.\"", affirmation: "I am breaking old chains. I build healthy habits that align with my highest self." },
    financial_stress: { shlok: "योगक्षेमं वहाम्यहम्।", meaning: "I carry what they lack, and I preserve what they have.", quote: "\"Abundance is a mindset. Focus on creating value, and money will follow.\"", affirmation: "Money flows to me easily and frequently. I am financially secure, smart, and abundant." },
    health_anxiety: { shlok: "शरीरं यदवाप्नोति...।", meaning: "The soul is eternal. Do not let bodily fears consume you.", quote: "\"Your body hears everything your mind says. Stay positive to heal.\"", affirmation: "Every cell in my body vibrates with energy and perfect health. I am deeply healed." },
    trust_issues: { shlok: "संशयात्मा विनश्यति।", meaning: "The doubting person goes to ruin.", quote: "\"Trust takes years to build, seconds to break. Trust wisely.\"", affirmation: "I trust my intuition to guide me to honest, loving, and highly trustworthy people." },
    surrender: { shlok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।", meaning: "Surrender completely and you will be protected.", quote: "\"Sometimes the greatest power is simply letting go and trusting the universe.\"", affirmation: "I surrender my worries to the universe. I am supported, guided, and divinely protected." }
};

const booksData = {
    alone: { title: "The Art of Being Alone", core: "\"Solitude is where your true self wakes up.\"", takeaways: ["Validation external sources se lena band karein", "Aloneness self-reflection ki energy deti hai", "Boundaries set karna seekhein"] },
    money: { title: "The Psychology of Money", core: "\"Doing well with money isn't necessarily about what you know. It's about how you behave.\"", takeaways: ["Wealth use kehte hain jo dikhti nahi", "Compounding ka real magic patience mein chhupa hai", "Financial decisions peace of mind par depend hone chahiye"] },
    subconscious: { title: "The Power of Your Subconscious Mind", core: "\"Whatever your conscious mind assumes and believes to be true, your subconscious will manifest.\"", takeaways: ["Subconscious logic nahi samajhta — sirf inner feelings", "Sote waqt Alpha state mein affirmations bohot jaldi shift karte hain", "Daily gratitude sabse tezi se asar dikhane wali medicine hai"] },
    alchemist: { title: "The Alchemist", core: "\"When you want something, all the universe conspires in helping you to achieve it.\"", takeaways: ["Apna 'Personal Legend' pehchanein", "Journey mein hurdles aapko mentally transform karne aati hain", "Present moment mein jeena seekhein"] }
};

const timeBasedVibes = {
    morning: { greeting: "Good Morning", icon: "🌅", quote: "\"A beautiful day begins with a beautiful mindset. Feed it positive affirmations now!\"" },
    afternoon: { greeting: "Good Afternoon", icon: "☀️", quote: "\"Pause, take a deep breath. Peace is a continuous daily process.\"" },
    evening: { greeting: "Good Evening", icon: "🌙", quote: "\"End the day with a grateful heart. Let go of whatever happened today.\"" }
};

// =====================================
// ---- 3. UI & STATE LOGIC ----
// =====================================

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

function updateWordCount(el, targetId) {
    const words = el.value.trim() === '' ? 0 : el.value.trim().split(/\s+/).length;
    const el2 = document.getElementById(targetId);
    if (el2) el2.innerText = `${words} word${words !== 1 ? 's' : ''}`;
    localStorage.setItem(el.id, el.value);
}

function saveJournal() {
    ['morningJournal','afternoonJournal','eveningJournal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) localStorage.setItem(id, el.value);
    });
    const today = new Date().toDateString();
    const lastSave = localStorage.getItem('lastJournalDate');
    let streak = parseInt(localStorage.getItem('journalStreak') || '0');
    if (lastSave !== today) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        streak = (lastSave === yesterday.toDateString()) ? streak + 1 : 1;
        localStorage.setItem('journalStreak', streak);
        localStorage.setItem('lastJournalDate', today);
    }
    let count = parseInt(localStorage.getItem('journalEntryCount') || '0') + 1;
    localStorage.setItem('journalEntryCount', count);
    updateStats();
    const ind = document.getElementById('saveIndicator');
    ind.classList.add('visible');
    setTimeout(() => ind.classList.remove('visible'), 2500);
}

function updateStats() {
    document.getElementById('streakCount').innerText = localStorage.getItem('journalStreak') || '0';
    document.getElementById('journalCount').innerText = localStorage.getItem('journalEntryCount') || '0';
    const logs = JSON.parse(localStorage.getItem('manifestHistoryLogs') || '[]');
    document.getElementById('manifestCount').innerText = logs.length;
}

const moodAdvice = {
    Happy: { emotion: 'happiness', bgClass: 'mood-happy-bg', tip: '✨ Is khushi ko affirmations mein use karo!', title: 'Khushi ka Geeta Gyaan' },
    Stressed: { emotion: 'anxiety', bgClass: 'mood-stressed-bg', tip: '🌬️ Breathing Exercise try karo aur journal mein stress release karo.', title: 'Tension door karo' },
    Sad: { emotion: 'sadness', bgClass: 'mood-sad-bg', tip: '💜 Evening journal mein sirf 3 cheezein likho jo theek rahi.', title: 'Udaasi mein Geeta ka sahara' },
    Calm: { emotion: 'peace', bgClass: 'mood-calm-bg', tip: '🧘 Yeh perfect waqt hai deep work ke liye.', title: 'Shanti ka Sandesh' },
    Motivated: { emotion: 'confidence', bgClass: 'mood-motivated-bg', tip: '🚀 Is energy ko zaaya mat karo! Abhi Manifestation shuru karo.', title: 'Josh mein shakti' }
};

function selectMood(btn, emoji, mood) {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const today = new Date().toDateString();
    localStorage.setItem('todayMood', JSON.stringify({ mood, emoji, date: today }));
    showMoodSuggestion(mood, emoji);
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
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function loadTodayMood() {
    const saved = localStorage.getItem('todayMood');
    if (!saved) return;
    const data = JSON.parse(saved);
    if (data.date !== new Date().toDateString()) return;
    document.querySelectorAll('.mood-btn').forEach(btn => {
        if (btn.dataset.mood === data.mood) btn.classList.add('selected');
    });
    showMoodSuggestion(data.mood, data.emoji);
}

let breathTimer = null;
function startBreathing() {
    if (breathTimer) clearTimeout(breathTimer);
    const circle = document.getElementById('breathCircle');
    const instr = document.getElementById('breathInstruct');
    const steps = [
        { phase: 'inhale', label: 'Inhale...', dur: 4000, text: 'Naak se gehri saans lo (4 sec)' },
        { phase: 'hold', label: 'Hold...', dur: 7000, text: 'Saans roko (7 sec)' },
        { phase: 'exhale', label: 'Exhale...', dur: 8000, text: 'Muh se dhire dhire chodho (8 sec)' }
    ];
    let i = 0;
    function runStep() {
        const step = steps[i % steps.length];
        circle.className = 'breath-circle ' + step.phase;
        circle.innerText = step.label;
        instr.innerText = step.text;
        breathTimer = setTimeout(() => {
            i++;
            if (i < steps.length * 3) runStep();
            else { circle.className = 'breath-circle'; circle.innerText = 'Done ✓'; instr.innerText = 'Aap bohot relaxed feel karoge ab. Wah! 🌿'; }
        }, step.dur);
    }
    runStep();
}

function showBookSummary(bookKey, el) {
    document.querySelectorAll('.book-item').forEach(b => b.classList.remove('active-book'));
    el.classList.add('active-book');
    const resultDiv = document.getElementById('bookResult');
    if (!booksData[bookKey]) { resultDiv.style.display = 'none'; return; }
    const book = booksData[bookKey];
    document.getElementById('bookHeading').innerText = `📖 ${book.title}`;
    document.getElementById('bookCoreLesson').innerText = book.core;
    const listArea = document.getElementById('bookTakeaways');
    listArea.innerHTML = '';
    book.takeaways.forEach((point, i) => {
        const li = document.createElement('li');
        li.innerText = `${i + 1}. ${point}`;
        listArea.appendChild(li);
    });
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

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

function smashStress() {
    const input = document.getElementById('stressInput');
    if (!input.value.trim()) { alert('Pehle apna stress likho!'); return; }
    const particles = document.getElementById('smashParticles');
    particles.innerHTML = '';
    const emojis = ['💥', '✨', '⚡', '🔥', '💫', '🌟'];
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        const x = (Math.random() - 0.5) * 200;
        const y = -(Math.random() * 100 + 50);
        p.style.setProperty('--fly-to', `translate(${x}px, ${y}px)`);
        p.style.left = `${Math.random() * 80 + 10}%`;
        p.style.top = '0';
        p.style.animationDelay = `${Math.random() * 0.3}s`;
        particles.appendChild(p);
    }
    input.classList.remove('smash-hit-anim');
    void input.offsetWidth;
    input.classList.add('smash-hit-anim');
    setTimeout(() => { input.value = ''; input.className = ''; }, 850);
}

const manifestMethods = ['333', '369', '555'];
function addManifestEntry(method, targetCount) {
    const input = document.getElementById(`input${method}`);
    const text = input.value.trim();
    if (!text) { alert('Pehle apni core desire likho!'); return; }
    let entries = JSON.parse(localStorage.getItem(`listData${method}`)) || [];
    if (entries.length >= targetCount) { alert('Target already achieved! Clear karo ya history check karo.'); return; }
    entries = Array(targetCount).fill(text);
    localStorage.setItem(`listData${method}`, JSON.stringify(entries));
    input.value = '';
    renderManifestList(method);
    setTimeout(() => archiveCompletedManifest(method, text, targetCount), 400);
}
function renderManifestList(method) {
    const container = document.getElementById(`list${method}`);
    const badge = document.getElementById(`count${method}`);
    const entries = JSON.parse(localStorage.getItem(`listData${method}`)) || [];
    const target = method === '333' ? 33 : method === '369' ? 18 : 55;
    badge.innerText = `${entries.length} / ${target}`;
    badge.className = entries.length >= target ? 'counter-badge done' : 'counter-badge';
    container.innerHTML = '';
    entries.forEach((text, i) => {
        const row = document.createElement('div');
        row.className = 'manifest-row';
        row.innerHTML = `<span class="row-index-badge">#${i + 1}</span><span>${text}</span>`;
        container.appendChild(row);
    });
    container.scrollTop = container.scrollHeight;
}
function archiveCompletedManifest(method, coreDesire, totalCount) {
    let history = JSON.parse(localStorage.getItem('manifestHistoryLogs')) || [];
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    history.push({ method, text: coreDesire, date: dateStr, reps: totalCount });
    localStorage.setItem('manifestHistoryLogs', JSON.stringify(history));
    localStorage.removeItem(`listData${method}`);
    updateStats();
    alert(`✨ Kya baat hai! Aapne ${totalCount} repetitions complete kar liye. History mein save ho gaya!`);
    renderManifestList(method);
    loadManifestHistory();
}
function loadManifestHistory() {
    const box = document.getElementById('manifestHistoryBox');
    const listArea = document.getElementById('historyLogList');
    const history = JSON.parse(localStorage.getItem('manifestHistoryLogs')) || [];
    if (history.length > 0) {
        box.style.display = 'block';
        listArea.innerHTML = '';
        [...history].reverse().forEach(log => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `🏆 <b>Method ${log.method} Success:</b> "${log.text}" <br><small style="color:var(--muted);">Completed on ${log.date} (${log.reps} lines)</small>`;
            listArea.appendChild(div);
        });
    } else { box.style.display = 'none'; }
}
function clearManifest(method) {
    if (confirm(`${method} method ki entries clear karein?`)) { localStorage.removeItem(`listData${method}`); renderManifestList(method); }
}

function switchTab(tabId, clicked) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active-tab'));
    document.getElementById(tabId).classList.add('active-tab');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active-nav'));
    clicked.classList.add('active-nav');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const initialLeaderboard = [
    { name: "Rahul S.", points: 1450 }, { name: "Priya M.", points: 1220 }, { name: "Amit K.", points: 850 },
];
const initialGratitudeFeed = [
    { name: "Rahul S.", text: "Grateful for the peace I found in my morning meditation today.", time: "2 hrs ago" },
    { name: "Priya M.", text: "Thankful for the new opportunity. The universe is responding!", time: "5 hrs ago" }
];
function getStatus(points) {
    if (points >= 1000) return "Rising Star ✨";
    if (points >= 500) return "Mindset Master";
    return "Starter";
}
function renderCommunity() {
    let myPoints = parseInt(localStorage.getItem('myCommunityPoints') || '250');
    const lbContainer = document.getElementById('leaderboardList');
    if(!lbContainer) return;
    lbContainer.innerHTML = '';
    let board = [...initialLeaderboard];
    board.push({ name: "You", points: myPoints, isMe: true });
    board.sort((a, b) => b.points - a.points);
    board.forEach((user, index) => {
        let rank = index + 1;
        const div = document.createElement('div');
        div.className = `rank-item rank-${rank} ${user.isMe ? 'is-me' : ''}`;
        div.innerHTML = `
            <div class="rank-badge">${rank}</div>
            <div class="rank-info">
                <div class="rank-name">${user.name}</div>
                <div class="rank-points">${user.points} XP</div>
            </div>
            <div class="rank-status">${getStatus(user.points)}</div>
        `;
        lbContainer.appendChild(div);
    });
    renderGratitudeFeed();
}
function renderGratitudeFeed() {
    const feed = document.getElementById('gratitudeFeed');
    if(!feed) return;
    feed.innerHTML = '';
    const savedPosts = JSON.parse(localStorage.getItem('myGratitudePosts') || '[]');
    const allPosts = [...savedPosts, ...initialGratitudeFeed]; 
    allPosts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'gratitude-post';
        div.innerHTML = `
            <div class="gratitude-post-user">
                <span>👤 ${post.name}</span>
                <span>${post.time}</span>
            </div>
            <div class="gratitude-post-text">"${post.text}"</div>
        `;
        feed.appendChild(div);
    });
}
function postPublicGratitude() {
    const input = document.getElementById('publicGratitudeInput');
    const text = input.value.trim();
    if(!text) { alert("Please write your gratitude first."); return; }
    const newPost = { name: "You", text: text, time: "Just now" };
    let savedPosts = JSON.parse(localStorage.getItem('myGratitudePosts') || '[]');
    savedPosts.unshift(newPost);
    localStorage.setItem('myGratitudePosts', JSON.stringify(savedPosts));
    let myPoints = parseInt(localStorage.getItem('myCommunityPoints') || '250');
    myPoints += 10;
    localStorage.setItem('myCommunityPoints', myPoints);
    input.value = '';
    renderCommunity();
    alert("✨ Awesome! +10 XP earned. You are climbing the leaderboard!");
}

// ---- NEW SCREEN LOGIC: AFFIRMATION VAULT ----
function openAffirmationVault() {
    document.getElementById('affirmationVault').classList.add('active');
    document.body.style.overflow = 'hidden'; 
}
function closeAffirmationVault() {
    document.getElementById('affirmationVault').classList.remove('active');
    document.body.style.overflow = 'auto'; 
}
function copyQuickAff(element) {
    const text = element.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("✨ Copied: \"" + text + "\"\nAb isko Manifest tab (🚀) mein use karein!");
    }).catch(err => { console.error('Copy failed: ', err); });
}
function scrollToCategory(categoryId) {
    const element = document.getElementById(categoryId);
    const modalBody = document.getElementById('affModalBody');
    if(element && modalBody) {
        modalBody.scrollTo({ top: element.offsetTop - 20, behavior: 'smooth' });
    }
}

// =====================================
// ---- INIT (ON PAGE LOAD) ----
// =====================================
window.onload = function() {
    if (localStorage.getItem('appTheme') === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').innerText = '🌙';
    }
    updateTimeVibe();
    getThoughtOfTheDay();
    loadTodayMood();
    updateStats();
    renderCommunity();

    ['morningJournal','afternoonJournal','eveningJournal'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const saved = localStorage.getItem(id);
        if (saved) {
            el.value = saved;
            const wcId = id === 'morningJournal' ? 'wc-morning' : id === 'afternoonJournal' ? 'wc-afternoon' : 'wc-evening';
            updateWordCount(el, wcId);
        }
        el.addEventListener('input', () => {
            const wcId = id === 'morningJournal' ? 'wc-morning' : id === 'afternoonJournal' ? 'wc-afternoon' : 'wc-evening';
            updateWordCount(el, wcId);
        });
    });

    manifestMethods.forEach(m => renderManifestList(m));
    loadManifestHistory();
};

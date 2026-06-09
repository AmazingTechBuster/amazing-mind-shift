// =====================================
// ---- 1. DATA LIBRARIES ----
// =====================================

// 50 Daily Thoughts
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

// 50 Geeta Wisdom Data
const wisdomData = {
    anxiety: { shlok: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", meaning: "You have the right to perform your duty, but no control over the results. Focus on action, not the outcome.", quote: "\"Overthinking ruins you. Action cures fear.\"" },
    anger: { shlok: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।", meaning: "Anger leads to clouding of judgment, which results in bewilderment of memory and destruction of intellect.", quote: "\"For every minute you are angry, you lose sixty seconds of peace.\"" },
    sadness: { shlok: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।", meaning: "Pleasures and pains are temporary, like the coming and going of winter and summer. Endure them.", quote: "\"Tears are just a reminder that you have a heart. Healing takes time.\"" },
    confusion: { shlok: "तस्मादज्ञानसम्भूतं हृत्स्थं ज्ञानासिनात्मनः।", meaning: "With the sword of knowledge, cut apart the doubts that have arisen from ignorance.", quote: "\"Clarity comes from engagement, not just thought.\"" },
    fear: { shlok: "अभयं सत्त्वसंशुद्धिः ज्ञानयोगव्यवस्थितिः।", meaning: "Fearlessness and purification of existence are divine qualities. True knowledge removes fear.", quote: "\"Everything you've ever wanted is sitting on the other side of fear.\"" },
    greed: { shlok: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।", meaning: "Lust, anger, and greed are the three gates to hell. Give them up to save yourself.", quote: "\"He who is not contented with what he has, will never be contented.\"" },
    ego: { shlok: "अहङ्कारं बलं दर्पं कामं क्रोधं च संश्रिताः।", meaning: "Bewildered by false ego, pride, and arrogance, one falls from grace.", quote: "\"Ego is the false self. True confidence requires zero arrogance.\"" },
    laziness: { shlok: "नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।", meaning: "Perform your prescribed duty, for doing so is always better than doing nothing.", quote: "\"Motivation gets you going, but discipline keeps you growing.\"" },
    happiness: { shlok: "योऽन्तःसुखोऽन्तरारामस्तथान्तर्ज्योतिरेव यः।", meaning: "One whose happiness is within, who rejoices within, attains the Supreme.", quote: "\"True happiness is not out there, it's in you.\"" },
    peace: { shlok: "आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत्।", meaning: "Like rivers entering a still ocean, a person undisturbed by desires achieves pure peace.", quote: "\"Peace is the result of retraining your mind to process life as it is.\"" },
    selflove: { shlok: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।", meaning: "Elevate yourself through the power of your mind, and do not degrade yourself.", quote: "\"You yourself deserve your love and affection more than anyone.\"" },
    confidence: { shlok: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।", meaning: "Do not yield to weakness; it does not befit you. Shake off this faint-heartedness and arise!", quote: "\"Confidence isn't thinking you are better; it's realizing you don't need to compare.\"" },
    positivity: { shlok: "प्रसादे सर्वदुःखानां हानिरस्योपजायते।", meaning: "By attaining a peaceful and positive state of mind, all sorrows are destroyed.", quote: "\"A positive mindset brings positive things.\"" },
    jealousy: { shlok: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।", meaning: "One who is not envious but is a kind friend to all living entities is very dear to Me.", quote: "\"A flower does not think of competing with the flower next to it. It just blooms.\"" },
    guilt: { shlok: "अपि चेत्सुदुराचारो भजते मामनन्यभाक्।", meaning: "Even if one commits the worst mistakes, if they return to the right path with devotion, they are considered saintly.", quote: "\"Your past mistakes are meant to guide you, not define you.\"" },
    loneliness: { shlok: "सर्वभूतस्थमात्मानं सर्वभूतानि चात्मनि।", meaning: "The true yogi observes Me in all beings and all beings in Me. You are never truly alone.", quote: "\"Solitude is dangerous. It's very addictive. It becomes a peaceful habit.\"" },
    grief: { shlok: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च।", meaning: "Death is certain for one who is born, and birth is certain for one who dies. Do not grieve over the inevitable.", quote: "\"Grief is just love with no place to go.\"" },
    distraction: { shlok: "व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन।", meaning: "Those who are on this path are resolute in purpose, and their aim is one. Distracted minds have endless goals.", quote: "\"Starve your distractions. Feed your focus.\"" },
    impatience: { shlok: "शनैः शनैरुपरमेद्बुद्ध्या धृतिगृहीतया।", meaning: "Gradually, step by step, with conviction and patience, one should attain mental stillness.", quote: "\"Patience is not the ability to wait, but the ability to keep a good attitude while waiting.\"" },
    failure: { shlok: "सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते।", meaning: "Perform your duty equipped with yoga, abandoning attachment to success or failure. Such equanimity is called Yoga.", quote: "\"Failure is a detour, not a dead-end street.\"" },
    success: { shlok: "नाहं प्रकाशः सर्वस्य योगमायासमावृतः।", meaning: "Stay humble. Do not let success create an illusion of immortality. True success is internal control.", quote: "\"Success is empty if you arrive at the finish line alone and arrogant.\"" },
    betrayal: { shlok: "उद्धरेदात्मनात्मानं... आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः।", meaning: "You alone are your best friend, and you alone are your worst enemy. Rely on your inner self.", quote: "\"Sometimes good things fall apart so better things can fall together.\"" },
    insult: { shlok: "तुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित्।", meaning: "One who remains calm in praise and blame, and is silent and satisfied, is dear to Me.", quote: "\"How people treat you is their karma; how you react is yours.\"" },
    comparison: { shlok: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।", meaning: "It is better to perform your own duties imperfectly than to master the duties of another.", quote: "\"Comparison is the thief of joy.\"" },
    overwhelm: { shlok: "मच्चित्तः सर्वदुर्गाणि मत्प्रसादात्तरिष्यसि।", meaning: "By becoming conscious of the Supreme, you will pass over all the obstacles of conditioned life.", quote: "\"Take it one day, one step, and one breath at a time.\"" },
    lust: { shlok: "काम एष क्रोध एष रजोगुणसमुद्भवः।", meaning: "It is lust only, born of contact with the material mode of passion, which later transforms into wrath.", quote: "\"Master your senses, or your senses will master your future.\"" },
    unforgiving: { shlok: "क्षमा सत्यं दमः शमः... भवन्ति भावा भूतानाम्।", meaning: "Forgiveness, truthfulness, control of senses, and mind—these qualities elevate a human.", quote: "\"To forgive is to set a prisoner free and discover that the prisoner was you.\"" },
    uncertainty: { shlok: "अज्ञानेनावृतं ज्ञानं तेन मुह्यन्ति जन्तवः।", meaning: "Embodied beings are bewildered because their true knowledge is covered by ignorance and uncertainty.", quote: "\"The quality of your life is directly related to how much uncertainty you can comfortably handle.\"" },
    purposeless: { shlok: "स्वे स्वे कर्मण्यभिरतः संसिद्धिं लभते नरः।", meaning: "By following one's own natural qualities of work, every person can become perfect.", quote: "\"Your purpose will find you when you stop looking for it and start building yourself.\"" },
    unappreciated: { shlok: "कर्मण्येवाधिकारस्ते... मा ते सङ्गोऽस्त्वकर्मणि।", meaning: "Do your work without expecting praise or fruits. Do not let lack of appreciation stop your effort.", quote: "\"Work hard in silence. Let your success be your noise.\"" },
    hate: { shlok: "निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव।", meaning: "One who is without animosity or hate toward any living being is guaranteed to achieve peace.", quote: "\"Holding onto hate is like drinking poison and expecting the other person to die.\"" },
    helplessness: { shlok: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।", meaning: "Whenever there is a decline in righteousness, the divine energy manifests to uplift the helpless.", quote: "\"Rock bottom has built more heroes than privilege ever did.\"" },
    toxic_attachment: { shlok: "सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते।", meaning: "From toxic attachment develops obsessive desire, and from unfulfilled desire arises destructive anger.", quote: "\"Letting go doesn't mean you don't care about someone anymore. It's realizing you can only control yourself.\"" },
    stubbornness: { shlok: "अहङ्कारमाश्रित्य न योत्स्य इति मन्यसे।", meaning: "If, driven by stubborn pride, you think 'I shall not change,' your resolve will be in vain.", quote: "\"Flexibility is the greatest strength. A tree that bends survives the storm.\"" },
    complaining: { shlok: "अनाश्रितः कर्मफलं कार्यं कर्म करोति यः।", meaning: "One who works silently without complaining about the fruits of his labor is a true sanyasi.", quote: "\"If you have time to whine and complain about something, you have the time to do something about it.\"" },
    materialistic: { shlok: "भोगाश्वर्यप्रसक्तानां तयापहृतचेतसाम्।", meaning: "In the minds of those who are too attached to material enjoyment, resolute determination never takes place.", quote: "\"Things you own end up owning you. Detach to be free.\"" },
    gossip: { shlok: "अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।", meaning: "Austerity of speech consists in speaking words that are truthful, pleasing, beneficial, and not agitating.", quote: "\"Great minds discuss ideas; average minds discuss events; small minds discuss people.\"" },
    judgemental: { shlok: "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि... पण्डिताः समदर्शिनः।", meaning: "The humble sages, by virtue of true knowledge, see with equal vision and do not judge superficially.", quote: "\"When you judge another, you do not define them, you define yourself.\"" },
    revenge: { shlok: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।", meaning: "Set an example. Do not fall to the level of taking revenge. Elevate your actions.", quote: "\"The best revenge is massive success and total internal peace.\"" },
    fake: { shlok: "कर्मेन्द्रियाणि संयम्य य आस्ते मनसा स्मरन्... स मिथ्याचार उच्यते।", meaning: "One who restrains the senses but whose mind dwells on sense objects is called a hypocrite.", quote: "\"Authenticity is the most attractive quality. Stop pretending.\"" },
    dependency: { shlok: "उद्धरेदात्मनात्मानं...", meaning: "You must elevate yourself by your own effort. Do not depend on others for your rise or fall.", quote: "\"No one is coming to save you. This life is 100% your responsibility.\"" },
    perfectionism: { shlok: "सर्वारम्भा हि दोषेण धूमेनाग्निरिवावृताः।", meaning: "Every endeavor is covered by some fault, just as fire is covered by smoke. Do not halt action seeking perfection.", quote: "\"Done is better than perfect. Execute and iterate.\"" },
    boredom: { shlok: "युक्ताहारविहारस्य... योगो भवति दुःखहा।", meaning: "He who is regulated in his habits of eating, sleeping, working, and recreation can mitigate all material pains.", quote: "\"Boredom is a lack of attention, not a lack of activities. Focus deeply.\"" },
    nervousness: { shlok: "मयि सर्वाणि कर्माणि सन्न्यस्याध्यात्मचेतसा।", meaning: "Dedicate all your activities to the higher purpose, free from egoism, and fight without mental fever.", quote: "\"Nervousness is just excitement without breath. Breathe deeply.\"" },
    bad_habits: { shlok: "इन्द्रियस्येन्द्रियस्यार्थे रागद्वेषौ व्यवस्थितौ।", meaning: "There are principles to regulate attachment and aversion to sensory objects. Do not come under their control.", quote: "\"You are what you repeatedly do. Build habits that build you.\"" },
    financial_stress: { shlok: "योगक्षेमं वहाम्यहम्।", meaning: "For those who are constantly devoted, I carry what they lack, and I preserve what they have.", quote: "\"Abundance is a mindset. Focus on creating value, and money will follow.\"" },
    health_anxiety: { shlok: "शरीरं यदवाप्नोति...।", meaning: "The soul is eternal; the body is temporary. Care for it, but do not let bodily fears consume your intellect.", quote: "\"Your body hears everything your mind says. Stay positive to heal.\"" },
    trust_issues: { shlok: "संशयात्मा विनश्यति।", meaning: "The ignorant, the faithless, and the doubting person goes to ruin. Trust the universal process.", quote: "\"Trust takes years to build, seconds to break, and forever to repair. Trust wisely.\"" },
    surrender: { shlok: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।", meaning: "Abandon all varieties of material fears and simply surrender unto the Supreme truth. You will be protected.", quote: "\"Sometimes the greatest power is simply letting go and trusting the universe.\"" }
};

const booksData = {
    alone: {
        title: "The Art of Being Alone",
        core: "\"Solitude is where your true self wakes up. Loneliness is a weakness, but solitude is your ultimate power block.\"",
        takeaways: ["Validation external sources se lena band karein — apna mind stable karo", "Aloneness self-reflection aur clear decision-making ki energy deti hai", "Apni energy conserve karein aur faltu social noise se khud ko protect karein", "Akelepan ko saza nahi, balki mental upgrading ka powerful tool samjhein", "Akele hone par aapki true inner voice bina filter ke baat karti hai", "Apni khud ki company enjoy karna seekhein, emotional dependency khatam hogi", "Daily thoda waqt silence mein bitayein — nervous system reset hota hai", "Boundaries set karna seekhein; easily available rehna aapki value kam karta hai"]
    },
    money: {
        title: "The Psychology of Money",
        core: "\"Doing well with money isn't necessarily about what you know. It's about how you behave.\"",
        takeaways: ["Wealth use kehte hain jo dikhti nahi — unbought items, asset preservation, financial freedom", "Compounding ka real magic patience aur consistency mein chhupa hai", "Ego ko kam karna hi financial security ko extend karne ka best formula hai", "Amir banna aur amir bane rehna dono alag skills hain; survival ke liye humility zaroori hai", "Show-off waste hai — log apni khud ki story mein khud ko project karte hain", "Paisa aapko sabse badi jo power deta hai wo hai time par apna control", "Financial decisions peace of mind par depend hone chahiye, not Excel sheets", "Apne financial goals doosron se compare mat karein — har kisi ka game alag hota hai"]
    },
    subconscious: {
        title: "The Power of Your Subconscious Mind",
        core: "\"Whatever your conscious mind assumes and believes to be true, your subconscious will manifest.\"",
        takeaways: ["Subconscious logic nahi samajhta — sirf inner feelings aur clear visuals process karta hai", "Sote waqt Alpha state mein affirmations deep neural patterns bohot jaldi shift karte hain", "Fear sirf dimag ke design hain — positive thoughts se replace karke crush karo", "Aapka subconscious 24/7 aapke deep thoughts par kaam karta rehta hai", "Pure belief ke sath soch lo, dimag reality banane ke raste khud dhoondh lega", "'Main nahi kar sakta' bolne se subconscious wahi block bana deta hai — words carefully chunein", "Forgiveness aur let-go manifestation processing speed 10x badhata hai", "Daily gratitude aur positive self-talk sabse tezi se asar dikhane wali medicine hai"]
    },
    alchemist: {
        title: "The Alchemist",
        core: "\"When you want something, all the universe conspires in helping you to achieve it.\"",
        takeaways: ["Apna 'Personal Legend' pehchanein aur nature ke signals padhna seekhein", "Journey mein hurdles aapko destroy nahi, mentally transform karne aati hain", "Darr hi raste ka sabse bada pahaad hai — darr se aage jao, action lo", "Shiddat se chahne par poori kaynaat us cheez ko aapse milane mein lag jati hai", "Present moment mein jeena seekhein — yahi real happiness ka secret hai", "Failure koi end nahi — sirf feedback hai jo sahi raaste par laata hai", "Apne dil ki aawaz sunna seekhein, wo hamesha janta hai aap kya deserve karte ho", "Sabse badi jhooth: life destiny ke control mein hai. Aap apne creator khud hain"]
    }
};

const timeBasedVibes = {
    morning: { greeting: "Good Morning", icon: "🌅", quote: "\"A beautiful day begins with a beautiful mindset. Your subconscious is fully awake — feed it positive affirmations now!\"" },
    afternoon: { greeting: "Good Afternoon", icon: "☀️", quote: "\"Pause, take a deep breath. Peace is a continuous daily process. You are doing absolutely amazing.\"" },
    evening: { greeting: "Good Evening", icon: "🌙", quote: "\"End the day with a grateful heart. Let go of whatever happened today — your mind deserves deep healing rest.\"" }
};

// =====================================
// ---- 2. UI & STATE LOGIC ----
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

// ---- MOOD TRACKER ----
const moodWiseData = {
    Happy: { emotion: 'happiness', bgClass: 'mood-happy-bg', tip: '✨ <strong>Happy mood tip:</strong> Is khushi ko affirmations mein use karo! 333 technique mein ek positive desire likho.', title: 'Khushi ka Geeta Gyaan' },
    Stressed: { emotion: 'anxiety', bgClass: 'mood-stressed-bg', tip: '🌬️ <strong>Stress relief tip:</strong> Breathing Exercise try karo. Phir journal mein apna stress likh ke release karo.', title: 'Tension door karo' },
    Sad: { emotion: 'sadness', bgClass: 'mood-sad-bg', tip: '💜 <strong>Sadness tip:</strong> Evening journal mein sirf 3 cheezein likho jo theek rahi. Aap akele nahi ho.', title: 'Udaasi mein Geeta ka sahara' },
    Calm: { emotion: 'peace', bgClass: 'mood-calm-bg', tip: '🧘 <strong>Calm tip:</strong> Yeh perfect waqt hai deep work ke liye. Morning Intention set karo.', title: 'Shanti ka Sandesh' },
    Motivated: { emotion: 'confidence', bgClass: 'mood-motivated-bg', tip: '🚀 <strong>Motivated tip:</strong> Is energy ko zaaya mat karo! Abhi Manifestation shuru karo.', title: 'Josh mein shakti' }
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
    const data = moodWiseData[mood];
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

// ---- BREATHING ----
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
            else {
                circle.className = 'breath-circle';
                circle.innerText = 'Done ✓';
                instr.innerText = 'Aap bohot relaxed feel karoge ab. Wah! 🌿';
            }
        }, step.dur);
    }
    runStep();
}

// ---- BOOKS & WISDOM ----
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
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else { resultDiv.style.display = 'none'; }
}

// ---- SMASHER ----
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

// ---- MANIFESTATION ----
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
            div.innerHTML = `🏆 <b>Method ${log.method} Success:</b> "${log.text}" <br><small style="color:#64748b;">Completed on ${log.date} (${log.reps} lines)</small>`;
            listArea.appendChild(div);
        });
    } else { box.style.display = 'none'; }
}

function clearManifest(method) {
    if (confirm(`${method} method ki entries clear karein?`)) {
        localStorage.removeItem(`listData${method}`);
        renderManifestList(method);
    }
}

// ---- TAB SWITCHING ----
function switchTab(tabId, clicked) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active-tab'));
    document.getElementById(tabId).classList.add('active-tab');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active-nav'));
    clicked.classList.add('active-nav');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- IN-APP BROWSER ----
function openInAppBrowser() {
    document.getElementById('inAppBrowser').classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeInAppBrowser() {
    document.getElementById('inAppBrowser').classList.remove('active');
    document.body.style.overflow = 'auto'; 
}

// ---- COMMUNITY & LEADERBOARD ----
const initialLeaderboard = [
    { name: "Rahul S.", points: 1450 },
    { name: "Priya M.", points: 1220 },
    { name: "Amit K.", points: 850 },
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

// =====================================
// ---- INIT (ON PAGE LOAD) ----
// =====================================
window.onload = function() {
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
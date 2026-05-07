// chat-data.js — Zakaria Obazzi Portfolio Chatbot
// Fully enhanced: typo normalizer + 100+ keyword entries

// ── Typo / alias normalizer (runs before every match) ──────────────────────
function _normalize(t) {
  return t
    // greeting typos
    .replace(/\bh[aeiou]*l+o+\b/g, 'hello')
    .replace(/\bh[iy]+\b/g, 'hi')
    .replace(/\bhe+y+\b/g, 'hey')
    // skill typos
    .replace(/\bskil{1,3}s?\b/g, 'skills')
    .replace(/\bpyh?ton\b|\bpytohn\b|\bpyhon\b/g, 'python')
    .replace(/\bjavascir?pt\b|\bjavscript\b/g, 'javascript')
    .replace(/\bexperianc?e?\b|\bexperinc?e?\b/g, 'experience')
    // project typos
    .replace(/\bprojet[cst]{0,3}\b|\bprojcets?\b/g, 'projects')
    .replace(/\bport[a-z]{0,5}fo[a-z]*o\b|\bportf[a-z]*io\b/g, 'portfolio')
    // French → English
    .replace(/\bcomp[eé]tences?\b/g, 'skills')
    .replace(/\bformation\b/g, 'education')
    .replace(/\bdisponible\b|\bdispo\b/g, 'available')
    .replace(/\bstage\b/g, 'internship')
    .replace(/\bprojets?\b/g, 'projects')
    .replace(/\blangues?\b/g, 'languages')
    .replace(/\bprofil\b/g, 'profile')
    .replace(/\bexp[eé]rience\b/g, 'experience')
    .replace(/\bfram[e]?works?\b/g, 'frameworks')
    .replace(/\bparlez.*(vous|moi).*fran[cç]ais\b|\bparlez.fran[cç]ais\b/g, 'speak french')
    // Arabic common words → english triggers
    .replace(/مرحبا|أهلا|السلام/g, 'hello')
    .replace(/من أنت|ما اسمك/g, 'who are you')
    .replace(/ما مهاراتك|المهارات/g, 'skills')
    .replace(/مشاريع/g, 'projects')
    .replace(/التواصل|كيف أتواصل/g, 'contact')
    // shorthand
    .replace(/\bcv\b|\bresume\b|\bvita\b|\bcurriculum\b/g, 'resume')
    .replace(/\bml\b/g, 'machine learning')
    .replace(/\b(?<![a-z])ai(?![a-z])\b/g, 'artificial intelligence')
    .replace(/\bjs\b/g, 'javascript')
    .replace(/\bdb\b/g, 'database')
    .replace(/\binfo\b/g, 'about')
    .replace(/\bbio\b/g, 'about')
    .replace(/\bprofil?e?\b/g, 'about')
    .replace(/\bthx\b|\bty\b|\bthnks?\b/g, 'thanks')
    .replace(/\blol\b|\blmao\b|\bhaha\b/g, 'funny')
    .replace(/\bwya\b|\bwbu\b|\bhbu\b/g, 'how are you')
    .replace(/\bu r\b|\bur\b/g, 'your')
    .replace(/\br u\b/g, 'are you')
    .replace(/\bwht\b/g, 'what')
    .replace(/\bpls\b|\bplz\b/g, 'please');
}

window.CHAT_KB = [

  // ── Greetings ──────────────────────────────────────────────────────────
  { q: /\bhi\b|\bhello\b|\bhey\b|salam|salut|bonjour|hola|ciao/, a: "Hey there! 👋 I'm Zakaria's AI assistant. Ask me anything — skills, projects, education, or how to contact him!" },
  { q: /how are you|how's it going|how do you do|ça va|ca va/, a: "Doing great! I'm here to tell you all about Zakaria. What would you like to know?" },
  { q: /good morning/, a: "Good morning! ☀️ Feel free to ask anything about Zakaria." },
  { q: /good afternoon/, a: "Good afternoon! What can I tell you about Zakaria today?" },
  { q: /good evening|good night/, a: "Good evening! 🌙 Ask me anything about Zakaria." },
  { q: /who are you|what are you|introduce yourself/, a: "I'm Zakaria's AI assistant built into his portfolio. I can answer questions about his skills, projects, education, languages, and more!" },
  { q: /what can you (do|help|tell)|what do you know|how can you help/, a: "Ask me about Zakaria's skills, projects, education, contact info, availability — I know it all! 😊" },
  { q: /funny/, a: "Ha! 😄 Now, want to know something interesting about Zakaria?" },

  // ── About / Bio ─────────────────────────────────────────────────────────
  { q: /tell me about (your|him|zakaria)|about (you|him|zakaria)|who is (he|zakaria)|about me|\babout\b|overview|summary|introduce/, a: "Zakaria Obazzi is a 20-year-old AI & Emerging Tech student at ESTM Meknès, Morocco 🇲🇦. He codes in Python, JavaScript, and more — passionate about data science, ML, and web dev. Currently 🟢 open to internships. Portfolio: zakariaobazzi.site" },
  { q: /what do you do|what does (he|zakaria) do|what is (he|zakaria) (doing|working on)/, a: "Zakaria is a student and developer — building web apps, data science projects, and studying AI & Emerging Technologies at ESTM Meknès." },
  { q: /where (are you|is he) from|where.*you come from|origin/, a: "Zakaria is from Meknès, Morocco 🇲🇦." },
  { q: /what makes (you|him) special|why (hire|choose|pick) (you|him)|strengths?|unique/, a: "Zakaria combines strong technical skills (Python, ML, web dev) with a creative eye for design, autonomy, fast learning, and a genuine passion for building things. He's a rare mix of data + design! 🚀" },
  { q: /are you a student|student|still.*study/, a: "Yes! Zakaria is currently a 1st-year DUT student in AI & Emerging Technologies at ESTM Meknès." },

  // ── Identity ────────────────────────────────────────────────────────────
  { q: /\bname\b|who is zakaria|zakaria obazzi/, a: "His name is Zakaria Obazzi — also known online as ZAK.DEV." },
  { q: /\bage\b|how old/, a: "Zakaria is 20 years old." },
  { q: /nationality|moroccan|morocco/, a: "Zakaria is Moroccan 🇲🇦, based in Meknès, Morocco." },
  { q: /location|city|where.*live|based|meknès|meknes/, a: "He lives in Meknès, Morocco 🇲🇦." },
  { q: /timezone/, a: "Zakaria is in the GMT+1 timezone (Morocco Standard Time)." },
  { q: /fun fact|interesting/, a: "He's a big fan of retro computing aesthetics — just look at the terminal-style design of his portfolio! 💻" },

  // ── CV / Resume ─────────────────────────────────────────────────────────
  { q: /resume|download.*resume|see.*resume|get.*resume|your resume|his resume|resume.*download|can i (see|get|download).*resume/, a: "You can request Zakaria's CV directly by emailing him at zakaria.obazi@gmail.com — he'll be happy to send it over! 📄" },

  // ── Education ───────────────────────────────────────────────────────────
  { q: /study|studying|school|university|college|estm|degree|education|where did (you|he) go|what.*study|academic/, a: "Zakaria is a 1st-year DUT student in AI & Emerging Technologies at École Supérieure de Technologie de Meknès (ESTM), part of Université Moulay Ismail." },
  { q: /dut|diploma/, a: "He's in a DUT (Diplôme Universitaire de Technologie) in AI & Emerging Technologies — a rigorous 2-year technical degree." },
  { q: /baccalaur|bac|high school|lycée|lyc[eé]e/, a: "He graduated with a Baccalauréat in Physical Sciences & Chemistry (French option), mention 'Assez Bien' — 2024–2025." },
  { q: /first year|1st year|\byear\b|semester/, a: "Zakaria is in his 1st year of DUT at ESTM Meknès (started 2025)." },
  { q: /field|major|specialization|subject|course/, a: "His field is AI & Emerging Technologies — covering Machine Learning, data science, programming, and databases." },
  { q: /certif|certification|certificate/, a: "No external certifications yet, but he actively trains on Kaggle and Google Colab for practical ML skills." },
  { q: /gpa|grade|score|mark|mention|result/, a: "He received the mention 'Assez Bien' in his Baccalauréat. DUT studies are ongoing (started 2025)." },
  { q: /how long.*cod|when.*start.*cod|coding since|coding experience|years.*coding/, a: "Zakaria got serious about coding in 2024–2025 and has been building real projects since starting at ESTM." },

  // ── Experience ──────────────────────────────────────────────────────────
  { q: /\bexperience\b|work experience|have you worked|previous job|do you have experience|professional/, a: "As a 1st-year student, Zakaria doesn't have formal work experience yet — but he has 4 real projects: a Finance Assistant app, Python game, Classroom downloader, and his portfolio. Seeking his first internship now!" },
  { q: /\bwork\b|working|employment|job history/, a: "Zakaria is a full-time student currently, building his career through real projects. He's actively seeking internship opportunities." },
  { q: /\bdata\b|data.*work|data.*project|work.*data/, a: "He works with data using Python, Pandas, NumPy, and Matplotlib. His Financial Assistant app includes real data analysis and ML-powered insights." },

  // ── Availability ────────────────────────────────────────────────────────
  { q: /intern|internship|available|open to|opportunit|looking for|seeking|are you available|is he available/, a: "Zakaria is 🟢 open to internships & collaborations! Looking for a stage d'initiation in web dev or data analysis — starting summer 2026." },
  { q: /when.*available|start.*internship|summer|when can (you|he) start/, a: "He's targeting summer 2026 — approximately one month duration." },
  { q: /hire|hiring|recruit|want to hire|i want to hire|can i hire/, a: "Great! Zakaria is actively looking for internship opportunities. Email him: zakaria.obazi@gmail.com 📧" },
  { q: /salary|pay|compensation|paid|money/, a: "As this is an initiation internship, compensation is negotiable. Contact him at zakaria.obazi@gmail.com to discuss." },
  { q: /freelance|remote|part.?time|contract/, a: "Primarily focused on internships, but open to collaborations and side projects — remote or local." },
  { q: /status|currently working|is he free/, a: "Current status: 🟢 Open to internships & collaborations." },

  // ── Skills — General ────────────────────────────────────────────────────
  { q: /\bskills?\b|tech stack|capabilities|what (can|does) (he|you) (know|do|use)|what.*good at|expertise/, a: "Zakaria's skills: Python, JavaScript, HTML/CSS, PHP, Java, SQL/MySQL, NumPy, Pandas, Matplotlib, Scikit-learn, Git/GitHub, Linux/Bash, Jupyter Notebook, Google Colab, Merise, PowerAMC, and Microsoft Office." },
  { q: /programming language|coding language|what language|which language/, a: "He codes in Python, JavaScript, PHP, Java, and SQL — plus Bash for scripting." },
  { q: /best.*skill|strongest|top skill|main skill|primary skill/, a: "Python is his strongest — used for data analysis, ML, scripting, and automation." },
  { q: /currently learning|learning now|studying now|what.*learn|improving/, a: "He's deepening knowledge in Machine Learning, database design, and modern web development." },
  { q: /soft skill|qualities|personality|character|traits|attitude/, a: "Zakaria is described as intellectually curious, rigorous, autonomous, a fast learner, and a great team player with strong communication skills." },
  { q: /microsoft office|excel|word|powerpoint|spreadsheet/, a: "Yes, proficient in Microsoft Office Suite (Excel, Word, PowerPoint)." },
  { q: /frameworks?|librar(y|ies)|packages?/, a: "He uses NumPy, Pandas, Matplotlib, Scikit-learn, Pygame (Python) — and vanilla HTML/CSS/JS with PHP on the web side." },
  { q: /tools?|software|programs?|what.*use (for|to)|ide|editor/, a: "He works with VS Code, Jupyter Notebook, Google Colab, Git/GitHub, WAMP Server, PowerAMC, and the Linux terminal." },

  // ── Python ──────────────────────────────────────────────────────────────
  { q: /python|do you know python/, a: "Python is Zakaria's strongest language — OOP, scripting, data analysis (Pandas/NumPy), ML (Scikit-learn), and even game dev (Pygame)!" },
  { q: /numpy|pandas|matplotlib|scikit|sklearn/, a: "He uses NumPy, Pandas, Matplotlib, and Scikit-learn for data science and ML — mainly in Jupyter Notebook or Google Colab." },
  { q: /machine learning|artificial intelligence|deep learning|neural|nlp|ml project/, a: "Zakaria studies and applies ML using Python & Scikit-learn. He built an NLP-powered finance app as a real ML project, and trains on Kaggle." },
  { q: /data science|data analysis|data viz|visualization|analytics/, a: "He does data analysis and visualization with Pandas, NumPy, and Matplotlib — core to his AI curriculum." },
  { q: /jupyter|colab|google colab|kaggle|notebook/, a: "He uses Jupyter Notebook, Google Colab, and Kaggle as his main data science environments." },

  // ── Web Dev ─────────────────────────────────────────────────────────────
  { q: /\bhtml\b|do you know html/, a: "Solid with HTML — his entire portfolio is hand-coded from scratch!" },
  { q: /\bcss\b|styling|style|do you know css/, a: "Great with CSS — he built the retro terminal look of his portfolio purely with CSS." },
  { q: /javascript|do you know javascript|do you know js/, a: "Yes! He uses JavaScript for front-end interactivity — this chatbot widget is built with JS!" },
  { q: /\bphp\b|do you know php|server.?side/, a: "PHP is listed among his web dev skills — used for server-side scripting." },
  { q: /web dev|web development|front.?end|frontend|backend|full.?stack|website/, a: "He builds web projects with HTML, CSS, JavaScript, and PHP. Check his portfolio and finance tracker as examples!" },

  // ── Java ────────────────────────────────────────────────────────────────
  { q: /\bjava\b|do you know java|oop|object.?oriented/, a: "He has Java experience (OOP/POO) — mainly for object-oriented programming and database apps." },

  // ── Databases ───────────────────────────────────────────────────────────
  { q: /\bsql\b|\bmysql\b|do you know sql|do you (use|know) (sql|mysql|database)|database|wamp|merise|poweramc|relational/, a: "Zakaria works with SQL/MySQL (WAMP Server), models relational DBs using Merise methodology, and uses PowerAMC for design." },

  // ── Linux / Git ─────────────────────────────────────────────────────────
  { q: /linux|bash|shell|terminal|command.?line|do you (use|know) linux/, a: "He uses Linux and Bash scripting — the terminal aesthetic of his portfolio is no coincidence! 😄" },
  { q: /\bgit\b|github|version control|do you use git|source control/, a: "Zakaria uses Git & GitHub for version control. All projects: github.com/zakaria-obazzi" },

  // ── Projects ────────────────────────────────────────────────────────────
  { q: /project|portfolio|what.*built|what.*made|show.*work|see.*work|your work|his work|any (web|coding|ai) projects?|built something/, a: "Zakaria has 4 public projects:\n1️⃣ Financial Assistant (NLP + ML web app)\n2️⃣ Personal Portfolio site\n3️⃣ Python game (Pygame)\n4️⃣ Google Classroom file downloader\nSee them at zakariaobazzi.site!" },
  { q: /how many project|number of project|list.*projects?/, a: "4 public projects: finance app, portfolio, Python game, and a Classroom automation script." },
  { q: /finance|financial|budget|tracker|nlp.*project|finance.*app/, a: "His standout project: Financial Assistant — browser-based finance tracker with NLP input, charts, budget tracking & smart insights. No server needed! 👉 https://zakaria-obazzi.github.io/finance/" },
  { q: /portfolio.*site|this.*site|zak.?dev|zakariaobazzi|how.*portfolio.*built/, a: "His portfolio is hand-coded with HTML, CSS, JS — retro terminal theme, music player and all. Live at zakariaobazzi.site 🚀" },
  { q: /game|pygame|python.*game|video game/, a: "He built a Python video game using the Pygame library. GitHub: https://github.com/zakaria-obazzi/python_gamev1" },
  { q: /classroom|downloader|google.*classroom|automation.*script|auto.*download/, a: "A Python script that downloads all Google Classroom files in one click — uses Google Auth & Requests. GitHub: https://github.com/zakaria-obazzi/Downloader_classroom" },

  // ── Contact ─────────────────────────────────────────────────────────────
  { q: /contact|reach|get in touch|talk to|message|how to reach|connect with/, a: "Contact Zakaria via:\n📧 zakaria.obazi@gmail.com\n💼 linkedin.com/in/zakaria-obazzi\n💻 github.com/zakaria-obazzi\n📞 +212 6 26 60 89 94" },
  { q: /email|mail|gmail|do you have an email/, a: "Email: zakaria.obazi@gmail.com — happy to hear from recruiters, collaborators, or fellow devs! 📧" },
  { q: /linkedin|do you have a linkedin|whats your linkedin/, a: "LinkedIn: linkedin.com/in/zakaria-obazzi 💼" },
  { q: /github|do you have a github|whats your github/, a: "GitHub: github.com/zakaria-obazzi — 4 public projects and counting! 💻" },
  { q: /phone|call|number|whatsapp|telephone/, a: "Phone: +212 6 26 60 89 94 — email is preferred for professional inquiries." },
  { q: /website|site|url|link|portfolio.*link|what is your portfolio/, a: "Portfolio: https://zakariaobazzi.site/ 🌐" },

  // ── Languages ───────────────────────────────────────────────────────────
  { q: /language|speak|spoken|multilingual|do you speak|how many languages|parlez/, a: "Zakaria speaks 3 languages:\n🇲🇦 Arabic (native)\n🇫🇷 French (fluent)\n🇬🇧 English (good level)" },
  { q: /arabic|arabe/, a: "Arabic is Zakaria's mother tongue 🇲🇦." },
  { q: /french|français|do you speak french/, a: "He speaks French fluently 🇫🇷 — his Baccalauréat was also in the French option." },
  { q: /english|do you speak english/, a: "His English is at a good level — comfortable for professional communication and technical reading 🇬🇧." },

  // ── Interests ───────────────────────────────────────────────────────────
  { q: /interest|passion|like|enjoy|love|into|care about/, a: "Passionate about AI, data science, and web dev. Outside tech: reading tech blogs and playing chess ♟️." },
  { q: /hobby|hobbies|free time|spare time|weekend/, a: "In his free time: coding side projects, reading tech blogs, and playing chess ♟️." },
  { q: /motivation|why.*dev|why.*ai|why.*code|driven|inspire/, a: "Driven by curiosity and the desire to build impactful things — learns fast, ships often, grows every day." },
  { q: /goal|ambition|future|dream|plan|where.*see.*yourself/, a: "His goal is to grow as a developer and AI practitioner, contribute to meaningful projects, and stay at the cutting edge of tech." },
  { q: /chess/, a: "Zakaria plays chess ♟️ — strategic thinking that pairs well with AI!" },
  { q: /open source|contribute/, a: "He plans to contribute to open-source in the future — all current projects are already public on GitHub." },
  { q: /work ethic|hard work|reliable|autonomous|dependable/, a: "Works hard, learns fast, ships often. His CV describes him as rigorous, autonomous, and a quick learner." },
  { q: /team|teamwork|collaborate|group|cooperation/, a: "Strong teamwork and communication skills — he enjoys collaborative projects." },
  { q: /favorite.*tech|fav.*language|prefer.*language|go.?to/, a: "Python for data work and CSS for creative styling are his favorites." },
  { q: /music|song|player|playlist/, a: "There's a music player on his portfolio — hit play and explore! 🎵" },
  { q: /retro|terminal|design.*style|theme|aesthetic/, a: "His portfolio has a full retro terminal aesthetic — command-line vibes all the way 💻." },

  // ── Meta ────────────────────────────────────────────────────────────────
  { q: /chatbot|this bot|who made.*bot|how.*bot|how.*chat|this widget/, a: "This chatbot is a custom JS widget Zakaria built himself — pure keyword matching, no external API." },
  { q: /more projects|coming soon|future project|what.*next|upcoming/, a: "More projects coming soon — follow his GitHub: github.com/zakaria-obazzi 👀" },

  // ── Closing ─────────────────────────────────────────────────────────────
  { q: /thank|thanks|merci|شكرا|appreciate/, a: "You're welcome! 😊 Feel free to ask anything else about Zakaria." },
  { q: /bye|goodbye|see you|ciao|au revoir|later|take care/, a: "Goodbye! Feel free to reach out to Zakaria directly — he'd love to connect. 👋" },
  { q: /ok|okay|got it|alright|cool|nice|great|perfect|noted|makes sense|understood/, a: "Great! Anything else you'd like to know about Zakaria? 😊" },
  { q: /help|what (can|do) (i|you) ask|what (should|to) ask|lost|confused/, a: "You can ask me about: skills, projects, education, languages, availability, or contact info. What would you like to know? 😊" },

];

window.getChatReply = function(rawText) {
  const text = _normalize(rawText.toLowerCase().trim());
  for (const pair of window.CHAT_KB) {
    if (pair.q.test(text)) return pair.a;
  }
  return "Hmm, I'm not sure about that one! 🤔 Try asking about Zakaria's skills, projects, or education — or contact him directly at zakaria.obazi@gmail.com 😊";
};

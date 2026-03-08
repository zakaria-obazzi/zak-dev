// chat-data.js
// contains keyword questions and answers for the chatbot widget

window.CHAT_KB = [
  // greetings and small talk
  {q:/\bhi\b|\bhello\b|\bhey\b|\bhow are you\b/, a:"Hello! I'm Zakaria's AI assistant – how can I help you today?"},
  {q:/what'?s up|sup|how's it going/, a:"Just here to answer questions about Zakaria. Ask away!"},
  {q:/good morning|good afternoon|good evening/, a:"Good to see you! Feel free to ask about Zakaria or his work."},

  // core info
  {q:/internship|available/, a:"I'm looking for a one‑month internship starting summer 2026."},
  {q:/skills|skill/, a:"Comfortable with HTML, CSS, SQL/MySQL,python , java ; JavaScript."},
  {q:/location|where/, a:"Based in Meknès, Morocco."},
  {q:/study|school/, a:"I'm a 1st‑year AI & Emerging Tech student at ESTM Meknès."},
  {q:/name/, a:"Zakaria Obazzi (ZAK.DEV)."},
  {q:/interested/, a:"I'm interested in web development and artificial intelligence."},
  {q:/contact/, a:"You can reach him by email at obazzizakaria1@gmail.com or via LinkedIn/GitHub."},

  // projects & interests
  {q:/project|portfolio/, a:"Check out the projects section of the site; live links are placeholders for now."},
  {q:/python/, a:"Python is one of Zakaria's strongest skills — he uses it for data analysis and ML."},
  {q:/java(bit)?/, a:"He has some experience with Java, especially database-related apps."},

  // thanks/bye fallback
  {q:/thank|thanks/, a:"You're welcome!"},
  {q:/bye|goodbye|see you/, a:"Goodbye! Feel free to drop another question anytime."},

  // additional handcrafted conversation entries
  {q:/age|how old/, a:"Zakaria is 20 years old."},
  {q:/hobby|hobbies/, a:"He enjoys coding, reading tech blogs, and playing chess."},
  {q:/github/, a:"His GitHub profile is github.com/zakaria-obazzi."},
  {q:/linkedin/, a:"Connect on LinkedIn at linkedin.com/in/zakaria-obazzi."},
  {q:/email/, a:"You can email him at obazzizakaria1@gmail.com."},
  {q:/phone|call/, a:"Phone number is +212 6 26 60 89 94, but email is preferred."},
  {q:/timezone/, a:"He is located in the GMT+1 timezone (Morocco)."},
  {q:/language|languages/, a:"He speaks Arabic, French, and English."},
  {q:/education|degree/, a:"Studying AI & Emerging Technologies at ESTM Meknès."},
  {q:/github repo/, a:"Most of his code lives on GitHub; see his portfolio projects."},
  {q:/favorite tech/, a:"He likes Python for data work and CSS for styling."},
  {q:/currently learning/, a:"Currently learning new techs and database design."},
  {q:/available/, a:"Open to internship opportunities starting summer 2026."},
  {q:/city|where are you/, a:"Living in Meknès, Morocco."},
  {q:/nationality/, a:"He is Moroccan."},
  {q:/interests/, a:"Interested in web development, AI, and data science."},
  {q:/github stars/, a:"He hasn't focused on stars; contributions matter more."},
  {q:/projects list/, a:"Check the Projects section above; placeholder links presently."},
  {q:/open source/, a:"He hopes to contribute to open-source in the future."},
  {q:/portfolio link/, a:"This site itself is his portfolio: zak-dev.html."},
  {q:/contact me/, a:"Use the contact form or email at obazzizakaria1@gmail.com."},
  {q:/fun fact/, a:"He is a big fan of retro computing aesthetics."},
  {q:/favorite language/, a:"Python is his go-to language at the moment."},
  {q:/soon/, a:"More projects are coming soon—stay tuned!"},
  {q:/github followers/, a:"Follower count fluctuates; focus on learning instead."},
  {q:/motivation/, a:"Driven by curiosity and the desire to build things."},
  {q:/work ethic/, a:"He works hard, learns fast, and ships often."},
  {q:/email address/, a:"obazzizakaria1@gmail.com"},
  {q:/intern|internship/, a:"Seeking internship positions in web dev or dbgs."}
];

window.getChatReply = function(text) {
  text = text.toLowerCase();
  for (const pair of window.CHAT_KB) {
    if (pair.q.test(text)) return pair.a;
  }
  return "I don't have that info , contact Zakaria directly!";
};


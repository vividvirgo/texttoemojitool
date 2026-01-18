// TextToEmojiTool — app.js (simple MVP)

const $ = (id) => document.getElementById(id);

const inputText = $("inputText");
const outputText = $("outputText");
const mode = $("mode");

const btnConvert = $("btnConvert");
const btnCopy = $("btnCopy");
const btnClear = $("btnClear");
const btnExample = $("btnExample");
const toast = $("toast");

const map = [
  // common phrases first
  { re: /\bhappy birthday\b/gi, emoji: "🎂🎉" },
  { re: /\bthank you\b/gi, emoji: "🙏" },
  { re: /\blove\b/gi, emoji: "❤️" },
  { re: /\blol\b/gi, emoji: "😂" },

  // categories
  { re: /\bpizza\b/gi, emoji: "🍕" },
  { re: /\bcoffee\b/gi, emoji: "☕" },
  { re: /\btea\b/gi, emoji: "🍵" },
  { re: /\bmoney\b/gi, emoji: "💸" },
  { re: /\bwork\b/gi, emoji: "💼" },
  { re: /\bmeeting\b/gi, emoji: "📅" },
  { re: /\bcall\b/gi, emoji: "📞" },
  { re: /\bhome\b/gi, emoji: "🏠" },
  { re: /\btravel\b/gi, emoji: "✈️" },
  { re: /\bbeach\b/gi, emoji: "🏖️" },
  { re: /\bgym\b/gi, emoji: "🏋️" },
  { re: /\bparty\b/gi, emoji: "🥳" },
  { re: /\bfood\b/gi, emoji: "🍽️" },
  { re: /\bwow\b/gi, emoji: "🤯" },
  { re: /\bcongrats\b/gi, emoji: "🎉" },
];

const numberMap = {
  "0":"0️⃣","1":"1️⃣","2":"2️⃣","3":"3️⃣","4":"4️⃣",
  "5":"5️⃣","6":"6️⃣","7":"7️⃣","8":"8️⃣","9":"9️⃣"
};

function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"), 1200);
}

function sprinkleExtra(text, mode){
  if(mode === "lite") return text;

  // light punctuation emoji additions
  if(mode === "fun"){
    return text
      .replace(/!/g, "❗")
      .replace(/\?/g, "❓");
  }

  // chaos mode: add a few random emojis at end of sentences
  const extras = ["✨","🔥","😄","👌","🚀","💯","🫶","🎯"];
  return text.replace(/([.!?])(\s|$)/g, (m, punc, tail) => {
    const r = extras[Math.floor(Math.random() * extras.length)];
    return `${punc}${r}${tail}`;
  });
}

function convert(){
  let text = (inputText.value || "").trim();
  if(!text){
    outputText.value = "";
    showToast("Paste some text first");
    return;
  }

  // numbers → emoji
  text = text.replace(/\d/g, (d) => numberMap[d] || d);

  // word/phrase replacements
  map.forEach(({re, emoji}) => {
    text = text.replace(re, (match) => `${match} ${emoji}`);
  });

  // mode-based “sprinkles”
  text = sprinkleExtra(text, mode.value);

  outputText.value = text;
}

function copy(){
  const txt = (outputText.value || "").trim();
  if(!txt){
    showToast("Nothing to copy");
    return;
  }
  navigator.clipboard.writeText(txt)
    .then(()=>showToast("Copied!"))
    .catch(()=>showToast("Copy failed"));
}

function clearAll(){
  inputText.value = "";
  outputText.value = "";
  inputText.focus();
}

function example(){
  inputText.value = "Happy birthday! Thank you for everything. I love pizza and coffee. Meeting at 5?";
  convert();
}

btnConvert?.addEventListener("click", convert);
btnCopy?.addEventListener("click", copy);
btnClear?.addEventListener("click", clearAll);
btnExample?.addEventListener("click", example);

$("year").textContent = new Date().getFullYear();

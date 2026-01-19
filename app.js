// TextToEmojiTool — vanilla JS
// Runs entirely in the browser. No tracking, no network calls.

const els = {
  input: document.getElementById("inputText"),
  output: document.getElementById("outputText"),
  mode: document.getElementById("mode"),
  density: document.getElementById("density"),
  placement: document.getElementById("inline"),
  copyBtn: document.getElementById("copyBtn"),
  shareBtn: document.getElementById("shareBtn"),
  clearBtn: document.getElementById("clearBtn"),
  swapBtn: document.getElementById("swapBtn"),
  toast: document.getElementById("copyToast"),
  charCount: document.getElementById("charCount"),
  year: document.getElementById("year"),
  examples: document.querySelectorAll(".example-btn"),
  // modal
  modal: document.getElementById("modal"),
  modalBackdrop: document.getElementById("modalBackdrop"),
  modalClose: document.getElementById("modalClose"),
  modalTitle: document.getElementById("modalTitle"),
  modalBody: document.getElementById("modalBody"),
  aboutLink: document.getElementById("aboutLink"),
  privacyLink: document.getElementById("privacyLink"),
  termsLink: document.getElementById("termsLink")
};

els.year.textContent = new Date().getFullYear();

// Simple keyword → emoji map.
// You can expand this over time (this is the "content moat").
const baseMap = [
  { re: /\b(thank(s| you)?|appreciate|grateful)\b/gi, e: ["🙏","💛","✨"] },
  { re: /\b(love|lovely|ador(e|able)|xoxo)\b/gi, e: ["❤️","🥰","💖"] },
  { re: /\b(congrats|congratulations|proud)\b/gi, e: ["🎉","👏","🥳"] },
  { re: /\b(happy|yay|excited|awesome|amazing)\b/gi, e: ["😄","🎉","✨"] },
  { re: /\b(sad|sorry|miss|hurt)\b/gi, e: ["😔","💙","🥺"] },
  { re: /\b(lol|haha|funny|lmao)\b/gi, e: ["😂","🤣","😆"] },
  { re: /\b(idea|brainstorm|plan)\b/gi, e: ["💡","🧠","📝"] },
  { re: /\b(meeting|call|zoom|teams)\b/gi, e: ["📅","🕒","💬"] },
  { re: /\b(work|job|deadline|task)\b/gi, e: ["💼","✅","⏳"] },
  { re: /\b(money|budget|profit|income)\b/gi, e: ["💰","📈","🧾"] },
  { re: /\b(travel|trip|vacation|flight)\b/gi, e: ["✈️","🌍","🧳"] },
  { re: /\b(food|eat|dinner|lunch|breakfast)\b/gi, e: ["🍽️","😋","🍕"] },
  { re: /\b(coffee|tea)\b/gi, e: ["☕","🫖","✨"] },
  { re: /\b(good luck|luck)\b/gi, e: ["🍀","🤞","✨"] },
  { re: /\b(yes|yep|yeah)\b/gi, e: ["✅","👍"] },
  { re: /\b(no|nope)\b/gi, e: ["❌","🙅"] }
];

const stylePacks = {
  fun: ["😄","✨","🎉","🔥","🙌","💯","😎","😂"],
  cute: ["🥺","🧸","🌸","🍓","✨","🐣","💖","😻"],
  dramatic: ["🎭","⚡","🔥","😤","🫣","😱","🎬","💥"],
  chaotic: ["🤪","💀","🫠","🧨","🌀","👀","🤯","🧃"],
  minimal: ["✨","✅","💡","📌","→","•","✦","↳"],
  pro: ["✅","📌","📈","🧾","🗓️","💼","🔎","🧠"]
};

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function emojiCountFromDensity(density){
  // density: 0..3
  return [0, 1, 2, 3][density] ?? 2;
}

function insertInlineEmojis(text, pack, density){
  const count = emojiCountFromDensity(density);
  if (count === 0) return text;

  let out = text;

  // For each keyword pattern, append 1 emoji after matches (lightweight & consistent)
  baseMap.forEach(({re, e}) => {
    out = out.replace(re, (match) => {
      // 50% chance to add emojis to avoid overstuffing
      if (Math.random() < 0.5) return match;
      const chosen = pick(e);
      return `${match} ${chosen}`;
    });
  });

  // Add a subtle emoji at sentence ends depending on density
  if (density >= 2) {
    out = out.replace(/([.!?])(\s|$)/g, (m, punc, tail) => {
      return `${punc} ${pick(pack)}${tail}`;
    });
  }

  return out;
}

function emojisAtEnd(text, pack, density){
  const count = emojiCountFromDensity(density);
  if (count === 0) return text;

  // Add emojis to the end of each sentence (or line)
  return text
    .split(/\n/)
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return line;

      // If line already ends with emoji-ish, don't overdo it
      const alreadyEmoji = /[\u{1F300}-\u{1FAFF}]\s*$/u.test(trimmed);
      if (alreadyEmoji) return line;

      let suffix = "";
      for (let i = 0; i < count; i++) suffix += pick(pack) + (i === count - 1 ? "" : " ");
      return `${trimmed} ${suffix}`;
    })
    .join("\n");
}

function convertText(){
  const text = (els.input.value || "").trim();
  const pack = stylePacks[els.mode.value] || stylePacks.fun;
  const density = parseInt(els.density.value, 10);
  const placement = els.placement.value;

  if (!text){
    els.output.value = "";
    updateMeta("");
    return;
  }

  // Keep it fast — no heavy NLP. Simple mapping + style packs.
  let result = text;

  if (placement === "inline"){
    result = insertInlineEmojis(result, pack, density);
  } else {
    result = emojisAtEnd(result, pack, density);
  }

  // Final polish: collapse extra spaces
  result = result.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n");

  els.output.value = result;
  updateMeta(result);
}

function updateMeta(out){
  els.charCount.textContent = `${out.length} chars`;
}

function showToast(){
  els.toast.style.display = "block";
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    els.toast.style.display = "none";
  }, 1200);
}

// Copy
async function copyOutput(){
  const text = els.output.value;
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    showToast();
  } catch (e) {
    // Fallback
    els.output.select();
    document.execCommand("copy");
    showToast();
  }
}

// Share (mobile-friendly)
async function shareOutput(){
  const text = els.output.value;
  if (!text) return;

  if (navigator.share){
    try {
      await navigator.share({ text });
    } catch (e) {
      // user canceled — do nothing
    }
  } else {
    // fallback: copy
    await copyOutput();
  }
}

function clearAll(){
  els.input.value = "";
  els.output.value = "";
  updateMeta("");
  els.input.focus();
}

function swapOutputToInput(){
  const out = els.output.value;
  if (!out) return;
  els.input.value = out;
  convertText();
  els.input.focus();
}

// Examples
els.examples.forEach(btn => {
  btn.addEventListener("click", () => {
    els.input.value = btn.dataset.example || "";
    convertText();
    els.input.focus();
  });
});

// Live convert
["input", "change", "keyup"].forEach(evt => {
  els.input.addEventListener(evt, convertText);
});
els.mode.addEventListener("change", convertText);
els.density.addEventListener("input", convertText);
els.placement.addEventListener("change", convertText);

els.copyBtn.addEventListener("click", copyOutput);
els.shareBtn.addEventListener("click", shareOutput);
els.clearBtn.addEventListener("click", clearAll);
els.swapBtn.addEventListener("click", swapOutputToInput);

// Modal content (simple, AdSense-safe)
const modalContent = {
  about: {
    title: "About",
    body: `
      <p><strong>TextToEmojiTool</strong> is a simple browser-based utility that turns plain text into emoji-enhanced messages.</p>
      <p>It runs entirely on your device — no accounts, no uploads, no tracking.</p>
    `
  },
  privacy: {
    title: "Privacy Policy",
    body: `
      <p><strong>Privacy-first:</strong> This site processes your text in your browser. We do not store or transmit your input.</p>
      <p>When ads are enabled, advertising partners may use cookies or similar technologies to show relevant ads. You can manage ad personalization in your browser settings.</p>
    `
  },
  terms: {
    title: "Terms",
    body: `
      <p>This tool is provided “as is” without warranties. You’re responsible for how you use the output.</p>
      <p>Do not submit sensitive information. For questions, contact: <a href="mailto:hello@texttoemojitool.com">hello@texttoemojitool.com</a>.</p>
    `
  }
};

function openModal(key){
  const item = modalContent[key];
  if (!item) return;
  els.modalTitle.textContent = item.title;
  els.modalBody.innerHTML = item.body;
  els.modal.setAttribute("aria-hidden", "false");
}

function closeModal(){
  els.modal.setAttribute("aria-hidden", "true");
}

els.aboutLink.addEventListener("click", (e) => { e.preventDefault(); openModal("about"); });
els.privacyLink.addEventListener("click", (e) => { e.preventDefault(); openModal("privacy"); });
els.termsLink.addEventListener("click", (e) => { e.preventDefault(); openModal("terms"); });
els.modalClose.addEventListener("click", closeModal);
els.modalBackdrop.addEventListener("click", closeModal);

// Initial
convertText();

const answers = {};

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");
const revealStage = document.getElementById("revealStage");
const result = document.getElementById("result");
const invitationText = document.getElementById("invitationText");
const startBtn = document.getElementById("startBtn");
const cta = document.getElementById("cta");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

startBtn.addEventListener("click", () => {
  hide(step1);
  show(step2);
});

document.querySelectorAll("button[data-q]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const q = btn.dataset.q;
    const value = btn.dataset.val;
    answers[q] = value;

    if (q === "q1") {
      hide(step2);
      show(step3);
      return;
    }

    if (q === "q2") {
      hide(step3);
      show(step4);
      return;
    }

    if (q === "q3") {
      hide(step4);
      beginReveal();
    }
  });
});

cta.addEventListener("click", () => {
  alert("漫画1話へ遷移（仮）");
});

function show(element) {
  element.classList.remove("hidden");
  element.classList.add("active");
}

function hide(element) {
  element.classList.add("hidden");
  element.classList.remove("active");
}

function beginReveal() {
  buildInvitation();
  revealStage.classList.remove("hidden");
  result.classList.add("hidden");
  revealStage.classList.remove("finished");

  if (prefersReducedMotion) {
    revealStage.classList.add("finished");
    result.classList.remove("hidden");
    return;
  }

  revealStage.classList.add("playing");

  window.setTimeout(() => {
    revealStage.classList.remove("playing");
    revealStage.classList.add("finished");
    result.classList.remove("hidden");
  }, 2550);
}

function buildInvitation() {
  const name = sanitize(document.getElementById("name").value.trim()) || "名無し";
  const title = determineTitle();
  const voice = determineVoice();
  const fate = determineFate();

  invitationText.innerHTML = [
    `<p>${name} 殿</p>`,
    `<span class="line-gap"></span>`,
    `<p>透き通るような美しきその声色は、<br>我らが聖歌隊に相応しきものと記録されました。</p>`,
    `<span class="line-gap"></span>`,
    `<p class="meta">【記録名】${title}<br>【声の性質】${voice}<br>【終末の日に選ぶもの】${fate}</p>`,
    `<span class="line-gap"></span>`,
    `<p>その選択、その沈黙、その祈り。<br>すべては既に観測されているのです。</p>`,
    `<span class="line-gap"></span>`,
    `<p>あなたを、聖母へ歌を捧げる者として迎え入れます。<br>サンタ・アンジェリ少年聖歌隊への入隊を、ここに許可します。</p>`
  ].join("");
}

function determineTitle() {
  if (answers.q1 === "信仰" && answers.q3 === "祈り") return "聖母の器";
  if (answers.q2 === "虚無") return "声を失う者";
  if (answers.q2 === "自己") return "未だ人である者";
  if (answers.q1 === "献身" && answers.q2 === "救済") return "祈りの継承者";
  if (answers.q3 === "愛") return "終末に寄り添う者";
  return "祝福を受けし者";
}

function determineVoice() {
  if (answers.q2 === "救済") return "他者を救おうとする響き";
  if (answers.q2 === "共鳴") return "誰かへ届こうとする震え";
  if (answers.q2 === "虚無") return "深い静寂に沈む余韻";
  return "まだ人の熱を宿す音色";
}

function determineFate() {
  if (answers.q3 === "祈り") return "最後まで歌う";
  if (answers.q3 === "愛") return "誰かのそばに残る";
  if (answers.q3 === "逃避") return "この場所を離れようとする";
  return "沈黙を受け入れる";
}

function sanitize(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

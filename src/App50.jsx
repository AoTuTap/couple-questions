import React, { useMemo, useRef, useState, useEffect } from "react";

const QUESTION_CARDS = [
  { text: "Người lặng im / người hay nói?", depth: 1, type: "Vui mở đầu", icon: "🌿" },
  { text: "Kể 1 điều ấn tượng hoặc thích nhất về đối phương?", depth: 2, type: "Dịu dàng", icon: "💕" },
  { text: "Điều gì của đối phương khiến bạn chưa hài lòng?", depth: 4, type: "Thành thật", icon: "🫧" },
  { text: "Điều gì khiến bạn muốn đi tiếp và gắn bó với đối phương?", depth: 4, type: "Gắn bó", icon: "🧡" },
  { text: "Con trai hay con gái nên là người chủ động?", depth: 2, type: "Quan điểm", icon: "🎲" },
  { text: "Bạn thấy mình hợp nhau vì điều gì?", depth: 3, type: "Kết nối", icon: "🧩" },
  { text: "Những điểm xấu nào mà bạn muốn được thông cảm?", depth: 4, type: "Mở lòng", icon: "🕯️" },
  { text: "Nếu như bây giờ mà em tắt đèn, anh muốn làm gì với em?", depth: 3, type: "Lãng mạn", icon: "🌙" },
  { text: "Câu nói nào của đối phương khiến bạn nhớ nhất?", depth: 2, type: "Kỷ niệm", icon: "💌" },
  { text: "Điểm khác biệt giữa đối phương và người khác là gì?", depth: 3, type: "Riêng biệt", icon: "✨" },
  { text: "Có nơi nào mà bạn cực kỳ muốn dẫn đối phương đi không?", depth: 1, type: "Mơ mộng", icon: "🗺️" },
  { text: "Việc nhà mà bạn muốn được làm cùng nhau nhất khi ở chung là gì?", depth: 2, type: "Đời thường", icon: "🏡" },
  { text: "Bạn cảm thấy tính cách, lối sống của hai chúng ta đang bù trừ cho nhau hay đang giống nhau?", depth: 3, type: "Thấu hiểu", icon: "☯️" },
  { text: "1, 2, 3… Cùng nói ra một địa điểm.", depth: 1, type: "Nhanh vui", icon: "📍" },
  { text: "1, 2, 3… Cùng nói ra một món ăn.", depth: 1, type: "Nhanh vui", icon: "🍜" },
  { text: "Đâu là điều quan trọng nhất với bạn khi yêu và xác định cưới?", depth: 5, type: "Tương lai", icon: "💍" },
  { text: "Nếu 1 ngày bạn không liên lạc được với người kia thì bạn sẽ làm gì?", depth: 3, type: "Tình huống", icon: "📵" },
  { text: "Bạn nhận ra mình thích đối phương là từ bao giờ hoặc khoảnh khắc nào?", depth: 3, type: "Rung động", icon: "💗" },
  { text: "Nếu trong thời gian yêu nhau mà bạn nhận ra đối phương không phải là người mình muốn cưới thì bạn sẽ làm gì?", depth: 5, type: "Câu sâu", icon: "🌊" },
  { text: "Nếu mình cãi nhau thì bạn sẽ làm gì?", depth: 4, type: "Xung đột", icon: "🤍" },
  { text: "Có bài học về tình cảm nào ở quá khứ mà bạn đã học được và muốn chia sẻ không?", depth: 5, type: "Quá khứ", icon: "📖" },
  { text: "Điều gì trong cuộc sống sẽ dễ khiến bạn áp lực nhất?", depth: 4, type: "Áp lực", icon: "☁️" },
  { text: "Kể ra 1 điểm tốt của tất cả những người bạn thân của bạn, mỗi người bạn chỉ kể 1 điểm.", depth: 2, type: "Bạn bè", icon: "👥" },
  { text: "Nếu được chọn 1 siêu năng lực thì đó là gì?", depth: 1, type: "Vui nhẹ", icon: "⚡" },
  { text: "Điều gì là ưu tiên số 1 của bạn?", depth: 4, type: "Ưu tiên", icon: "🎯" },
  { text: "Nếu được xóa 1 ký ức, thì đó là gì?", depth: 5, type: "Rất sâu", icon: "🫧" },
  { text: "Một bộ phim mà bạn muốn xem cùng đối phương?", depth: 1, type: "Hẹn hò", icon: "🎬" },
  { text: "Nếu được quay lại buổi hẹn đầu tiên, bạn muốn thay đổi điều gì?", depth: 2, type: "Kỷ niệm", icon: "🕰️" },
  { text: "Một điều nhỏ đối phương làm khiến bạn thấy được yêu là gì?", depth: 3, type: "Yêu thương", icon: "🌷" },
  { text: "Khi buồn, bạn muốn được an ủi bằng cách nào?", depth: 4, type: "Chăm sóc", icon: "🤲" },
  { text: "Bạn sợ điều gì nhất trong một mối quan hệ lâu dài?", depth: 5, type: "Nỗi sợ", icon: "🌫️" },
  { text: "Một thói quen nào của bạn mà bạn mong đối phương kiên nhẫn với nó?", depth: 4, type: "Mở lòng", icon: "🧸" },
  { text: "Nếu có một ngày rảnh hoàn toàn cho hai người, bạn muốn làm gì?", depth: 1, type: "Hẹn hò", icon: "🌤️" },
  { text: "Điều gì khiến bạn cảm thấy an toàn khi ở cạnh đối phương?", depth: 4, type: "An toàn", icon: "🛟" },
  { text: "Bạn nghĩ tình yêu cần nhiều lãng mạn hơn hay nhiều trách nhiệm hơn?", depth: 3, type: "Quan điểm", icon: "⚖️" },
  { text: "Một lời xin lỗi như thế nào sẽ khiến bạn thấy thật lòng?", depth: 4, type: "Xung đột", icon: "🕊️" },
  { text: "Bạn muốn hai người giữ truyền thống nhỏ nào mỗi tuần hoặc mỗi tháng?", depth: 2, type: "Nghi thức", icon: "📅" },
  { text: "Nếu phải mô tả tình yêu của hai người bằng một màu sắc, bạn chọn màu gì?", depth: 1, type: "Mơ mộng", icon: "🎨" },
  { text: "Điều gì làm bạn dễ bị tổn thương nhưng ít khi nói ra?", depth: 5, type: "Rất sâu", icon: "🥀" },
  { text: "Bạn có kỳ vọng nào về tương lai mà sợ nói ra sẽ tạo áp lực không?", depth: 5, type: "Tương lai", icon: "🌌" },
  { text: "Khi cãi nhau, điều gì đối phương tuyệt đối không nên làm?", depth: 4, type: "Ranh giới", icon: "🚧" },
  { text: "Bạn muốn được đối phương công nhận ở điểm nào nhất?", depth: 4, type: "Công nhận", icon: "🏅" },
  { text: "Một điều bạn từng hiểu lầm về đối phương là gì?", depth: 3, type: "Thấu hiểu", icon: "🔍" },
  { text: "Nếu hai người cùng tiết kiệm cho một mục tiêu, bạn muốn đó là gì?", depth: 3, type: "Tương lai", icon: "🏦" },
  { text: "Bạn muốn tình yêu của mình giống một bộ phim, bài hát hay mùa nào? Vì sao?", depth: 2, type: "Mơ mộng", icon: "🎧" },
  { text: "Điều gì khiến bạn cảm thấy mình đang được lắng nghe thật sự?", depth: 4, type: "Lắng nghe", icon: "👂" },
  { text: "Một bí mật nhỏ, dễ thương hoặc hơi ngại, mà bạn muốn kể hôm nay là gì?", depth: 3, type: "Bí mật", icon: "🤫" },
  { text: "Nếu ngày mai phải xa nhau một thời gian, bạn muốn dặn đối phương điều gì?", depth: 5, type: "Xa cách", icon: "✈️" },
  { text: "Bạn nghĩ hai người cần học thêm điều gì để yêu nhau tốt hơn?", depth: 4, type: "Trưởng thành", icon: "🌱" },
  { text: "Kết thúc buổi chơi hôm nay, bạn muốn nói một câu thật lòng nào với đối phương?", depth: 5, type: "Lời nhắn", icon: "💞" }
];

const DEPTH = {
  1: { label: "Nhẹ như gió", card: "from-emerald-50 via-white to-teal-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-700 border-emerald-200", bar: "bg-emerald-400", glow: "bg-emerald-300/25" },
  2: { label: "Ấm áp", card: "from-sky-50 via-white to-cyan-50 border-sky-200", badge: "bg-sky-100 text-sky-700 border-sky-200", bar: "bg-sky-400", glow: "bg-sky-300/25" },
  3: { label: "Gần hơn chút", card: "from-rose-50 via-white to-pink-50 border-rose-200", badge: "bg-rose-100 text-rose-700 border-rose-200", bar: "bg-rose-400", glow: "bg-rose-300/25" },
  4: { label: "Thành thật", card: "from-amber-50 via-white to-orange-50 border-amber-200", badge: "bg-amber-100 text-amber-800 border-amber-200", bar: "bg-amber-500", glow: "bg-amber-300/30" },
  5: { label: "Rất sâu", card: "from-violet-50 via-white to-fuchsia-50 border-violet-200", badge: "bg-violet-100 text-violet-800 border-violet-200", bar: "bg-violet-500", glow: "bg-violet-300/30" }
};

const THEMES = [
  { id: "rose", name: "Valentine", icon: "💕", bg: "bg-[radial-gradient(circle_at_top_left,#ffe4ec,transparent_30%),radial-gradient(circle_at_bottom_right,#e0f2fe,transparent_35%),linear-gradient(135deg,#fff7ed,#fff1f2,#fdf2f8)] text-slate-900", accent: "bg-rose-500", button: "bg-rose-500 hover:bg-rose-600", pill: "border-rose-200 bg-white/70 text-rose-700", ring: "rgba(244,63,94,.8)", soft: "bg-rose-100" },
  { id: "night", name: "Đêm dịu dàng", icon: "🌙", bg: "bg-[radial-gradient(circle_at_top_left,#6d28d9,transparent_28%),radial-gradient(circle_at_bottom_right,#0ea5e9,transparent_32%),linear-gradient(135deg,#111827,#312e81,#581c87)] text-white", accent: "bg-violet-300", button: "bg-violet-400 hover:bg-violet-300 text-slate-950", pill: "border-white/20 bg-white/12 text-violet-100", ring: "rgba(103,232,249,.85)", soft: "bg-white/15" },
  { id: "cafe", name: "Cafe chiều mưa", icon: "☕", bg: "bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_30%),radial-gradient(circle_at_bottom_right,#fde68a,transparent_33%),linear-gradient(135deg,#fff7ed,#fef3c7,#ffedd5)] text-stone-900", accent: "bg-amber-500", button: "bg-amber-700 hover:bg-amber-800", pill: "border-amber-200 bg-white/70 text-amber-800", ring: "rgba(245,158,11,.85)", soft: "bg-amber-100" },
  { id: "home", name: "Tối ở nhà", icon: "🕯️", bg: "bg-[radial-gradient(circle_at_top_left,#fde68a,transparent_28%),radial-gradient(circle_at_bottom_right,#fecaca,transparent_32%),linear-gradient(135deg,#fffbeb,#fff7ed,#fef2f2)] text-zinc-900", accent: "bg-orange-400", button: "bg-orange-500 hover:bg-orange-600", pill: "border-orange-200 bg-white/70 text-orange-700", ring: "rgba(251,146,60,.85)", soft: "bg-orange-100" }
];

const TOTAL_SECONDS = 120;
const MAX_FOLLOW_UPS = 2;
const SHUFFLE_CARDS = ["💌", "🌙", "✨", "💕", "🕯️"];
const FLOATING = ["💕", "✨", "💌", "🌸", "♡", "💗"];

function formatTime(sec) {
  const s = Math.max(0, Number(sec) || 0);
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

function pickIndex(total, used, current) {
  const usedSet = new Set(used);
  const available = Array.from({ length: total }, (_, i) => i).filter((i) => !usedSet.has(i) && i !== current);
  const pool = available.length ? available : Array.from({ length: total }, (_, i) => i).filter((i) => i !== current);
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : current ?? 0;
}

function ToneButton({ children, onClick, disabled, kind = "dark", theme }) {
  const cls = kind === "accent" ? `${theme.button} text-white` : kind === "outline" ? "border border-slate-200 bg-white/75 text-slate-800 hover:bg-white" : "bg-slate-950 text-white hover:bg-slate-800";
  return <button type="button" onClick={onClick} disabled={disabled} className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 ${cls}`}>{children}</button>;
}

export default function CoupleQuestionsApp() {
  const [themeId, setThemeId] = useState("rose");
  const [index, setIndex] = useState(null);
  const [used, setUsed] = useState([]);
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [followUps, setFollowUps] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [sound, setSound] = useState(false);
  const [burst, setBurst] = useState(0);
  const audioRef = useRef(null);
  const tickRef = useRef(null);
  const timerRef = useRef(null);

  const theme = useMemo(() => THEMES.find((x) => x.id === themeId) || THEMES[0], [themeId]);
  const card = index === null ? null : QUESTION_CARDS[index];
  const depth = DEPTH[card?.depth || 1];
  const progress = (used.length / QUESTION_CARDS.length) * 100;
  const timerPercent = (seconds / TOTAL_SECONDS) * 100;
  const danger = open && seconds <= 10;
  const complete = used.length === QUESTION_CARDS.length;

  function ctx() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioRef.current) audioRef.current = new Ctx();
    return audioRef.current;
  }

  function beep(freq, duration = 0.08, delay = 0, volume = 0.05) {
    if (!sound) return;
    const ac = ctx();
    if (!ac) return;
    const start = ac.currentTime + delay;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }

  useEffect(() => {
    if (!running || !open || seconds <= 0) return undefined;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running, open, seconds]);

  useEffect(() => {
    if (seconds === 0) setRunning(false);
    if (sound && running && open && seconds <= 10 && seconds > 0 && tickRef.current !== seconds) {
      tickRef.current = seconds;
      beep(520, 0.04, 0, 0.03);
    }
  }, [seconds, running, open, sound]);

  useEffect(() => () => timerRef.current && window.clearTimeout(timerRef.current), []);

  function draw() {
    if (shuffling) return;
    timerRef.current && window.clearTimeout(timerRef.current);
    setShuffling(true);
    setRevealed(false);
    setOpen(false);
    setRunning(false);
    setFollowUps(0);
    setSeconds(TOTAL_SECONDS);
    setBurst((b) => b + 1);
    beep(440, 0.06);
    beep(620, 0.08, 0.07);
    timerRef.current = window.setTimeout(() => {
      const next = pickIndex(QUESTION_CARDS.length, used, index);
      setIndex(next);
      setUsed((prev) => Array.from(new Set([...prev, next])));
      setDrawCount((n) => n + 1);
      setRevealed(true);
      setShuffling(false);
      setBurst((b) => b + 1);
    }, 820);
  }

  function openCard() {
    if (!revealed || open) return;
    setOpen(true);
    setRunning(true);
    setBurst((b) => b + 1);
    beep(660, 0.09);
    beep(990, 0.12, 0.08);
  }

  function handleCard() {
    if (!revealed) return draw();
    if (!open) return openCard();
    draw();
  }

  function reset() {
    timerRef.current && window.clearTimeout(timerRef.current);
    setIndex(null);
    setUsed([]);
    setSeconds(TOTAL_SECONDS);
    setRunning(false);
    setRevealed(false);
    setOpen(false);
    setShuffling(false);
    setFollowUps(0);
    setDrawCount(0);
  }

  return (
    <main className={`min-h-screen overflow-hidden px-4 py-8 transition-colors duration-500 ${theme.bg}`}>
      <style>{`
        @keyframes enter{from{opacity:0;transform:translateY(18px);filter:blur(7px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
        @keyframes flip{0%{transform:rotateY(0) scale(1);opacity:1}45%{transform:rotateY(88deg) scale(.96);opacity:.45}100%{transform:rotateY(0) scale(1);opacity:1}}
        @keyframes floatHeart{0%{opacity:0;transform:translateY(24px) scale(.6)}20%{opacity:1}100%{opacity:0;transform:translateY(-96px) scale(1.2) rotate(12deg)}}
        @keyframes shimmer{0%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
        @keyframes pulseRing{50%{filter:drop-shadow(0 0 14px rgba(244,63,94,.4))}}
        @keyframes heartbeat{35%{transform:scale(1.08)}65%{transform:scale(.98)}}
        @keyframes shuffle{0%{transform:translateX(-50%) translateY(14px) rotate(-18deg) scale(.86);opacity:0}18%{opacity:1}45%{transform:translateX(calc(-50% + var(--x))) rotate(var(--r)) scale(1)}75%{transform:translateX(calc(-50% - var(--x))) rotate(calc(var(--r)*-1)) scale(.96);opacity:1}100%{transform:translateX(-50%) translateY(20px) rotate(0) scale(.78);opacity:0}}
        @keyframes seal{0%{transform:scale(.72) rotate(-18deg);opacity:0;filter:blur(4px)}58%{transform:scale(1.08) rotate(-10deg);opacity:1;filter:blur(0)}100%{transform:scale(1) rotate(-12deg);opacity:1}}
        @keyframes rain{0%{transform:translateY(-20px);opacity:0}15%{opacity:.35}100%{transform:translateY(120vh);opacity:0}}
        @keyframes star{0%,100%{opacity:.18;transform:scale(.9)}50%{opacity:.75;transform:scale(1.15)}}
        .enter{animation:enter .5s ease both}.flip{animation:flip .58s ease both;transform-style:preserve-3d}.floating-heart{animation:floatHeart 1.25s ease-out forwards}.timer-ring{animation:pulseRing 2s ease-in-out infinite}.danger{animation:heartbeat .8s ease-in-out infinite}.shimmer::after{content:"";position:absolute;inset:0;transform:translateX(-130%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.62),transparent);animation:shimmer 2.3s ease-in-out infinite}.shuffle-card{animation:shuffle .82s ease-in-out both;--x:90px;--r:18deg}.shuffle-card:nth-child(2){--x:-72px;--r:-14deg}.shuffle-card:nth-child(3){--x:38px;--r:8deg}.shuffle-card:nth-child(4){--x:-112px;--r:-22deg}.shuffle-card:nth-child(5){--x:128px;--r:24deg}.seal{animation:seal .55s ease both}.rain{animation:rain 4.6s linear infinite}.star{animation:star 2.4s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.enter,.flip,.floating-heart,.timer-ring,.danger,.shimmer::after,.shuffle-card,.seal,.rain,.star{animation:none!important}}
      `}</style>

      {themeId === "night" && <div className="pointer-events-none fixed inset-0 overflow-hidden">{Array.from({ length: 18 }, (_, i) => <span key={i} className="star absolute rounded-full bg-white" style={{ width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, left: `${6 + i * 5}%`, top: `${8 + ((i * 17) % 70)}%`, animationDelay: `${i * .17}s` }} />)}</div>}
      {themeId === "cafe" && <div className="pointer-events-none fixed inset-0 overflow-hidden">{Array.from({ length: 16 }, (_, i) => <span key={i} className="rain absolute top-0 h-12 w-px rounded-full bg-amber-700/20" style={{ left: `${4 + i * 6}%`, animationDelay: `${i * .22}s` }} />)}</div>}

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <header className="enter mb-6 text-center">
          <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm backdrop-blur ${theme.pill}`}>✦ Bốc lá bài bí mật, mở câu hỏi, rồi trả lời trong 2 phút</div>
          <div className="mb-4 flex justify-center"><button type="button" onClick={() => { setSound((s) => !s); setTimeout(() => ctx()?.resume?.(), 0); }} className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white/30">{sound ? "🔊 Âm thanh bật" : "🔇 Âm thanh tắt"}</button></div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Couple Questions</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 opacity-75 md:text-lg">Ngân hàng 50 lá bài, mỗi lá có độ sâu riêng. Có lá nhẹ như gió, có lá chạm vào những nơi rất mềm.</p>
        </header>

        <div className="mb-6 rounded-[1.75rem] border border-white/30 bg-white/20 p-3 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center justify-between px-1"><p className="text-sm font-bold uppercase tracking-[0.22em] opacity-80">Theme</p><p className="text-xs opacity-70">Chọn mood cho buổi chơi</p></div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">{THEMES.map((t) => <button key={t.id} type="button" onClick={() => setThemeId(t.id)} className={`rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-0.5 ${themeId === t.id ? "border-white bg-white/85 text-slate-950 shadow-md" : "border-white/25 bg-white/15 text-current hover:bg-white/25"}`}><div className="flex items-center gap-2 text-sm font-bold"><span className="text-lg">{t.icon}</span>{t.name}</div></button>)}</div>
        </div>

        <section className="rounded-[2rem] border border-white/70 bg-white/75 shadow-2xl shadow-rose-100/50 backdrop-blur-xl">
          <div className="p-5 md:p-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div><p className="text-sm font-semibold uppercase tracking-[0.25em] opacity-75">Đã bốc {used.length} / {QUESTION_CARDS.length} câu</p><div className="mt-3 h-2 w-56 overflow-hidden rounded-full bg-white/30"><div className={`h-full rounded-full transition-all duration-500 ${theme.accent}`} style={{ width: `${progress}%` }} /></div></div>
              <div className={`flex items-center gap-3 rounded-3xl border border-white/30 bg-white/40 p-3 shadow-sm backdrop-blur ${danger ? "danger" : ""}`}><div className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl ${theme.soft}`}>⏱</div><div><p className="text-xs font-semibold uppercase tracking-widest opacity-60">Thời gian</p><p className={`text-3xl font-bold tabular-nums ${danger ? "text-red-500" : ""}`}>{formatTime(seconds)}</p></div></div>
            </div>

            <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/30"><div className={`h-full rounded-full transition-all duration-500 ${danger ? "bg-red-400" : theme.accent}`} style={{ width: `${timerPercent}%` }} /></div>

            {complete && <div className="enter mb-6 rounded-3xl border border-rose-200 bg-gradient-to-r from-rose-50 to-sky-50 px-5 py-4 text-center text-rose-700 shadow-sm"><div className="text-2xl">💕 ✨ 💌 🌸 💕</div><p className="mt-2 font-semibold">Hai bạn đã bốc hết 50 lá bài rồi.</p></div>}

            {shuffling && <div className="enter mb-6 rounded-[2rem] border border-white/35 bg-white/25 p-5 shadow-sm backdrop-blur"><p className="mb-4 text-center text-sm font-bold uppercase tracking-[0.24em] opacity-70">Đang xáo bài</p><div className="relative mx-auto h-32 max-w-md overflow-hidden rounded-[1.5rem]">{SHUFFLE_CARDS.map((x, i) => <div key={x + i} className={`shuffle-card absolute left-1/2 top-4 grid h-24 w-16 place-items-center rounded-2xl border border-white/70 bg-gradient-to-br from-white to-rose-50 text-3xl shadow-lg ${theme.soft}`} style={{ animationDelay: `${i * .08}s` }}>{x}</div>)}</div></div>}

            <div className="timer-ring relative mb-8 rounded-[2.35rem] p-[5px]" style={open ? { background: `conic-gradient(${danger ? "#f87171" : theme.ring} ${timerPercent}%, rgba(255,255,255,.32) 0)` } : undefined}>
              <button type="button" onClick={handleCard} disabled={shuffling} className={`flip group relative w-full overflow-hidden rounded-[2rem] border bg-gradient-to-br p-7 text-left shadow-inner transition hover:-translate-y-1 hover:shadow-xl active:translate-y-0 md:p-10 ${revealed ? depth.card : "from-white via-rose-50 to-sky-50 border-white/70"} ${!revealed || !open ? "shimmer" : ""}`}>
                <div key={burst} className="pointer-events-none absolute inset-0 overflow-hidden">{FLOATING.map((x, i) => <span key={x + i} className="floating-heart absolute bottom-14 text-2xl" style={{ left: `${16 + i * 13}%`, animationDelay: `${i * .08}s` }}>{x}</span>)}</div>
                <div className={`pointer-events-none absolute -right-10 -top-12 text-[9rem] text-white/40`}>{card?.icon || "💌"}</div>
                <div className={`pointer-events-none absolute inset-x-8 bottom-0 h-28 rounded-full blur-3xl ${revealed ? depth.glow : "bg-rose-200/20"}`} />

                {shuffling ? <Center icon="🎴" title="Đang xáo bài..." desc="Chờ một nhịp thôi, lá bài bí mật đang được chọn." theme={theme} /> : !revealed ? <Center icon="🎴" title="Chạm để bốc một lá bài bí mật" desc="Màu lá bài sẽ hé lộ độ sâu, nhưng câu hỏi vẫn được giấu lại." theme={theme} /> : !open ? <div className="enter relative"><div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><div className={`mb-3 inline-flex rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${depth.badge}`}>{card.icon} {card.type}</div><h2 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">Lá bài bí mật</h2><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Câu hỏi đang được giấu lại. Mở lá bài khi cả hai đã sẵn sàng.</p></div><DepthMeter depth={card.depth} depthStyle={depth} /></div><div className="rounded-[1.75rem] border border-white/70 bg-white/50 p-5 text-center shadow-sm backdrop-blur"><p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-500">Mặt sau lá bài</p><p className="mt-4 text-6xl">{card.icon}</p><div className="seal mx-auto my-5 grid h-28 w-28 place-items-center rounded-full border-4 border-dashed border-current bg-white/45 text-center text-rose-600 shadow-inner"><div className="-rotate-12"><div className="text-3xl">{card.icon}</div><div className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.18em]">Sealed</div><div className="text-[0.55rem] font-bold uppercase tracking-[0.12em] opacity-75">For two</div></div></div><p className="text-xl font-bold text-slate-900">{depth.label}</p><p className="mt-2 text-sm text-slate-500">Nhấn để phá seal, mở câu hỏi và bắt đầu 2 phút.</p></div></div> : <div className="enter relative"><div className="mb-5 flex flex-wrap items-center gap-3"><div className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${depth.badge}`}>{card.icon} {card.type}</div><div className="rounded-full bg-white/65 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Độ sâu {card.depth}/5</div><div className="rounded-full bg-white/65 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Lá bài #{drawCount}</div></div><p className="text-2xl font-semibold leading-relaxed text-slate-950 md:text-4xl md:leading-snug">{card.text}</p><p className="mt-5 text-sm font-medium text-slate-500">Nhấn lại vào thẻ để bốc một lá bài bí mật mới.</p></div>}
              </button>
            </div>

            {seconds === 0 && open && <div className="enter mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">Hết 2 phút rồi. Dừng ở đây nhé — để câu trả lời còn giữ được phần thật nhất.</div>}

            <div className="mb-6 grid gap-3 md:grid-cols-3"><ToneButton onClick={() => setRunning((r) => !r)} disabled={!open}>{running ? "Tạm dừng" : seconds === TOTAL_SECONDS ? "Bắt đầu" : "Tiếp tục"}</ToneButton><ToneButton onClick={() => { setSeconds(TOTAL_SECONDS); setRunning(false); }} disabled={!open} kind="outline">↻ Chạy lại 2 phút</ToneButton><ToneButton onClick={() => { setFollowUps((n) => Math.min(n + 1, MAX_FOLLOW_UPS)); beep(740); }} disabled={!open || followUps >= MAX_FOLLOW_UPS} kind="outline">♡ Hỏi lại {followUps}/{MAX_FOLLOW_UPS}</ToneButton></div>

            <div className="mb-8 rounded-3xl border border-white/30 bg-white/35 p-4 backdrop-blur"><div className="mb-2 flex items-center justify-between text-sm font-medium opacity-75"><span>Số câu hỏi thêm đã dùng</span><span>{followUps} / {MAX_FOLLOW_UPS}</span></div><div className="grid grid-cols-2 gap-2">{[0, 1].map((i) => <div key={i} className={`h-3 rounded-full ${i < followUps ? theme.accent : "bg-white/40"}`} />)}</div><p className="mt-3 text-sm opacity-65">Người kia có thể hỏi sâu thêm, nhưng chỉ tối đa 2 lần cho mỗi câu.</p></div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div className="rounded-2xl bg-white/35 px-5 py-3 text-sm font-semibold shadow-sm backdrop-blur">Còn lại: {Math.max(QUESTION_CARDS.length - used.length, 0)} câu chưa bốc</div><div className="flex flex-col gap-3 sm:flex-row"><ToneButton onClick={reset} kind="outline">Chơi lại từ đầu</ToneButton><ToneButton onClick={revealed && !open ? openCard : draw} disabled={shuffling} kind="accent" theme={theme}>{!revealed ? "Bốc lá bài" : !open ? "Mở lá bài" : "Bốc lá mới"} →</ToneButton></div></div>
          </div>
        </section>

        <div className="mt-5 text-center text-sm opacity-65">Đã bốc {used.length} câu. Cứ chậm thôi, tình cảm mà vội quá thì dễ rơi mất vài điều đẹp.</div>
      </div>
    </main>
  );
}

function Center({ icon, title, desc, theme }) {
  return <div className="enter relative text-center"><div className={`mx-auto mb-5 grid h-24 w-24 place-items-center rounded-[2rem] text-5xl shadow-inner ${theme.soft}`}>{icon}</div><p className="text-2xl font-bold leading-relaxed md:text-4xl">{title}</p><p className="mx-auto mt-4 max-w-xl text-base leading-7 opacity-65">{desc}</p></div>;
}

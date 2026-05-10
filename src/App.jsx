import React, { useMemo, useState, useEffect, useRef } from "react";

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
  { text: "Một bộ phim mà bạn muốn xem cùng đối phương?", depth: 1, type: "Hẹn hò", icon: "🎬" }
];

const DEPTH_STYLES = {
  1: { label: "Nhẹ như gió", badge: "bg-emerald-100 text-emerald-700 border-emerald-200", card: "from-emerald-50 via-white to-teal-50 border-emerald-200", glow: "bg-emerald-300/25", bar: "bg-emerald-400" },
  2: { label: "Ấm áp", badge: "bg-sky-100 text-sky-700 border-sky-200", card: "from-sky-50 via-white to-cyan-50 border-sky-200", glow: "bg-sky-300/25", bar: "bg-sky-400" },
  3: { label: "Gần hơn chút", badge: "bg-rose-100 text-rose-700 border-rose-200", card: "from-rose-50 via-white to-pink-50 border-rose-200", glow: "bg-rose-300/25", bar: "bg-rose-400" },
  4: { label: "Thành thật", badge: "bg-amber-100 text-amber-800 border-amber-200", card: "from-amber-50 via-white to-orange-50 border-amber-200", glow: "bg-amber-300/30", bar: "bg-amber-500" },
  5: { label: "Rất sâu", badge: "bg-violet-100 text-violet-800 border-violet-200", card: "from-violet-50 via-white to-fuchsia-50 border-violet-200", glow: "bg-violet-300/30", bar: "bg-violet-500" }
};

const THEMES = [
  { id: "rose", name: "Valentine", icon: "💕", description: "Hồng nhẹ, ngọt và sáng.", mainClass: "bg-[radial-gradient(circle_at_top_left,#ffe4ec,transparent_30%),radial-gradient(circle_at_bottom_right,#e0f2fe,transparent_35%),linear-gradient(135deg,#fff7ed,#fff1f2,#fdf2f8)] text-slate-900", cardClass: "border-white/70 bg-white/75 shadow-rose-100/80", accentText: "text-rose-500", accentBg: "bg-rose-400", softBg: "bg-rose-100", buttonClass: "bg-rose-500 text-white hover:bg-rose-600", pillClass: "border-rose-200 bg-white/70 text-rose-700", heartClass: "text-rose-100", glowClass: "bg-rose-200/20", timerBar: "bg-sky-400", ringColor: "rgba(244,63,94,0.78)", confettiClass: "border-rose-200 bg-gradient-to-r from-rose-50 to-sky-50 text-rose-700" },
  { id: "night", name: "Đêm dịu dàng", icon: "🌙", description: "Tím đêm, sâu và yên.", mainClass: "bg-[radial-gradient(circle_at_top_left,#6d28d9,transparent_28%),radial-gradient(circle_at_bottom_right,#0ea5e9,transparent_32%),linear-gradient(135deg,#111827,#312e81,#581c87)] text-white", cardClass: "border-white/15 bg-white/12 shadow-violet-950/40", accentText: "text-violet-200", accentBg: "bg-violet-300", softBg: "bg-white/15", buttonClass: "bg-violet-400 text-slate-950 hover:bg-violet-300", pillClass: "border-white/20 bg-white/12 text-violet-100", heartClass: "text-white/10", glowClass: "bg-violet-300/20", timerBar: "bg-cyan-300", ringColor: "rgba(103,232,249,0.85)", confettiClass: "border-white/15 bg-white/12 text-violet-100" },
  { id: "cafe", name: "Cafe chiều mưa", icon: "☕", description: "Ấm, be nâu, rất ngồi gần nhau.", mainClass: "bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_30%),radial-gradient(circle_at_bottom_right,#fde68a,transparent_33%),linear-gradient(135deg,#fff7ed,#fef3c7,#ffedd5)] text-stone-900", cardClass: "border-white/70 bg-white/72 shadow-amber-100/80", accentText: "text-amber-700", accentBg: "bg-amber-500", softBg: "bg-amber-100", buttonClass: "bg-amber-700 text-white hover:bg-amber-800", pillClass: "border-amber-200 bg-white/70 text-amber-800", heartClass: "text-amber-100", glowClass: "bg-amber-200/25", timerBar: "bg-amber-500", ringColor: "rgba(245,158,11,0.85)", confettiClass: "border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800" },
  { id: "home", name: "Tối ở nhà", icon: "🕯️", description: "Đèn vàng, mềm, bình yên.", mainClass: "bg-[radial-gradient(circle_at_top_left,#fde68a,transparent_28%),radial-gradient(circle_at_bottom_right,#fecaca,transparent_32%),linear-gradient(135deg,#fffbeb,#fff7ed,#fef2f2)] text-zinc-900", cardClass: "border-white/70 bg-white/78 shadow-orange-100/80", accentText: "text-orange-600", accentBg: "bg-orange-400", softBg: "bg-orange-100", buttonClass: "bg-orange-500 text-white hover:bg-orange-600", pillClass: "border-orange-200 bg-white/70 text-orange-700", heartClass: "text-orange-100", glowClass: "bg-orange-200/25", timerBar: "bg-orange-400", ringColor: "rgba(251,146,60,0.85)", confettiClass: "border-orange-200 bg-gradient-to-r from-orange-50 to-rose-50 text-orange-700" }
];

const TOTAL_SECONDS = 120;
const MAX_FOLLOW_UPS = 2;
const HEARTS = ["💕", "✨", "💌", "🌸", "♡", "💗"];
const SHUFFLE_CARDS = ["💌", "🌙", "✨", "💕", "🕯️"];

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  return `${Math.floor(safeSeconds / 60).toString().padStart(2, "0")}:${(safeSeconds % 60).toString().padStart(2, "0")}`;
}

function getRandomQuestionIndex(total, usedIndexes = [], currentIndex = null) {
  if (total <= 0) return 0;
  const usedSet = new Set(usedIndexes);
  const available = Array.from({ length: total }, (_, index) => index).filter((questionIndex) => !usedSet.has(questionIndex) && questionIndex !== currentIndex);
  const pool = available.length > 0 ? available : Array.from({ length: total }, (_, index) => index).filter((questionIndex) => questionIndex !== currentIndex);
  if (pool.length === 0) return currentIndex ?? 0;
  return pool[Math.floor(Math.random() * pool.length)];
}

function clampFollowUps(value) { return Math.min(Math.max(value, 0), MAX_FOLLOW_UPS); }
function getThemeById(themeId) { return THEMES.find((theme) => theme.id === themeId) || THEMES[0]; }
function getDepthStyle(depth) { return DEPTH_STYLES[depth] || DEPTH_STYLES[1]; }

function Icon({ children, className = "" }) { return <span aria-hidden="true" className={`inline-flex items-center justify-center ${className}`}>{children}</span>; }

function Button({ children, onClick, disabled = false, variant = "primary", className = "", type = "button", theme }) {
  const variants = { primary: "bg-slate-950 text-white hover:bg-slate-800", rose: theme?.buttonClass || "bg-rose-500 text-white hover:bg-rose-600", outline: "border border-slate-200 bg-white/75 text-slate-800 hover:bg-white" };
  return <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 ${variants[variant]} ${className}`}>{children}</button>;
}

function FloatingHearts({ burstKey }) {
  return <div key={burstKey} className="pointer-events-none absolute inset-0 overflow-hidden">{HEARTS.map((heart, index) => <span key={`${burstKey}-${heart}-${index}`} className="floating-heart absolute bottom-14 text-2xl" style={{ left: `${16 + index * 13}%`, animationDelay: `${index * 0.08}s` }}>{heart}</span>)}</div>;
}

function DepthMeter({ depth, depthStyle }) {
  return <div className="rounded-2xl border border-white/35 bg-white/35 p-3 backdrop-blur"><div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.18em] opacity-70"><span>Độ sâu</span><span>{depth}/5</span></div><div className="mb-2 grid grid-cols-5 gap-1.5">{Array.from({ length: 5 }, (_, item) => <div key={item} className={`h-2.5 rounded-full ${item < depth ? depthStyle.bar : "bg-white/45"}`} />)}</div><p className="text-sm font-semibold">{depthStyle.label}</p></div>;
}

function ThemePicker({ selectedThemeId, onChange }) {
  return <div className="mb-6 rounded-[1.75rem] border border-white/30 bg-white/20 p-3 shadow-sm backdrop-blur"><div className="mb-3 flex items-center justify-between gap-3 px-1"><p className="text-sm font-bold uppercase tracking-[0.22em] opacity-80">Theme</p><p className="text-xs opacity-70">Chọn mood cho buổi chơi</p></div><div className="grid grid-cols-2 gap-2 md:grid-cols-4">{THEMES.map((item) => { const active = item.id === selectedThemeId; return <button key={item.id} type="button" onClick={() => onChange(item.id)} className={`rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-0.5 ${active ? "border-white bg-white/85 text-slate-950 shadow-md" : "border-white/25 bg-white/15 text-current hover:bg-white/25"}`} aria-pressed={active}><div className="flex items-center gap-2 text-sm font-bold"><span className="text-lg">{item.icon}</span>{item.name}</div><p className={`mt-1 text-xs ${active ? "text-slate-500" : "opacity-70"}`}>{item.description}</p></button>; })}</div></div>;
}

function SoundToggle({ enabled, onToggle }) { return <button type="button" onClick={onToggle} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur transition hover:bg-white/30" aria-pressed={enabled}><span>{enabled ? "🔊" : "🔇"}</span>{enabled ? "Âm thanh bật" : "Âm thanh tắt"}</button>; }

function ConfettiMessage({ theme }) { return <div className={`confetti mb-6 rounded-3xl px-5 py-4 text-center shadow-sm ${theme.confettiClass}`}><div className="text-2xl">💕 ✨ 💌 🌸 💕</div><p className="mt-2 font-semibold">Hai bạn đã bốc hết bộ câu hỏi rồi.</p><p className="mt-1 text-sm opacity-75">Nếu còn muốn nói thêm, cứ chọn một câu cũ và đào sâu hơn một chút.</p></div>; }

function ShuffleDeck({ isShuffling, theme }) {
  if (!isShuffling) return null;
  return <div className="question-enter mb-6 rounded-[2rem] border border-white/35 bg-white/25 p-5 shadow-sm backdrop-blur"><p className="mb-4 text-center text-sm font-bold uppercase tracking-[0.24em] opacity-70">Đang xáo bài</p><div className="relative mx-auto h-32 max-w-md overflow-hidden rounded-[1.5rem]">{SHUFFLE_CARDS.map((icon, index) => <div key={`${icon}-${index}`} className={`shuffle-card absolute left-1/2 top-4 grid h-24 w-16 place-items-center rounded-2xl border border-white/70 bg-gradient-to-br from-white to-rose-50 text-3xl shadow-lg ${theme.softBg}`} style={{ animationDelay: `${index * 0.08}s` }}>{icon}</div>)}</div><p className="mt-3 text-center text-sm opacity-65">Một lá đang tìm đường rơi vào tay hai bạn...</p></div>;
}

function SealStamp({ icon }) { return <div className="seal-pop mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full border-4 border-dashed border-current bg-white/45 text-center text-rose-600 shadow-inner backdrop-blur"><div className="-rotate-12"><div className="text-3xl">{icon}</div><div className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.18em]">Sealed</div><div className="text-[0.55rem] font-bold uppercase tracking-[0.12em] opacity-75">For two</div></div></div>; }

export default function CoupleQuestionsApp() {
  const [index, setIndex] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [followUps, setFollowUps] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [drawCount, setDrawCount] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState("rose");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const lastTickSecondRef = useRef(null);
  const wasCompletedRef = useRef(false);
  const shuffleTimeoutRef = useRef(null);

  const theme = useMemo(() => getThemeById(selectedThemeId), [selectedThemeId]);
  const currentCard = index === null ? null : QUESTION_CARDS[index];
  const depthStyle = getDepthStyle(currentCard?.depth || 1);
  const progress = useMemo(() => (answered.length / QUESTION_CARDS.length) * 100, [answered.length]);
  const timerPercent = useMemo(() => (secondsLeft / TOTAL_SECONDS) * 100, [secondsLeft]);
  const remainingQuestions = QUESTION_CARDS.length - answered.length;
  const isTimerDanger = secondsLeft <= 10 && isCardOpen;
  const isCompleted = answered.length === QUESTION_CARDS.length;
  const timerRingColor = isTimerDanger ? "#f87171" : theme.ringColor;

  function getAudioContext() { if (typeof window === "undefined") return null; const AudioContextClass = window.AudioContext || window.webkitAudioContext; if (!AudioContextClass) return null; if (!audioContextRef.current) audioContextRef.current = new AudioContextClass(); return audioContextRef.current; }
  function playTone({ frequency = 660, duration = 0.12, type = "sine", volume = 0.08, delay = 0 }) { if (!soundEnabled) return; const audioContext = getAudioContext(); if (!audioContext) return; const startTime = audioContext.currentTime + delay; const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, startTime); gain.gain.setValueAtTime(0.0001, startTime); gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015); gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration); oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(startTime); oscillator.stop(startTime + duration + 0.02); }
  function playDrawSound() { playTone({ frequency: 440, duration: 0.06, volume: 0.045 }); playTone({ frequency: 620, duration: 0.08, volume: 0.045, delay: 0.06 }); }
  function playRevealSound() { playTone({ frequency: 660, duration: 0.09, volume: 0.07 }); playTone({ frequency: 990, duration: 0.12, volume: 0.055, delay: 0.08 }); }
  function playTickSound() { playTone({ frequency: 520, duration: 0.045, type: "triangle", volume: 0.035 }); }
  function playDoneSound() { playTone({ frequency: 523, duration: 0.1, volume: 0.06 }); playTone({ frequency: 659, duration: 0.1, volume: 0.06, delay: 0.1 }); playTone({ frequency: 784, duration: 0.16, volume: 0.055, delay: 0.2 }); }
  function toggleSound() { setSoundEnabled((prev) => { const next = !prev; if (!prev) setTimeout(() => { const audioContext = getAudioContext(); if (audioContext?.state === "suspended") audioContext.resume(); }, 0); return next; }); }

  useEffect(() => { if (!isRunning || secondsLeft <= 0 || !isCardOpen) return undefined; const interval = setInterval(() => setSecondsLeft((prev) => Math.max(prev - 1, 0)), 1000); return () => clearInterval(interval); }, [isRunning, secondsLeft, isCardOpen]);
  useEffect(() => { if (secondsLeft === 0) setIsRunning(false); }, [secondsLeft]);
  useEffect(() => { if (!soundEnabled || !isRunning || !isCardOpen || secondsLeft > 10 || secondsLeft <= 0) return; if (lastTickSecondRef.current === secondsLeft) return; lastTickSecondRef.current = secondsLeft; playTickSound(); }, [secondsLeft, isRunning, isCardOpen, soundEnabled]);
  useEffect(() => { if (!soundEnabled) return; if (isCompleted && !wasCompletedRef.current) playDoneSound(); wasCompletedRef.current = isCompleted; }, [isCompleted, soundEnabled]);
  useEffect(() => () => { if (shuffleTimeoutRef.current) window.clearTimeout(shuffleTimeoutRef.current); }, []);

  function resetTimer() { setSecondsLeft(TOTAL_SECONDS); setIsRunning(false); lastTickSecondRef.current = null; }
  function drawQuestion() { if (isShuffling) return; setIsShuffling(true); setIsRunning(false); setIsRevealed(false); setIsCardOpen(false); setFollowUps(0); setSecondsLeft(TOTAL_SECONDS); setAnimationKey((prev) => prev + 1); lastTickSecondRef.current = null; playDrawSound(); shuffleTimeoutRef.current = window.setTimeout(() => { const nextIndex = getRandomQuestionIndex(QUESTION_CARDS.length, answered, index); setIndex(nextIndex); setAnswered((prev) => Array.from(new Set([...prev, nextIndex]))); setIsRevealed(true); setIsCardOpen(false); setDrawCount((prev) => prev + 1); setAnimationKey((prev) => prev + 1); setIsShuffling(false); }, 820); }
  function revealSecretCard() { if (!isRevealed || isCardOpen) return; setIsCardOpen(true); setIsRunning(true); setAnimationKey((prev) => prev + 1); playRevealSound(); }
  function handleCardClick() { if (!isRevealed) return drawQuestion(); if (!isCardOpen) return revealSecretCard(); drawQuestion(); }
  function resetGame() { if (shuffleTimeoutRef.current) window.clearTimeout(shuffleTimeoutRef.current); setIndex(null); setAnswered([]); setFollowUps(0); setDrawCount(0); setIsRevealed(false); setIsCardOpen(false); setAnimationKey(0); setIsShuffling(false); wasCompletedRef.current = false; resetTimer(); }
  function addFollowUp() { setFollowUps((prev) => clampFollowUps(prev + 1)); playTone({ frequency: 740, duration: 0.08, volume: 0.045 }); }

  return <main className={`min-h-screen overflow-hidden px-4 py-8 transition-colors duration-500 ${theme.mainClass}`}>
    <style>{`@keyframes flipCard{0%{transform:rotateY(0) scale(1);opacity:1}45%{transform:rotateY(88deg) scale(.96);opacity:.45}100%{transform:rotateY(0) scale(1);opacity:1}}@keyframes questionEnter{from{opacity:0;transform:translateY(18px);filter:blur(7px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}@keyframes floatHeart{0%{opacity:0;transform:translateY(24px) scale(.58) rotate(-8deg)}18%{opacity:1}100%{opacity:0;transform:translateY(-96px) scale(1.18) rotate(12deg)}}@keyframes heartbeat{0%,100%{transform:scale(1)}35%{transform:scale(1.08)}65%{transform:scale(.98)}}@keyframes shimmer{0%{transform:translateX(-130%)}100%{transform:translateX(130%)}}@keyframes confettiDrop{from{opacity:0;transform:translateY(-24px) scale(.92);filter:blur(4px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}@keyframes softPulse{0%,100%{box-shadow:0 0 0 0 rgba(244,63,94,.22)}50%{box-shadow:0 0 0 16px rgba(244,63,94,0)}}@keyframes rainDrop{0%{transform:translateY(-20px);opacity:0}15%{opacity:.35}100%{transform:translateY(120vh);opacity:0}}@keyframes starTwinkle{0%,100%{opacity:.18;transform:scale(.9)}50%{opacity:.75;transform:scale(1.15)}}@keyframes secretGlow{0%,100%{transform:rotate(0) scale(1);opacity:.45}50%{transform:rotate(8deg) scale(1.08);opacity:.75}}@keyframes shuffleCard{0%{transform:translateX(-50%) translateY(14px) rotate(-18deg) scale(.86);opacity:0}18%{opacity:1}45%{transform:translateX(calc(-50% + var(--shuffle-x,0px))) translateY(0) rotate(var(--shuffle-rotate,0deg)) scale(1)}75%{transform:translateX(calc(-50% - var(--shuffle-x,0px))) translateY(4px) rotate(calc(var(--shuffle-rotate,0deg)*-1)) scale(.96);opacity:1}100%{transform:translateX(-50%) translateY(20px) rotate(0) scale(.78);opacity:0}}@keyframes sealPop{0%{transform:scale(.72) rotate(-18deg);opacity:0;filter:blur(4px)}58%{transform:scale(1.08) rotate(-10deg);opacity:1;filter:blur(0)}100%{transform:scale(1) rotate(-12deg);opacity:1}}@keyframes timerRingPulse{0%,100%{filter:drop-shadow(0 0 0 rgba(244,63,94,0))}50%{filter:drop-shadow(0 0 14px rgba(244,63,94,.38))}}.card-flip{animation:flipCard .58s ease both;transform-style:preserve-3d}.question-enter{animation:questionEnter .5s ease both}.floating-heart{animation:floatHeart 1.25s ease-out forwards}.timer-danger{animation:heartbeat .8s ease-in-out infinite;transform-origin:center}.shimmer::after{content:"";position:absolute;inset:0;transform:translateX(-130%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.62),transparent);animation:shimmer 2.3s ease-in-out infinite}.confetti{animation:confettiDrop .7s ease both}.soft-pulse{animation:softPulse 2.6s ease-in-out infinite}.rain-drop{animation:rainDrop 4.6s linear infinite}.star-dot{animation:starTwinkle 2.4s ease-in-out infinite}.secret-orb{animation:secretGlow 3s ease-in-out infinite}.shuffle-card{animation:shuffleCard .82s ease-in-out both;--shuffle-x:90px;--shuffle-rotate:18deg}.shuffle-card:nth-child(2){--shuffle-x:-72px;--shuffle-rotate:-14deg}.shuffle-card:nth-child(3){--shuffle-x:38px;--shuffle-rotate:8deg}.shuffle-card:nth-child(4){--shuffle-x:-112px;--shuffle-rotate:-22deg}.shuffle-card:nth-child(5){--shuffle-x:128px;--shuffle-rotate:24deg}.seal-pop{animation:sealPop .55s ease both}.timer-ring{animation:timerRingPulse 2s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.card-flip,.question-enter,.floating-heart,.timer-danger,.shimmer::after,.confetti,.soft-pulse,.rain-drop,.star-dot,.secret-orb,.shuffle-card,.seal-pop,.timer-ring{animation:none!important}}`}</style>
    {selectedThemeId === "night" && <div className="pointer-events-none fixed inset-0 overflow-hidden">{Array.from({ length: 18 }, (_, item) => <span key={item} className="star-dot absolute rounded-full bg-white" style={{ width: `${2 + (item % 3)}px`, height: `${2 + (item % 3)}px`, left: `${6 + item * 5}%`, top: `${8 + ((item * 17) % 70)}%`, animationDelay: `${item * 0.17}s` }} />)}</div>}
    {selectedThemeId === "cafe" && <div className="pointer-events-none fixed inset-0 overflow-hidden">{Array.from({ length: 16 }, (_, item) => <span key={item} className="rain-drop absolute top-0 h-12 w-px rounded-full bg-amber-700/20" style={{ left: `${4 + item * 6}%`, animationDelay: `${item * 0.22}s`, animationDuration: `${3.8 + (item % 5) * 0.35}s` }} />)}</div>}
    <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
      <header className="mb-6 text-center question-enter"><div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm backdrop-blur ${theme.pillClass}`}><Icon className="text-base">✦</Icon>Bốc lá bài bí mật, mở câu hỏi, rồi trả lời trong 2 phút</div><div className="mb-4 flex justify-center"><SoundToggle enabled={soundEnabled} onToggle={toggleSound} /></div><h1 className="text-4xl font-bold tracking-tight md:text-6xl">Couple Questions</h1><p className="mx-auto mt-3 max-w-2xl text-base leading-7 opacity-75 md:text-lg">Mỗi lá bài có một màu theo độ sâu. Có lá nhẹ như gió, có lá chạm vào những nơi rất mềm.</p></header>
      <ThemePicker selectedThemeId={selectedThemeId} onChange={setSelectedThemeId} />
      <section className={`rounded-[2rem] shadow-2xl backdrop-blur-xl ${theme.cardClass}`}><div className="p-5 md:p-8"><div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className={`text-sm font-semibold uppercase tracking-[0.25em] ${theme.accentText}`}>Đã bốc {answered.length} / {QUESTION_CARDS.length} câu</p><div className="mt-3 h-2 w-56 overflow-hidden rounded-full bg-white/30"><div className={`h-full rounded-full transition-all duration-500 ${theme.accentBg}`} style={{ width: `${progress}%` }} /></div></div><div className={`flex items-center gap-3 rounded-3xl border border-white/30 bg-white/40 p-3 shadow-sm backdrop-blur ${isTimerDanger ? "timer-danger" : ""}`}><div className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl ${theme.softBg}`}>⏱</div><div><p className="text-xs font-semibold uppercase tracking-widest opacity-60">Thời gian</p><p className={`text-3xl font-bold tabular-nums ${isTimerDanger ? "text-red-500" : ""}`}>{formatTime(secondsLeft)}</p></div></div></div><div className="mb-8 h-2 overflow-hidden rounded-full bg-white/30"><div className={`h-full rounded-full transition-all duration-500 ${isTimerDanger ? "bg-red-400" : theme.timerBar}`} style={{ width: `${timerPercent}%` }} /></div>{isCompleted && <ConfettiMessage theme={theme} />}<ShuffleDeck isShuffling={isShuffling} theme={theme} />
      <div className={`timer-ring relative mb-8 rounded-[2.35rem] p-[5px] ${isCardOpen ? "" : "bg-transparent"}`} style={isCardOpen ? { background: `conic-gradient(${timerRingColor} ${timerPercent}%, rgba(255,255,255,0.32) 0)` } : undefined}><button key={`card-${animationKey}`} type="button" onClick={handleCardClick} disabled={isShuffling} className={`card-flip group relative w-full overflow-hidden rounded-[2rem] border bg-gradient-to-br p-7 text-left shadow-inner transition hover:-translate-y-1 hover:shadow-xl active:translate-y-0 md:p-10 ${isRevealed ? depthStyle.card : "from-white via-rose-50 to-sky-50 border-white/70"} ${!isRevealed || !isCardOpen ? "shimmer soft-pulse" : ""}`}><FloatingHearts burstKey={animationKey} /><div className={`secret-orb pointer-events-none absolute -right-10 -top-12 text-[9rem] ${isRevealed ? "text-white/45" : theme.heartClass}`}>{currentCard?.icon || "💌"}</div><div className={`pointer-events-none absolute inset-x-8 bottom-0 h-28 rounded-full blur-3xl ${isRevealed ? depthStyle.glow : theme.glowClass}`} />{isShuffling ? <div className="question-enter relative text-center"><div className={`mx-auto mb-5 grid h-24 w-24 place-items-center rounded-[2rem] text-5xl shadow-inner ${theme.softBg}`}>🎴</div><p className="text-2xl font-bold leading-relaxed md:text-4xl">Đang xáo bài...</p><p className="mx-auto mt-4 max-w-xl text-base leading-7 opacity-65">Chờ một nhịp thôi, lá bài bí mật đang được chọn.</p></div> : !isRevealed ? <div className="question-enter relative text-center"><div className={`mx-auto mb-5 grid h-24 w-24 place-items-center rounded-[2rem] text-5xl shadow-inner ${theme.softBg}`}>🎴</div><p className="text-2xl font-bold leading-relaxed md:text-4xl">Chạm để bốc một lá bài bí mật</p><p className="mx-auto mt-4 max-w-xl text-base leading-7 opacity-65">App sẽ chọn ngẫu nhiên một lá. Màu lá bài sẽ hé lộ độ sâu, nhưng câu hỏi vẫn được giấu lại.</p></div> : !isCardOpen ? <div className="question-enter relative"><div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><div className={`mb-3 inline-flex rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${depthStyle.badge}`}>{currentCard.icon} {currentCard.type}</div><h2 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">Lá bài bí mật</h2><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Câu hỏi đang được giấu lại. Mở lá bài khi cả hai đã sẵn sàng lắng nghe thật kỹ.</p></div><DepthMeter depth={currentCard.depth} depthStyle={depthStyle} /></div><div className="rounded-[1.75rem] border border-white/70 bg-white/50 p-5 text-center shadow-sm backdrop-blur"><p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-500">Mặt sau lá bài</p><p className="mt-4 text-6xl">{currentCard.icon}</p><SealStamp icon={currentCard.icon} /><p className="mt-4 text-xl font-bold text-slate-900">{depthStyle.label}</p><p className="mt-2 text-sm text-slate-500">Lá bài còn niêm phong. Nhấn để phá seal, mở câu hỏi và bắt đầu 2 phút.</p></div></div> : <div key={`question-${animationKey}`} className="question-enter relative"><div className="mb-5 flex flex-wrap items-center gap-3"><div className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${depthStyle.badge}`}>{currentCard.icon} {currentCard.type}</div><div className="rounded-full bg-white/65 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Độ sâu {currentCard.depth}/5</div><div className="rounded-full bg-white/65 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">Lá bài #{drawCount}</div></div><p className="text-2xl font-semibold leading-relaxed text-slate-950 md:text-4xl md:leading-snug">{currentCard.text}</p><p className="mt-5 text-sm font-medium text-slate-500">Nhấn lại vào thẻ để bốc một lá bài bí mật mới.</p></div>}</button></div>{secondsLeft === 0 && isCardOpen && <div className="question-enter mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">Hết 2 phút rồi. Dừng ở đây nhé — để câu trả lời còn giữ được phần thật nhất.</div>}
      <div className="mb-6 grid gap-3 md:grid-cols-3"><Button onClick={() => setIsRunning((prev) => !prev)} disabled={!isCardOpen} variant="primary">{isRunning ? "Tạm dừng" : secondsLeft === TOTAL_SECONDS ? "Bắt đầu" : "Tiếp tục"}</Button><Button onClick={resetTimer} disabled={!isCardOpen} variant="outline"><Icon className="mr-2">↻</Icon>Chạy lại 2 phút</Button><Button onClick={addFollowUp} disabled={!isCardOpen || followUps >= MAX_FOLLOW_UPS} variant="outline"><Icon className="mr-2">♡</Icon>Hỏi lại {followUps}/{MAX_FOLLOW_UPS}</Button></div><div className="mb-8 rounded-3xl border border-white/30 bg-white/35 p-4 backdrop-blur"><div className="mb-2 flex items-center justify-between text-sm font-medium opacity-75"><span>Số câu hỏi thêm đã dùng</span><span>{followUps} / {MAX_FOLLOW_UPS}</span></div><div className="grid grid-cols-2 gap-2">{[0, 1].map((item) => <div key={item} className={`h-3 rounded-full transition-colors duration-300 ${item < followUps ? theme.accentBg : "bg-white/40"}`} />)}</div><p className="mt-3 text-sm opacity-65">Người kia có thể hỏi sâu thêm, nhưng chỉ tối đa 2 lần cho mỗi câu.</p></div><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div className="rounded-2xl bg-white/35 px-5 py-3 text-sm font-semibold shadow-sm backdrop-blur">Còn lại: {Math.max(remainingQuestions, 0)} câu chưa bốc</div><div className="flex flex-col gap-3 sm:flex-row"><Button onClick={resetGame} variant="outline">Chơi lại từ đầu</Button><Button onClick={isRevealed && !isCardOpen ? revealSecretCard : drawQuestion} disabled={isShuffling} variant="rose" theme={theme}>{!isRevealed ? "Bốc lá bài" : !isCardOpen ? "Mở lá bài" : "Bốc lá mới"}<Icon className="ml-2">→</Icon></Button></div></div></div></section><div className="mt-5 text-center text-sm opacity-65">Đã bốc {answered.length} câu. Cứ chậm thôi, tình cảm mà vội quá thì dễ rơi mất vài điều đẹp.</div></div>
  </main>;
}

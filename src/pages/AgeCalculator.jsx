import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CALC_MESSAGES = [
  "Consulting ancient scrolls...",
  "Calling your mom...",
  "Dividing by zero...",
  "Asking ChatGPT...",
  "Aligning the stars...",
  "Recalibrating quantum flux...",
  "Pinging the time servers...",
  "Counting on fingers...",
];

function computeAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

function randomResult(real) {
  if (Math.random() > 0.5) return { ...real, correct: true };
  const yearOffset = Math.floor(Math.random() * 3) + 1;
  const sign = Math.random() > 0.5 ? 1 : -1;
  return { years: real.years + sign * yearOffset, months: real.months, days: real.days, correct: false };
}

export function AgeCalculator() {
  const [phase, setPhase] = useState("input");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);
  const [calcMessage, setCalcMessage] = useState(CALC_MESSAGES[0]);
  const [progress, setProgress] = useState(0);
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [hasCalculated, setHasCalculated] = useState(false);
  const [disclaimer, setDisclaimer] = useState("");
  const msgRef = useRef(0);

  const DISCLAIMER = "We are continuously improving our calculation algorithm. Our team of 47 dedicated PhDs is running advanced simulations 24/7 to reach 99% accuracy by Q3 2027. Thank you for your patience and trust.";

  useEffect(() => {
    if (phase !== "result") { setDisclaimer(""); return; }
    let i = 0;
    setDisclaimer("");
    const t = setInterval(() => {
      i++;
      setDisclaimer(DISCLAIMER.substring(0, i));
      if (i >= DISCLAIMER.length) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "calculating") return;
    setProgress(0);
    msgRef.current = 0;

    const msgInterval = setInterval(() => {
      msgRef.current = (msgRef.current + 1) % CALC_MESSAGES.length;
      setCalcMessage(CALC_MESSAGES[msgRef.current]);
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 30);

    const done = setTimeout(() => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      setProgress(100);
      setResult(randomResult(computeAge(birthDate)));
      setHasCalculated(true);
      setPhase("result");
    }, 1600);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(done);
    };
  }, [phase, birthDate]);

  function handleCalculate() {
    if (!birthDate) return;
    if (hasCalculated) { setPhase("payment"); return; }
    setCalcMessage(CALC_MESSAGES[0]);
    setPhase("calculating");
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Top bar */}
      <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-mono text-xl font-bold text-white">
              vobar<span className="text-blue-500">.dev</span>
            </Link>
            <span className="text-sm text-gray-500">Age Calculator</span>
          </div>
        </div>
      </nav>

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative pt-24 pb-24 px-4 flex flex-col items-center min-h-screen justify-center">
        <div className="w-full max-w-md">

          {/* INPUT */}
          {phase === "input" && (
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
                Free Age Calculation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
                How old are you?
              </h1>
              <p className="text-gray-500 mb-10 text-lg">
                Enter your birth date and our advanced AI will figure it out.{" "}
                <span className="text-gray-600 text-sm">Probably.</span>
              </p>

              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-center text-lg mb-4 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
              />

              <button
                onClick={handleCalculate}
                disabled={!birthDate}
                className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Calculate My Age
              </button>

              <p className="mt-4 text-sm text-gray-600">
                <span className="text-green-500/80 font-medium">First try is FREE</span>
                <span className="mx-2 text-gray-700">•</span>
                $3.00 per calculation after that
              </p>
            </div>
          )}

          {/* CALCULATING */}
          {phase === "calculating" && (
            <div className="flex flex-col items-center text-center gap-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Calculating...</h2>
                <p className="text-gray-500 text-sm">This may take a moment. We take precision seriously.</p>
              </div>

              <div className="w-20 h-20 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />

              <p className="text-blue-400 font-mono text-sm min-h-[20px] transition-all duration-300">
                {calcMessage}
              </p>

              <div className="w-full">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* RESULT */}
          {phase === "result" && result && (
            <div className="flex flex-col items-center text-center gap-6">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-widest">
                Calculation Complete
              </div>

              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">You are</p>
                <p className="text-8xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-none mb-2">
                  {result.years}
                </p>
                <p className="text-2xl text-gray-300 font-medium mb-6">years old</p>
                <div className="flex justify-center gap-6 text-sm text-gray-500 border-t border-white/5 pt-4">
                  <span><span className="text-white font-medium">{result.months}</span> months</span>
                  <span className="text-gray-700">·</span>
                  <span><span className="text-white font-medium">{result.days}</span> days</span>
                </div>
              </div>

              <p className="text-gray-600 text-xs italic leading-relaxed px-2 min-h-[60px]">
                {disclaimer}
                {disclaimer.length < DISCLAIMER.length && (
                  <span className="animate-blink">|</span>
                )}
              </p>

              <button
                onClick={handleCalculate}
                className="w-full border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50 font-semibold py-4 px-8 rounded-lg text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                Calculate Again
              </button>
              <p className="text-xs text-gray-700">$3.00 per calculation</p>
            </div>
          )}

          {/* PAYMENT */}
          {phase === "payment" && (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                  Secure Checkout
                </div>
                <h2 className="text-3xl font-bold text-white mb-1">Premium Calculation</h2>
                <p className="text-gray-500 text-sm">
                  One-time charge of <span className="text-white font-semibold">$3.00</span>
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-400 text-sm">Age Calculation × 1</span>
                  <span className="text-white font-semibold">$3.00</span>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setPhase("roasted"); }} className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all font-mono"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest mb-1.5">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] mt-2"
                  >
                    Pay $3.00 &amp; Calculate
                  </button>
                </form>

                <p className="text-center text-gray-700 text-xs mt-4">
                  256-bit SSL encryption · Totally safe · Trust us
                </p>
              </div>

              <button
                onClick={() => setPhase("result")}
                className="text-sm text-gray-600 hover:text-gray-400 transition-colors text-center"
              >
                ← Go back
              </button>
            </div>
          )}

          {/* ROASTED */}
          {phase === "roasted" && (
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-6xl animate-bounce">🚨</div>

              <div>
                <h2 className="text-3xl font-bold text-red-400 mb-2">Security Alert</h2>
                <p className="text-gray-500 text-sm">Please read the following carefully.</p>
              </div>

              <div className="w-full bg-red-950/20 border border-red-900/40 rounded-2xl p-6 text-left space-y-4">
                <p className="text-white font-semibold text-lg">Wow. Just... wow.</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  You actually typed your real card details into a random portfolio website
                  you found on the internet. A site that literally told you up front the first
                  calculation was free — and then asked you to pay <strong>three dollars</strong> to count your own age.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Have you ever heard of{" "}
                  <span className="text-red-400 font-semibold">phishing</span>?{" "}
                  <span className="text-red-400 font-semibold">Social engineering</span>?
                  No? Congratulations — you just walked straight through a textbook example.
                </p>
                <div className="border-t border-red-900/30 pt-4">
                  <p className="text-gray-500 text-xs leading-relaxed italic">
                    Relax — nothing was sent anywhere, this is just a joke page.
                    But next time, maybe don't hand your card details to a stranger
                    who charges $3 to calculate your age.
                  </p>
                </div>
              </div>

              <Link
                to="/"
                className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
              >
                ← Back to the actual portfolio
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

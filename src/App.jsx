import { useState, useEffect } from "react";

const BLUE   = "#6E82E8";
const NAVY   = "#3A4BAA";
const BG     = "#08090F";
const BG2    = "#0C0E18";
const CREAM  = "#E8E6F0";
const DIM    = "rgba(232,230,240,0.45)";

const PHASES = [
  {
    num: "01",
    title: "Usecase & Tutorials",
    subtitle: "Problem Drop",
    desc: "The challenge brief is released — a real-world problem designed to be solved through conversational AI. Tutorial links and platform walkthroughs are shared so every participant starts on equal footing. No prior experience required.",
  },
  {
    num: "02",
    title: "Build Phase",
    subtitle: "Craft Your Solution",
    desc: "Use Hunar.AI's platform to engineer your best prompt-driven solution. The AI model is revealed with the brief. No code, no APIs — just your thinking, your language, and the output you produce.",
  },
  {
    num: "03",
    title: "Submission",
    subtitle: "Submit via Portal",
    desc: "Submit through the portal: your project link, the prompt strategy behind it, and a LinkedIn or blog post sharing your build-in-public journey. Clarity of reasoning counts as much as the result.",
  },
  {
    num: "04",
    title: "Evaluation",
    subtitle: "Assessment & Scores",
    desc: "A panel of judges scores every submission on creativity, output quality, and prompt efficiency. Audience vote counts for 40% in head-to-head rounds. Leaderboard updated. Credits distributed.",
  },
  {
    num: "05",
    title: "Championship",
    subtitle: "Coming Soon",
    desc: "Phase 5 details will be announced when registrations closes on 5 April 2026.",
    locked: true,
  },
];

const REWARDS = [
  { icon:"🏆", title:"Prompt Credits",   desc:"Every submission earns Prompt Credits — the currency of Terminal War. The more you compete, the more you accumulate." },
  { icon:"🎖️", title:"Leaderboard Rank", desc:"Climb the cumulative leaderboard and get noticed by industry leaders and the Hunar.AI community." },
  { icon:"🔓", title:"Advanced Rounds",  desc:"High XP unlocks entry into advanced, high-stakes rounds with bigger challenges and bigger rewards." },
  { icon:"💡", title:"Portfolio",        desc:"By season end, you'll hold a library of top-tier prompt outputs — proof of your prompt engineering skill." },
];

const FAQS = [
  { q:"Do I need to know how to code?",                    a:"Not at all. Terminal War is deliberately code-free. You need to be able to think clearly, write precisely, and understand how to communicate with AI models. No syntax required." },
  { q:"Which AI model will we be using?",                  a:"Details are revealed with each challenge brief. All participants use the same model under the same conditions — the playing field is completely level." },
  { q:"How is scoring decided?",                           a:"A panel of four judges scores on three axes: creativity, output quality, and prompt efficiency. In head-to-head rounds, audience vote counts for 40% of the score." },
  { q:"Is this free to enter?",                            a:"Season 01 is free for all participants. Future seasons may introduce prize pools and entry tiers, but the core competition will always have a free track." },
  { q:"Where does the championship take place?",           a:"Entirely virtual. Rounds happen live on a dedicated platform and are streamed publicly. You compete from wherever you are." },
  { q:"Can I participate if I've never used AI before?",   a:"Yes — in fact, fresh thinkers often outperform experienced users. Terminal War rewards how you think, not how long you've been using AI tools." },
  { q:"How many rounds are in a season?",                  a:"Season 01 runs multiple challenge cycles. Each cycle follows the same 4-phase structure. The number of cycles will be announced when the season kicks off on April 5." },
  { q:"What are Prompt Credits used for?",                 a:"Prompt Credits unlock advanced rounds, accumulate toward leaderboard standing, and will be redeemable in the Hunar swag store in future seasons." },
  { q:"Will there be prizes?",                             a:"Season 01 features a $250 prize pool alongside recognition, Prompt Credits, and leaderboard placement. Bigger prize pools are planned for future seasons." },
  { q:"What happens if I miss the submission deadline?",   a:"Late submissions are not accepted — the challenge window is fixed and fair for all. The deadline is always 11:59 PM on the final submission day." },
];

const API_URL = "https://terminal-war-backend.onrender.com";

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
}

export default function App() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", college:"", course:"", portfolio:"", linkedin:"" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => { const t = setInterval(() => setTick(x=>x+1), 1000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, new Date("2026-04-05T00:00:00") - new Date());
  const cd = { d:Math.floor(diff/86400000), h:Math.floor((diff%86400000)/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000) };
  const showPhase5 = new Date() >= new Date("2026-04-05T00:00:00");

  const handleChange = e => { setForm({...form,[e.target.name]:e.target.value}); if(errors[e.target.name]) setErrors({...errors,[e.target.name]:""}); };
  const validate = () => {
    const e={};
    if(!form.name.trim()) e.name="Required";
    if(!form.phone.trim()) e.phone="Required";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email="Valid email required";
    if(!form.college.trim()) e.college="Required";
    if(!form.course.trim()) e.course="Required";
    if(!form.linkedin.trim()) e.linkedin="Required";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if(Object.keys(errs).length){ setErrors(errs); return; }
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch(`${API_URL}/api/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch (err) {
      setServerError("Something went wrong. Please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background:BG, color:CREAM, minHeight:"100vh", fontFamily:"'Barlow', sans-serif" }}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, background:"rgba(8,9,15,0.94)", backdropFilter:"blur(20px)", borderBottom:`1px solid rgba(110,130,232,0.1)` }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"16px 48px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <button onClick={()=>scrollTo("hero")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:0 }}>
            <span style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:900, letterSpacing:2, color:CREAM }}>
              hunar<span style={{color:BLUE}}>.</span><span style={{color:NAVY}}>ai</span>
            </span>
          </button>
          <div style={{ display:"flex", gap:36 }}>
            {["about","phases","faq","apply"].map(id=>(
              <button key={id} onClick={()=>scrollTo(id)} className="nav-link">
                {id.charAt(0).toUpperCase()+id.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={()=>scrollTo("apply")} className="cta-btn" style={{ background:BLUE, color:BG }}>
            Apply Now
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position:"relative", paddingTop:80, minHeight:"95vh", display:"flex", flexDirection:"column", justifyContent:"center", overflow:"hidden" }}>
        <div className="slash slash-1" />
        <div className="slash slash-2" />
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 80% 60% at 70% 40%, rgba(58,75,170,0.18) 0%, transparent 70%)`, pointerEvents:"none" }} />

        <div style={{ position:"relative", maxWidth:1200, margin:"0 auto", padding:"80px 48px 140px" }}>
          <div className="tag-row">
            <div style={{ width:36, height:2, background:BLUE }} />
            <span style={{ fontSize:11, letterSpacing:3, color:BLUE, textTransform:"uppercase", fontWeight:700 }}>
              Season 01 — Closes 5 April 2026 — No Code · No APIs · Pure Prompt
            </span>
          </div>

          <h1 className="hero-h1">
            Terminal<br/>
            <span style={{ color:BLUE }}>War</span>
          </h1>

          <div style={{ display:"flex", gap:64, marginTop:48, flexWrap:"wrap", alignItems:"flex-start" }}>
            <div style={{ maxWidth:460 }}>
              <p style={{ fontSize:17, lineHeight:1.8, color:DIM, fontWeight:300 }}>
                The AI conversation championship. Hosted by{" "}
                <strong style={{ color:CREAM, fontWeight:700 }}>Hunar.AI</strong> — the prompt engineering arena where sharp thinkers compete with nothing but language. One brief. One model. Every participant on the same terms.
              </p>
              <div style={{ display:"flex", gap:16, marginTop:36 }}>
                <button onClick={()=>scrollTo("apply")} className="cta-btn" style={{ background:BLUE, color:BG, fontSize:15, padding:"14px 36px" }}>
                  Register Free →
                </button>
                <button onClick={()=>scrollTo("about")} className="ghost-btn">
                  Learn More
                </button>
              </div>
            </div>

            <div style={{ borderLeft:`4px solid ${BLUE}` }}>
              <div style={{ fontSize:10, letterSpacing:3, color:DIM, textTransform:"uppercase", fontWeight:600, marginBottom:16, paddingLeft:24 }}>
                Season Closes In
              </div>
              <div style={{ display:"flex" }}>
                {[["Days",cd.d],["Hrs",cd.h],["Min",cd.m],["Sec",cd.s]].map(([l,v],i)=>(
                  <div key={l} style={{ padding:"16px 28px", borderRight:`1px solid rgba(110,130,232,0.15)`, background: i%2===0 ? "rgba(110,130,232,0.06)" : "rgba(58,75,170,0.06)" }}>
                    <div style={{ fontFamily:"'Playfair Display', serif", fontSize:52, fontWeight:900, color:i%2===0?BLUE:NAVY, lineHeight:1 }}>
                      {String(v).padStart(2,"0")}
                    </div>
                    <div style={{ fontSize:10, color:DIM, letterSpacing:2, textTransform:"uppercase", marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, borderTop:`1px solid rgba(110,130,232,0.1)`, display:"flex" }}>
          {[["$250","Prize Money"],["Solo","Format"],["Free","Entry"]].map(([v,l],i)=>(
            <div key={l} style={{ flex:1, padding:"18px 32px", borderRight:`1px solid rgba(110,130,232,0.08)`, background: i%2===0?"rgba(110,130,232,0.03)":"transparent" }}>
              <div style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:900, color:i%2===0?BLUE:NAVY }}>{v}</div>
              <div style={{ fontSize:10, color:DIM, letterSpacing:2, textTransform:"uppercase", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding:"100px 48px", background:BG2 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionTag label="What is Terminal War?" />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:64, marginTop:40, alignItems:"start" }}>
            <h2 style={H2}>The AI conversation championship.</h2>
            <div>
              <p style={{ fontSize:16, lineHeight:1.82, color:DIM, fontWeight:300 }}>
                Terminal War is Hunar.AI's prompt engineering championship. One brief. One model. Every participant on the same terms. The question isn't whether you can use AI — it's how well you can direct it.
              </p>
              <p style={{ fontSize:16, lineHeight:1.82, color:DIM, fontWeight:300, marginTop:16 }}>
                No code. No integrations. Just your thinking, your language, and the output you produce. Judges score on{" "}
                <strong style={{ color:BLUE }}>creativity</strong>,{" "}
                <strong style={{ color:BLUE }}>output quality</strong>, and{" "}
                <strong style={{ color:BLUE }}>prompt efficiency</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section id="phases" style={{ padding:"100px 48px", background:BG }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionTag label="How It Works" />
          <h2 style={{ ...H2, marginTop:16 }}>The Challenge Cycle</h2>
          <p style={{ fontSize:15, color:DIM, marginTop:12, maxWidth:480 }}>Every challenge follows the same structure. Fast, fair, and entirely virtual.</p>

          {/* Phase connector strip */}
          <div style={{ display:"flex", alignItems:"center", marginTop:52, flexWrap:"wrap" }}>
            {PHASES.map((p,i)=>{
              const locked = p.locked && !showPhase5;
              const isBlue = i%2===0;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ padding:"10px 22px", border:`1.5px solid ${locked?"rgba(255,255,255,0.1)":isBlue?`rgba(110,130,232,0.4)`:`rgba(58,75,170,0.4)`}`, background:locked?"rgba(255,255,255,0.03)":isBlue?"rgba(110,130,232,0.08)":"rgba(58,75,170,0.08)", display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontFamily:"'Playfair Display', serif", fontSize:14, fontWeight:900, color:locked?DIM:isBlue?BLUE:NAVY, letterSpacing:1 }}>Phase {p.num}</span>
                    {locked && <span style={{ fontSize:10, color:"rgba(255,255,255,0.25)" }}>🔒 Apr 5</span>}
                  </div>
                  {i<PHASES.length-1 && (
                    <div style={{ display:"flex", alignItems:"center", margin:"0 2px" }}>
                      <div style={{ width:28, height:1, background:`rgba(110,130,232,0.2)` }} />
                      <span style={{ color:`rgba(110,130,232,0.3)`, fontSize:16 }}>›</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Phase cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:2, marginTop:16, background:`rgba(110,130,232,0.06)` }}>
            {PHASES.map((p,i)=>{
              const locked = p.locked && !showPhase5;
              const isBlue = i%2===0;
              return (
                <div key={i} className="phase-card" style={{ background:BG, borderTop:`3px solid ${locked?"rgba(255,255,255,0.08)":isBlue?BLUE:NAVY}`, padding:"28px 24px", opacity:locked?0.45:1 }}>
                  <div style={{ fontFamily:"'Playfair Display', serif", fontSize:62, fontWeight:900, color:isBlue?`rgba(110,130,232,0.12)`:`rgba(58,75,170,0.12)`, lineHeight:1, marginBottom:14 }}>{p.num}</div>
                  {/* Subtitle (milestone label) */}
                  <div style={{ fontSize:10, color:isBlue?BLUE:NAVY, letterSpacing:2.5, textTransform:"uppercase", fontWeight:700, marginBottom:8 }}>{p.subtitle}</div>
                  {/* Title */}
                  <h3 style={{ fontSize:17, fontWeight:800, color:CREAM, marginBottom:10 }}>
                    {locked ? "🔒 Revealed Apr 5" : p.title}
                  </h3>
                  <p style={{ fontSize:13.5, color:DIM, lineHeight:1.65 }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REWARDS */}
      <section style={{ padding:"100px 48px", background:BG2 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionTag label="What You Earn" />
          <h2 style={{ ...H2, marginTop:16 }}>Earn Your Prompt Credits</h2>
          <p style={{ fontSize:15, color:DIM, marginTop:12, maxWidth:560 }}>In Terminal War, your effort turns into Prompt Credits. The more you compete, the more you build.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:16, marginTop:48 }}>
            {REWARDS.map((r,i)=>(
              <div key={i} className="reward-card" style={{ background:BG, border:`1px solid rgba(110,130,232,0.1)`, borderTop:`3px solid ${i%2===0?BLUE:NAVY}`, padding:"32px 26px" }}>
                <span style={{ fontSize:24, display:"block", marginBottom:16 }}>{r.icon}</span>
                <h3 style={{ fontSize:17, fontWeight:800, color:CREAM, marginBottom:10 }}>{r.title}</h3>
                <p style={{ fontSize:14, color:DIM, lineHeight:1.65 }}>{r.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:40, display:"flex", justifyContent:"center" }}>
            <span style={{ border:`1px solid rgba(110,130,232,0.2)`, color:DIM, fontSize:13, fontWeight:600, padding:"10px 28px", letterSpacing:1 }}>Swag Store · Coming Soon</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding:"100px 48px", background:BG }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionTag label="Common Questions" />
          <h2 style={{ ...H2, marginTop:16 }}>FAQ</h2>
          <div style={{ marginTop:48, display:"flex", flexDirection:"column", gap:2 }}>
            {FAQS.map((f,i)=>(
              <div key={i} style={{ borderLeft:`3px solid ${openFaq===i?BLUE:"rgba(110,130,232,0.15)"}`, transition:"border-color .2s" }}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                  style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 28px", background:"none", border:"none", borderBottom:`1px solid rgba(110,130,232,0.07)`, color:CREAM, fontSize:15, fontWeight:600, cursor:"pointer", textAlign:"left", fontFamily:"'Barlow', sans-serif", gap:16 }}>
                  <span>{f.q}</span>
                  <span style={{ color:BLUE, fontSize:22, flexShrink:0, transform:openFaq===i?"rotate(45deg)":"rotate(0deg)", transition:"transform .2s", lineHeight:1 }}>+</span>
                </button>
                {openFaq===i && <p style={{ padding:"16px 28px 24px", color:DIM, fontSize:14.5, lineHeight:1.8 }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" style={{ padding:"100px 48px", background:BG2 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionTag label="Applications Open · Season 01" />
          <h2 style={{ ...H2, marginTop:16 }}>Enter the Terminal</h2>
          <p style={{ fontSize:15, color:DIM, marginTop:12, maxWidth:480 }}>Individual entries only. Under 2 minutes to fill in.</p>

          {submitted ? (
            <div style={{ background:BG, border:`1.5px solid ${BLUE}`, padding:"80px 48px", marginTop:48, textAlign:"center" }}>
              <div style={{ fontFamily:"'Playfair Display', serif", fontSize:52, color:BLUE, marginBottom:16 }}>✦</div>
              <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:44, fontWeight:900, color:CREAM, marginBottom:16 }}>You're in the Terminal.</h3>
              <p style={{ fontSize:16, color:DIM, lineHeight:1.75 }}>
                Application received for <strong style={{color:BLUE}}>{form.name}</strong>.<br/>
                Check <strong style={{color:BLUE}}>{form.email}</strong> — the brief drops on <strong style={{color:NAVY}}>5 April 2026</strong>.
              </p>
            </div>
          ) : (
            <div style={{ background:BG, border:`1px solid rgba(110,130,232,0.1)`, padding:"48px 44px", marginTop:48 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px 32px", marginBottom:24 }}>
                <FF label="Full Name" req err={errors.name}><input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={IS(errors.name)} /></FF>
                <FF label="Phone Number" req err={errors.phone}><input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Your phone number" style={IS(errors.phone)} /></FF>
                <FF label="Email Address" req err={errors.email}><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={IS(errors.email)} /></FF>
                <FF label="College / Organisation" req err={errors.college}><input name="college" value={form.college} onChange={handleChange} placeholder="University" style={IS(errors.college)} /></FF>
                <FF label="Course / Role" req err={errors.course}><input name="course" value={form.course} onChange={handleChange} placeholder="Your course" style={IS(errors.course)} /></FF>
                <FF label="LinkedIn URL" req err={errors.linkedin}><input name="linkedin" type="url" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourname" style={IS(errors.linkedin)} /></FF>
              </div>
              <div style={{ marginBottom:24 }}>
                <FF label="Portfolio / GitHub" note="optional"><input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://github.com/yourhandle" style={IS(false)} /></FF>
              </div>

              {serverError && (
                <p style={{ color:"#FF7B7B", fontSize:13, marginBottom:16, textAlign:"center" }}>{serverError}</p>
              )}

              <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
                {loading ? "Submitting…" : "Submit Application →"}
              </button>
              <p style={{ textAlign:"center", fontSize:12, color:"rgba(232,230,240,0.2)", marginTop:14 }}>Stored securely · Used only for Terminal War coordination</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid rgba(110,130,232,0.08)`, padding:"32px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <button onClick={()=>scrollTo("hero")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <span style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:900, letterSpacing:2, color:CREAM }}>
              hunar<span style={{color:BLUE}}>.</span><span style={{color:NAVY}}>ai</span>
            </span>
          </button>
          <p style={{ fontSize:13, color:"rgba(232,230,240,0.22)" }}>© 2026 Hunar.AI · Terminal War · Season 01 · All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function SectionTag({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
      <div style={{ width:32, height:2, background:BLUE }} />
      <span style={{ fontSize:11, letterSpacing:3, color:BLUE, textTransform:"uppercase", fontWeight:700 }}>{label}</span>
    </div>
  );
}

function FF({ label, req, note, err, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
      <label style={{ fontSize:12, fontWeight:700, color:"rgba(232,230,240,0.6)", letterSpacing:0.5, textTransform:"uppercase" }}>
        {label}{req && <span style={{color:BLUE,marginLeft:3}}>*</span>}
        {note && <span style={{color:DIM,fontSize:11,marginLeft:6,textTransform:"none",fontWeight:400}}>({note})</span>}
      </label>
      {children}
      {err && <span style={{color:"#FF7B7B",fontSize:12}}>{err}</span>}
    </div>
  );
}

function IS(err) {
  return { background:"#0A0B14", border:`1.5px solid ${err?"rgba(255,123,123,0.5)":"rgba(110,130,232,0.15)"}`, padding:"12px 16px", color:CREAM, fontSize:14, outline:"none", fontFamily:"'Barlow', sans-serif", width:"100%", transition:"border-color .2s" };
}

const H2 = { fontFamily:"'Playfair Display', serif", fontSize:"clamp(38px,5.5vw,64px)", fontWeight:900, lineHeight:1, letterSpacing:-0.5, color:CREAM };

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Barlow:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:#08090F; -webkit-font-smoothing:antialiased; }
  input, button { font-family:inherit; }
  input::placeholder { color:rgba(232,230,240,0.18); }
  input:focus { border-color:rgba(110,130,232,0.5) !important; outline:none; }

  .nav-link {
    background:none; border:none; color:rgba(232,230,240,0.45); font-family:'Barlow',sans-serif;
    font-weight:600; cursor:pointer; padding:0;
    text-transform:uppercase; font-size:12px; letter-spacing:1.5px; transition:color .2s;
  }
  .nav-link:hover { color:#6E82E8; }

  .cta-btn {
    background:#6E82E8; color:#08090F; font-family:'Barlow',sans-serif;
    font-weight:800; font-size:13px; letter-spacing:1px; padding:12px 28px;
    border:none; cursor:pointer; text-transform:uppercase; transition:all .2s;
  }
  .cta-btn:hover { background:#3A4BAA; box-shadow:0 0 32px rgba(110,130,232,0.35); }

  .ghost-btn {
    background:transparent; color:rgba(232,230,240,0.45); font-family:'Barlow',sans-serif;
    font-weight:700; font-size:13px; letter-spacing:1px; padding:12px 24px;
    border:1.5px solid rgba(232,230,240,0.15); cursor:pointer; text-transform:uppercase; transition:all .2s;
  }
  .ghost-btn:hover { border-color:#6E82E8; color:#6E82E8; }

  .tag-row { display:flex; align-items:center; gap:14px; margin-bottom:32px; }

  .slash { position:absolute; top:0; height:100%; width:2px; transform:skewX(-14deg); pointer-events:none; }
  .slash-1 { right:18%; background:#6E82E8; opacity:0.18; }
  .slash-2 { right:calc(18% + 22px); background:#3A4BAA; opacity:0.1; }

  .hero-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(72px, 11vw, 140px);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -3px;
    color: #E8E6F0;
    margin: 0;
  }
  .hero-sup {
    font-family: 'Barlow', sans-serif;
    font-size: 0.22em;
    font-weight: 800;
    letter-spacing: 2px;
    color: #3A4BAA;
    vertical-align: super;
    line-height: 1;
  }

  .phase-card { transition:transform .2s, background .2s; cursor:default; }
  .phase-card:hover { transform:translateY(-4px); background:#0C0E18 !important; }

  .reward-card { transition:transform .2s; cursor:default; }
  .reward-card:hover { transform:translateY(-4px); border-color:rgba(110,130,232,0.3) !important; }

  .submit-btn {
    display:block; width:100%; background:#6E82E8; color:#08090F;
    font-family:'Barlow',sans-serif; font-weight:800; font-size:15px;
    letter-spacing:1px; text-transform:uppercase; padding:18px;
    border:none; cursor:pointer; transition:all .2s;
  }
  .submit-btn:hover { background:#3A4BAA; }
  .submit-btn:disabled { opacity:0.5; cursor:not-allowed; }
`;
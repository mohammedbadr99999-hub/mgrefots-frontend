import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import './coach.css';

const copy = {
  ar: {
    eyebrow: 'تدريب وتغذية على مقاس هدفك', title: 'اسأل MGREFOTS',
    intro: 'اسأل عن هدفك أو تمرينك، وخد خطوة واضحة تبدأ بها.',
    placeholder: 'مثال: عايزة أكبر عضلات المؤخرة وبتمرن ٣ أيام، أبدأ بإيه؟',
    ask: 'اسأل', busy: 'جارٍ تجهيز الرد…',
    examples: ['عاوز أخس', 'عاوز أزيد عضلات', 'عايزة أقوي عضلات المؤخرة'],
    unavailable: 'خدمة الإجابات غير متاحة حاليًا. تواصل معنا عبر واتساب.',
    note: 'إرشاد عام للتدريب والتغذية؛ الحالات الصحية والإصابات تحتاج تقييم مختص.',
  },
  en: {
    eyebrow: 'Training and nutrition for your goal', title: 'Ask MGREFOTS',
    intro: 'Ask about your goal or sport and get a clear first step.',
    placeholder: 'Example: I want to build my glutes and can train three days a week. Where do I start?',
    ask: 'Ask', busy: 'Preparing your answer…',
    examples: ['Lose fat', 'Build muscle', 'Build my glutes'],
    unavailable: 'Answers are unavailable right now. Contact us on WhatsApp.',
    note: 'General training and nutrition guidance; health conditions and injuries need professional assessment.',
  },
  rw: {
    eyebrow: 'Imyitozo n’imirire bijyanye n’intego yawe', title: 'Baza MGREFOTS',
    intro: 'Baza ku ntego cyangwa siporo yawe, ubone intambwe ya mbere.',
    placeholder: 'Urugero: Ndashaka kongera imikaya, natangira nte?',
    ask: 'Baza', busy: 'Turategura igisubizo…',
    examples: ['Kugabanya ibinure', 'Kongera imikaya', 'Kwitegura kwiruka'],
    unavailable: 'Ubu ntidushobora gusubiza. Twandikire kuri WhatsApp.',
    note: 'Inama rusange; ibibazo by’ubuzima n’imvune bisaba impuguke.',
  },
};

export default function CoachBox({ lang }) {
  const t = copy[lang] || copy.en;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || busy) return;
    const history = messages.slice(-8).map(m => ({ role: m.role, text: m.text.slice(0, 1200) }));
    setMessages(previous => [...previous, { role: 'user', text: prompt }]);
    setInput('');
    setBusy(true);
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, lang, history }),
      });
      const data = await response.json();
      if (!response.ok || !data.text) throw new Error(data.error || t.unavailable);
      setMessages(previous => [...previous, { role: 'model', text: data.text }]);
    } catch {
      setMessages(previous => [...previous, { role: 'model', text: t.unavailable }]);
    } finally {
      setBusy(false);
    }
  }

  return <section id="coach" className="hero-coach" aria-labelledby="coach-title">
    <div className="coach-heading"><div><p className="coach-eyebrow">{t.eyebrow}</p><h2 id="coach-title">{t.title}</h2></div><p>{t.intro}</p></div>
    {messages.length > 0 && <div className="coach-conversation" aria-live="polite">
      {messages.map((message, index) =>
        <p className={message.role === 'user' ? 'coach-message-question' : 'coach-message-answer'} key={index}>{message.text}</p>)}
    </div>}
    <form className="coach-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="coach-question">{t.title}</label>
      <textarea id="coach-question" value={input} onChange={event => setInput(event.target.value)}
        placeholder={t.placeholder} maxLength={2000} rows={2} required />
      <button className="btn btn-gold" type="submit" disabled={busy}>{busy ? t.busy : t.ask}{busy ? null : <Send size={16}/>}</button>
    </form>
    {messages.length === 0 && <div className="coach-examples">{t.examples.map(example =>
      <button type="button" onClick={() => setInput(example)} key={example}>{example}</button>)}</div>}
    <p className="coach-note">{t.note} <a href="/chat">{lang === 'ar' ? 'افتح المحادثة' : lang === 'rw' ? 'Fungura ikiganiro' : 'Open chat'} <ArrowRight size={13}/></a></p>
  </section>;
}

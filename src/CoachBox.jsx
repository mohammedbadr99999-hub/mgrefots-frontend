import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import './coach.css';

const copy = {
  ar: {
    eyebrow: 'تدريب وتغذية على مقاس هدفك', title: 'اسأل MGREFOTS',
    intro: 'خسارة دهون، بناء عضلات، تقوية عضلة معينة، أو الاستعداد لرياضتك. اكتب هدفك وسنبدأ بخطوة واضحة.',
    placeholder: 'مثال: عايزة أكبر عضلات المؤخرة وبتمرن ٣ أيام، أبدأ بإيه؟',
    ask: 'اسأل', busy: 'جارٍ تجهيز الرد…',
    examples: ['عاوز أخس وأحافظ على العضلات', 'عايزة أقوي عضلات المؤخرة', 'إزاي أجهز لسباق جري؟'],
    unavailable: 'خدمة الإجابات غير متاحة حاليًا. تواصل معنا عبر واتساب.',
    note: 'إرشاد عام للتدريب والتغذية؛ الحالات الصحية والإصابات تحتاج تقييم مختص.',
  },
  en: {
    eyebrow: 'Training and nutrition for your goal', title: 'Ask MGREFOTS',
    intro: 'Fat loss, muscle gain, a specific muscle, or your sport. Tell us your goal and get a clear first step.',
    placeholder: 'Example: I want to build my glutes and can train three days a week. Where do I start?',
    ask: 'Ask', busy: 'Preparing your answer…',
    examples: ['Lose fat and keep muscle', 'Build my glutes', 'Prepare for a running race'],
    unavailable: 'Answers are unavailable right now. Contact us on WhatsApp.',
    note: 'General training and nutrition guidance; health conditions and injuries need professional assessment.',
  },
  rw: {
    eyebrow: 'Imyitozo n’imirire bijyanye n’intego yawe', title: 'Baza MGREFOTS',
    intro: 'Kugabanya ibinure, kongera imikaya cyangwa kwitegura siporo yawe. Andika intego yawe.',
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

  return <section id="coach" className="coach-section" aria-labelledby="coach-title">
    <div className="container coach-panel">
      <div className="coach-intro">
        <p className="section-kicker">{t.eyebrow}</p>
        <h2 id="coach-title">{t.title}</h2>
        <p>{t.intro}</p>
        <div className="coach-examples">{t.examples.map(example =>
          <button type="button" onClick={() => setInput(example)} key={example}>{example}</button>)}</div>
      </div>
      <div className="coach-interaction">
        {messages.length > 0 && <div className="coach-conversation" aria-live="polite">
          {messages.map((message, index) =>
            <p className={message.role === 'user' ? 'coach-message-question' : 'coach-message-answer'} key={index}>{message.text}</p>)}
        </div>}
        <form onSubmit={submit}>
          <label className="sr-only" htmlFor="coach-question">{t.title}</label>
          <textarea id="coach-question" value={input} onChange={event => setInput(event.target.value)}
            placeholder={t.placeholder} maxLength={2000} rows={3} required />
          <button className="btn btn-gold" type="submit" disabled={busy}>{busy ? t.busy : t.ask}{busy ? null : <Send size={16}/>}</button>
        </form>
        <p className="coach-note">{t.note} <a href="/chat">{lang === 'ar' ? 'افتح المحادثة' : lang === 'rw' ? 'Fungura ikiganiro' : 'Open chat'} <ArrowRight size={13}/></a></p>
      </div>
    </div>
  </section>;
}

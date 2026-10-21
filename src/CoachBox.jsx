import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './coach.css';

const copy = {
  en: { placeholder: 'Write your question here…', send: 'Send', busy: 'Sending…', error: 'Answers are unavailable right now. Please try again later.' },
  ar: { placeholder: 'اكتب سؤالك هنا…', send: 'إرسال', busy: 'جارٍ الإرسال…', error: 'الردود غير متاحة الآن. حاول مرة أخرى لاحقًا.' },
  rw: { placeholder: 'Andika ikibazo cyawe hano…', send: 'Ohereza', busy: 'Birimo koherezwa…', error: 'Ibisubizo ntibiboneka ubu. Ongera ugerageze nyuma.' },
};

export default function CoachBox({ lang = 'en' }) {
  const t = copy[lang] || copy.en;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || busy) return;
    const history = messages.slice(-8).map(({ role, text }) => ({ role, text: text.slice(0, 1200) }));
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, lang, history }),
      });
      const data = await response.json();
      if (!response.ok || !data.text) throw new Error(t.error);
      setMessages(previous => [...previous, { role: 'user', text: prompt }, { role: 'model', text: data.text }]);
      setInput('');
    } catch {
      setError(t.error);
    } finally {
      setBusy(false);
    }
  }

  return <section id="coach" className="coach-strip" aria-labelledby="coach-title">
    <div className="container coach-strip-inner">
      <div className="coach-strip-row">
        <h2 id="coach-title" lang="en" dir="ltr">Ask M.G.REFOTS About Your Goal or Sport and Get a Clear First Step.</h2>
        <form className="coach-strip-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="coach-question">{t.placeholder}</label>
          <input id="coach-question" type="text" dir="auto" value={input} onChange={event => setInput(event.target.value)} placeholder={t.placeholder} maxLength={2000} required />
          <button type="submit" disabled={busy}>{busy ? t.busy : t.send}<Send size={16} aria-hidden="true" /></button>
        </form>
      </div>
      {error && <p className="coach-strip-error" role="alert">{error}</p>}
      {messages.length > 0 && <div className="coach-strip-conversation" aria-live="polite" aria-label="Conversation">
        {messages.map((message, index) => <p key={index} className={message.role === 'user' ? 'coach-question' : 'coach-answer'} dir="auto">{message.text}</p>)}
      </div>}
    </div>
  </section>;
}

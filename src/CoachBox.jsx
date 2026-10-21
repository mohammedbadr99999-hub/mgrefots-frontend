import React from 'react';
import { ArrowRight } from 'lucide-react';
import './coach.css';

export default function CoachBox() {
  return <a id="coach" className="coach-strip" href="/chat" dir="ltr">
    <span className="coach-strip-inner">
      <span>Ask MG Refuts About Your Goal or Sport and Get a Clear First Step.</span>
      <ArrowRight size={18} aria-hidden="true" />
    </span>
  </a>;
}

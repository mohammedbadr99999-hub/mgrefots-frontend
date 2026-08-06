import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Award, ShieldCheck, CheckCircle2, X, Sparkles, Info } from 'lucide-react';
import { Language } from '../types';

interface CertificationsBannerProps {
  lang: Language;
}

interface CertificationItem {
  id: string;
  code: string;
  name: string;
  badgeColor: string;
  icon: string;
  details: {
    ar: {
      title: string;
      meaning: string;
      mgrefotsImpact: string;
      standardCode: string;
    };
    en: {
      title: string;
      meaning: string;
      mgrefotsImpact: string;
      standardCode: string;
    };
    rw: {
      title: string;
      meaning: string;
      mgrefotsImpact: string;
      standardCode: string;
    };
  };
}

export const CertificationsBanner: React.FC<CertificationsBannerProps> = ({ lang }) => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const isRtl = lang === 'ar';

  const certifications: CertificationItem[] = [
    {
      id: 'iso9001',
      code: 'ISO 9001',
      name: isRtl ? 'إدارة الجودة الشاملة' : 'Quality Management System',
      badgeColor: 'from-blue-600 to-indigo-700',
      icon: '🏛️',
      details: {
        ar: {
          title: 'ISO 9001 - نظام إدارة الجودة الشاملة',
          standardCode: 'الاعتماد الدولي لإدارة ضبط الجودة',
          meaning: 'المعيار العالمي الأول الذي يثبت التزام المنشأة بأعلى معايير ضبط وضمان الجودة الموحدة والتطوير المستمر في جميع العمليات التشغيلية.',
          mgrefotsImpact: 'يضمن أن كل شحنة مواد خام تُورد لمصانع MGREFOTS تخضع لمعايرة دقيقة وفحوصات معملية تضمن التطابق والنقاء التام لنسبة الـ 99.8% للمكونات الفعالة.'
        },
        en: {
          title: 'ISO 9001 - Quality Management System',
          standardCode: 'International Quality Management Standard',
          meaning: 'The world’s recognized benchmark for quality management systems, continuous process control, and product consistency.',
          mgrefotsImpact: 'Guarantees that every raw material batch supplied for MGREFOTS formulations is strictly audited to ensure 100% component purity and exact clinical dosage.'
        },
        rw: {
          title: 'ISO 9001 - Ubuziranenge n\'Icuruzwa',
          standardCode: 'Standard Mpuzamahanga y\'Ubuziranenge',
          meaning: 'Standard mpuzamahanga yemewe ku isi hose mu kugenzura ubuziranenge n\'uburyo ibicuruzwa bikorwamo.',
          mgrefotsImpact: 'Yemeza ko ibikoresho byose bifashishwa na MGREFOTS binyura mu kugenzurwa birambuye mu labo kugira ngo bibe bifite ubuziranenge.'
        }
      }
    },
    {
      id: 'iso22000',
      code: 'ISO 22000',
      name: isRtl ? 'سلامة الأغذية والتصنيع' : 'Food Safety Management',
      badgeColor: 'from-emerald-600 to-teal-700',
      icon: '🛡️',
      details: {
        ar: {
          title: 'ISO 22000 - نظام إدارة سلامة الأغذية والتصنيع',
          standardCode: 'المعيار الدولي لمعايير أمان وتداول الأغذية والمكملات',
          meaning: 'نظام عالمي صارم يحدد متطلبات سلامة الأغذية ومنع أخطار التلوث البكتيري أو الكيميائي في كل خطوة من خطوات التصنيع والتعبئة.',
          mgrefotsImpact: 'يؤكد أن مساحيق وكبسولات MGREFOTS تُحضر وتُعبأ في بيئات معقمة تماماً وتخلو من أي ملوثات أو جراثيم قد تؤثر على سلامة الرياضيين.'
        },
        en: {
          title: 'ISO 22000 - Food Safety Management',
          standardCode: 'Global Food Safety & Hygiene Standard',
          meaning: 'A rigorous international framework designed to eliminate biological, chemical, and physical hazards across food and supplement production.',
          mgrefotsImpact: 'Confirms that all MGREFOTS raw powders and capsules are processed in sterile cleanrooms, totally free from microbial contamination.'
        },
        rw: {
          title: 'ISO 22000 - Umutekano w\'Ibyo Kurya',
          standardCode: 'Standard Mpuzamahanga y\'Ubuziranenge bw\'Ibyo Kurya',
          meaning: 'Standard ikensera ko ibyo kurya n\'inyunganiramatsiko biba bifite umutekano ku buzima.',
          mgrefotsImpact: 'Kurinda ibikoresho bya MGREFOTS ko byanduzwa n\'imiti mibi cyangwa microbi mu gihe cyo kuzipfunyika.'
        }
      }
    },
    {
      id: 'fssc22000',
      code: 'FSSC 22000',
      name: isRtl ? 'اعتماد سلامة المنتجات' : 'Food Safety Certification',
      badgeColor: 'from-cyan-600 to-blue-800',
      icon: '🔬',
      details: {
        ar: {
          title: 'FSSC 22000 - الاعتماد الأعلى عالمياً لسلامة المنتجات',
          standardCode: 'اعتماد المبادرة العالمية لسلامة الأغذية (GFSI)',
          meaning: 'الاعتماد الدولي الأرفع مستوى المعتمد من منظمات GFSI العالمية للتحقق من أمان سلاسل التوريد والوقاية من الغش والتحديث التكنولوجي.',
          mgrefotsImpact: 'يوفر ضماناً حاسماً بأن خامات المنتجات مستوردة من مصادر أصلية وموثوقة ولا تحوي أي مكونات مغشوشة أو غير مطابقة للمواصفات.'
        },
        en: {
          title: 'FSSC 22000 - Food Safety System Certification',
          standardCode: 'GFSI Benchmarked World-Class Accreditation',
          meaning: 'The highest global standard recognized by GFSI for comprehensive food defense, supply-chain transparency, and authenticity.',
          mgrefotsImpact: 'Ensures absolute anti-fraud verification, authentic raw ingredient sourcing, and premium pharmaceutical-grade execution.'
        },
        rw: {
          title: 'FSSC 22000 - Icyemezo cyo ku Rwego rwo Hejuru rwa GFSI',
          standardCode: 'GFSI Benchmarked Global Standard',
          meaning: 'Icyemezo cyo ku rwego rwo hejuru k\'ubuziranenge bw\'ibiribwa gishimwa ku isi hose.',
          mgrefotsImpact: 'Yemeza ko ntabicuruzwa by\'ibihimbano bifashishwa mu gukora inyunganiramatsiko za MGREFOTS.'
        }
      }
    },
    {
      id: 'halal',
      code: 'HALAL',
      name: isRtl ? 'شهادة الحلال الإسلامية' : 'Halal Certified Quality',
      badgeColor: 'from-amber-600 to-yellow-700',
      icon: '🌙',
      details: {
        ar: {
          title: 'HALAL - شهادة المطابقة للأحكام الإسلامية',
          standardCode: 'شهادة الاعتماد والمطابقة الحلال 100%',
          meaning: 'شهادة رسمية تثبت مطابقة المكونات وعمليات التصنيع للشريعة الإسلامية وأخلاقيات التغذية السليمة.',
          mgrefotsImpact: 'تضمن أن جميع الأحماض الأمينية والكبسولات والمكونات المستخدمة نابعة من مصادر حلال 100% وخالية تماماً من مشتقات الخنزير والمواد الكحولية.'
        },
        en: {
          title: 'HALAL - Certified Ethical & Pure Quality',
          standardCode: '100% Halal Compliant Ingredient Certification',
          meaning: 'Official accreditation verifying that all raw ingredients and processing comply strictly with Islamic dietary guidelines.',
          mgrefotsImpact: 'Guarantees zero porcine derivatives, 100% alcohol-free formulations, and ethically sourced vegan/plant amino acids.'
        },
        rw: {
          title: 'HALAL - Icyemezo cya Halal',
          standardCode: 'Halal 100% Compliant Standard',
          meaning: 'Icyemezo cyo gukurikiza amategeko n\'amabwiriza ya Halal mu idini rya Islam.',
          mgrefotsImpact: 'Yemeza ko nta bintu by\'ingurube cyangwa inzoga birimo mu ibikoresho bya MGREFOTS.'
        }
      }
    },
    {
      id: 'eu_organic',
      code: 'EU Organic',
      name: isRtl ? 'شهادة العضوية الأوروبية' : 'EU Certified Organic',
      badgeColor: 'from-green-600 to-emerald-800',
      icon: '🌿',
      details: {
        ar: {
          title: 'EU Organic - شهادة العضوية الأوروبية',
          standardCode: 'معيار الزراعة العضوية للاتحاد الأوروبي',
          meaning: 'شهادة العضوية الأوروبية التي تحظر استخدام المبيدات الحشرية والأسمدة الكيميائية والتعديل الوراثي في المحاصيل الزراعية.',
          mgrefotsImpact: 'تضمن أن البروتينات النباتية (البسلة والأرز) مستخرجة من زراعات عضوية نضرة غير معدلة وراثياً وخالية من السموم الزراعية.'
        },
        en: {
          title: 'EU Certified Organic Standard',
          standardCode: 'European Union Agriculture Organic Certification',
          meaning: 'Strict European standard banning synthetic pesticides, artificial fertilizers, and GMOs in crop cultivation.',
          mgrefotsImpact: 'Ensures our plant protein blends (Pea & Rice) originate from 100% certified organic non-GMO crops without agro-chemical residues.'
        },
        rw: {
          title: 'EU Organic - Ubuziranenge bw\'Burayi',
          standardCode: 'EU Agriculture Organic Standard',
          meaning: 'Standard y\'Uburayi y\'ibimera bibazwe mu buryo bwa Organic ntamiti mibi.',
          mgrefotsImpact: 'Yemeza ko poroteyine y\'ibimera ifite isuku ntamiti mibi cyangwa ibinyabuzima byahinduwe birimo.'
        }
      }
    },
    {
      id: 'usda_organic',
      code: 'USDA Organic',
      name: isRtl ? 'شهادة العضوية الأمريكية' : 'USDA Certified Organic',
      badgeColor: 'from-lime-600 to-green-700',
      icon: '🌱',
      details: {
        ar: {
          title: 'USDA Organic - شهادة العضوية الأمريكية الفيدرالية',
          standardCode: 'اعتماد وزارة الزراعة الأمريكية للمنتجات العضوية',
          meaning: 'المعيار الفيدرالي بالولايات المتحدة الأمريكية الذي يضمن الالتزام بالزراعة والتجهيز العضوي الخالي من الكيماويات والمواد الحافظة.',
          mgrefotsImpact: 'تؤكد الخلو التام من الإشعاع المؤين، المواد الكيميائية الضارة، والملوثات المضافة خلال عمليات استخلاص مساحيق المكملات.'
        },
        en: {
          title: 'USDA Organic - Official US Certification',
          standardCode: 'United States Department of Agriculture Organic Seal',
          meaning: 'Official US federal certification guaranteeing non-GMO organic farming, zero chemical additives, and environmental stewardship.',
          mgrefotsImpact: 'Verifies that no ionizing radiation, bio-engineered synthetic additives, or toxic processing chemicals were utilized.'
        },
        rw: {
          title: 'USDA Organic - Ubuziranenge bwa Amerika',
          standardCode: 'USDA Organic Seal Standard',
          meaning: 'Icyemezo cya leta ya Amerika mu kugenzura ubuziranenge bwa Organic.',
          mgrefotsImpact: 'Yemeza ko ibikoresho bidafite imiti mibi n\'ibinyabuzima byahinduwe kuko biba bifite isuku 100%.'
        }
      }
    }
  ];

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-800/90 p-5 sm:p-6 shadow-2xl transition-all">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-emerald-600/10 to-transparent pointer-events-none" />
      
      {/* Top Header Label */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/40 px-3.5 py-1 rounded-full text-[11px] font-black text-emerald-400 mb-2">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>
            {isRtl 
              ? 'ضمان النقاء والجودة العالمية 100%' 
              : '100% Certified Raw Material Purity'}
          </span>
        </div>

        <h2 className="text-sm sm:text-base font-black text-white leading-snug">
          {isRtl 
            ? 'جميع المواد الخام المُصنَّع منها منتجات شركة MGREFOTS حاصلة على الشهادات التالية (انقر على أي شهادة للتفاصيل):'
            : 'All raw materials used in MGREFOTS products are certified by international quality standards (Click any badge for details):'}
        </h2>
      </div>

      {/* Grid of 6 Certification Badges - Exact 6-column layout on md/lg screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group relative bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 p-3.5 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.04] hover:shadow-xl cursor-pointer"
          >
            {/* Top Badge Icon */}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center text-white text-lg font-black shadow-md mb-2 group-hover:rotate-6 transition-transform`}>
              <span>{cert.icon}</span>
            </div>

            {/* Code */}
            <span className="text-xs font-black text-white tracking-wider font-mono">
              {cert.code}
            </span>

            {/* Name */}
            <span className="text-[10px] font-semibold text-slate-400 leading-tight mt-1 line-clamp-2">
              {cert.name}
            </span>

            {/* Click to view details prompt */}
            <div className="mt-2 flex items-center gap-1 text-[9px] font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
              <Info size={10} />
              <span>{isRtl ? 'عرض الشرح' : 'Details'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Details Popup Modal */}
      {selectedCert && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden my-auto"
            dir={isRtl ? 'rtl' : 'ltr'}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedCert.badgeColor} flex items-center justify-center text-2xl font-black shadow-lg shrink-0`}>
                  <span>{selectedCert.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 font-mono block">
                    {selectedCert.details[lang]?.standardCode || selectedCert.details.ar.standardCode}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {selectedCert.details[lang]?.title || selectedCert.details.ar.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              {/* Meaning Section */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-850 space-y-1.5">
                <h4 className="text-xs font-black uppercase text-blue-400 tracking-wider flex items-center gap-1.5">
                  <Info size={14} />
                  <span>{isRtl ? 'ماذا تعني هذه الشهادة؟' : 'What does this certification mean?'}</span>
                </h4>
                <p className="text-xs sm:text-sm font-medium text-slate-200">
                  {selectedCert.details[lang]?.meaning || selectedCert.details.ar.meaning}
                </p>
              </div>

              {/* MGREFOTS Impact Section */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 space-y-1.5">
                <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>{isRtl ? 'تطبيقاتها في منتجات MGREFOTS:' : 'How MGREFOTS Guarantees This Standard:'}</span>
                </h4>
                <p className="text-xs sm:text-sm font-medium text-slate-200">
                  {selectedCert.details[lang]?.mgrefotsImpact || selectedCert.details.ar.mgrefotsImpact}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition"
              >
                {isRtl ? 'إغلاق النافذة' : 'Close Window'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

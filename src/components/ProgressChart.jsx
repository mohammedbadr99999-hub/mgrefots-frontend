import React from 'react';

export default function ProgressChart({ history, fatLabel, muscleLabel }) {
  const validData = [...history]
    .filter((h) => h.body_fat_percent || h.skeletal_muscle_mass)
    .reverse();

  if (validData.length < 2) return null;

  const width = 600, height = 250, paddingX = 40, paddingY = 40;
  const fatValues = validData.map((d) => parseFloat(d.body_fat_percent) || 0);
  const muscleValues = validData.map((d) => parseFloat(d.skeletal_muscle_mass) || 0);
  const maxFat = Math.max(...fatValues, 1), minFat = Math.min(...fatValues, 0);
  const maxMuscle = Math.max(...muscleValues, 1), minMuscle = Math.min(...muscleValues, 0);

  const getX = (i) => paddingX + i * ((width - paddingX * 2) / (validData.length - 1));
  const getYFat = (val) => height - paddingY - ((val - minFat) / (maxFat - minFat || 1)) * (height - paddingY * 2);
  const getYMuscle = (val) => height - paddingY - ((val - minMuscle) / (maxMuscle - minMuscle || 1)) * (height - paddingY * 2);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[400px]">
        {[0, 0.5, 1].map((ratio) => (
          <line key={ratio} x1={paddingX} y1={paddingY + ratio * (height - paddingY * 2)} x2={width - paddingX} y2={paddingY + ratio * (height - paddingY * 2)} stroke="#e2e8f0" strokeDasharray="4" />
        ))}
        <polyline points={validData.map((d, i) => `${getX(i)},${getYFat(parseFloat(d.body_fat_percent) || 0)}`).join(" ")} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinejoin="round" />
        <polyline points={validData.map((d, i) => `${getX(i)},${getYMuscle(parseFloat(d.skeletal_muscle_mass) || 0)}`).join(" ")} fill="none" stroke="#10b981" strokeWidth="3" strokeLinejoin="round" />
        {validData.map((d, i) => {
          const x = getX(i);
          const date = new Date(d.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
          const fatVal = parseFloat(d.body_fat_percent) || 0;
          const musVal = parseFloat(d.skeletal_muscle_mass) || 0;
          return (
            <g key={i}>
              <circle cx={x} cy={getYFat(fatVal)} r="4" fill="#ef4444" />
              <text x={x} y={getYFat(fatVal) - 10} fontSize="10" fill="#ef4444" textAnchor="middle" fontWeight="bold">{fatVal}%</text>
              <circle cx={x} cy={getYMuscle(musVal)} r="4" fill="#10b981" />
              <text x={x} y={getYMuscle(musVal) + 15} fontSize="10" fill="#10b981" textAnchor="middle" fontWeight="bold">{musVal}kg</text>
              <text x={x} y={height - 10} fontSize="10" fill="#64748b" textAnchor="middle">{date}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex justify-center gap-6 mt-4 text-xs font-bold text-slate-600">
        <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full" />{fatLabel}</span>
        <span className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full" />{muscleLabel}</span>
      </div>
    </div>
  );
}

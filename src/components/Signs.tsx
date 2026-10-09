// The drawn parts of the sign system. Shapes follow the real ones: the L plate is a red L on a white square,
// sign arrows have a square shaft and a broad chevron head, and countdown markers are slanted white bars on blue.
import { TOWNS } from '../data/siteData';
import styles from './Signs.module.css';

export function LPlate({ className = '' }: { className?: string }) {
  return (
    <svg className={`${styles.lplate} ${className}`} viewBox="0 0 100 100" role="img" aria-label="L plate">
      <rect width="100" height="100" rx="7" fill="#fff" />
      <path d="M30 17h20v48h28v18H30z" fill="#d4351c" />
    </svg>
  );
}

/** A sign arrow. It points up; turn it with the `turn` angle. */
export function Arrow({ turn = 0, className = '' }: { turn?: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" aria-hidden="true" style={{ transform: `rotate(${turn}deg)` }}>
      <path d="M30 2 4 34h17v44h18V34h17z" fill="currentColor" />
    </svg>
  );
}

/** Motorway countdown marker: three, two or one slanted bars, counting down to the exit. */
export function Countdown({ bars }: { bars: 1 | 2 | 3 }) {
  const all = [0, 1, 2].slice(0, bars);
  return (
    <svg className={styles.countdown} viewBox="0 0 120 150" role="img" aria-label={`${bars} to go`}>
      <rect width="120" height="150" rx="8" fill="#005ea5" />
      <rect x="5" y="5" width="110" height="140" rx="5" fill="none" stroke="#fff" strokeWidth="3" />
      {all.map((i) => {
        const x = 60 - (bars - 1) * 15 + i * 30;
        return <path key={i} className={styles.bar} style={{ ['--i' as string]: i }} d={`M${x - 14} 122 ${x - 2} 28h16L${x + 2} 122z`} fill="#fff" />;
      })}
    </svg>
  );
}

/**
 * The areas covered, drawn as a map-type roundabout sign: a ring with an arm for each town.
 * Loughborough is the road you arrive on, at the bottom, and the other five leave in roughly their real directions.
 */
export function Roundabout() {
  const cx = 300, cy = 300, ring = 62, reach = 190;
  const others = TOWNS.filter((t) => !t.home);
  const point = (angle: number, r: number) => {
    const a = ((angle - 90) * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  return (
    <svg className={styles.roundabout} viewBox="0 0 600 640" role="img" aria-label={`Roundabout sign. From Loughborough, roads lead to ${others.map((t) => t.name).join(', ')}.`}>
      <g className={styles.arms} fill="none" stroke="#fff" strokeWidth="26" strokeLinecap="butt">
        {/* the road in, from Loughborough, wider than the rest as on a real sign */}
        <path className={styles.arm} style={{ ['--i' as string]: 0 }} d={`M${cx} 560V${cy + ring}`} strokeWidth="34" />
        {others.map((t, i) => {
          const [x1, y1] = point(t.angle, ring);
          const [x2, y2] = point(t.angle, reach);
          return <path key={t.name} className={styles.arm} style={{ ['--i' as string]: i + 1 }} d={`M${x1} ${y1}L${x2} ${y2}`} />;
        })}
      </g>
      <circle cx={cx} cy={cy} r={ring} fill="none" stroke="#fff" strokeWidth="26" />
      <g className={styles.names} fill="#fff">
        {others.map((t, i) => {
          const [x, y] = point(t.angle, reach + 22);
          const right = t.angle > 0 && t.angle < 180;
          const anchor = t.angle > 20 && t.angle < 160 ? 'start' : t.angle > 200 && t.angle < 340 ? 'end' : right ? 'start' : 'end';
          const lines = t.name.split(' ');
          return (
            <text key={t.name} className={styles.name} style={{ ['--i' as string]: i + 1 }} x={x} y={y - (lines.length - 1) * 16 + 10} textAnchor={anchor}>
              {lines.map((line, k) => <tspan key={line} x={x} dy={k === 0 ? 0 : 36}>{line}</tspan>)}
            </text>
          );
        })}
        <text className={styles.name} style={{ ['--i' as string]: 0 }} x={cx + 34} y={600} textAnchor="start">Loughborough</text>
      </g>
    </svg>
  );
}

/** The dashed centre line that runs between sections. */
export function CentreLine() {
  return <div className={styles.centre} aria-hidden="true" />;
}

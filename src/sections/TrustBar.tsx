import { ShieldCheck, Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import styles from './TrustBar.module.css';

const items = [
  { icon: <ShieldCheck size={18} />, text: 'DVSA Approved Instructor' },
  { icon: <Star size={18} />, text: '5-Star Rated' },
  { icon: <CheckCircle size={18} />, text: 'High First-Time Pass Rate' },
  { icon: <MapPin size={18} />, text: '6 Test Centres Covered' },
  { icon: <Clock size={18} />, text: 'Flexible Lesson Times' },
];

export default function TrustBar() {
  return (
    <div className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        {items.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

import type { NavLink, Service, PricingPlan, WhyItem, Testimonial, FaqItem } from '../types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const SERVICES: Service[] = [
  {
    icon: 'steering',
    title: 'Manual Lessons',
    description: 'Learn the traditional way. Gear changes, clutch control, hill starts — we nail it together at your pace. A manual licence opens every car to you.',
  },
  {
    icon: 'settings',
    title: 'Automatic Lessons',
    description: 'No gears, no clutch — just focus on the road. Great if you want to get driving quicker or find manual overwhelming. Still a full, proper licence.',
  },
  {
    icon: 'zap',
    title: 'Semi-Intensive Courses',
    description: 'More lessons per week means faster progress without going full-time. Perfect for those with a test date in mind who want to nail it quickly.',
    badge: 'Popular',
  },
  {
    icon: 'award',
    title: 'Pass Plus',
    description: 'Just passed? This 6-module course covers motorways, night driving, and country roads. Can reduce your insurance premium too — genuine value.',
  },
  {
    icon: 'road',
    title: 'Motorway Lessons',
    description: "Motorways aren't in the standard test but they're unavoidable in real life. Get confident at speed, with lane discipline and smart joining technique.",
  },
  {
    icon: 'refresh',
    title: 'Refresher Lessons',
    description: 'Been off the road for a while? A few sessions can bring back your confidence fast. No judgement — just practical help to get you back to your best.',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'payg',
    label: 'Pay As You Learn',
    priceTag: 'Flexible',
    description: "Book one lesson at a time. No commitment needed — ideal if you're just starting out or not sure how often you want lessons yet.",
    features: ['2-hour lesson', 'No long-term contract', 'Book week by week', '48hr cancellation policy'],
    cta: 'Get a Quote',
  },
  {
    id: 'block',
    label: '10-Hour Block Booking',
    priceTag: 'Best Value',
    description: 'Book 10 hours upfront and save money compared to individual lessons. Hours never expire — use them at your own pace.',
    features: ['10 x 2-hour lessons', 'Save money vs pay-as-you-go', 'Hours never expire', 'Lessons tailored to your pace'],
    cta: 'Book Block',
    featured: true,
  },
  {
    id: '90min',
    label: '90-Min Sessions',
    priceTag: 'More Coverage',
    description: 'Longer lessons mean more ground covered each session. Great for busy schedules — fewer sessions, more progress per sit.',
    features: ['90 minutes per session', 'More covered per lesson', 'Great for busy people', 'Suits all skill levels'],
    cta: 'Get a Quote',
  },
  {
    id: 'testday',
    label: 'Test Day Package',
    priceTag: '2-Hour Pre-Test Lesson',
    description: "On test day, nerves are real. This 2-hour pre-test lesson gets you warmed up on the actual test routes, so you walk into that test centre feeling sharp and ready. Highly recommended.",
    features: ['2 hours on test day', 'Covers real test routes', 'Confidence before you go in', 'Drop-off at test centre'],
    cta: 'Book Test Day',
    wide: true,
  },
];

export const WHY_ITEMS: WhyItem[] = [
  {
    number: '01',
    title: 'Structured Lessons, Faster Progress',
    body: 'Step-by-step training that builds your skills systematically — every lesson has a clear goal. No filler, no wasted time.',
  },
  {
    number: '02',
    title: 'Patient & Supportive Teaching',
    body: "Calm, friendly and encouraging from day one. Whether you've never been behind the wheel or you're returning after a break, I'll make you feel at ease.",
  },
  {
    number: '03',
    title: 'High First-Time Pass Rate',
    body: '100+ students passed and counting. My teaching is built around what actually gets you through the test — not just theory.',
  },
  {
    number: '04',
    title: 'Times That Fit Your Life',
    body: "Early mornings, evenings, weekends — I work around you. Whether you're a student or working full-time, we'll find a slot.",
  },
  {
    number: '05',
    title: 'Know the Real Test Routes',
    body: "I cover test centres across Loughborough, Melton Mowbray, Nottingham, Leicester, Derby and Hinckley — you'll practise the exact roads you'll face.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'JM',
    name: 'Jessica M.',
    location: 'Loughborough',
    result: 'Passed First Time',
    body: "I was honestly terrified of driving lessons. Mohammed was so patient from day one — never made me feel stupid, always explained things clearly. I passed first time and genuinely could not have done it without him.",
  },
  {
    initials: 'RK',
    name: 'Ryan K.',
    location: 'Melton Mowbray',
    result: 'Passed 2nd Attempt',
    body: "I'd tried two other instructors before Mohammed and nothing clicked. With him it all just made sense. His knowledge of the local test routes really made the difference. So relieved — highly recommend.",
    accent: true,
  },
  {
    initials: 'AS',
    name: 'Aisha S.',
    location: 'Loughborough',
    result: 'Passed First Time',
    body: "Did the 10-hour block and it was brilliant value. Mohammed worked around my uni timetable which was a lifesaver. He's friendly, knowledgeable, and I felt genuinely prepared going into my test.",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "How many lessons will I need before I'm test-ready?",
    answer: "It depends on you — everyone learns at a different pace. The national average is around 45 hours of professional lessons, but some need more and some need less. I'll give you an honest, ongoing assessment so you always know where you stand.",
  },
  {
    question: 'Do I need my provisional licence before my first lesson?',
    answer: 'Yes — you must have a valid UK provisional driving licence before getting in the car. You can apply online through the DVLA. It usually arrives within a week. Once you have it, you are ready to go.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'I cover a wide area including Loughborough, Melton Mowbray, Nottingham, Leicester, Derby and Hinckley — along with surrounding villages. Not sure if you\'re in range? Drop me a message and I\'ll let you know.',
  },
  {
    question: "What's your cancellation policy?",
    answer: "Give me at least 48 hours' notice to cancel or reschedule and there's no charge. Cancellations with less than 48 hours' notice may be charged at the full lesson rate. I'm always reasonable — just communicate with me and we'll sort it out.",
  },
  {
    question: 'Can I switch between manual and automatic?',
    answer: 'Yes — if you start manual and feel automatic suits you better (or vice versa), we can discuss switching. Bear in mind a manual licence lets you drive both, while an automatic licence only covers automatic cars.',
  },
  {
    question: 'Do you teach nervous or anxious drivers?',
    answer: "Absolutely — it's more common than people think. I've helped lots of anxious learners become confident drivers. My approach is relaxed, pressure-free, and always at your pace.",
  },
];

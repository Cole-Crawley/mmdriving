import type { NavLink, LessonGroup, PayOption, TeachingPoint, RouteStop, FaqItem, Testimonial } from '../types';

// Everything a visitor reads lives in this file. Nothing here may be claimed unless the client has confirmed it:
// no pass rates, no review scores and no "spaces left" until Mohammed supplies real figures.

export const BUSINESS = {
  name: 'MMDriving',
  instructor: 'Mohammed',
  phoneDisplay: '07762 363936',
  phoneHref: 'tel:+447762363936',
  whatsappHref: 'https://wa.me/447762363936',
  email: 'sohag78694@gmail.com',
  formEndpoint: 'https://formspree.io/f/mgodepwk',
  hours: [
    { days: 'Monday to Friday', times: '7am to 8pm' },
    { days: 'Saturday and Sunday', times: '8am to 6pm' },
  ],
  replyTime: 'within a few hours',
};

// Home town first, then the five others roughly as they sit on the map around Loughborough.
// The angle places each town on the roundabout sign (0 is straight up, clockwise).
export const TOWNS = [
  { name: 'Loughborough', home: true, angle: 0 },
  { name: 'Nottingham', angle: 22 },
  { name: 'Melton Mowbray', angle: 90 },
  { name: 'Leicester', angle: 152 },
  { name: 'Hinckley', angle: 212 },
  { name: 'Derby', angle: 312 },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Lessons', href: '#lessons' },
  { label: 'Ways to pay', href: '#pay' },
  { label: 'Areas', href: '#areas' },
  { label: 'Questions', href: '#questions' },
];

export const TEACHING: TeachingPoint[] = [
  { title: 'Every lesson has one clear goal', body: 'You always know what we are working on and why. Nothing is filler.' },
  { title: 'Calm from the first minute', body: "Whether you have never sat behind the wheel or you are coming back after a break, you won't be rushed." },
  { title: 'Built around the real test', body: 'You learn what the examiner looks for, on the roads around the test centre you will use.' },
  { title: 'Times that fit your week', body: 'Early mornings, evenings and weekends, around school, university or work.' },
  { title: 'An honest view of where you are', body: 'I will tell you when you are ready for your test, and when you are not yet.' },
];

export const LESSON_GROUPS: LessonGroup[] = [
  {
    title: 'Learning to drive',
    lessons: [
      { name: 'Manual lessons', value: 'Manual lessons', body: 'Gears, clutch control and hill starts, at your pace. A manual licence lets you drive any car.' },
      { name: 'Automatic lessons', value: 'Automatic lessons', body: 'No gears and no clutch, so you can keep your attention on the road. Still a full licence, for automatic cars.' },
      { name: 'Semi-intensive course', value: 'Semi-intensive course', body: 'More lessons each week for faster progress, without giving up your whole week. Good if you have a test date in mind.' },
    ],
  },
  {
    title: 'After you pass',
    lessons: [
      { name: 'Pass Plus', value: 'Pass Plus', body: 'Six modules covering motorways, night driving and country roads. Some insurers lower your premium for it.' },
      { name: 'Motorway lessons', value: 'Motorway lessons', body: 'Joining, lane discipline and driving at speed, with an instructor beside you the first time.' },
    ],
  },
  {
    title: 'Coming back to driving',
    lessons: [
      { name: 'Refresher lessons', value: 'Refresher lessons', body: 'A few sessions to get your confidence back after time off the road. No judgement.' },
    ],
  },
];

export const PAY_OPTIONS: PayOption[] = [
  {
    id: 'payg',
    name: 'Pay as you learn',
    summary: 'One lesson at a time.',
    body: 'Book week by week with no commitment. Right if you are just starting, or not sure how often you want lessons.',
    points: ['Two-hour lessons', 'No contract', 'Book week by week'],
    value: 'Pay as you learn',
  },
  {
    id: 'block',
    name: '10-hour block',
    summary: 'Ten hours, paid up front.',
    body: 'Costs less per hour than single lessons, and the hours never expire, so you use them at your own pace.',
    points: ['Five two-hour lessons', 'Lower price per hour', 'Hours never expire'],
    value: '10-hour block',
    recommended: true,
  },
  {
    id: 'ninety',
    name: '90-minute sessions',
    summary: 'Shorter, more often.',
    body: 'Ninety minutes is long enough to cover real ground, and easier to fit around a busy week.',
    points: ['90 minutes each', 'Easier to fit in', 'Suits every level'],
    value: '90-minute sessions',
  },
];

export const TEST_DAY = {
  name: 'Test-day lesson',
  value: 'Test-day lesson',
  body: 'Two hours on the day of your test, driving the roads around the test centre so you walk in warmed up. Then I drop you at the door.',
};

export const CANCELLATION = "Give me 48 hours' notice to cancel or move a lesson and there is no charge. With less notice the lesson may be charged in full. If something comes up, tell me and we will sort it out.";

export const ROUTE: RouteStop[] = [
  {
    title: 'Get your provisional licence',
    body: 'You need it before your first lesson. You can apply online from the age of 15 years and 9 months, and it usually arrives within a week.',
    link: { label: 'Apply on GOV.UK', href: 'https://www.gov.uk/apply-first-provisional-driving-licence' },
  },
  {
    title: 'Start lessons',
    body: 'The first lesson is on quiet roads. We find out what you already know, set the car up for you, and go at your pace.',
    withMe: true,
  },
  {
    title: 'Pass your theory test',
    body: 'You can take lessons before you pass it, but you need it before you can book the practical test. Bring your questions to lessons and we will go through them.',
    link: { label: 'Book your theory test on GOV.UK', href: 'https://www.gov.uk/book-theory-test' },
  },
  {
    title: 'Take your practical test',
    body: 'I will tell you honestly when you are ready. On the day there is a two-hour warm-up on the test roads first.',
    withMe: true,
  },
  {
    title: 'Keep going after you pass',
    body: 'Motorway lessons and Pass Plus cover the driving the test leaves out.',
    withMe: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How many lessons will I need?',
    answer: 'It depends on you. The national average is around 45 hours of lessons, and some people need more or fewer. I will give you an honest view as we go, so you always know where you stand.',
  },
  {
    question: 'Do I need a provisional licence before my first lesson?',
    answer: 'Yes. You must have a valid UK provisional licence before you get in the car. You can apply online and it usually arrives within a week.',
  },
  {
    question: "I'm nervous. Is that a problem?",
    answer: 'No, and it is more common than people think. I have helped a lot of anxious learners become confident drivers. Lessons are relaxed and always at your pace.',
  },
  {
    question: 'Which areas do you cover?',
    answer: 'Loughborough, Melton Mowbray, Nottingham, Leicester, Derby and Hinckley, and the villages around them. If you are not sure you are in range, send me a message and I will tell you.',
  },
  {
    question: 'What if I need to cancel?',
    answer: CANCELLATION,
  },
  {
    question: 'Can I switch between manual and automatic?',
    answer: 'Yes. If you start in one and feel the other suits you better, we can talk about switching. Remember that a manual licence covers both, and an automatic licence covers automatic cars only.',
  },
];

// Reviews are not shown anywhere on the site yet. Add real, confirmed reviews from the client here,
// then build a reviews section. Never use invented ones.
export const TESTIMONIALS: Testimonial[] = [];

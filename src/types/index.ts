export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  label: string;
  priceTag: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  wide?: boolean;
  icon?: string;
}

export interface WhyItem {
  number: string;
  title: string;
  body: string;
}

export interface Testimonial {
  initials: string;
  name: string;
  location: string;
  result: string;
  body: string;
  accent?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactDetail {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  href?: string;
}

export interface FormState {
  name: string;
  phone: string;
  email: string;
  lessonType: string;
  area: string;
  message: string;
}

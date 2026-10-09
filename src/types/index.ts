export interface NavLink {
  label: string;
  href: string;
}

export interface TeachingPoint {
  title: string;
  body: string;
}

export interface Lesson {
  name: string;
  /** The value sent with the enquiry form when someone asks about this lesson. */
  value: string;
  body: string;
}

export interface LessonGroup {
  title: string;
  lessons: Lesson[];
}

export interface PayOption {
  id: string;
  name: string;
  summary: string;
  body: string;
  points: string[];
  value: string;
  recommended?: boolean;
}

export interface RouteStop {
  title: string;
  body: string;
  /** True for the stops Mohammed takes you through himself. */
  withMe?: boolean;
  link?: { label: string; href: string };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location: string;
  result: string;
  body: string;
}

export interface FormState {
  name: string;
  phone: string;
  area: string;
  lessonType: string;
  message: string;
}

export const profile = {
  name: "Akshat Goyal",
  role: "Full Stack Developer",
  focus: "MERN · Next.js · Supabase",
  location: "Indore, Madhya Pradesh, India",
  email: "akshatg525@gmail.com",
  phone: "+91-7000831953",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  summary:
    "I build production-ready web applications end to end — from designing REST APIs and securing them with JWT and role-based access control, to shipping responsive React interfaces people actually enjoy using. My focus is the layer most portfolios skip: what happens between the click and the response. I've cut manual workload by 40% with automation, sped up page loads by 25% through query optimization, and shipped features ahead of schedule under real client deadlines. I'm early in my career and treat every project as a chance to write cleaner code than the last one.",
};

export const skills = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  Frontend: ["React.js", "Next.js", "Redux Toolkit", "Context API", "Tailwind CSS", "Responsive Design"],
  Backend: ["Node.js", "Express.js", "Nest.js", "REST API Design", "JWT Auth", "RBAC"],
  Databases: ["MongoDB", "Supabase", "Schema Design", "Query Optimization"],
  Tooling: ["Git", "GitHub", "Postman", "VS Code", "Agile Collaboration"],
};

export const experience = [
  {
    company: "VKAPS I.T Solutions Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    location: "Indore, MP",
    period: "Dec 2025 – Mar 2026",
    points: [
      "Architected a full-stack automated payment reminder system using Next.js and Supabase, reducing manual follow-up effort by 40%.",
      "Engineered secure authentication workflows using JWT and role-based access control (RBAC) to protect sensitive application data.",
      "Optimized database queries and REST API response times, improving page rendering speed by 25%.",
      "Collaborated with senior developers using Git/GitHub to implement scalable folder structures and maintain clean, maintainable code.",
    ],
  },
  {
    company: "Golden Eagle I.T Technologies Pvt. Ltd.",
    role: "Frontend Developer Intern",
    location: "Indore, MP",
    period: "Jan 2024 – Apr 2024",
    points: [
      "Developed responsive, mobile-first user interfaces for 3+ client projects using React.js and Tailwind CSS.",
      "Ensured cross-browser compatibility and mobile responsiveness through systematic manual testing.",
      "Recognized as Intern of the Month for delivering a dashboard module ahead of schedule.",
    ],
  },
];

// 👉 REPLACE THE "github" AND "live" VALUES BELOW WITH YOUR REAL URLS.
// Each card is fully clickable and opens the "github" link in a new tab.
export const projects = [
  {
    title: "NexKart",
    subtitle: "E-Commerce Platform",
    stack: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "JWT"],
    description:
      "A full-stack e-commerce platform engineered around a normalized MongoDB schema for products, orders, and inventory, with compound indexes to keep catalog queries fast at scale. Authentication is handled via short-lived JWT access tokens with refresh-token rotation, and role-based middleware separates customer, seller, and admin permissions at the API layer. State management runs on Redux Toolkit with normalized entity slices to avoid prop-drilling across the cart and checkout flow, while the checkout pipeline handles atomic stock decrements to prevent overselling under concurrent orders.",
    github: "https://github.com/AKSHATGOYAL55/NexKart", // TODO: paste your NexKart GitHub repo URL here
    live: "https://nex-kart-seven.vercel.app/",
  },
  {
    title: "Payment Reminder Automation",
    subtitle: "Internal Tool @ VKAPS",
    stack: ["Next.js", "Supabase", "JWT", "RBAC"],
    description:
      "An automated payment reminder system that cut manual follow-up effort by 40%. Secured with JWT-based auth and role-based access control so only authorized roles can view or act on sensitive billing data.",
    github: "https://github.com/vkapsitsolutions/payment_reminder_app_backend_interns", // TODO: paste your Payment Automation GitHub repo URL here
    // live: "#",
  },
  // {
  //   title: "Savaari",
  //   subtitle: "Car Rental Platform",
  //   stack: ["Next.js", "Supabase", "PostgreSQL"],
  //   description:
  //     "A full-stack booking system with real-time vehicle availability and dynamic pricing logic. Integrated Supabase auth and database for secure user management and booking persistence, plus an admin dashboard for fleet management and booking analytics.",
  //   github: "#", // TODO: paste your Savaari GitHub repo URL here
  //   live: "#",
  // },
  {
    title: "Restaurant Marketplace",
    subtitle: "Food Ordering Platform",
    stack: ["MongoDB", "Express", "React", "Node.js", "Redux Toolkit"],
    description:
      "A full-stack restaurant ordering platform. Implemented Redux Toolkit for predictable state management across the app, and designed secured REST APIs with optimized MongoDB schemas for performance under load.",
    github: "https://github.com/AKSHATGOYAL55/food-del", // TODO: paste your Restaurant Marketplace GitHub repo URL here
    // live: "#",
  },
];

export const education = [
  {
    school: "Medicaps University, Indore",
    degree: "Master of Computer Applications (MCA)",
    period: "2022 – 2024",
  },
  {
    school: "Devi Ahilya Vishwavidyalaya, Indore",
    degree: "Bachelor of Science (B.Sc)",
    period: "2019 – 2022",
  },
];

export const achievements = [
  "Delivered a client project ahead of schedule, increasing user engagement by 15%.",
  "Awarded Intern of the Month for excellence in frontend development.",
  "Cricket Team Captain (2012–2020): led the team to victory in 3 state and 9 district-level tournaments.",
];

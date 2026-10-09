// Demo data for TeamMatch AI.
// Dates are written as "days from today" so the demo never goes out of date.
// Example: day(-30) is 30 days ago, day(10) is 10 days from now.

export function day(offset) {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + offset);
  return date;
}

// Turns "react native:expert:5" into { name, level, years }
function skills(...list) {
  return list.map((item) => {
    const [name, level, years] = item.split(":");
    return { name, level, years: Number(years) };
  });
}

export const users = [
  { name: "Admin User", email: "admin@teammatch.dev", password: "Admin123", role: "admin" },
  { name: "Sales User", email: "sales@teammatch.dev", password: "Sales123", role: "sales" },
];

export const developers = [
  // ---------- Mobile ----------
  {
    name: "Ahmed Raza", title: "Senior React Native Developer", department: "Mobile", seniority: "senior", hourlyRate: 35,
    skills: skills("react native:expert:6", "typescript:expert:5", "redux:expert:5", "firebase:intermediate:3"),
    bio: "Builds cross-platform mobile apps with React Native. Led the mobile side of a wallet app and a telehealth app with video calls.",
  },
  {
    name: "Hira Sheikh", title: "React Native Developer", department: "Mobile", seniority: "mid", hourlyRate: 24,
    skills: skills("react native:expert:4", "javascript:expert:4", "redux:intermediate:3", "rest api:intermediate:3"),
    bio: "Mobile developer focused on payment and onboarding flows. Built the KYC and money transfer screens of a fintech wallet.",
  },
  {
    name: "Bilal Tariq", title: "React Native Developer", department: "Mobile", seniority: "mid", hourlyRate: 22,
    skills: skills("react native:intermediate:3", "typescript:intermediate:2", "expo:intermediate:3", "graphql:beginner:1"),
    bio: "React Native developer who ships features quickly with Expo. Currently working part time on a remittance app.",
  },
  {
    name: "Usman Ghani", title: "Junior React Native Developer", department: "Mobile", seniority: "junior", hourlyRate: 14,
    skills: skills("react native:intermediate:2", "javascript:intermediate:2", "firebase:beginner:1"),
    bio: "Junior mobile developer with one shipped React Native app. Worked on notifications and transaction history in a wallet app.",
  },
  {
    name: "Zainab Malik", title: "Mobile Team Lead", department: "Mobile", seniority: "lead", hourlyRate: 45,
    skills: skills("react native:expert:7", "flutter:intermediate:3", "typescript:expert:6", "system design:expert:5"),
    bio: "Leads mobile teams and owns app architecture. Experienced with offline-first apps, maps and live tracking.",
  },
  {
    name: "Danish Qureshi", title: "Flutter Developer", department: "Mobile", seniority: "mid", hourlyRate: 22,
    skills: skills("flutter:expert:4", "dart:expert:4", "firebase:intermediate:3"),
    bio: "Flutter developer who built a driver app with live location for a logistics client.",
  },
  {
    name: "Maryam Javed", title: "Senior Flutter Developer", department: "Mobile", seniority: "senior", hourlyRate: 34,
    skills: skills("flutter:expert:6", "dart:expert:6", "firebase:expert:5", "google maps:intermediate:3"),
    bio: "Senior Flutter developer with strong experience in maps, routing and push notifications for delivery apps.",
  },

  // ---------- Backend ----------
  {
    name: "Kamran Akhtar", title: "Senior Ruby on Rails Developer", department: "Backend", seniority: "senior", hourlyRate: 36,
    skills: skills("ruby on rails:expert:8", "postgresql:expert:7", "redis:intermediate:4", "rest api:expert:8"),
    bio: "Senior Rails developer who designs APIs and databases for high-traffic apps. Built an e-commerce backend and a remittance API.",
  },
  {
    name: "Sana Iqbal", title: "Ruby on Rails Developer", department: "Backend", seniority: "mid", hourlyRate: 24,
    skills: skills("ruby on rails:expert:4", "postgresql:intermediate:4", "sidekiq:intermediate:2", "rest api:expert:4"),
    bio: "Rails developer experienced with orders, payments and background jobs. Worked on the checkout of an online store.",
  },
  {
    name: "Fahad Mirza", title: "Junior Ruby on Rails Developer", department: "Backend", seniority: "junior", hourlyRate: 14,
    skills: skills("ruby on rails:intermediate:2", "postgresql:beginner:1", "rspec:beginner:1"),
    bio: "Junior Rails developer working on booking and scheduling features for an education platform.",
  },
  {
    name: "Imran Siddiqui", title: "Senior Node.js Developer", department: "Backend", seniority: "senior", hourlyRate: 36,
    skills: skills("node.js:expert:7", "express:expert:7", "mongodb:expert:6", "postgresql:intermediate:4", "websockets:intermediate:3"),
    bio: "Backend engineer who builds secure APIs. Worked on payment APIs for a wallet and real-time features for a telehealth app.",
  },
  {
    name: "Ayesha Khan", title: "Python Developer", department: "Backend", seniority: "mid", hourlyRate: 25,
    skills: skills("python:expert:4", "django:expert:4", "postgresql:intermediate:3", "fastapi:intermediate:2"),
    bio: "Python developer who built course and quiz APIs for an e-learning platform and now works on an AI claims assistant.",
  },
  {
    name: "Hamza Farooq", title: "Laravel Developer", department: "Backend", seniority: "mid", hourlyRate: 20,
    skills: skills("laravel:expert:4", "php:expert:5", "mysql:expert:4"),
    bio: "Laravel developer building appointment and billing modules for clinic management software.",
  },
  {
    name: "Saad Mehmood", title: "Junior Node.js Developer", department: "Backend", seniority: "junior", hourlyRate: 13,
    skills: skills("node.js:intermediate:2", "express:intermediate:2", "mongodb:intermediate:2"),
    bio: "Junior backend developer who worked on appointment APIs for a healthcare app and tracking APIs for a fleet system.",
  },

  // ---------- Web ----------
  {
    name: "Ali Hassan", title: "Senior React Developer", department: "Web", seniority: "senior", hourlyRate: 34,
    skills: skills("react:expert:6", "typescript:expert:5", "tailwind css:expert:4", "next.js:intermediate:3"),
    bio: "Senior frontend developer who builds dashboards with a lot of data. Built a doctor booking portal and a fleet tracking dashboard.",
  },
  {
    name: "Fatima Noor", title: "React Developer", department: "Web", seniority: "mid", hourlyRate: 22,
    skills: skills("react:expert:4", "javascript:expert:4", "tailwind css:expert:3", "redux:intermediate:2"),
    bio: "React developer with experience in patient portals and online store frontends.",
  },
  {
    name: "Talha Anwar", title: "Next.js Developer", department: "Web", seniority: "mid", hourlyRate: 24,
    skills: skills("next.js:expert:3", "react:expert:4", "typescript:intermediate:3", "seo:intermediate:2"),
    bio: "Next.js developer who cares about page speed and SEO. Built an e-learning site and a marketplace storefront.",
  },
  {
    name: "Rabia Aslam", title: "Junior MERN Developer", department: "Web", seniority: "junior", hourlyRate: 12,
    skills: skills("react:intermediate:2", "node.js:beginner:1", "mongodb:beginner:1", "tailwind css:intermediate:2"),
    bio: "Junior MERN developer who built student dashboard screens for an e-learning platform.",
  },
  {
    name: "Shahzad Butt", title: "Senior Vue Developer", department: "Web", seniority: "senior", hourlyRate: 32,
    skills: skills("vue:expert:6", "javascript:expert:7", "laravel:intermediate:3"),
    bio: "Senior Vue developer building the front desk and billing screens of a clinic management system.",
  },
  {
    name: "Nida Yousaf", title: "MERN Stack Developer", department: "Web", seniority: "mid", hourlyRate: 23,
    skills: skills("react:expert:3", "node.js:intermediate:3", "mongodb:intermediate:3", "express:intermediate:3"),
    bio: "Full stack MERN developer who worked on product catalog and cart features for two e-commerce projects.",
  },

  // ---------- AI/ML ----------
  {
    name: "Waleed Chaudhry", title: "Senior Machine Learning Engineer", department: "AI/ML", seniority: "senior", hourlyRate: 42,
    skills: skills("python:expert:7", "machine learning:expert:6", "nlp:expert:5", "pytorch:intermediate:4"),
    bio: "ML engineer who builds document understanding and classification systems. Leads the AI work on an insurance claims assistant.",
  },
  {
    name: "Mehwish Riaz", title: "AI Engineer", department: "AI/ML", seniority: "mid", hourlyRate: 28,
    skills: skills("python:expert:3", "langchain:expert:2", "rag:expert:2", "vector databases:intermediate:2"),
    bio: "AI engineer focused on LLM apps, RAG pipelines and chatbots that answer from company documents.",
  },
  {
    name: "Asad Nawaz", title: "Junior Data Analyst", department: "AI/ML", seniority: "junior", hourlyRate: 12,
    skills: skills("python:intermediate:1", "pandas:intermediate:1", "sql:intermediate:2"),
    bio: "Junior data analyst who recently joined. Comfortable with SQL reports and data cleaning in Python.",
  },

  // ---------- QA ----------
  {
    name: "Sadia Parveen", title: "Senior QA Automation Engineer", department: "QA", seniority: "senior", hourlyRate: 26,
    skills: skills("test automation:expert:6", "cypress:expert:4", "appium:intermediate:3", "api testing:expert:5"),
    bio: "QA lead who sets up automated testing for web and mobile apps. Tested payment flows for two fintech projects.",
  },
  {
    name: "Junaid Abbas", title: "QA Engineer", department: "QA", seniority: "mid", hourlyRate: 16,
    skills: skills("manual testing:expert:4", "api testing:intermediate:3", "cypress:intermediate:2"),
    bio: "QA engineer experienced with healthcare and education web apps.",
  },
  {
    name: "Komal Shah", title: "Junior QA Engineer", department: "QA", seniority: "junior", hourlyRate: 10,
    skills: skills("manual testing:intermediate:2", "api testing:beginner:1"),
    bio: "Junior QA engineer who tested the checkout and order flows of an online store.",
  },

  // ---------- DevOps ----------
  {
    name: "Faisal Rehman", title: "Senior DevOps Engineer", department: "DevOps", seniority: "senior", hourlyRate: 38,
    skills: skills("aws:expert:6", "docker:expert:6", "kubernetes:intermediate:3", "ci/cd:expert:5"),
    bio: "DevOps engineer who sets up cloud infrastructure and deployment pipelines. Splits time between two running projects.",
  },
  {
    name: "Arslan Haider", title: "DevOps Engineer", department: "DevOps", seniority: "mid", hourlyRate: 24,
    skills: skills("aws:intermediate:3", "docker:expert:3", "ci/cd:intermediate:3"),
    bio: "DevOps engineer handling deployments and monitoring for a remittance platform.",
  },

  // ---------- UI/UX ----------
  {
    name: "Amna Zafar", title: "Senior UI/UX Designer", department: "UI/UX", seniority: "senior", hourlyRate: 28,
    skills: skills("figma:expert:6", "ux research:expert:5", "design systems:expert:4"),
    bio: "Product designer who designed a fintech wallet, a telehealth app and a marketplace.",
  },
  {
    name: "Zohaib Latif", title: "UI/UX Designer", department: "UI/UX", seniority: "mid", hourlyRate: 18,
    skills: skills("figma:expert:3", "prototyping:intermediate:3", "ui design:expert:3"),
    bio: "UI designer who designed booking screens for a healthcare app and dashboards for an e-learning platform.",
  },
];

export const projects = [
  // ---------- Finished ----------
  {
    name: "PayLink Wallet", clientName: "PayLink Technologies", industry: "fintech",
    techStack: ["react native", "node.js", "postgresql"], startDate: day(-400), endDate: day(-220),
    description: "A mobile wallet for sending money, paying bills and topping up mobile balance. The app includes KYC verification, transaction history and push notifications. The backend connects to a bank payment gateway.",
  },
  {
    name: "MediBook", clientName: "HealthFirst Clinics", industry: "healthcare",
    techStack: ["react", "node.js", "mongodb"], startDate: day(-300), endDate: day(-150),
    description: "A web portal where patients book doctor appointments and see their visit history. Doctors manage their schedule and write prescriptions. Includes SMS reminders before each appointment.",
  },
  {
    name: "ShopSwift", clientName: "ShopSwift Retail", industry: "e-commerce",
    techStack: ["ruby on rails", "react", "postgresql"], startDate: day(-360), endDate: day(-200),
    description: "An online store with product catalog, cart, checkout and card payments. Rails handles orders, stock and refunds, and background jobs send order emails. Includes an admin panel for the store team.",
  },
  {
    name: "RouteMate", clientName: "RouteMate Logistics", industry: "logistics",
    techStack: ["flutter", "firebase", "node.js"], startDate: day(-250), endDate: day(-100),
    description: "A delivery app for drivers with live location, route planning and proof of delivery photos. Dispatchers assign orders and follow every driver on a map in real time.",
  },
  {
    name: "LearnLoop", clientName: "LearnLoop Education", industry: "edtech",
    techStack: ["next.js", "django", "postgresql"], startDate: day(-200), endDate: day(-40),
    description: "An e-learning platform with video courses, quizzes and certificates. Students follow their progress on a dashboard and teachers upload lessons and check quiz results.",
  },

  // ---------- Running ----------
  {
    name: "CashBridge Remittance", clientName: "CashBridge Ltd", industry: "fintech",
    techStack: ["react native", "ruby on rails", "postgresql"], startDate: day(-120), endDate: day(60),
    description: "A remittance app for sending money from the UAE to Pakistan. Users verify their identity, see live exchange rates and track each transfer. The Rails API handles compliance checks and payout partners.",
  },
  {
    name: "CareLine Telehealth", clientName: "CareLine Health", industry: "healthcare",
    techStack: ["react native", "node.js", "webrtc"], startDate: day(-90), endDate: day(10),
    description: "A telehealth mobile app for video consultations with doctors. Patients book a slot, pay online, join a video call and receive a digital prescription afterwards.",
  },
  {
    name: "FleetTrack", clientName: "TransCargo", industry: "logistics",
    techStack: ["react", "react native", "node.js", "aws"], startDate: day(-60), endDate: day(120),
    description: "A fleet management system with a web dashboard and a driver mobile app. It tracks trucks live, records fuel and maintenance, and alerts managers when a delivery is running late.",
  },
  {
    name: "StyleCart Marketplace", clientName: "StyleCart", industry: "e-commerce",
    techStack: ["next.js", "node.js", "mongodb"], startDate: day(-100), endDate: day(90),
    description: "A fashion marketplace where many sellers list their products. Includes seller dashboards, search with filters, reviews and split payments between the sellers and the platform.",
  },
  {
    name: "TutorHub", clientName: "TutorHub", industry: "edtech",
    techStack: ["ruby on rails", "react", "postgresql"], startDate: day(-80), endDate: day(7),
    description: "A platform that connects students with private tutors. Students search tutors by subject, book sessions and pay online. Tutors manage their calendar and earnings.",
  },
  {
    name: "InsureBot Claims Assistant", clientName: "SecureLife Insurance", industry: "insurance",
    techStack: ["python", "langchain", "react"], startDate: day(-35), endDate: day(75),
    description: "An AI assistant that reads insurance claim documents, extracts the key details and answers staff questions from the policy documents using RAG. It flags claims that need a manual check.",
  },
  {
    name: "ClinicFlow", clientName: "CityCare Hospitals", industry: "healthcare",
    techStack: ["laravel", "vue", "mysql"], startDate: day(-70), endDate: day(12),
    description: "Clinic management software for the front desk, billing, pharmacy stock and patient records. Used by reception staff and doctors across several branches.",
  },
];

// Each row: [developer name, project name, percent, optional start, optional end]
// If start and end are not given, the project's own dates are used.
export const allocations = [
  ["Ahmed Raza", "PayLink Wallet", 100],
  ["Hira Sheikh", "PayLink Wallet", 100],
  ["Usman Ghani", "PayLink Wallet", 100],
  ["Imran Siddiqui", "PayLink Wallet", 100],
  ["Amna Zafar", "PayLink Wallet", 50],
  ["Sadia Parveen", "PayLink Wallet", 50],

  ["Ali Hassan", "MediBook", 100],
  ["Fatima Noor", "MediBook", 100],
  ["Saad Mehmood", "MediBook", 100],
  ["Junaid Abbas", "MediBook", 50],
  ["Zohaib Latif", "MediBook", 50],

  ["Kamran Akhtar", "ShopSwift", 100],
  ["Sana Iqbal", "ShopSwift", 100],
  ["Nida Yousaf", "ShopSwift", 100],
  ["Komal Shah", "ShopSwift", 50],

  ["Maryam Javed", "RouteMate", 100],
  ["Danish Qureshi", "RouteMate", 100],
  ["Imran Siddiqui", "RouteMate", 100, day(-215), day(-100)],

  ["Talha Anwar", "LearnLoop", 100],
  ["Ayesha Khan", "LearnLoop", 100],
  ["Rabia Aslam", "LearnLoop", 100],
  ["Zohaib Latif", "LearnLoop", 50],

  ["Kamran Akhtar", "CashBridge Remittance", 100],
  ["Bilal Tariq", "CashBridge Remittance", 50],
  ["Arslan Haider", "CashBridge Remittance", 50],
  ["Sadia Parveen", "CashBridge Remittance", 100],

  ["Ahmed Raza", "CareLine Telehealth", 100],
  ["Imran Siddiqui", "CareLine Telehealth", 100],
  ["Amna Zafar", "CareLine Telehealth", 50],

  ["Zainab Malik", "FleetTrack", 100],
  ["Ali Hassan", "FleetTrack", 100],
  ["Saad Mehmood", "FleetTrack", 100],
  ["Faisal Rehman", "FleetTrack", 50],

  ["Talha Anwar", "StyleCart Marketplace", 100, day(-35), day(90)],
  ["Nida Yousaf", "StyleCart Marketplace", 100],
  ["Fatima Noor", "StyleCart Marketplace", 100],
  ["Amna Zafar", "StyleCart Marketplace", 50],

  ["Fahad Mirza", "TutorHub", 100],
  ["Junaid Abbas", "TutorHub", 100],

  ["Waleed Chaudhry", "InsureBot Claims Assistant", 100],
  ["Mehwish Riaz", "InsureBot Claims Assistant", 100],
  ["Ayesha Khan", "InsureBot Claims Assistant", 100],
  ["Faisal Rehman", "InsureBot Claims Assistant", 50],

  ["Hamza Farooq", "ClinicFlow", 100],
  ["Shahzad Butt", "ClinicFlow", 100],
];
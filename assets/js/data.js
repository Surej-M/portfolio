export const profile = {
  location: "Los Angeles / San Diego",
  status: "Seeking Mechanical Engineering roles",
  summary: [
    "I am a MS Mechanical Engineering student passionate about hands-on problem-solving and experimental design.",
    "I thrive in fast-paced, collaborative environments and enjoy bringing innovative ideas to life.",
    "Hobbies: Indoor Rock Climbing, Hiking, Reading books"
  ],
  links: {
    resume: "#",
    github: "#",
    linkedin: "https://www.linkedin.com/in/surejkrishna-melattinkara-sunil/",
    email: "mailto:smelattin0002@gmail.com"
  }
};

export const workExperiences = [
  {
    id: "ucsd-temp-lab",
    org: "UCSD TEMP Lab",
    role: "Undergraduate Researcher",
    start: "Dec 2024",
    end: "Jun 2025",
    location: "La Jolla, CA",
    tags: ["Thermal Systems", "Heat Transfer", "MATLAB", "ANSYS", "Fusion 360"],
    bullets: [
      "Prototyped a thermoelectric liquid cooling module for a wearable vest using first-principles heat-transfer calculations; achieved 16°C drop (45°C to 29°C) in final tests.",
      "Designed flexible FDM printed 10W heat sinks in Fusion 360 with Bambu Lab printers; optimized print parameters for increased thermal conductivity and print quality.",
      "Designed and assembled the cooling-loop test hardware by integrating sensors, sizing tubing, and selecting a pump via thermal + hydraulic analysis; delivered ~70% increase in cooling.",
      "Performed heat transfer calculations in MATLAB to size components, predict performance, and guide design.",
      "Developed steady-state ANSYS thermal models with anisotropic properties to enable rapid future heat-sink design iteration."
    ],
    logoText: "TL"
  },
  {
    id: "bharat-fritz-werner",
    org: "Bharat Fritz Werner Limited",
    role: "R&D Mechanical Engineering Intern",
    start: "Jul 2024",
    end: "Aug 2024",
    location: "Bengaluru, India",
    tags: ["R&D", "Feasibility", "Thermal Analysis"],
    bullets: [
      "Led early-stage feasibility study to replace air blast oil coolers with PCM systems for CNC hydraulic oil cooling in high-temperature environments.",
      "Estimated system heat loads using first-principles calculations with vendor specifications and on-machine measurements.",
      "Evaluated PCM thermal properties and identified promising non-toxic, non-corrosive candidates aligned with CNC operational needs.",
      "Presented results to senior leadership, outlining limitations and recommendations for a future hybrid direction."
    ],
    logoText: "BF",
    logoImage: "assets/img/BFW_logo.jpg"
  },
  {
    id: "lubarda-lab",
    org: "Lubarda Lab (UCSD)",
    role: "Undergraduate Researcher",
    start: "May 2023",
    end: "Jun 2024",
    location: "La Jolla, CA",
    tags: ["CAD", "Altair Inspire", "Simulation", "Mechanisms"],
    bullets: [
      "Developed Fusion 360 CAD & Altair Inspire simulation to analyze motion and stability of a linear slider under variable loads.",
      "Resolved contact and constraint issues to achieve realistic behavior across repeated studies.",
      "Used parametric simulations to identify a loading condition that prompted revision of the analytical model.",
      "Co-authored two journal manuscripts and presented results at the UCSD Lab Expo."
    ],
    logoText: "LL"
  }
];

export const education = [
  {
    id: "ucsd-ms",
    org: "UC San Diego",
    degree: "M.S. Mechanical Engineering",
    graduation: "June 2026",
    subline: "3.56 GPA",
    bullets: [],
    logoText: "UC",
    logoImage: "assets/img/UCSD_Seal.png"
  },
  {
    id: "ucsd-bs",
    org: "UC San Diego",
    degree: "B.S. Mechanical Engineering",
    graduation: "June 2025",
    subline: "",
    bullets: [],
    logoText: "UC",
    logoImage: "assets/img/UCSD_Seal.png"
  }
];

export const projects = [
  {
    id: "robotic-cage-handling-system",
    title: "Robotic Cage Handling System (Senior Capstone)",
    description: "Developed a robotic system to grab, flip, and transfer mice cages onto a conveyor; reached 64% of manual throughput under $6.5k in 15 weeks.",
    tags: ["Robotics", "Onshape", "Machining", "System Design"],
    image: "assets/img/capstoneCAD.jpg",
    links: {
      website: "https://sites.google.com/eng.ucsd.edu/mae156b-2025spring-team42"
    },
    featured: true
  },
  {
    id: "fatigue-shaft-design-tool",
    title: "Fatigue Shaft Design Tool (MATLAB)",
    description: "Built a MATLAB program to size circular steel shafts under combined alternating bending and torsion using DE-Goodman + Von Mises.",
    tags: ["MATLAB", "Fatigue Design", "Machine Design"],
    links: {
      github: "#",
      demo: "#"
    },
    featured: true
  },
  {
    id: "coastal-livability-data-analysis-tool",
    title: "Coastal Livability Data Analysis Tool (MATLAB)",
    description: "Processed CDIP NetCDF buoy data from 2022 to 2023 to score coastal livability across four California locations and visualize seasonal trends.",
    tags: ["MATLAB", "NetCDF", "Data Analysis"],
    links: {
      github: "#",
      demo: "#"
    },
    featured: true
  },
  {
    id: "engineering-graphics-design-team-robot",
    title: "Engineering Graphics & Design Team Robot",
    description: "Designed and built a competition robot in a team of 4 using AutoCAD, Fusion 360, 3D printing, laser cutting, and machine shop fabrication.",
    tags: ["AutoCAD", "Fusion 360", "Fabrication", "Team Design"],
    links: {
      github: "#",
      demo: "#"
    },
    featured: false
  }
];

export const heroSlides = [
  {
    image: "assets/img/port1.jpg",
    alt: ""
  },
  {
    image: "assets/img/port2.webp",
    alt: ""
  },
  {
    image: "assets/img/port3.webp",
    alt: ""
  }
];

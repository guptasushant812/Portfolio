/**
 * Portfolio Data
 * Skills and projects data arrays used by main.js for dynamic rendering.
 */

// =========================
// SKILLS DATA
// =========================
const skillsData = [
    { name: "HTML5", category: "frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
    { name: "CSS3", category: "frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6" },
    { name: "JavaScript", category: "frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
    { name: "ReactJS", category: "frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
    { name: "Bootstrap", category: "frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
    { name: "Tailwind", category: "frontend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
    { name: "C#", category: "backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", color: "#239120" },
    { name: ".NET Core", category: "backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg", color: "#512BD4" },
    { name: "Python", category: "backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
    { name: "MS SQL", category: "database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", color: "#CC292B" },
    { name: "MySQL", category: "database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", color: "#4479A1" },
    { name: "Firebase", category: "database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" },
    { name: "Git", category: "tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "#F05032" },
    { name: "GitHub", category: "tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", color: "#FFFFFF", invert: true },
    { name: "VS Code", category: "tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", color: "#007ACC" },
    { name: "Visual Studio", category: "tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg", color: "#5C2D91" },
    { name: "Postman", category: "additional", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", color: "#FF6C37" },
    { name: "Canva", category: "additional", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg", color: "#00C4CC" },
    { name: "Figma", category: "additional", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", color: "#F24E1E" },
];

// =========================
// PROJECTS DATA
// =========================
const projectShowcase = [
    {
        title: "ANTARISHK - India's Space Journey",
        role: "SkillsVarz 1.0",
        duration: "2025",
        description: "Interactive web platform exploring ISRO's space missions with 3D satellite orbits, cinematic scroll animations, and real-time satellite visualizations.",
        tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Three.js", "Swiper JS"],
        live: "https://codebuddies-antarishk.vercel.app",
        github: "https://github.com/guptasushant812/CodeBuddies-ANTARISHK",
        customImg: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800",
        logoOverride: "https://codebuddies-antarishk.vercel.app/assets/images/rocket.png",
    },
    {
        title: "Product Launch India",
        role: "Skillsvarz 1.0",
        duration: "2025",
        description: "Interactive product launch experience for an innovative Electric Cycle with 3D showcase, scroll-based animations, and immersive storytelling.",
        tech: ["HTML", "CSS", "JavaScript", "GSAP", "Babylon.js", "Lucide Icons"],
        live: "https://productlaunchindia.vercel.app",
        github: "https://github.com/guptasushant812/ProductLaunch",
        customImg: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800",
        logoOverride: "https://productlaunchindia.vercel.app/assets/favicon/favicon.png",
    },
    {
        title: "AI-Powered Learning Platform",
        role: "Final Year Project",
        duration: "03/25",
        description: "Adaptive learning platform delivering personalized roadmaps with intelligent quizzes, performance tracking, and real-time feedback optimization.",
        tech: ["HTML5", "CSS3", "JavaScript", "React", "Firebase", "Python", "APIs"],
        live: "https://educationai-frontend.vercel.app",
        github: "https://github.com/guptasushant812/EduaAI-main",
        customImg: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800",
        logoOverride: "https://educationai-frontend.vercel.app/mainlogo.jpg",
    },
    {
        title: "TechBlend Edu",
        role: "Frontend Developer Intern",
        duration: "08/24",
        description: "Interactive educational website featuring responsive design and student-focused UI.",
        tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "UI/UX Design"],
        live: "https://techblend-edu.netlify.app",
        github: "https://github.com/guptasushant812/TechBlend-Edu",
        customImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800",
        logoOverride: "https://techblend-edu.netlify.app/img/icon.png",
    },
    {
        title: "RLMS Monitoring",
        role: "Aavishkar",
        duration: "11/23 - 02/23",
        description: "Remote lab monitoring solution designed to prevent academic malpractice through USB/Internet detection, remote system shutdown, and centralized student oversight.",
        tech: ["Python", "Python GUI"],
        live: null,
        github: null,
        customImg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
        logoOverride: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    {
        title: "MR-Manage",
        role: "Connexa",
        duration: "2024",
        description: "Secure medical records platform improving emergency care and reducing duplicate tests.",
        tech: ["Wix", "UI/UX Design"],
        live: "https://veetchheda.wixsite.com/mr-manage",
        github: "https://github.com/guptasushant812/RLMS",
        customImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
        logoOverride: "https://www.google.com/s2/favicons?domain=wix.com&sz=64",
    },
];

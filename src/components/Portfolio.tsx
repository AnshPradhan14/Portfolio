// Portfolio.tsx
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react";
import anshProfile from "@/assets/ansh-profile.jpg";

interface PortfolioProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Portfolio = ({ isDark, toggleTheme }: PortfolioProps) => {
  const [terminalText, setTerminalText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showHeaderName, setShowHeaderName] = useState(false);

  // State variables for section visibility
  const [aboutVisible, setAboutVisible] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [certificationsVisible, setCertificationsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const discordMessage = {
      content: `**New Message from Portfolio**\n**Name:** ${formData.name}\n**Email:** ${formData.email}\n**Message:** ${formData.message}`
    };

    try {
      const response = await fetch('https://discordapp.com/api/webhooks/1479474596859088896/OvJ8zGtBfAEadnZjvXvonkHNp-vPxYDlpFwUO4xU7dGFWPJIWamqJGj1Dbo_j88qgP0w', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      });

      if (response.ok) {
        alert("Message received! Thanks for reaching out. I'll get back to you as soon as possible.");
        setFormData({ name: "", email: "", message: "" });
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Something went wrong while sending to Discord. Please check your Webhook URL.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error sending message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const terminalLines = [
    "Initializing Portfolio...",
    "Loading AI & ML expertise...",
    "Connecting neural networks...",
    "System ready. Welcome to Portfolio.",
  ];

  useEffect(() => {
    setIsVisible(true);
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let accumulatedText = "";

    const typeWriter = () => {
      if (currentLineIndex < terminalLines.length) {
        const currentLine = terminalLines[currentLineIndex];
        if (currentCharIndex < currentLine.length) {
          accumulatedText += currentLine[currentCharIndex];
          setTerminalText(accumulatedText);
          currentCharIndex++;
          setTimeout(typeWriter, 30);
        } else {
          if (currentLineIndex < terminalLines.length - 1) {
            accumulatedText += "\n";
          }
          currentLineIndex++;
          currentCharIndex = 0;
          setTimeout(typeWriter, 50);
        }
      } else {
        setTimeout(() => {
          setTerminalText("");
        }, 400);
      }
    };

    const timer = setTimeout(typeWriter, 0);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for hero title visibility
  useEffect(() => {
    const heroTitle = document.querySelector('h1');
    if (!heroTitle) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeaderName(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    );
    observer.observe(heroTitle);
    return () => observer.disconnect();
  }, [isVisible]);

  // New Intersection Observer for scrolling animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case 'about': setAboutVisible(true); break;
              case 'experience': setExperienceVisible(true); break;
              case 'projects': setProjectsVisible(true); break;
              case 'certifications': setCertificationsVisible(true); break;
              case 'contact': setContactVisible(true); break;
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    const sections = ['about', 'experience', 'projects', 'certifications', 'contact'];
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const skills = [
    "Python",
    "SQL",
    "JavaScript",
    "R Programming",

    "Machine Learning",
    "Deep Learning",
    "Data Science",

    "TensorFlow",
    "PyTorch",
    "Scikit-learn",

    "Computer Vision",
    "NLP",

    "LLMs",
    "RAG",
    "LangChain",
    "AI Agents",
    "Vector Databases",

    "Power BI",

    "FastAPI",
    "Streamlit",
    "Docker",
    "Git"
  ];
  const experiences = [
    {
      title: "AI/ML Research Intern",
      company: "Institute for Plasma Research (IPR) – Dept. of Atomic Energy, Govt. of India",
      period: "February 2026 – Present",
      bullets: [
        "Researching Retrieval-Augmented Generation (RAG) architectures and LLM-based systems for building domain-specific knowledge retrieval solutions.",
        "Analyzing modern RAG pipelines, hybrid retrieval techniques, and LLM orchestration frameworks through research and survey papers.",
        "Experimenting with document chunking strategies, semantic embeddings, and vector search methods to improve retrieval accuracy.",
        "Designing a scalable RAG-powered knowledge base for intelligent querying."
      ]
    },
    {
      title: "AI/ML Intern",
      company: "Edunet Foundation",
      period: "June 2025 - August 2025",
      bullets: [
        "Built an interactive employee income prediction app using ML algorithms and the UCI Adult dataset for real-time insights.",
        "Created a Streamlit interface allowing feature selection and multi-model comparison for personalized forecasting.",
        "Delivered end-to-end pipeline from preprocessing and evaluation to cloud deployment, achieving 86%+ accuracy."
      ]
    },
    {
      title: "AI/ML & Data Science Intern",
      company: "India Space Academy",
      period: "June 2025 - July 2025",
      bullets: [
        "Applied statistical outlier detection and velocity dispersion analysis on large astrophysical datasets to estimate galaxy cluster mass using physics-informed regression techniques.",
        "Performed nonlinear curve fitting and numerical integration on observational supernova data to accurately model universe expansion parameters, leveraging advanced optimization and data modeling methods.",
        "Developed a real-time spatiotemporal data pipeline and interactive web dashboard to analyze ISS trajectories and predict visibility windows using geospatial data processing."
      ]
    },
    {
      title: "Vice President - Computer Society & Gaming Club",
      company: "Intitute of Advanced Research",
      period: "March 2024 - August 2025",
      bullets: [
        "Led strategic event planning to boost participation by 65% through organizing major hackathons, coding challenges, and AI workshops.",
        "Built industry partnerships and secured funding for three large-scale university tech events, enhancing campus engagement.",
        "Mentored 20+ students and coordinated with stakeholders to foster an innovative, collaborative tech community."
      ]
    },
    {
      title: "Python Developer Intern",
      company: "Oasis Infobyte",
      period: "March 2024 - April 2024",
      bullets: [
        "Developed a PyQt-based weather forecasting tool leveraging time-series analysis to deliver accurate, data-driven predictions for users.",
        "Built a machine learning system for BMI prediction, showcasing how health analytics can provide personalized, actionable insights.",
        "Enhanced ability to transform complex datasets into clear, interactive reports, strengthening data communication and user engagement skills."
      ]
    }
  ];

  const certifications = [
    { name: "SAP Advanced Course", link: "https://www.linkedin.com/posts/anshpradhan14_sap-advance-course-certificate-activity-7322645324949286912-3f6R?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwVV58BEuOIWLRklLAUNRR4VGjC64-1BHA" },
    { name: "Machine Learning with Python", link: "https://coursera.org/verify/H9YYEE2TZ6CS" },
    { name: "Keras & TensorFlow", link: "https://coursera.org/verify/00HJO3U5G4J7" },

    { name: "Deep Learning & Neural Networks", link: "https://www.coursera.org/account/accomplishments/verify/TU031Q7S8QBL" },
    { name: "PyTorch with Neural Networks ", link: "https://www.coursera.org/account/accomplishments/verify/MUDT35MGZ4TN" },
    { name: "Edunet - Artificial Intelligence", link: "https://skills.yourlearning.ibm.com/certificate/share/fc8f526d84ewogICJvYmplY3RJZCIgOiAiUExBTi04QTQ4NjQ1MTk2RkEiLAogICJsZWFybmVyQ05VTSIgOiAiNTAwMjI4NVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIgp939a94e05c2-10" },

    { name: "Python for Data Science, AI & Development", link: "https://coursera.org/verify/THBDIEY5ZJ6C" },
    { name: "Data Visualization", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_Y3c9Wm4qLnPtiXxZn_1748528358811_completion_certificate.pdf" },

  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className={`text-xl font-bold gradient-text font-orbitron transition-all duration-300 ${showHeaderName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
              }`}>
              <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">ANSH</a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a>
              <a href="#experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
              <a href="#certifications" className="text-muted-foreground hover:text-primary transition-colors">Certifications</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-darker via-cyber-dark to-background"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 8 + "s",
              background: i % 3 === 0 ? "hsl(var(--cyber-pink))" :
                i % 3 === 1 ? "hsl(var(--cyber-cyan))" : "hsl(var(--cyber-purple))"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-primary/20"></div>
            ))}
          </div>
        </div>
      </div>



      {/* Terminal Loading Effect */}
      {terminalText && (
        <div className="fixed top-0 left-0 w-full h-full bg-background/95 backdrop-blur-sm z-40 flex items-center justify-center animate-fade-in">
          <div className="cyber-card max-w-2xl">
            <pre className="text-primary font-mono text-sm whitespace-pre-wrap">
              {terminalText}
              <span className="animate-pulse">_</span>
            </pre>
          </div>
        </div>
      )}

      <div className={`relative z-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Hello 👋, This is
              </p>
              <h1 className="text-6xl lg:text-8xl font-bold gradient-text font-orbitron -mt-2">
                ANSH<br />PRADHAN
              </h1>
              <div className="text-xl lg:text-2xl text-muted-foreground">
                AI/ML Engineer | LLM, RAG & Intelligent Systems
              </div>
              <p className="text-lg text-muted-foreground max-w-xl">
                Focused on building practical AI applications from AI Agents, RAG-based assistants and ML models to data-driven systems that turn complex data into useful insights.
              </p>
              <div className="flex gap-4">
                <Button className="cyber-glow">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
                <Button variant="outline" className="neon-border" asChild>
                  <a href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-center animate-fade-in floating">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full blur-lg opacity-30"></div>
                <img
                  src={anshProfile}
                  alt="Ansh Pradhan"
                  className="relative w-80 h-80 rounded-full object-cover border-4 border-primary cyber-glow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 neon-text font-orbitron">
              ABOUT ME
            </h2>
            <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${aboutVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}> {/* MODIFIED LINE */}
              <Card className="cyber-card">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">Background</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Final-year Computer Engineering (AI Major) student passionate about building intelligent systems with machine learning, data science, and modern AI. I enjoy turning complex data and ideas into practical applications from predictive models and analytics to LLM and RAG-powered tools.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">Focus Areas</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Machine Learning & Deep Learning</li>
                      <li>• Large Language Models & RAG</li>
                      <li>• Data Science & Analytics</li>
                      <li>• AI-powered Web Applications</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 overflow-hidden">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 neon-text font-orbitron">
              SKILLS
            </h2>
            {/* IMPORTANT: This outer div needs overflow-hidden */}
            <div className="relative w-full overflow-hidden">
              {/* IMPORTANT: This inner div needs w-max and the animation */}
              {/* Added 'flex-nowrap' to prevent wrapping, and 'gap-6' for spacing between items */}
              <div className="flex flex-nowrap w-max animate-scroll-continuous">
                {/* Duplicate skills array to create a seamless loop */}
                {skills.map((skill, index) => (
                  <div
                    key={`skill-1-${index}`} // Unique key for the first set
                    className="flex-shrink-0 cyber-card min-w-fit px-6 py-3 neon-border mr-6"
                  >
                    <span className="text-lg font-semibold">{skill}</span>
                  </div>
                ))}
                {skills.map((skill, index) => (
                  <div
                    key={`skill-2-${index}`} // Unique key for the second set
                    className="flex-shrink-0 cyber-card min-w-fit px-6 py-3 neon-border mr-6"
                  >
                    <span className="text-lg font-semibold">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 neon-text font-orbitron">
              EXPERIENCE
            </h2>
            <div className={`max-w-4xl mx-auto space-y-8 transition-opacity duration-1000 ${experienceVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}> {/* MODIFIED LINE */}
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <Card className="cyber-card flex-1">
                    <h3 className="text-xl font-bold gradient-text">{exp.title}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                    <ul className="text-muted-foreground space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 neon-text font-orbitron">
              PROJECTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Startup Idea Evaluator",
                  description: "AI-powered startup analysis tool that uses agent-based workflows to research market trends, competitors, and feasibility using Gemini API and SerpAPI. Generates automated reports to assist early-stage idea validation. Helps entrepreneurs quickly evaluate business ideas and make data-informed decisions before investing time and resources.",
                  tech: ["AI Agents", "CrewAI", "SerpAPI", "Streamlit", "Google Gemini API"],
                  link: "https://github.com/AnshPradhan14/startup-idea-evaluator"
                },
                {
                  title: "Chatur AI",
                  description: "An advanced RAG-powered study companion utilizing hierarchical retrieval and agentic workflows for hallucination-free document analysis. Deployed on Hugging Face, it leverages Groq LLMs and MongoDB for high-speed, context-aware Q&A. It seamlessly processes multi-format educational materials to provide precise, real-time knowledge retrieval.",
                  tech: ["LangChain", "ChromaDB", "FastAPI", "HuggingFace"],
                  link: "https://github.com/AnshPradhan14/Chatur_AI"
                },
                {
                  title: "Age & Gender Detection",
                  description: "A high-performance computer vision system that performs real-time demographic analysis using deep learning, leveraging OpenCV for facial recognition. Features optimized CNN architectures to accurately predict age ranges and gender from live camera feeds or static images with low-latency inference.",
                  tech: ["CNN", "VGG 16", "TensorFlow", "Computer Vision"],
                  link: "https://github.com/AnshPradhan14/Age-and-Gender-Prediction"
                },
                {
                  title: "Restaurant Data Analysis & Prediction",
                  description: "An end-to-end data science project that performs deep exploratory data analysis and predictive modeling on restaurant datasets. It leverages machine learning to identify key success factors, visualize dining trends, and predict restaurant ratings based on location, cuisine, and cost.",
                  tech: ["Matplotlib", "Pandas", "Numpy", "Seaborn"],
                  link: "https://github.com/AnshPradhan14/Restaurant-Data-Analysis-and-Prediction"
                },
                {
                  title: "International Space Station Tracker",
                  description: "A comprehensive repository documenting industry-aligned projects completed during the ISA internship, focusing on core Machine Learning and Data Science workflows. Includes practical implementations of data preprocessing, feature engineering, and model optimization for real-world datasets.",
                  tech: ["requests", "skyfeild", "cartopy", "Streamlit"],
                  link: "https://github.com/AnshPradhan14/ISA_internship/tree/main/Project%203"
                },
                {
                  title: "Stock-Price Prediction",
                  description: "A financial forecasting tool that utilizes Time Series Analysis and Deep Learning to predict future stock market trends by extracting historical data using the YFinance API. It implements LSTM or GRU architectures to capture temporal dependencies in historical price data, providing automated trend visualization for traders.",
                  tech: ["Sklearn", "yfinance", "MySQL", "Pandas"],
                  link: "https://github.com/AnshPradhan14/Stock-Price-prediction"
                }
              ].map((project, index) => (
                <Card
                  key={index}
                  className={`cyber-card group hover:scale-105 transition-transform ${projectsVisible ? 'animate-fade-in' : 'opacity-0'}`} // MODIFIED LINE
                  style={{ animationDelay: `${index * 0.15}s` }} // MODIFIED LINE
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold gradient-text">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/20 text-primary text-sm rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full cyber-glow">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Project
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 neon-text font-orbitron">
              CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className={`cyber-card group hover:scale-105 transition-transform cursor-pointer ${certificationsVisible ? 'animate-fade-in' : 'opacity-0'}`} // MODIFIED LINE
                  style={{ animationDelay: `${index * 0.15}s` }} // MODIFIED LINE
                  onClick={() => window.open(cert.link, '_blank')}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mx-auto mb-4 flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">Click to view credential</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 neon-text font-orbitron">
              GET IN TOUCH
            </h2>
            <div className={`grid md:grid-cols-2 gap-12 transition-opacity duration-1000 ${contactVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}> {/* MODIFIED LINE */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold gradient-text">Let's Connect</h3>
                <p className="text-muted-foreground">
                  Always up for new opportunities, cool collaborations, or just geeking out over
                  the latest in AI and tech. If it involves code, data, or even a good meme about machine learning, I’m in!
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="cyber-glow" asChild>
                    <a href="https://github.com/AnshPradhan14" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="cyber-glow" asChild>
                    <a href="https://www.linkedin.com/in/anshpradhan14/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="cyber-glow" asChild>
                    <a href="mailto:anshpradhan911@gmail.com">
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>

              <Card className="cyber-card">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="bg-background/50 border-primary/30 focus:border-primary cyber-glow"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="bg-background/50 border-primary/30 focus:border-primary cyber-glow"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={4}
                      required
                      className="bg-background/50 border-primary/30 focus:border-primary cyber-glow"
                    />
                  </div>
                  <Button type="submit" className="w-full cyber-glow" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-border">
          <p className="text-muted-foreground">
            © 2026 Ansh Pradhan. Built with curiosity, code, and a passion for AI.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
import { useEffect, useState } from "react";
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

  const terminalLines = [
    "Initializing Portfolio...",
    "Loading AI & ML expertise...",
    "Connecting neural networks...",
    "System ready. Welcome to Ansh's world.",
  ];

  useEffect(() => {
    setIsVisible(true);
    let currentLine = 0;
    let currentChar = 0;
    
    const typeWriter = () => {
      if (currentLine < terminalLines.length) {
        if (currentChar < terminalLines[currentLine].length) {
          setTerminalText(prev => prev + terminalLines[currentLine][currentChar]);
          currentChar++;
          setTimeout(typeWriter, 50);
        } else {
          if (currentLine < terminalLines.length - 1) {
            setTerminalText(prev => prev + "\n");
          }
          currentLine++;
          currentChar = 0;
          setTimeout(typeWriter, 500);
        }
      } else {
        // Hide terminal after animation completes
        setTimeout(() => {
          setTerminalText("");
        }, 2000);
      }
    };

    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    "Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", 
    "Power BI", "SQL", "JavaScript", "React", "HTML/CSS", "Streamlit", 
    "GitHub", "Data Science", "Computer Vision", "NLP", "AI/ML"
  ];

  const experiences = [
    {
      title: "AI/ML Intern",
      company: "Tech Innovation Hub",
      period: "2024",
      description: "Developed machine learning models for predictive analytics"
    },
    {
      title: "Hackathon Winner",
      company: "CodeFest 2024",
      period: "2024",
      description: "Built an AI-powered solution for smart city management"
    },
    {
      title: "Data Science Project",
      company: "Personal Project",
      period: "2023",
      description: "Created a deep learning model for image classification"
    }
  ];

  const certifications = [
    "Stanford Machine Learning Course",
    "SAP Technology Program", 
    "Data Visualization Specialist",
    "Deep Learning Specialization",
    "Python for Data Science",
    "AI for Everyone"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold gradient-text font-orbitron">ANSH</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
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

      {/* Theme Toggle */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="fixed top-6 right-6 z-50 cyber-glow"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

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
              <h1 className="text-6xl lg:text-8xl font-bold gradient-text font-orbitron">
                ANSH<br />PRADHAN
              </h1>
              <div className="text-xl lg:text-2xl text-muted-foreground">
                AI & ML Enthusiast | Computer Engineering Student
              </div>
              <p className="text-lg text-muted-foreground max-w-xl">
                Passionate about artificial intelligence, machine learning, and building innovative solutions 
                that bridge the gap between technology and human needs.
              </p>
              <div className="flex gap-4">
                <Button className="cyber-glow">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
                <Button variant="outline" className="neon-border">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
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
            <div className="max-w-4xl mx-auto">
              <Card className="cyber-card">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">Background</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I'm a Computer Engineering student with a deep passion for artificial intelligence 
                      and machine learning. My journey began with curiosity about how machines can learn 
                      and think, leading me to explore various domains from deep learning to data science.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">Focus Areas</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Machine Learning & Deep Learning</li>
                      <li>• Computer Vision & NLP</li>
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
            <div className="relative">
              <div className="flex animate-[scroll_20s_linear_infinite] gap-6">
                {[...skills, ...skills].map((skill, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 cyber-card min-w-fit px-6 py-3 neon-border"
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
            <div className="max-w-4xl mx-auto space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center cyber-glow">
                      <ExternalLink className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Card className="cyber-card flex-1">
                      <h3 className="text-xl font-bold gradient-text">{exp.title}</h3>
                      <p className="text-primary font-semibold">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </Card>
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-primary/30"></div>
                  )}
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
                  title: "AI Image Classification",
                  description: "Deep learning model for image recognition using TensorFlow and CNN",
                  tech: ["Python", "TensorFlow", "OpenCV", "Streamlit"],
                  link: "#"
                },
                {
                  title: "Smart City Analytics",
                  description: "IoT data analysis dashboard for urban planning and management",
                  tech: ["Python", "Power BI", "SQL", "React"],
                  link: "#"
                },
                {
                  title: "ML Stock Predictor",
                  description: "Machine learning model for stock price prediction using LSTM",
                  tech: ["Python", "PyTorch", "Pandas", "NumPy"],
                  link: "#"
                }
              ].map((project, index) => (
                <Card key={index} className="cyber-card group hover:scale-105 transition-transform">
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
                  className="cyber-card group hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => window.open('#', '_blank')}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mx-auto mb-4 flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{cert}</h3>
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
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold gradient-text">Let's Connect</h3>
                <p className="text-muted-foreground">
                  I'm always interested in discussing new opportunities, collaborations, 
                  or just chatting about the latest in AI and technology.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="cyber-glow">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="cyber-glow">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="cyber-glow">
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <Card className="cyber-card">
                <form className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="bg-background/50 border-primary/30 focus:border-primary cyber-glow"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-background/50 border-primary/30 focus:border-primary cyber-glow"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      className="bg-background/50 border-primary/30 focus:border-primary cyber-glow"
                    />
                  </div>
                  <Button className="w-full cyber-glow">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-border">
          <p className="text-muted-foreground">
            © 2024 Ansh Pradhan. Built with passion and cutting-edge technology.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
import { useState, useEffect } from "react";
import Portfolio from "@/components/Portfolio";

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.toggle('light');
  };

  return <Portfolio isDark={isDark} toggleTheme={toggleTheme} />;
};

export default Index;

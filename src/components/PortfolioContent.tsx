import React from 'react';
import { Progress } from '@/components/ui/progress';

const PortfolioContent: React.FC = () => {
  return <div className="animate-fade-in pt-16">
      {/* Hero Section */}
      <section id="home" className="portfolio-section">
        <div className="content-container flex flex-col items-center justify-center text-center h-full">
          <h1 className="text-6xl md:text-8xl font-bold text-theme-light mb-6 animate-float">
            <span className="inline-block">Shreyash Jain</span>
          </h1>
          <p className="text-xl md:text-2xl text-theme-lightSecondary max-w-2xl mb-12 hover:text-white hover:text-glow transition-all duration-300">
            Creating innovative solutions through AI, Web Design, Robotics, and App Development
          </p>
          <div className="flex space-x-4">
            <a href="#projects" className="px-8 py-3 bg-theme-accent text-theme-light rounded-md hover:bg-opacity-80 transition-all">
              View Projects
            </a>
            <a href="#contact" className="px-8 py-3 border border-theme-light text-theme-light rounded-md hover:bg-theme-light hover:text-theme-dark transition-all">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="portfolio-section bg-theme-darkSecondary/30">
        <div className="content-container">
          <h2 className="section-title">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-theme-dark p-6 rounded-lg h-full">
                <h3 className="text-2xl font-bold text-theme-light mb-4">My Skills</h3>
                <div className="space-y-4">
                  <SkillBar skill="AI Engineering" percentage={90} />
                  <SkillBar skill="Web Design" percentage={85} />
                  <SkillBar skill="Robotics" percentage={80} />
                  <SkillBar skill="App Development" percentage={88} />
                </div>
              </div>
            </div>
            <div className="hover:text-white hover:text-glow transition-all duration-300">
              <p className="text-lg text-theme-lightSecondary mb-6">
                I am a multidisciplinary technologist with expertise in AI Engineering, Web Design, Robotics Engineering, and App Development. 
                My passion lies in creating innovative solutions that bridge the gap between cutting-edge technology and user-centered design.
              </p>
              <p className="text-lg text-theme-lightSecondary mb-6">
                With years of experience across multiple domains, I bring a unique perspective to every project, 
                combining technical knowledge with creative problem-solving to deliver exceptional results.
              </p>
              <p className="text-lg text-theme-light">
                Let's collaborate and bring your vision to life with technology that makes a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="portfolio-section">
        <div className="content-container">
          <h2 className="section-title">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard title="AI Image Generation" category="AI Engineering" description="A deep learning model that generates realistic images from textual descriptions." />
            <ProjectCard title="E-commerce Platform" category="Web Design" description="A fully responsive e-commerce website with modern UI/UX and seamless checkout experience." />
            <ProjectCard title="Autonomous Drone" category="Robotics Engineering" description="A drone that navigates environments autonomously using computer vision." />
            <ProjectCard title="Fitness Tracker App" category="App Development" description="A mobile application that tracks workouts, nutrition, and provides personalized recommendations." />
            <ProjectCard title="Natural Language Processor" category="AI Engineering" description="An NLP system that analyzes sentiment and extracts key information from text." />
            <ProjectCard title="Smart Home Controller" category="Robotics Engineering" description="An IoT system that integrates with various smart home devices for centralized control." />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section bg-theme-darkSecondary/30">
        <div className="content-container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-theme-light mb-2">Name</label>
                  <input type="text" id="name" className="w-full bg-theme-dark border border-theme-accent/50 rounded-md px-4 py-3 text-theme-light focus:outline-none focus:ring-2 focus:ring-theme-light" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-theme-light mb-2">Email</label>
                  <input type="email" id="email" className="w-full bg-theme-dark border border-theme-accent/50 rounded-md px-4 py-3 text-theme-light focus:outline-none focus:ring-2 focus:ring-theme-light" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-theme-light mb-2">Subject</label>
                <input type="text" id="subject" className="w-full bg-theme-dark border border-theme-accent/50 rounded-md px-4 py-3 text-theme-light focus:outline-none focus:ring-2 focus:ring-theme-light" />
              </div>
              <div>
                <label htmlFor="message" className="block text-theme-light mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full bg-theme-dark border border-theme-accent/50 rounded-md px-4 py-3 text-theme-light focus:outline-none focus:ring-2 focus:ring-theme-light"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-theme-accent text-theme-light py-3 px-6 rounded-md hover:bg-opacity-80 transition-all">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-theme-dark">
        <div className="content-container text-center">
          <p className="text-theme-lightSecondary">&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};

// Updated SkillBar component with animation on hover
const SkillBar: React.FC<{
  skill: string;
  percentage: number;
}> = ({
  skill,
  percentage
}) => {
  return (
    <div className="group relative">
      <div className="flex justify-between mb-1">
        <span className="text-theme-light group-hover:text-white group-hover:text-glow transition-all">{skill}</span>
        <span className="text-theme-lightSecondary opacity-0 group-hover:opacity-100 transition-all duration-300">{percentage}%</span>
      </div>
      <div className="h-2 bg-theme-accent/20 rounded-full overflow-hidden">
        <div className="h-full bg-theme-accent/30 rounded-full w-0 group-hover:w-full transition-all duration-1000 ease-out" />
      </div>
      <Progress 
        value={0} 
        className="absolute top-6 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-theme-accent/20"
        // The following will be handled with JavaScript dynamically
        style={{
          "--value": "0",
          "--transition-duration": "1s",
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          setTimeout(() => {
            target.style.setProperty("--value", percentage.toString());
          }, 10);
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.setProperty("--value", "0");
        }}
      />
    </div>
  );
};

const ProjectCard: React.FC<{
  title: string;
  category: string;
  description: string;
}> = ({
  title,
  category,
  description
}) => {
  return <div className="project-card group">
      <div className="h-48 bg-theme-accent/30 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-theme-light opacity-50">{title}</span>
        </div>
        <div className="absolute inset-0 bg-theme-dark opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-theme-light">View Project</span>
        </div>
      </div>
      <div className="p-6">
        <span className="text-sm text-theme-light/70">{category}</span>
        <h3 className="text-xl font-semibold text-theme-light mt-1 mb-3">{title}</h3>
        <p className="text-theme-lightSecondary">{description}</p>
      </div>
    </div>;
};

export default PortfolioContent;

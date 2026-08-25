import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import AdditionalSkills from './components/AdditionalSkills'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Feedback from './components/Feedback'
import Footer from './components/Footer'
import SonalAI from './components/SonalAI'

export default function App() {
  return (
    <div className="min-h-screen font-body text-ink">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Home />
        <Projects />
        <TechStack />
        <AdditionalSkills />
        <Education />
        <Certificates />
        <Feedback />
      </main>
      <Footer />
      <SonalAI />
    </div>
  )
}
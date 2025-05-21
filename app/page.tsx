import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import FeaturedProjects from '@/components/FeaturedProjects'
import AllProjects from '@/components/AllProjects'
import FAQ from '@/components/FAQ'
import Testimonials from '@/components/Testimonials'
import TeamSkills from '@/components/TeamSkills'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ExpertiseSection from '@/components/Expertise'
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Marquee 
        
      />
      <FeaturedProjects />
      <ExpertiseSection />
      
      <AllProjects />
      <FAQ />
      <Testimonials />
      <TeamSkills />
      <ContactForm />
      <Footer />
    </main>
  )
}


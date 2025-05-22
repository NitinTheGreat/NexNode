
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import FeaturedProjects from '@/components/FeaturedProjects'
import AllProjects from '@/components/AllProjects'
import FAQ from '@/components/FAQ'
// import Testimonials from '@/components/Testimonials'
import CosmicShowcase from '@/components/Cosmic'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ExpertiseSection from '@/components/Expertise'

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      
      <Hero />
      <Marquee 
        
      />
      <FeaturedProjects />
      <CosmicShowcase />
      <ExpertiseSection />
      
      <AllProjects />
      <FAQ />
     
      
      <ContactForm />
      <Footer />
    </main>
  )
}


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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Marquee 
        items={['INNOVATIVE', 'RESPONSIVE', 'SCALABLE', 'MODERN', 'FAST', 'SECURE']} 
        direction="left"
        speed={40}
      />
      <FeaturedProjects />
      <Marquee 
        items={['NEXT.JS', 'REACT', 'NODE.JS', 'TYPESCRIPT', 'MONGODB', 'POSTGRESQL']} 
        direction="right"
        speed={30}
        className="my-8"
      />
      <AllProjects />
      <FAQ />
      <Testimonials />
      <TeamSkills />
      <ContactForm />
      <Footer />
    </main>
  )
}


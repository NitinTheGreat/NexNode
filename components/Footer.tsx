import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              NexNode
            </Link>
          </div>
          <nav className="flex gap-4">
            <Link href="#projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          © {new Date().getFullYear()} NexNode. All rights reserved.
        </div>
      </div>
    </footer>
  )
}


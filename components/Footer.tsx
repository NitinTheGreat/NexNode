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
            <Link href="https://www.linkedin.com/company/nexnode/" className="hover:text-primary transition-colors">
              Linkedin
            </Link>
            <Link href="https://www.instagram.com/nexnode01" className="hover:text-primary transition-colors">
              Instagram
            </Link>
            <Link href="https://x.com/NexNode01" className="hover:text-primary transition-colors">
              Twitter
            </Link>
            <Link href="https://www.fiverr.com/nexnode?source=gig_page&gigs=slug%3Acreate-a-custom-website-that-brings-your-ideas-to-life%2Cpckg_id%3A1" className="hover:text-primary transition-colors">
              Fiverr
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


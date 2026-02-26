import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground">Contact sales</h1>
          <p className="mt-2 text-muted-foreground">
            Tell us what you’re building. We’ll respond with next steps and a tailored plan.
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  )
}


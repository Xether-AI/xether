"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 py-8 md:py-12 border-t border-border">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-6 p-2 md:p-4">
        <Link href="/" className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">
            Xether <span className="text-primary">AI</span>
          </div>
        </Link>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">
          Data quality as infrastructure.
        </p>
        <div className="flex justify-start items-start gap-4">
          <a
            href="https://twitter.com/xetherai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/xether-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/company/xether-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 p-2 md:p-4 w-full md:w-auto">
        <nav
          className="flex flex-col justify-start items-start gap-3"
          aria-label="Product links"
        >
          <h3 className="text-muted-foreground text-sm font-medium leading-5">
            Product
          </h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <Link
              href="/#features-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Cleaning
            </Link>
            <Link
              href="/#features-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Versioning
            </Link>
            <Link
              href="/#features-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Integrations
            </Link>
            <Link
              href="/#features-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Synthetic Data
            </Link>
            <Link
              href="/#features-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Security
            </Link>
          </div>
        </nav>
        <nav
          className="flex flex-col justify-start items-start gap-3"
          aria-label="Company links"
        >
          <h3 className="text-muted-foreground text-sm font-medium leading-5">
            Company
          </h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link
              href="/#features-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              About us
            </Link>
            <Link
              href="/#testimonials-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Customers
            </Link>
            <Link
              href="/#pricing-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/contact"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
        <nav
          className="flex flex-col justify-start items-start gap-3"
          aria-label="Resource links"
        >
          <h3 className="text-muted-foreground text-sm font-medium leading-5">
            Resources
          </h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <Link
              href="/#faq-section"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/api"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              API Reference
            </Link>
            <a
              href="https://docs.xether.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Documentation
            </a>
            <Link
              href="/login"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}

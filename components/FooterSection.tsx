"use client";

import { Twitter, Github, Linkedin } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">
            Xether <span className="text-primary">AI</span>
          </div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">
          Data quality as infrastructure.
        </p>
        <div className="flex justify-start items-start gap-3">
          <a
            href="#"
            aria-label="Twitter"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Twitter />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Github className="w-full h-full text-muted-foreground" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="w-4 h-4 flex items-center justify-center"
          >
            <Linkedin className="w-full h-full text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <nav
          className="flex flex-col justify-start items-start gap-3"
          aria-label="Product links"
        >
          <h3 className="text-muted-foreground text-sm font-medium leading-5">
            Product
          </h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Cleaning
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Versioning
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Integrations
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Synthetic Data
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Security
            </a>
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
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              About us
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Our team
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Careers
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Brand
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Contact
            </a>
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
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Terms of use
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              API Reference
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Community
            </a>
            <a
              href="#"
              className="text-foreground text-sm font-normal leading-5 hover:underline"
            >
              Support
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

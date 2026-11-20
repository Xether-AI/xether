import Image from "next/image"

export function SocialProof() {
  return (
    <section className="self-stretch py-10 md:py-16 flex flex-col justify-center items-center gap-6 overflow-hidden">
      <div className="text-center text-muted-foreground text-sm font-medium leading-tight">
        Trusted by fast-growing startups
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <Image
            key={i}
            src={`/logos/social_proofs/logo0${i + 1}.svg`}
            alt={`Company Logo ${i + 1}`}
            width={180}
            height={54}
            className="w-full max-w-[140px] sm:max-w-[160px] h-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </section>
  )
}

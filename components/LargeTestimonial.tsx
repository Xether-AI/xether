import Image from "next/image"

export function LargeTestimonial() {
  return (
    <section className="w-full px-4 sm:px-6 overflow-hidden flex justify-center items-center">
      <div className="w-full max-w-[1024px] py-10 md:py-16 lg:py-24 flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-10">
        <blockquote className="text-center text-foreground leading-snug md:leading-tight lg:leading-[1.15] font-medium text-xl sm:text-2xl md:text-4xl lg:text-5xl">
          {
            "Xether's automated data validation and versioning changed how we ship models. It's the missing layer in the modern AI stack."
          }
        </blockquote>
        <div className="flex justify-center items-center gap-4">
          <Image
            src="/images/avatars/dianne-russell.png"
            alt="Dianne Russell avatar"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border border-border object-cover"
          />
          <div className="flex flex-col justify-start items-start">
            <div className="text-foreground text-base font-medium leading-6">Dianne Russell</div>
            <div className="text-muted-foreground text-sm font-normal leading-6">{"VP of Data, TechFlow"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

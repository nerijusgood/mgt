import { ComingSoonSignup } from "@/components/marketing/coming-soon-signup";

export default function HomePage() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--mgt-page)" }}>
      {/* Left panel — content */}
      <div className="flex w-full flex-col justify-between px-10 py-10 md:w-[55%] md:px-16 md:py-14 lg:px-20 lg:py-16">
        {/* Wordmark */}
        <div className="wordmark">
          mother
          <br />
          goose
          <br />
          toys
        </div>

        {/* Hero content */}
        <div className="my-auto flex flex-col pb-8 pt-16 md:pt-0">
          <p className="eyebrow mb-4">coming soon</p>

          <h1>
            Better toys.
            <br />
            Less clutter.
          </h1>

          <p
            className="mt-6 max-w-[380px] leading-relaxed"
            style={{ color: "var(--mgt-text-secondary)", fontSize: "14px", fontWeight: 400 }}
          >
            Sustainable toy boxes for families and childcare settings.
            <br />
            Be the first to know when we launch.
          </p>

          <div className="mt-10 max-w-[340px]">
            <ComingSoonSignup />
          </div>
        </div>

        {/* Footer */}
        <p style={{ color: "var(--mgt-text-subtle)", fontSize: "12px" }}>
          © 2025 Mother Goose Toys
        </p>
      </div>

      {/* Right panel — image */}
      <div className="relative hidden flex-1 overflow-hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/family.jpg"
          alt="Family playing with toys"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(0.75) contrast(0.82) brightness(1.08)" }}
        />
      </div>
    </div>
  );
}

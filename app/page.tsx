import type { Metadata } from "next";
import { ComingSoonSignup } from "@/components/marketing/coming-soon-signup";

export const metadata: Metadata = {
  title: "Mother Goose Toys — Coming Soon",
  description:
    "Sustainable toy boxes for families and childcare settings. Be the first to know when we launch.",
  openGraph: {
    title: "Mother Goose Toys — Coming Soon",
    description:
      "Sustainable toy boxes for families and childcare settings. Be the first to know when we launch.",
    images: [{ url: "/images/family.jpg", width: 1920, height: 1280 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mother Goose Toys — Coming Soon",
    description:
      "Sustainable toy boxes for families and childcare settings. Be the first to know when we launch.",
    images: ["/images/family.jpg"]
  }
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row" style={{ background: "var(--mgt-page)" }}>

      {/* Left panel — content */}
      <div className="flex w-full flex-col justify-between px-8 py-10 md:w-[55%] md:px-16 md:py-14 lg:px-20 lg:py-16">

        {/* Wordmark */}
        <a href="/" className="wordmark self-start">
          mother
          <br />
          goose
          <br />
          toys
        </a>

        {/* Hero content */}
        <div className="my-auto flex flex-col pb-8 pt-10 md:pt-0">
          <p className="eyebrow mb-4">Coming soon</p>

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
        <div style={{ color: "var(--mgt-text-subtle)", fontSize: "12px", letterSpacing: "-0.01em", lineHeight: "1.6" }}>
          <p>© {new Date().getFullYear()} Mother Goose Toys. All rights reserved.</p>
          <p>Made for families in Denmark.</p>
        </div>
      </div>

      {/* Right panel — desktop image */}
      <div className="relative hidden flex-1 overflow-hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/family.jpg"
          alt="Family playing with toys"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(0.75) contrast(0.82) brightness(1.08)" }}
          loading="eager"
        />
      </div>

    </div>
  );
}

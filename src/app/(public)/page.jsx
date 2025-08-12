import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";

export default function Home() {
    return (
        <div className="home-wrapper">
            {/* <ThemeToggler /> */}
            <div className="px-3">
                <HeroSection />
            </div>
            <div className="px-3">
                <HowItWorks />
            </div>

            <div className="px-3 py-[4rem] md:py-[6rem] bg-linear-to-t from-transparent to-blue-200/50 dark:to-blue-950/40 from-50% relative">
                <div className="absolute inset-0 bg-dots"></div>
                <ContactSection />
            </div>
        </div>
    );
}

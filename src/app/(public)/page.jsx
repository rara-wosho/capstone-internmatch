import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";

export default function Home() {
    return (
        <div className="home-wrapper">
            {/* <ThemeToggler /> */}
            <div className="">
                <HeroSection />
            </div>
            <div className="px-3 relative overflow-hidden">
                <div className="absolute w-[800px] h-[400px] border-4 dark:border-neutral-900/60 -right-[200px] -top-[300px] rounded-[100%]"></div>
                <div className="absolute w-[800px] h-[600px] border-4 dark:border-neutral-900 -left-[200px] -bottom-[300px] rounded-[100%]"></div>
                <HowItWorks />
            </div>

            <div className="px-3 py-[4rem] md:py-[6rem] bg-linear-to-t from-transparent to-blue-100/30 dark:to-blue-950/40 from-50% relative">
                <div className="absolute inset-0 bg-dots"></div>
                <ContactSection />
            </div>
        </div>
    );
}

import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import { ThemeToggler } from "@/components/theme-toggler";
import Wrapper from "@/components/Wrapper";

export default function Home() {
    return (
        <div className="home-wrapper">
            {/* <ThemeToggler /> */}
            <div className="px-3">
                <HeroSection />
            </div>
            <HowItWorks />
        </div>
    );
}

import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import FormLabel from "@/components/ui/FormLabel";
import GradientText from "@/components/ui/GradientText";
import { Input } from "@/components/ui/input";
import PrimaryGradientText from "@/components/ui/PrimaryGradientText";
import { Textarea } from "@/components/ui/textarea";

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

            <div className="min-h-screen bg-linear-to-t from-transparent to-blue-200/30 dark:to-blue-950/20 from-50% flex flex-col  items-center justify-center">
                <Card className="w-full max-w-lg bg-white">
                    <h1 className="mb-3 text-3xl font-bold">
                        Let's Work
                        <PrimaryGradientText> Together</PrimaryGradientText>
                    </h1>
                    <form className="flex flex-col gap-y-3">
                        <div className="mb-1">
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Enter your Name" />
                        </div>
                        <div className="mb-1">
                            <FormLabel>Your email</FormLabel>
                            <Input placeholder="Enter your email" />
                        </div>
                        <div className="mb-1">
                            <FormLabel>Subject</FormLabel>
                            <Input placeholder="Enter a subject" />
                        </div>
                        <div className="mb-1">
                            <FormLabel>Your message</FormLabel>
                            <Textarea placeholder="Your message" />
                        </div>
                        <Button>Send Message</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}

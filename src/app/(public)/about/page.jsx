import Card from "@/components/ui/card";
import Wrapper from "@/components/Wrapper";
import { Code, Users, Target, BookOpen, Heart, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const features = [
        {
            icon: <Users className="h-6 w-6" />,
            title: "For Students",
            description:
                "Discover internship opportunities that match your skills and career goals. Take company-administered exams to showcase your capabilities.",
        },
        {
            icon: <Target className="h-6 w-6" />,
            title: "For Companies",
            description:
                "Find qualified IT students by creating customized exams and evaluating applicants based on your specific requirements and standards.",
        },
        {
            icon: <BookOpen className="h-6 w-6" />,
            title: "For OJT Instructors",
            description:
                "Manage student groups, track progress, and ensure your students are well-prepared for their internship journey.",
        },
    ];

    const stats = [
        { number: "50+", label: "Registered Companies" },
        { number: "150+", label: "Student Users" },
        { number: "30+", label: "OJT Instructors" },
        { number: "60+", label: "Exams Conducted" },
    ];

    const team = [
        {
            name: "Development Team",
            role: "USTP Panaon Students",
            description:
                "Passionate IT students dedicated to creating solutions that bridge the gap between education and industry.",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent to-blue-100/30 dark:to-blue-950/20 from-50%">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        About InternMatch
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                        Bridging the gap between IT students and
                        forward-thinking companies through innovative internship
                        placements.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <Wrapper>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="h-8 w-8 text-primary" />
                                <h2 className="text-3xl font-bold">
                                    Our Mission
                                </h2>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                To revolutionize the internship discovery
                                process by providing a platform where IT
                                students can showcase their skills through
                                company-administered exams, and businesses can
                                find the perfect candidates based on
                                demonstrated capabilities rather than just
                                resumes.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="h-8 w-8 text-primary" />
                                <h2 className="text-3xl font-bold">
                                    Our Vision
                                </h2>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We envision a future where every IT student
                                finds meaningful internship opportunities that
                                accelerate their career growth, and every
                                company discovers talented individuals who can
                                contribute to their innovation and success.
                            </p>
                        </div>
                    </div>
                </Wrapper>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <Wrapper>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How InternMatch Works
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            A comprehensive platform designed to serve all
                            stakeholders in the internship ecosystem
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center p-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </Wrapper>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <Wrapper>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm md:text-base text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </section>

            {/* Technology Stack */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Code className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-bold">
                                Built With Modern Technology
                            </h2>
                        </div>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Leveraging cutting-edge tools to deliver a seamless
                            experience
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                        {[
                            { name: "Next.js", description: "React Framework" },
                            { name: "Supabase", description: "Backend & Auth" },
                            { name: "Tailwind CSS", description: "Styling" },
                            { name: "Resend", description: "Email Service" },
                        ].map((tech, index) => (
                            <Card key={index} className="text-center p-6">
                                <div className="font-semibold text-lg mb-2">
                                    {tech.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {tech.description}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Heart className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-bold">Our Team</h2>
                        </div>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Passionate individuals committed to making
                            internship matching better
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="text-center p-8 rounded-lg bg-muted/20"
                            >
                                <h3 className="text-2xl font-semibold mb-2">
                                    {member.name}
                                </h3>
                                <div className="text-primary font-medium mb-4">
                                    {member.role}
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Your Internship Journey?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join InternMatch today and discover opportunities that
                        match your skills and ambitions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/sign-in">
                            <button className="px-8 py-3 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

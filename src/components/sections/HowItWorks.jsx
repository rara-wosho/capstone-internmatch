import Card from "../ui/card";
import GradientText from "../ui/GradientText";
import Wrapper from "../Wrapper";

export default function HowItWorks() {
    return (
        <div id="how-it-works" className="py-[6rem] flex flex-col items-center">
            <GradientText className="text-2xl md:text-4xl mb-1">
                How It Works
            </GradientText>

            <p className="mb-8 text-muted-foreground text-center max-w-4xl">
                Whether you’re a student seeking the right internship, a company
                looking for qualified candidates, or an instructor guiding
                future professionals, our platform streamlines the process from
                start to finish.
            </p>

            <Wrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="hover:-translate-y-2 transition-transform duration-300">
                    <h1 className="text-5xl md:text-6xl mb-2 overflow-hidden font-bold text-primary flex">
                        <p className="-translate-x-4">01</p>
                    </h1>
                    <h4 className="font-bold text-lg mb-2 text-secondary-foreground">
                        Company
                    </h4>
                    <p className="text-muted-foreground ">
                        Companies post available internship opportunities and
                        create skill-based exams to evaluate applicants. They
                        review the results after students complete the exams and
                        decide whether to accept or decline candidates, helping
                        ensure they select the best fit for their organization.
                    </p>
                </Card>
                <Card className="hover:-translate-y-2 transition-transform duration-300">
                    <h1 className="text-5xl md:text-6xl mb-2 overflow-hidden font-bold text-primary flex">
                        <p className="-translate-x-4">02</p>
                    </h1>
                    <h4 className="font-bold text-lg mb-2 text-secondary-foreground">
                        Student
                    </h4>
                    <p className="text-muted-foreground ">
                        Students create an account, complete their profile, and
                        browse internship opportunities from partner companies.
                        When they find a suitable company, they take the
                        company’s prepared exam to demonstrate their skills.
                        After the exam, students can view their results and wait
                        for the company’s decision on whether they are accepted
                        for the internship.
                    </p>
                </Card>
                <Card className="hover:-translate-y-2 transition-transform duration-300">
                    <h1 className="text-5xl md:text-6xl mb-2 overflow-hidden font-bold text-primary flex">
                        <p className="-translate-x-4">03</p>
                    </h1>
                    <h4 className="font-bold text-lg mb-2 text-secondary-foreground">
                        OJT Instructor
                    </h4>
                    <p className="text-muted-foreground">
                        OJT instructors manage and organize students under their
                        supervision, ensuring profiles are complete and ready
                        for applications. They track student progress with
                        different companies, provide guidance, and coordinate
                        with company representatives to help match students with
                        the right opportunities.
                    </p>
                </Card>
            </Wrapper>
        </div>
    );
}

import GradientText from "../ui/GradientText";
import Wrapper from "../Wrapper";

export default function HowItWorks() {
    return (
        <div id="how-it-works" className="py-[8rem] flex flex-col items-center">
            <GradientText className="text-2xl md:text-4xl mb-1">
                How It Works
            </GradientText>

            <p className="mb-8 text-neutral-700 dark:text-neutral-300/80 text-center">
                Three simple guides for each roles
            </p>

            <Wrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
                <div className="border rounded-md bg-white dark:bg-card p-4">
                    <h1 className="text-5xl mb-2 overflow-hidden font-bold text-primary">
                        <span>01</span>
                    </h1>
                    <h4 className="font-semibold text-lg mb-2">Company</h4>
                    <p className="text-slate-700 dark:text-neutral-300/90 ">
                        Companies post available internship opportunities and
                        create skill-based exams to evaluate applicants. They
                        review the results after students complete the exams and
                        decide whether to accept or decline candidates, helping
                        ensure they select the best fit for their organization.
                    </p>
                </div>
                <div className="border rounded-md bg-white dark:bg-card p-4 lg:scale-110">
                    <h1 className="text-5xl mb-2 overflow-hidden font-bold text-primary">
                        <span>02</span>
                    </h1>
                    <h4 className="font-semibold text-lg mb-2">Student</h4>
                    <p className="text-slate-700 dark:text-neutral-300/90 ">
                        Students create an account, complete their profile, and
                        browse internship opportunities from partner companies.
                        When they find a suitable company, they take the
                        company’s prepared exam to demonstrate their skills.
                        After the exam, students can view their results and wait
                        for the company’s decision on whether they are accepted
                        for the internship.
                    </p>
                </div>
                <div className="border rounded-md bg-white dark:bg-card p-4 md:col-span-2 lg:col-span-1">
                    <h1 className="text-5xl mb-2 overflow-hidden font-bold text-primary">
                        <span>03</span>
                    </h1>
                    <h4 className="font-semibold text-lg mb-2">
                        OJT Instructor
                    </h4>
                    <p className="text-slate-700 dark:text-neutral-300/90 ">
                        OJT instructors manage and organize students under their
                        supervision, ensuring profiles are complete and ready
                        for applications. They track student progress with
                        different companies, provide guidance, and coordinate
                        with company representatives to help match students with
                        the right opportunities.
                    </p>
                </div>
            </Wrapper>
        </div>
    );
}

import BreadCrumbs from "@/components/ui/BreadCrumbs";

const links = [
    { href: "", label: "Home" },
    { href: "/instructor/students", label: "Students" },
    { href: "", label: "Student details" },
];

export default async function Page({ params }) {
    const { studentId } = await params;
    return (
        <div>
            <BreadCrumbs links={links} />
            {studentId}

            <div className="flex flex-col gap-2 mt-3">
                <div className="border p-3">Exams taken</div>
                <div className="border p-3">Assessment test score</div>
                <div className="border p-3">Revoke exam access</div>
                <div className="border p-3">Ban student</div>
            </div>
        </div>
    );
}

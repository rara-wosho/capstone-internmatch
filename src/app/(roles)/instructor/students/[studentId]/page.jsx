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
        </div>
    );
}

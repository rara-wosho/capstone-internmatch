import AddInstructorForm from "@/components/add-instructor-form";
import SecondaryLabel from "@/components/ui/SecondaryLabel";

export default function Page() {
    return (
        <div>
            <SecondaryLabel>This is the admin page</SecondaryLabel>

            <AddInstructorForm />
        </div>
    );
}

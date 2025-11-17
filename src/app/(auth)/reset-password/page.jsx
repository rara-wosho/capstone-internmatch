import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ResetPasswordPage({ searchParams }) {
    const errorCode = (await searchParams)?.error_code || "";
    const errorDescription = (await searchParams)?.error_description || "";

    return (
        <div>
            <Button asChild variant="link">
                <Link href="/">Home</Link>
            </Button>
            <ResetPasswordForm
                errorCode={errorCode}
                errorDescription={errorDescription}
            />
        </div>
    );
}

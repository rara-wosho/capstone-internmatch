import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

import { Suspense } from "react";

export default async function ForgotPasswordPage({ searchParams }) {
    const type = (await searchParams)?.type || "";

    return (
        <Suspense fallback={null}>
            <ForgotPasswordForm type={type} />
        </Suspense>
    );
}

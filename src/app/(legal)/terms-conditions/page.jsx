import SecondaryLabel from "@/components/ui/SecondaryLabel";

import {
    CircleCheckBig,
    Handshake,
    Mail,
    TriangleAlert,
    Users,
} from "lucide-react";

export default function Page() {
    return (
        <div className="min-h-screen mx-auto max-w-[900px] gap-y-8 flex flex-col mb-8">
            {/* HEADER */}
            <div className="mt-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="icon-wrapper rounded-md bg-violet-500/10 p-2 text-primary">
                        <Handshake />
                    </div>
                    <h1 className="font-bold text-2xl">Terms and Conditions</h1>
                </div>
                <div className="inline-flex items-center py-1 px-2 bg-green-500/10 rounded">
                    <p className="font-semibold text-sm dark:text-green-400 text-green-800">
                        Last updated: November 9, 2025
                    </p>
                </div>
            </div>

            {/* INTRO */}
            <div className="bg-white dark:bg-violet-700/10 border-s-3 border-s-violet-600 shadow p-4">
                <p className="md:text-lg">
                    Welcome to InternMatch. By accessing or using our website
                    and services, you agree to follow these Terms and
                    Conditions. If you do not agree, we recommend discontinuing
                    the use of the platform.
                </p>
            </div>

            {/* COMPATIBILITY NOTICE */}
            <div className="bg-white dark:bg-yellow-600/10 border-s-3 border-s-yellow-600 shadow p-4">
                <p className="md:text-lg flex items-center mb-2 gap-2">
                    <TriangleAlert size={18} /> Compatibility Notice
                </p>

                <p className="text-sm">
                    Some interface features may not function correctly on older
                    browsers, particularly Safari version 16 and below. For the
                    best experience, please use the most recent versions of
                    Chrome, Firefox, Safari, or Edge.
                </p>
            </div>

            {/* ACCEPTANCE OF TERMS */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <CircleCheckBig className="text-green-600" size={20} />
                    <span>Acceptance of Terms</span>
                </SecondaryLabel>

                <p className="text-sm mt-2">
                    By creating an account, accessing InternMatch, or using any
                    part of our services, you acknowledge that you have read,
                    understood, and agree to comply with these Terms and our
                    Privacy Policy.
                </p>
            </div>

            {/* USER RESPONSIBILITIES */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <Users className="text-green-600" size={20} />
                    <span>User Responsibilities</span>
                </SecondaryLabel>

                {/* ACCOUNT SECURITY */}
                <p className="mt-4 font-medium">Account Security</p>

                <ul className="list-disc ps-4 flex flex-col text-neutral-600 dark:text-neutral-400">
                    <li className="text-sm mb-2">
                        Maintain the confidentiality of your login credentials.
                    </li>
                    <li className="text-sm mb-2">
                        Use a strong, unique password for your account.
                    </li>
                    <li className="text-sm mb-2">
                        Immediately report any unauthorized login or suspicious
                        activity.
                    </li>
                    <li className="text-sm mb-2">
                        Ensure all information provided is accurate and updated.
                    </li>
                </ul>

                {/* ACCEPTABLE USE */}
                <p className="mt-4 font-medium">Acceptable Use</p>

                <ul className="list-disc ps-4 flex flex-col text-neutral-600 dark:text-neutral-400">
                    <li className="text-sm mb-2">
                        Use the platform for its intended purpose: internship
                        coordination between students, instructors, and
                        companies.
                    </li>
                    <li className="text-sm mb-2">
                        Avoid submitting false or misleading information.
                    </li>
                    <li className="text-sm mb-2">
                        Do not attempt to hack, disrupt, or misuse the platform,
                        its features, or other users’ data.
                    </li>
                    <li className="text-sm mb-2">
                        Refrain from uploading harmful content, malware, or any
                        material that violates laws or community standards.
                    </li>
                </ul>
            </div>

            {/* CONTACT INFO */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <Mail className="text-blue-600" size={20} />
                    <span>Contact Information</span>
                </SecondaryLabel>

                <p className="text-sm mt-2">
                    If you have any questions about our Terms and Conditions,
                    please contact us at:
                    <br />
                    <strong>raeldevprojects@gmail.com</strong>
                </p>
            </div>

            {/* FOOTER */}
            <div className="py-8 border-t dark:border-neutral-800">
                <p className="text-center text-sm text-neutral-700 dark:text-neutral-400">
                    These Terms & Conditions, together with our Privacy Policy,
                    make up the full agreement between you and InternMatch
                    regarding your use of the platform.
                </p>
            </div>
        </div>
    );
}

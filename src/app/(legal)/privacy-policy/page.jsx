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
            <div className="mt-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="icon-wrapper rounded-md bg-violet-500/10 p-2 text-primary">
                        <Handshake />
                    </div>
                    <h1 className="font-bold text-2xl">Privacy Policy</h1>
                </div>
                <div className="inline-flex items-center py-1 px-2 bg-green-500/10 rounded">
                    <p className="font-semibold text-sm dark:text-green-400 text-green-800">
                        Last updated: November 10, 2025
                    </p>
                </div>
            </div>

            {/* Intro */}
            <div className="bg-white dark:bg-violet-700/10 border-s-3 border-s-violet-600 shadow p-4">
                <p className="md:text-lg">
                    This Privacy Policy explains how InternMatch collects, uses,
                    and protects your personal information when you use our
                    website and services. By accessing our platform, you agree
                    to the practices described in this policy.
                </p>
            </div>

            {/* Browser Compatibility */}
            <div className="bg-white dark:bg-yellow-600/10 border-s-3 border-s-yellow-600 shadow p-4">
                <p className="md:text-lg flex items-center mb-2 gap-2">
                    <TriangleAlert size={18} /> Compatibility Notice
                </p>

                <p className="text-sm">
                    Some features may not operate correctly on outdated
                    browsers, particularly Safari version 16 and below. For full
                    functionality, use the latest version of Chrome, Firefox,
                    Safari, or Edge.
                </p>
            </div>

            {/* Information We Collect */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <Users className="text-green-600" size={20} />
                    <span>Information We Collect</span>
                </SecondaryLabel>

                <p className="mb-2">We may collect the following data:</p>

                <ul className="list-disc ps-4 flex flex-col text-neutral-600 dark:text-neutral-400">
                    <li className="text-sm mb-2">
                        Personal details (name, email, contact information)
                    </li>
                    <li className="text-sm mb-2">
                        Academic and internship-related information
                    </li>
                    <li className="text-sm mb-2">
                        Login details and authentication data
                    </li>
                    <li className="text-sm mb-2">
                        Usage data such as device type, browser, and pages
                        accessed
                    </li>
                </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <CircleCheckBig className="text-green-600" size={20} />
                    <span>How We Use Your Information</span>
                </SecondaryLabel>

                <p className="mb-2">Your information is used for:</p>

                <ul className="list-disc ps-4 flex flex-col text-neutral-600 dark:text-neutral-400">
                    <li className="text-sm mb-2">
                        Creating and managing your account
                    </li>
                    <li className="text-sm mb-2">
                        Facilitating student–company matching
                    </li>
                    <li className="text-sm mb-2">
                        Providing internship application features
                    </li>
                    <li className="text-sm mb-2">
                        Improving platform performance and user experience
                    </li>
                    <li className="text-sm mb-2">
                        Sending notifications and updates related to your
                        activity
                    </li>
                </ul>
            </div>

            {/* Data Protection */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <Users className="text-green-600" size={20} />
                    <span>Data Protection & Security</span>
                </SecondaryLabel>

                <p className="mb-2">
                    We implement industry-standard measures to safeguard your
                    data:
                </p>

                <ul className="list-disc ps-4 flex flex-col text-neutral-600 dark:text-neutral-400">
                    <li className="text-sm mb-2">
                        Secure authentication and encryption
                    </li>
                    <li className="text-sm mb-2">
                        Restricted access to sensitive information
                    </li>
                    <li className="text-sm mb-2">
                        Regular system monitoring and security checks
                    </li>
                </ul>
            </div>

            {/* Third-Party Usage */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <Users className="text-green-600" size={20} />
                    <span>Third-Party Services</span>
                </SecondaryLabel>

                <p className="text-sm">
                    We may use trusted third-party services (such as email
                    providers, authentication services, or analytics tools) to
                    support our platform. These services are required to protect
                    your data and may only use it for purposes necessary to
                    operate the platform.
                </p>
            </div>

            {/* Contact */}
            <div className="p-8 bg-white dark:bg-card border dark:border-neutral-800 rounded-lg">
                <SecondaryLabel className="flex items-center gap-2">
                    <Mail className="text-blue-600" size={20} />
                    <span>Contact Information</span>
                </SecondaryLabel>

                <p className="text-sm">
                    If you have questions about this Privacy Policy, contact us
                    at:
                    <br />
                    <strong>raeldevprojects@gmail.com</strong>
                </p>
            </div>

            {/* Footer */}
            <div className="py-8 border-t dark:border-neutral-800">
                <p className="text-center text-sm text-neutral-700 dark:text-neutral-400">
                    By using InternMatch, you agree to this Privacy Policy and
                    our Terms of Service. Please review this page periodically
                    for updates.
                </p>
            </div>
        </div>
    );
}

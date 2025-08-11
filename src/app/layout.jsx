import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
    subsets: ["latin"],
});

const poppins = Poppins({
    weight: "400",
    subsets: ["latin"],
});

export const metadata = {
    title: "InternMatch",
    description:
        "Connecting Students, Instructors, and Companies for a Better Internship Experience",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("scroll-smooth", geist.className)}
        >
            <body
                className={`antialiased text-neutral-800 dark:text-neutral-200`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}

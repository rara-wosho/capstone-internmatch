import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

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
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

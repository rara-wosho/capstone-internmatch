import Navbar from "@/components/Navbar";
import Wrapper from "@/components/Wrapper";

export default function Layout({ children }) {
    return (
        <div className="h-screen bg-linear-to-b from-transparent to-blue-200/50 dark:to-blue-950/40 from-50%">
            <Navbar />
            {children}
            <footer className="border-t py-8 bg-background">
                <Wrapper>Footer</Wrapper>
            </footer>
        </div>
    );
}

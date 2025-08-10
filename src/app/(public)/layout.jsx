import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
    return (
        <div className="h-screen bg-gradient-to-b from-transparent to-blue-200/50 dark:to-blue-950/60 from-50%">
            <Navbar />
            {children}
            <footer className="border-t py-8 bg-background">Footer </footer>
        </div>
    );
}

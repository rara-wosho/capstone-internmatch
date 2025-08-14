import Navbar from "@/components/Navbar";
import Wrapper from "@/components/Wrapper";

export default function Layout({ children }) {
    return (
        <div className="h-screen">
            <Navbar />
            {children}
            <footer className="border-t py-8 bg-background">
                <Wrapper>Footer</Wrapper>
            </footer>
        </div>
    );
}

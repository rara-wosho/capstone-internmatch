import PublicFooter from "@/components/ui/PublicFooter";

export default function Layout({ children }) {
    return (
        <>
            {children}
            <PublicFooter />
        </>
    );
}

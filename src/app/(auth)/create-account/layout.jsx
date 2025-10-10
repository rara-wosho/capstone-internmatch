import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <section>
            {/* header  */}
            <div className="px-3 mb-2 md:mb-3">
                <Wrapper className="h-[64px] flex items-center justify-between">
                    <Link href="/" className="inline-flex gap-2">
                        <Logo className="w-5 h-5" />
                        <p className="font-bold text-lg">InternMatch</p>
                    </Link>
                    <Button asChild variant="secondary" size="sm">
                        <Link href="/sign-in">Sign in instead</Link>
                    </Button>
                </Wrapper>
            </div>
            {children}
        </section>
    );
}

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <section className="pb-10">
            {/* header  */}
            <div className="h-[60px] flex items-center px-3 mb-3">
                <Wrapper className="flex items-center justify-between">
                    <div className="inline-flex gap-2">
                        <Logo className="w-5 h-5" />
                        <p className="font-bold text-lg">InternMatch</p>
                    </div>
                    <Button asChild variant="secondary" size="sm">
                        <Link href="/sign-in">Sign in instead</Link>
                    </Button>
                </Wrapper>
            </div>
            {children}
        </section>
    );
}

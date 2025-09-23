import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import Wrapper from "@/components/Wrapper";

export default function Layout({ children }) {
    return (
        <section>
            {/* header  */}
            <div className="py-3 border-b px-4 mb-12">
                <Wrapper className="flex items-center justify-between">
                    <div className="inline-flex gap-2">
                        <Logo className="w-5 h-5" />
                        <p className="font-bold text-lg">InternMatch</p>
                    </div>
                    <Button variant="secondary" size="sm">
                        Sign in instead
                    </Button>
                </Wrapper>
            </div>
            {children}
        </section>
    );
}

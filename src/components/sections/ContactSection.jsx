import Card from "@/components/ui/card";
import GradientText from "../ui/GradientText";
import Wrapper from "../Wrapper";
import { Mail, MapPinHouse, Phone } from "lucide-react";
import Link from "next/link";
import QuestionForm from "../forms/QuestionForm";

export default function ContactSection() {
    return (
        <Wrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="left">
                    <GradientText className="inline-block text-4xl font-bold mb-4">
                        Have Questions? We're Here to Help
                    </GradientText>

                    <p className="text-muted-foreground mb-4">
                        You can send your question using the form provided or
                        email us directly at our email address below.
                    </p>

                    <p className="font-semibold">Contact Info</p>

                    <div className="mt-3 flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-neutral-600 text-white dark:bg-card inline-flex p-2 md:p-3">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>
                                <Link
                                    href="mailto:raeldevprojects@gmail.com"
                                    className="text-secondary-foreground text-sm md:text-base hover:text-accent-foreground"
                                >
                                    raeldevprojects@gmail.com
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-neutral-600 text-white dark:bg-card inline-flex p-2 md:p-3">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Phone #
                                </p>
                                <p className="text-secondary-foreground text-sm md:text-base">
                                    0912345678
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-neutral-600 text-white dark:bg-card inline-flex p-2 md:p-3">
                                <MapPinHouse size={18} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Location
                                </p>
                                <p className="text-secondary-foreground text-sm md:text-base">
                                    Misamis Occidental
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                    <Card className="w-full max-w-lg bg-white p-3 md:p-5">
                        <QuestionForm />

                        <p className="text-xs text-muted-foreground text-center mt-3 py-2">
                            By submitting the form, you agree to our{" "}
                            <span className="text-accent-foreground">
                                terms and conditions.
                            </span>
                        </p>
                    </Card>
                </div>
            </div>
        </Wrapper>
    );
}

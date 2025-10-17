"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import BorderBox from "../ui/BorderBox";
import { cn } from "@/lib/utils";
import { upsertCompanyOffers } from "@/lib/actions/company";
import { toast } from "sonner";

const OFFER_CHOICES = [
    "Web Development",
    "Front-End Development",
    "Back-End Development",
    "Full-Stack Development",
    "Mobile App Development",
    "Network Administration",
    "Systems Administration",
    "Technical Support",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Data Analytics",
    "Software Testing",
    "Project Assistance",
];

export default function SelectCompanyOffersSection({
    initialOffers,
    isFromSignUp,
    companyId,
}) {
    const [companyOffers, setCompanyOffers] = useState(initialOffers);
    const [customOffer, setCustomOffer] = useState("");

    const handleAddCustomOffer = () => {
        if (!customOffer.trim()) return;

        if (companyOffers.includes(customOffer)) return;

        setCompanyOffers((prev) => [...prev, customOffer]);
        setCustomOffer("");
    };

    const handleOfferChange = (e) => {
        if (e.target.value.length > 30) return;
        setCustomOffer(e.target.value);
    };

    const handleRemoveOffer = (offer) => {
        setCompanyOffers((prev) => prev.filter((off) => offer !== off));
    };

    const handleUpsertOffer = async () => {
        const result = await upsertCompanyOffers(companyOffers, companyId);

        if (!result.success) {
            toast.error("Unable to update company offers", {
                description: result.error,
            });
        }
        toast.success("Updated successfully");
    };

    return (
        <div>
            <div className="border rounded-xl bg-card shadow-xs">
                <BorderBox className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {companyOffers.length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                            No offers yet. Please add offer or select from our
                            choices.
                        </div>
                    ) : (
                        companyOffers.map((offer, index) => (
                            <div
                                key={index}
                                className="rounded-sm ps-3 pe-6 text-sm min-h-10 py-2 text-muted-foreground hover:text-secondary-foreground flex items-center bg-card shadow-xs relative w-full border"
                            >
                                {offer}
                                <button
                                    onClick={() => handleRemoveOffer(offer)}
                                    className="size-10 flex items-center justify-center rounded-full absolute right-0 top-0 cursor-pointer hover:text-destructive"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </BorderBox>
                <BorderBox className="border-b">
                    <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">Add Offer</p>

                        <span className="text-xs text-muted-foreground">
                            {customOffer.length}/30
                        </span>
                    </div>
                    <div className="flex items-center gap-2 relative">
                        <Input
                            value={customOffer}
                            onChange={handleOfferChange}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleAddCustomOffer()
                            }
                            placeholder="Add custom offer (max 20 characters)"
                        />
                        <Button
                            disabled={!customOffer}
                            variant="outline"
                            size="lg"
                            onClick={handleAddCustomOffer}
                        >
                            <Plus />
                        </Button>
                    </div>
                </BorderBox>

                <BorderBox>
                    <p className="font-medium mb-4">Select from our choices</p>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                        {OFFER_CHOICES.map((choice, index) => (
                            <div
                                onClick={() =>
                                    setCompanyOffers((prev) => [
                                        ...prev,
                                        choice,
                                    ])
                                }
                                key={index}
                                className={cn(
                                    "rounded-sm ps-3 pe-6 text-sm min-h-10 py-2 text-muted-foreground hover:text-secondary-foreground flex items-center bg-card shadow-xs relative w-full border",
                                    companyOffers.includes(choice) &&
                                        "opacity-40 pointer-events-none border-transparent"
                                )}
                            >
                                {choice}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center mt-6 justify-end">
                        <Button onClick={handleUpsertOffer}>
                            Save Changes
                        </Button>
                    </div>
                </BorderBox>
            </div>
        </div>
    );
}

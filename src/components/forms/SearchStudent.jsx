"use client";

import { Input } from "@/components/ui/input";
import { RotateCcw, Search } from "lucide-react";
import Form from "next/form";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "../ui/SubmitButton";
import { Button } from "../ui/button";
import { useState } from "react";

export default function SearchField({ actionPath, placeholder, className }) {
    const params = useSearchParams();
    const search = params.get("search_query") || "";

    const [key, setKey] = useState(search || "");
    const router = useRouter();

    const handleChange = (e) => {
        setKey(e.currentTarget.value);
    };

    const handleReset = () => {
        setKey("");
        router.push(actionPath); // 👈 clears the query param
    };

    return (
        <Form action={actionPath} className={className}>
            <div className="flex items-center gap-2">
                <Input
                    type="search"
                    name="search_query"
                    icon={<Search size={16} />}
                    placeholder={placeholder}
                    value={key}
                    onChange={handleChange}
                />

                <SubmitButton
                    variant="white"
                    disabled={!key}
                    size="lg"
                    icon={<Search size={18} />}
                >
                    <span className="hidden md:inline-block">Search</span>
                </SubmitButton>
                {search && (
                    <Button
                        type="button"
                        onClick={handleReset}
                        variant="secondary"
                        size="lg"
                    >
                        <RotateCcw size={18} />
                        <span className="hidden md:inline-block">Reset</span>
                    </Button>
                )}
            </div>
        </Form>
    );
}

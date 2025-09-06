"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, Search, X } from "lucide-react";
import Form from "next/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../ui/SubmitButton";

export default function SearchGroup() {
    const params = useSearchParams();
    const search = params.get("search_query") || "";

    const [key, setKey] = useState(search || "");
    const router = useRouter();

    const handleChange = (e) => {
        setKey(e.currentTarget.value);
    };

    const handleReset = () => {
        setKey("");
        router.push("/instructor/manage-groups"); // 👈 clears the query param
    };

    return (
        <Form
            action="/instructor/manage-groups"
            className="flex items-center gap-2 md:gap-3 grow"
        >
            <Input
                type="search"
                placeholder="search group"
                icon={<Search size={16} />}
                name="search_query"
                value={key}
                onChange={handleChange}
            />

            <SubmitButton
                variant="secondary"
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
        </Form>
    );
}

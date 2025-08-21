"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchGroup() {
    const params = useSearchParams();
    const search = params.get("search_query") || "";

    const [key, setKey] = useState(search || "");

    const handleChange = (e) => {
        const { value } = e.currentTarget;
        setKey(value);
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
            <Button
                disabled={!key}
                variant="secondary"
                className="bg-white dark:bg-secondary border border-input"
                size="lg"
            >
                <p className="flex items-center gap-1">
                    <span className="hidden md:inline-block">Search</span>
                    <Search size={18} />
                </p>
            </Button>
        </Form>
    );
}

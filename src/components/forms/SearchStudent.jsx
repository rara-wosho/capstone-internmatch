"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function SearchStudent() {
    const params = useSearchParams();
    const search = params.get("search_query") || "";

    return (
        <Form action="/instructor/students">
            <div className="flex items-center gap-2">
                <Input
                    type="search"
                    name="search_query"
                    icon={<Search size={16} />}
                    placeholder="Seach student"
                    defaultValue={search}
                />

                <Button variant="white">Search</Button>
            </div>
        </Form>
    );
}

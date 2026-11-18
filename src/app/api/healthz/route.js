import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();

        const { data: feedbacks, error } = await supabase
            .from("feedbacks")
            .select("feedback, rating")
            .eq("is_deleted", false)
            .limit(5)
            .order("submitted_at", { ascending: false });

        if (error) {
            console.error("Error fetching feedbacks:", error);

            return NextResponse.json(
                { error: "Failed to fetch feedbacks" },
                { status: 500 },
            );
        }

        return NextResponse.json({ feedbacks }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

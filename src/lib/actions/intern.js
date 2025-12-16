"use server";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./auth";

// Get the companys list of interns
export async function getInternsList(search = "") {
    const { user } = await getCurrentUser();

    if (!user?.id) {
        return { success: false, error: "Unauthenticated user.", data: [] };
    }

    const supabase = await createClient();

    try {
        // Build the query
        let query = supabase
            .from("applicants")
            .select(
                "id, approved_at, students!inner(avatar_url, firstname, email, lastname, school, ojt_instructors(firstname, lastname, school, email, gender))"
            )
            .eq("company_id", user.id)
            .eq("status", "accepted")
            .eq("approve_status", "approved")
            .order("approved_at", { ascending: false });

        // Add search filter if provided
        if (search && search.trim()) {
            const searchTerm = search.trim();

            // Search in student firstname, lastname, or school
            query = query.or(
                `firstname.ilike.%${searchTerm}%,lastname.ilike.%${searchTerm}%,school.ilike.%${searchTerm}%`,
                { referencedTable: "students" }
            );
        }

        // Order by approval date (most recent first)
        query = query.order("approved_at", { ascending: false });

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching interns list:", error);
            return {
                success: false,
                error: "Failed to fetch interns. Please try again.",
                data: [],
            };
        }

        return { success: true, error: "", data: data || [] };
    } catch (error) {
        console.error("Unexpected error fetching interns:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
            data: [],
        };
    }
}

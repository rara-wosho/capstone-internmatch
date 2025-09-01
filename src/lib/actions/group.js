"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function createGroup(formData) {
    const instructor_id = formData.get("instructor-id");
    const name = formData.get("name");
    const description = formData.get("description");

    const supabase = await createClient();

    // fk ojt instructor id is default to auth.id, so i did not put it in object to be inserted
    const { error } = await supabase
        .from("groups")
        .insert({
            ojt_instructor_id: instructor_id,
            group_name: name,
            group_description: description,
        });

    if (error) {
        console.log(error);
        return { success: false };
    }

    revalidatePath("/instructor/manage-groups");
    return { success: true };
}

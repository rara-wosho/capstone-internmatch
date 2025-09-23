import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // // 🔒 Protect private routes
    if (
        !user &&
        (request.nextUrl.pathname.startsWith("/student") ||
            request.nextUrl.pathname.startsWith("/company") ||
            request.nextUrl.pathname.startsWith("/instructor") ||
            request.nextUrl.pathname.startsWith("/interests") ||
            request.nextUrl.pathname.startsWith("/assessment-test"))
    ) {
        const url = request.nextUrl.clone();
        url.pathname = "/sign-in";
        return NextResponse.redirect(url);
    }

    // 🔄 If user is logged in but visits /sign-in → redirect them based on role
    if (
        user &&
        (request.nextUrl.pathname === "/sign-in" ||
            request.nextUrl.pathname === "/interests")
    ) {
        const url = request.nextUrl.clone();

        //"role" is stored in user metadata
        const role = user.user_metadata?.role;

        switch (role) {
            case "student":
                url.pathname = "/student";
                break;
            case "company":
                url.pathname = "/company";
                break;
            case "instructor":
                url.pathname = "/instructor";
                break;
            default:
                url.pathname = "/";
        }

        return NextResponse.redirect(url);
    }

    // // 🚫 Role-based route protection
    if (user) {
        const role = user.user_metadata?.role;
        const path = request.nextUrl.pathname;

        const rolePaths = {
            student: "/student",
            company: "/company",
            instructor: "/instructor",
        };

        // ✅ Special case: assessment is only for students
        if (path.startsWith("/assessment-test") && role !== "student") {
            const url = request.nextUrl.clone();
            url.pathname = rolePaths[role] || "/"; // redirect them to their dashboard
            return NextResponse.redirect(url);
        }
        if (path.startsWith("/interests") && role !== "student") {
            const url = request.nextUrl.clone();
            url.pathname = rolePaths[role] || "/"; // redirect them to their dashboard
            return NextResponse.redirect(url);
        }

        // ✅ Standard role-based protection
        if (
            rolePaths[role] &&
            !path.startsWith(rolePaths[role]) &&
            !path.startsWith("/interests") &&
            !path.startsWith("/assessment-test") // 👈 allow assessment-test for students
        ) {
            const url = request.nextUrl.clone();
            url.pathname = rolePaths[role]; // redirect to their dashboard root
            return NextResponse.redirect(url);
        }
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}

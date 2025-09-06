"use client";

import { createClient } from "@/lib/supabase/client";
import { Loader } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(undefined);

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });
    }, []);

    return (
        <SessionContext.Provider value={{ session, user, loading }}>
            {loading ? (
                <div className="w-full min-h-screen flex flex-col items-center justify-center gap-2">
                    <Loader className="animate-spin" />
                    <p className="text-sm text-muted-foreground">Please wait</p>
                </div>
            ) : (
                children
            )}
        </SessionContext.Provider>
    );
}

// Hook for easy access
export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}

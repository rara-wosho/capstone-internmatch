"use client";

import { createContext, useContext, useState } from "react"; // Removed useEffect

export const SessionContext = createContext(undefined);

export function SessionProvider({
    children,
    initialSession = null,
    profileData,
}) {
    const [session, setSession] = useState(initialSession);
    const [user, setUser] = useState(initialSession?.user || null);
    const [userData, setUserData] = useState(profileData || null);

    const value = {
        session,
        user,
        userData,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
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

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Extendemos el usuario para incluir el rol desde Firestore
interface AppUser extends User {
    role?: "user" | "admin";
}

interface AuthContextType {
    user: AppUser | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Si auth no está inicializado (ej. faltan env vars en local), evitar crash
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Buscar claim/rol en Firestore
                try {
                    if (!db) throw new Error("Firestore is not initialized");
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    const userData = userDoc.data();
                    const role = userData?.role || "user";
                    setUser({ ...firebaseUser, role } as AppUser);
                } catch (error) {
                    console.error("Error fetching user role", error);
                    setUser(firebaseUser as AppUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        if (auth) {
            await firebaseSignOut(auth);
        }
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

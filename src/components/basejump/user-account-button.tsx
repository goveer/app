'use client'

import { createClient } from "@/lib/supabase/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserAccountButton() {
    const [personalAccount, setPersonalAccount] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchPersonalAccount() {
            const supabaseClient = await createClient();
            const { data } = await supabaseClient.rpc('get_personal_account');
            if (data) {
                setPersonalAccount(data);
            }
        }

        fetchPersonalAccount();
    }, []);

    const signOut = async () => {
        const supabaseClient = await createClient();
        await supabaseClient.auth.signOut();
        router.push('/login');
    };

    if (!personalAccount) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{personalAccount.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(`/dashboard/${personalAccount.slug}`)}>
                    Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/dashboard/${personalAccount.slug}/settings`)}>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

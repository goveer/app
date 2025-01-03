'use client'

import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ManageTeams() {
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        async function fetchTeams() {
            const supabaseClient = await createClient();

            const { data } = await supabaseClient.rpc('get_accounts');

            if (data) {
                const teamsList = data.filter((team: any) => team.personal_account === false);
                setTeams(teamsList);
            }
        }

        fetchTeams();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Teams</h2>
                <Button asChild>
                    <Link href="/teams/new">Create Team</Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {teams.map((team) => (
                    <Card key={team.id}>
                        <CardHeader>
                            <CardTitle>{team.name}</CardTitle>
                            <CardDescription>{team.slug}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline">
                                <Link href={`/dashboard/${team.slug}`}>
                                    View Dashboard
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

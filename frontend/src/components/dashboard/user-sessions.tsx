"use client";

import { useSessions } from "@/hooks/useSessions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UserSession() {
  const { data, isLoading, isError  } = useSessions();

  if (isLoading) return <p className="text-center text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-center text-destructive">Error loading sessions.</p>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Your Sessions ({data?.length})</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((session: any) => (
          <Card key={session._id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Score: {session.score}</span>
                <Badge variant="secondary">{session.track}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Created: {new Date(session.createdAt).toLocaleString()}
              </p>
                   <div className="flex gap-4 mt-3">
              <Badge variant="outline" className="bg-green-100 text-green-700">
                ✅ Correct: {session.correctCount}
              </Badge>
              <Badge variant="outline" className="bg-red-100 text-red-700">
                ❌ Incorrect: {session.incorrectCount}
              </Badge>
            </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

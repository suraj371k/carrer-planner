"use client";

import { useSessions } from "@/hooks/useSessions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function UserSession() {
  const { data, isLoading, isError } = useSessions();
  const sessions = data ?? [];

  if (isLoading)
    return <p className="text-center text-muted-foreground">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-destructive">Error loading sessions.</p>
    );

  return (
    <div className="max-w-6xl mx-auto py-8">
      {(() => {
        const total = sessions.length;
        const avgScore = total
          ? (
              sessions.reduce(
                (sum: number, s: any) => sum + (s.score || 0),
                0
              ) / total
            ).toFixed(1)
          : "0.0";
        const avgAccuracy = total
          ? (sessions.reduce((sum: number, s: any) => {
              const totalAns = (s.correctCount || 0) + (s.incorrectCount || 0);
              const acc = totalAns ? (s.correctCount || 0) / totalAns : 0;
              return sum + acc;
            }, 0) /
              total) *
            100
          : 0;
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-gray-500">
                  Total Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{total}</div>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-gray-500">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">
                  {avgScore}%
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Across all sessions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase text-gray-500">
                  Avg. Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-purple-600">
                    {avgAccuracy.toFixed(1)}%
                  </div>
                </div>
                <Progress value={avgAccuracy} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
        );
      })()}

      <h2 className="text-2xl font-bold mb-4">
        Your Sessions ({sessions.length})
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session: any) => (
          <Card key={session._id} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-semibold">
                  Score: {session.score}%
                </span>
                <Badge variant="secondary">{session.track}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Created: {new Date(session.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      ✅ Correct: {session.correctCount}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      ❌ Incorrect: {session.incorrectCount}
                    </Badge>
                  </div>
                  {(() => {
                    const totalAns =
                      (session.correctCount || 0) +
                      (session.incorrectCount || 0);
                    const accuracy = totalAns
                      ? ((session.correctCount || 0) / totalAns) * 100
                      : 0;
                    return (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Accuracy</span>
                          <span>{accuracy.toFixed(1)}%</span>
                        </div>
                        <Progress value={accuracy} className="h-2" />
                      </div>
                    );
                  })()}
                </div>
                <div className="w-24 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Correct", value: session.correctCount || 0 },
                          {
                            name: "Incorrect",
                            value: session.incorrectCount || 0,
                          },
                        ]}
                        dataKey="value"
                        innerRadius={34}
                        outerRadius={48}
                        paddingAngle={1}
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

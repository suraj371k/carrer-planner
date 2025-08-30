import { useProfile } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
  }, [isLoading, data, router]);

  if (isLoading) return <p>Loading...</p>;
  return <>{children}</>;
}

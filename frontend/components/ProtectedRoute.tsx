"use client";

import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // wait until auth finished loading
    if (!auth?.loading && !auth?.user) {
      // redirect back after login
      router.push(`/login?redirect=${pathname}`);
    }
  }, [auth, router, pathname]);

  // show nothing while checking auth
  if (!auth || auth.loading || !auth.user) {
    return null;
  }

  return <>{children}</>;
}
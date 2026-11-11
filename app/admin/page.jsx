import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminRootPage() {
  const cookieStore = await cookies();
  const hasToken = Boolean(cookieStore.get("token")?.value);
  redirect(hasToken ? "/admin/placements" : "/admin/login");
}


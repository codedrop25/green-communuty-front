import { AuthForm } from "@/components/auth/AuthForm";
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return <AuthForm next={(await searchParams).next} />;
}

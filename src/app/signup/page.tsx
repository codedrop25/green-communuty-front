import { AuthForm } from "@/components/auth/AuthForm";
export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return <AuthForm signup next={(await searchParams).next} />;
}

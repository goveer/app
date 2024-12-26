import { AuthForm } from "../../components/auth/auth-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f1e7fc] via-[#ece4fd] to-[#e0eafd] p-4">
      <div className="container relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Image
              src="/logo.svg"
              width={120}
              height={40}
              alt="Veer Logo"
              className="mx-auto mb-6"
            />
            <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
              Sign in to continue
            </h1>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

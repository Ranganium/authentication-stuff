import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Log In",
};

async function signIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/login?error=true");
  }

  redirect("/");
}

export default async function logInPage({ searchParams }) {
  const { error } = await searchParams;

  return (
    <main>
      <h1>Log in</h1>
      {error && (
        <p className="form-error" role="alert">
          wrong email or password
        </p>
      )}
      <form action={signIn} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        <button type="submit">Sign in</button>
      </form>
      <p>
        No account yet? <Link href="/signup">Sign Up</Link>
      </p>
    </main>
  );
}

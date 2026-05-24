import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight dark:text-white">Create account</h1>
      <p className="muted mt-2">Start organizing your team's best work today.</p>
      <form className="mt-8 space-y-4" onSubmit={submit}>
        <Input name="name" placeholder="Full name" required />
        <Input name="email" type="email" placeholder="Work email" required />
        <Input name="password" type="password" placeholder="Password" required />
        {error && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
        <Button className="w-full" type="submit">Create account</Button>
      </form>
      <p className="muted mt-7 text-center text-sm">Already registered? <Link to="/login" className="font-semibold text-primary">Sign in</Link></p>
    </div>
  );
}

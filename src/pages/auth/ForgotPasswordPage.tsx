import { useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <Link to="/login" className="muted mb-8 inline-flex items-center gap-2 text-sm hover:text-primary"><ArrowLeft className="size-4" />Back to login</Link>
      <h1 className="text-3xl font-bold tracking-tight dark:text-white">Reset password</h1>
      <p className="muted mt-2">We will send password recovery instructions to your email.</p>
      {submitted ? (
        <div className="mt-8 rounded-xl bg-green-50 p-4 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300">
          Recovery instructions sent. Please check your inbox.
        </div>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={submit}>
          <Input type="email" placeholder="Work email" required />
          <Button className="w-full" type="submit">Send reset link</Button>
        </form>
      )}
    </div>
  );
}

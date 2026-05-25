import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { api } from "@/services/api";

export function LoginPage() {
  const navigate = useNavigate();
  const { user, signInUser } = useUser();
  const [email, setEmail] = useState("astha@goodday.app");
  const [password, setPassword] = useState("password123");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 8) {
      setError("Enter a valid email and a password of at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    const signedIn = await api.signIn(email, password);
    signInUser(user?.email === email ? user : signedIn);
    navigate("/dashboard");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight dark:text-white">Welcome back</h1>
      <p className="muted mt-2">Sign in to continue managing your workspace.</p>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button variant="outline">Google</Button>
        <Button variant="outline">Microsoft</Button>
      </div>
      <div className="muted my-6 flex items-center gap-3 text-xs">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />OR CONTINUE WITH EMAIL<span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="mb-2 block text-sm font-medium dark:text-white">Email</label>
          <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <label className="font-medium dark:text-white">Password</label>
            <Link to="/forgot-password" className="font-medium text-primary">Forgot password?</Link>
          </div>
          <div className="relative">
            <Input type={visible ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="pr-12" required />
            <button type="button" onClick={() => setVisible(!visible)} className="absolute right-3 top-3 text-slate-400">
              {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>
        {error && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-500/10">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
      <p className="muted mt-7 text-center text-sm">Do not have an account? <Link to="/signup" className="font-semibold text-primary">Create one</Link></p>
    </div>
  );
}

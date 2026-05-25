import { Outlet } from "react-router-dom";
import authWorkspace from "@/assets/auth-workspace.webp";
import Footer from "@/components/Footer";

export function AuthLayout() {
  console.log("AuthLayout rendered");
  return (
    <div className="grid min-h-screen bg-canvas dark:bg-night lg:grid-cols-[1.03fr_0.97fr]">
      <section className="hidden overflow-hidden bg-primary p-10 text-white lg:flex lg:flex-col">
        <div className="flex items-center gap-3 text-xl font-bold">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/18">G</span>
          GoodDay
        </div>
        <div className="my-auto max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-100">Plan. Execute. Grow.</p>
          <h1 className="mt-5 text-5xl font-bold leading-tight">Manage work with calm clarity.</h1>
          <p className="mt-5 text-lg text-indigo-100">
            Unite projects, tasks, workflows, and teammates in a workspace built for focused delivery.
          </p>
          <img
            src={authWorkspace}
            alt=""
            className="mx-auto mt-7 h-64 w-auto rounded-3xl object-contain mix-blend-screen"
          />
          <div className="mt-10 grid grid-cols-3 gap-3">
            {["14 projects", "86% output", "18 members"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/12 p-4 text-center text-sm font-medium">{item}</div>
            ))}
          </div>
        </div>
        <p className="text-sm text-indigo-100">Trusted by teams building what is next.</p>
      </section>
      <main className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 text-xl font-bold dark:text-white lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">G</span>GoodDay
          </div>

          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// A small sample of the roster, shown beside the form to explain what the product does.
// "busy" is how much of the next 6 months the developer is already booked, in percent.
const sampleRoster = [
  { name: "Hira Sheikh", role: "React Native", busy: 0, note: "Free now" },
  { name: "Ahmed Raza", role: "React Native", busy: 6, note: "Free in 9 days" },
  { name: "Zainab Malik", role: "React Native", busy: 65, note: "Free in 4 months" },
  { name: "Sana Iqbal", role: "Ruby on Rails", busy: 0, note: "Free now" },
  { name: "Kamran Akhtar", role: "Ruby on Rails", busy: 33, note: "Free in 2 months" },
];

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in? Go straight to the app
  if (user) {
    return <Navigate to="/requests" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/requests");
    } catch (err) {
      setError(err.response?.data?.message || "Cannot reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* Left: what the product does */}
      <section className="hidden flex-col justify-between bg-ink p-12 text-white lg:flex">
        <p className="font-display text-xl font-bold">TeamMatch AI</p>

        <div>
          <h1 className="font-display max-w-md text-4xl leading-tight font-bold">
            Answer a client's team request in a minute, not two days.
          </h1>
          <p className="mt-4 max-w-md text-white/70">
            Paste the request. TeamMatch checks skills, past projects and availability, then
            suggests two or three teams for you to approve.
          </p>

          <ul className="mt-10 max-w-md space-y-3">
            {sampleRoster.map((dev) => (
              <li key={dev.name} className="grid grid-cols-[9rem_1fr_7.5rem] items-center gap-3 text-sm">
                <span>
                  <span className="block font-medium">{dev.name}</span>
                  <span className="block text-xs text-white/50">{dev.role}</span>
                </span>
                {/* The bar is the next 6 months: grey is busy time, green is free time */}
                <span className="flex h-2.5 overflow-hidden rounded-full bg-emerald-400">
                  <span className="bg-slate-500" style={{ width: `${dev.busy}%` }} />
                </span>
                <span className="text-right text-xs text-white/70">{dev.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/40">
          Sample roster for the next 6 months. Grey is busy, green is free.
        </p>
      </section>

      {/* Right: the form */}
      <section className="flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <p className="font-display text-xl font-bold lg:hidden">TeamMatch AI</p>
          <h2 className="font-display mt-6 text-2xl font-bold lg:mt-0">Log in</h2>
          <p className="mt-1 text-sm text-muted">Use your work email to open the requests inbox.</p>

          <label className="mt-8 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2"
          />

          <label className="mt-4 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2"
          />

          {error && (
            <p role="alert" className="mt-4 rounded-md bg-busy/10 px-3 py-2 text-sm text-busy">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-md bg-free px-4 py-2.5 font-medium text-white hover:bg-free/90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="mt-6 text-xs text-muted">Demo account: sales@teammatch.dev / Sales123</p>
        </form>
      </section>
    </div>
  );
}
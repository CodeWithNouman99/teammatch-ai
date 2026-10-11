import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

const exampleRequest =
  "Hi, we are building a remittance app for the UAE market. I need 2 React Native developers and 1 Ruby on Rails developer for 6 months, starting next month. At least one of them should be senior. Our budget is around $12,000 per month.";

const sources = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Phone call" },
  { value: "website", label: "Website form" },
  { value: "other", label: "Other" },
];

export default function NewRequest() {
  const navigate = useNavigate();

  const [rawText, setRawText] = useState("");
  const [source, setSource] = useState("email");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.post("/requests", { rawText, source });
      navigate("/requests");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the request. Check that the backend is running.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">New client request</h1>
      <p className="mt-1 text-muted">
        Paste the message exactly as the client wrote it. The agents work out the roles, skills and dates.
      </p>

      <div className="mt-8 flex items-end justify-between gap-4">
        <label className="text-sm font-medium" htmlFor="rawText">
          Client's message
        </label>
        <button type="button" onClick={() => setRawText(exampleRequest)} className="text-sm text-free underline">
          Fill in an example
        </button>
      </div>
      <textarea
        id="rawText"
        required
        rows={7}
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        placeholder="I need 2 React Native developers and 1 Rails developer for 6 months..."
        className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2"
      />

      <label className="mt-5 block text-sm font-medium" htmlFor="source">
        Where did it come from?
      </label>
      <select
        id="source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 sm:w-60"
      >
        {sources.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {error && (
        <p role="alert" className="mt-5 rounded-md bg-busy/10 px-3 py-2 text-sm text-busy">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-5">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-free px-5 py-2.5 font-medium text-white hover:bg-free/90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Find a team"}
        </button>
        <Link to="/requests" className="text-sm text-muted underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
import { useEffect, useState } from "react";
import api from "../api/client";
import { shortDate } from "../utils/format";

// Turns the availability numbers into words and a colour
function availabilityOf(dev) {
  if (dev.freePercent === 100) return { text: "Free now", dot: "bg-free", color: "text-free" };
  if (dev.freePercent > 0) return { text: `${dev.freePercent}% free`, dot: "bg-partial", color: "text-partial" };
  return { text: `Free from ${shortDate(dev.availableFrom)}`, dot: "bg-busy", color: "text-busy" };
}

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [onlyFree, setOnlyFree] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    // Two calls at the same time: the profiles, and who is free today.
    // Then we join them by id so each developer has both.
    Promise.all([api.get("/developers"), api.get(`/developers/available?from=${today}&to=${today}`)])
      .then(([profiles, availability]) => {
        const availabilityById = new Map(availability.data.map((item) => [item._id, item]));
        setDevelopers(
          profiles.data.map((dev) => ({
            ...dev,
            freePercent: availabilityById.get(dev._id)?.freePercent ?? 100,
            availableFrom: availabilityById.get(dev._id)?.availableFrom,
          }))
        );
      })
      .catch(() => setError("Could not load developers. Check that the backend is running."))
      .finally(() => setLoading(false));
  }, []);

  const departments = [...new Set(developers.map((dev) => dev.department))].sort();

  // Filtering happens in the browser, because 30 developers is a small list
  const term = search.trim().toLowerCase();
  const visible = developers.filter((dev) => {
    const matchesSearch =
      !term || dev.name.toLowerCase().includes(term) || dev.skills.some((skill) => skill.name.includes(term));
    const matchesDepartment = department === "all" || dev.department === department;
    const matchesFree = !onlyFree || dev.freePercent > 0;
    return matchesSearch && matchesDepartment && matchesFree;
  });

  return (
    <>
      <h1 className="font-display text-3xl font-bold">Developers</h1>
      <p className="mt-1 text-muted">The whole team, with their skills and who is free today.</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a name or skill, like rails"
          aria-label="Search a name or skill"
          className="w-full rounded-md border border-line bg-white px-3 py-2 sm:w-72"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          aria-label="Department"
          className="rounded-md border border-line bg-white px-3 py-2"
        >
          <option value="all">All departments</option>
          {departments.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} />
          Only show people with free time
        </label>
      </div>

      {loading && <p className="mt-10 text-muted">Loading developers...</p>}

      {error && (
        <p role="alert" className="mt-10 rounded-md bg-busy/10 px-4 py-3 text-busy">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mt-6 text-sm text-muted">
            Showing {visible.length} of {developers.length} developers
          </p>

          {visible.length === 0 ? (
            <p className="mt-4 rounded-lg border border-dashed border-line bg-white p-8 text-center text-muted">
              Nobody matches these filters. Try a different skill or clear the filters.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
              {visible.map((dev) => {
                const availability = availabilityOf(dev);
                return (
                  <li key={dev._id} className="grid gap-x-6 gap-y-2 p-5 md:grid-cols-[14rem_1fr_11rem]">
                    <div>
                      <p className="font-medium">{dev.name}</p>
                      <p className="text-sm text-muted">{dev.title}</p>
                    </div>

                    <div>
                      <ul className="flex flex-wrap gap-1.5">
                        {dev.skills.map((skill) => (
                          <li key={skill.name} className="rounded bg-paper px-2 py-0.5 text-sm">
                            {skill.name} <span className="text-muted">{skill.years}y</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-1.5 text-sm text-muted">
                        {dev.department}, {dev.seniority}, ${dev.hourlyRate} per hour
                      </p>
                    </div>

                    <p className={`flex items-center gap-2 text-sm font-medium md:justify-end ${availability.color}`}>
                      <span className={`h-2 w-2 shrink-0 rounded-full ${availability.dot}`} />
                      {availability.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
}
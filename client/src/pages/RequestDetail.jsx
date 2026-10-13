import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import StatusBadge from "../components/StatusBadge";
import { shortDate, timeAgo } from "../utils/format";

const HOURS_PER_MONTH = 160;

function money(amount) {
  return `$${Number(amount || 0).toLocaleString("en-US")}`;
}

export default function RequestDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let timer;

    async function load() {
      try {
        const response = await api.get(`/requests/${id}`);
        setData(response.data);
        // While the agents are still working, ask again every 3 seconds
        if (response.data.request.status === "processing") {
          timer = setTimeout(load, 3000);
        }
      } catch {
        setError("Could not load this request. Check that the backend is running.");
      }
    }

    load();
    // Stop asking when the user leaves this page
    return () => clearTimeout(timer);
  }, [id]);

  if (error) {
    return (
      <p role="alert" className="rounded-md bg-busy/10 px-4 py-3 text-busy">
        {error}
      </p>
    );
  }

  if (!data) {
    return <p className="text-muted">Loading request...</p>;
  }

  const { request, proposal } = data;
  const parsed = request.parsed || {};

  return (
    <>
      <Link to="/requests" className="text-sm text-muted underline">
        Back to requests
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">Client request</h1>
        <StatusBadge status={request.status} />
      </div>

      <blockquote className="mt-4 rounded-lg border-l-4 border-ink bg-white p-5 leading-relaxed">
        {request.rawText}
      </blockquote>
      <p className="mt-2 text-sm text-muted">
        From {request.source}, added by {request.createdBy?.name || "unknown"} {timeAgo(request.createdAt)}
      </p>

      {request.status === "processing" && (
        <div className="mt-8 flex items-center gap-3 rounded-lg border border-line bg-white p-5">
          <span className="h-3 w-3 animate-pulse rounded-full bg-partial" />
          <p>
            The agents are reading the request and checking who is free. This usually takes under a minute, and
            this page updates by itself.
          </p>
        </div>
      )}

      {request.status === "failed" && (
        <div role="alert" className="mt-8 rounded-lg bg-busy/10 p-5 text-busy">
          <p className="font-medium">The agents could not finish this request.</p>
          <p className="mt-1 text-sm">{request.errorMessage}</p>
        </div>
      )}

      {parsed.roles?.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">What the agents understood</h2>
          <div className="mt-3 grid gap-x-8 gap-y-3 rounded-lg border border-line bg-white p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted">Roles</p>
              <ul className="mt-1 space-y-1">
                {parsed.roles.map((role) => (
                  <li key={role.role}>
                    {role.count} × {role.role}
                    {role.seniority !== "any" && <span className="text-muted">, {role.seniority}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="grid grid-cols-[8rem_1fr] gap-y-1">
              <dt className="text-sm text-muted">Duration</dt>
              <dd>{parsed.durationMonths ? `${parsed.durationMonths} months` : "Not given"}</dd>
              <dt className="text-sm text-muted">Start</dt>
              <dd>{parsed.startDate ? shortDate(parsed.startDate) : "Not given"}</dd>
              <dt className="text-sm text-muted">Monthly budget</dt>
              <dd>{parsed.budget ? money(parsed.budget) : "Not given"}</dd>
              <dt className="text-sm text-muted">Industry</dt>
              <dd className="capitalize">{parsed.industry || "Not given"}</dd>
            </dl>
            {parsed.notes && (
              <p className="sm:col-span-2">
                <span className="text-sm text-muted">Notes: </span>
                {parsed.notes}
              </p>
            )}
          </div>
        </section>
      )}

      {proposal?.options?.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">Team options</h2>
          <p className="mt-1 text-muted">The first option is the agents' best match.</p>

          <div className="mt-4 space-y-6">
            {proposal.options.map((option, index) => (
              <article
                key={option._id}
                className={`rounded-lg border bg-white p-5 ${index === 0 ? "border-free ring-1 ring-free" : "border-line"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold">{option.label}</h3>
                    <p className="mt-1 text-muted">{option.summary}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold">{money(option.estimatedCost)}</p>
                    <p className="text-sm text-muted">per month</p>
                    {parsed.budget && (
                      <p className={`text-sm font-medium ${option.estimatedCost <= parsed.budget ? "text-free" : "text-busy"}`}>
                        {option.estimatedCost <= parsed.budget ? "Within budget" : "Over budget"}
                      </p>
                    )}
                  </div>
                </div>

                <ul className="mt-5 divide-y divide-line border-t border-line">
                  {option.members.map((member) => (
                    <li key={member.developer?._id} className="grid gap-x-6 gap-y-1 py-4 md:grid-cols-[14rem_1fr_7rem]">
                      <div>
                        <p className="font-medium">{member.developer?.name}</p>
                        <p className="text-sm text-muted">{member.role}</p>
                      </div>
                      <div>
                        <p>{member.reason}</p>
                        <p className="mt-1 text-sm text-muted">
                          {member.developer?.seniority}, free from {shortDate(member.availableFrom)}, $
                          {member.developer?.hourlyRate} per hour (about {money(member.developer?.hourlyRate * HOURS_PER_MONTH)}{" "}
                          a month)
                        </p>
                      </div>
                      <div className="md:text-right">
                        <p className="font-display text-xl font-bold">{member.matchScore}</p>
                        <p className="text-xs text-muted">match out of 100</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {option.gaps?.length > 0 && (
                  <ul className="mt-2 space-y-1 rounded-md bg-partial/10 p-3 text-sm text-partial">
                    {option.gaps.map((gap) => (
                      <li key={gap}>{gap}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
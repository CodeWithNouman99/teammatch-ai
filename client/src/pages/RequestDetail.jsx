import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import StatusBadge from "../components/StatusBadge";
import { shortDate, timeAgo } from "../utils/format";

const DAY = 24 * 60 * 60 * 1000;

function money(amount) {
  return `$${Math.round(Number(amount || 0)).toLocaleString("en-US")}`;
}

function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// "2 React Native Developers + 1 Ruby on Rails Developer for 6 months"
function headline(parsed) {
  if (!parsed.roles?.length) return "Client request";
  const roles = parsed.roles.map((role) => `${role.count} ${role.role}${role.count > 1 ? "s" : ""}`).join(" + ");
  return parsed.durationMonths ? `${roles} for ${parsed.durationMonths} months` : roles;
}

// The project period: from the start date, for the number of months asked
function projectWindow(parsed, createdAt) {
  const start = new Date(parsed.startDate || createdAt);
  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + (parsed.durationMonths || 6));
  return { start, end };
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
  const options = proposal?.options || [];
  const period = projectWindow(parsed, request.createdAt);

  return (
    <>
      <Link to="/requests" className="text-sm text-muted underline">
        Back to requests
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <StatusBadge status={request.status} />
        <p className="text-sm text-muted">
          From {request.source}, added by {request.createdBy?.name || "unknown"} {timeAgo(request.createdAt)}
        </p>
      </div>

      <h1 className="font-display mt-3 max-w-3xl text-3xl leading-tight font-bold md:text-4xl">
        {headline(parsed)}
      </h1>

      <figure className="mt-5 max-w-3xl border-l-2 border-line pl-4">
        <blockquote className="text-muted italic">"{request.rawText}"</blockquote>
        <figcaption className="mt-1 text-xs text-muted">The client's own words</figcaption>
      </figure>

      <AgentTrail request={request} parsed={parsed} options={options} period={period} />

      {request.status === "failed" && (
        <div role="alert" className="mt-8 rounded-lg bg-busy/10 p-5 text-busy">
          <p className="font-medium">The agents could not finish this request.</p>
          <p className="mt-1 text-sm">{request.errorMessage}</p>
        </div>
      )}

      {options.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Team options</h2>
          <p className="mt-1 text-muted">
            Each bar shows {shortDate(period.start)} to {shortDate(period.end)}. Green is when the person is free for
            this project.
          </p>

          <div className={`mt-6 grid gap-6 ${options.length > 1 ? "xl:grid-cols-2" : ""}`}>
            {options.map((option, index) => (
              <OptionCard
                key={option._id}
                option={option}
                recommended={index === 0}
                budget={parsed.budget}
                period={period}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// The four steps the system went through, so the sales person can see how the answer was made
function AgentTrail({ request, parsed, options, period }) {
  const working = request.status === "processing";
  const failed = request.status === "failed";
  const withinBudget = parsed.budget ? options.filter((o) => o.estimatedCost <= parsed.budget).length : null;

  const steps = [
    {
      title: "Read the request",
      by: "Requirement agent",
      result: parsed.roles?.length
        ? `${parsed.roles.length} roles, start ${shortDate(period.start)}${parsed.budget ? `, ${money(parsed.budget)} a month` : ""}`
        : null,
    },
    {
      title: "Checked who is free",
      by: "Availability check",
      result: options.length ? `${shortDate(period.start)} to ${shortDate(period.end)}` : null,
    },
    {
      title: "Scored every candidate",
      by: "Scoring rules",
      result: options.length ? "70 for availability, 30 for seniority" : null,
    },
    {
      title: "Built team options",
      by: "Team Lead agent",
      result: options.length
        ? `${options.length} options${withinBudget !== null ? `, ${withinBudget} within budget` : ""}`
        : null,
    },
  ];

  return (
    <ol className="mt-10 grid gap-3 md:grid-cols-4" aria-label="How the agents worked on this request">
      {steps.map((step, index) => {
        const done = Boolean(step.result);
        return (
          <li key={step.title} className="relative rounded-lg border border-line bg-white p-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  done ? "bg-free text-white" : failed ? "bg-busy/15 text-busy" : "bg-partial/15 text-partial"
                }`}
              >
                {index + 1}
              </span>
              <p className="font-medium">{step.title}</p>
            </div>
            <p className="mt-2 text-xs text-muted">{step.by}</p>
            <p className={`mt-1 text-sm ${done ? "" : "text-muted"}`}>
              {done ? step.result : working ? <span className="animate-pulse">Working on it...</span> : "Not finished"}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function OptionCard({ option, recommended, budget, period }) {
  const members = option.members || [];
  const averageScore = members.length
    ? Math.round(members.reduce((total, member) => total + member.matchScore, 0) / members.length)
    : 0;
  // The budget is already shown by the meter, so leave that warning out of the list
  const gaps = (option.gaps || []).filter((gap) => !gap.includes("per month, above the"));
  const earliestStart = members.length
    ? new Date(Math.max(...members.map((member) => new Date(member.availableFrom))))
    : null;

  return (
    <article className={`rounded-xl border bg-white ${recommended ? "border-free ring-1 ring-free" : "border-line"}`}>
      <header className="border-b border-line p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl font-bold">{option.label}</h3>
          {recommended && (
            <span className="rounded-full bg-free px-2.5 py-0.5 text-xs font-medium text-white">Recommended</span>
          )}
        </div>
        <p className="mt-1 text-muted">{option.summary}</p>

        <dl className="mt-5 grid grid-cols-3 gap-4">
          <div>
            <dt className="text-xs text-muted">Monthly cost</dt>
            <dd className="font-display text-2xl font-bold">{money(option.estimatedCost)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Average match</dt>
            <dd className="font-display text-2xl font-bold">{averageScore}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Whole team free</dt>
            <dd className="font-display text-2xl font-bold">{earliestStart ? shortDate(earliestStart) : "-"}</dd>
          </div>
        </dl>

        {budget && <BudgetMeter cost={option.estimatedCost} budget={budget} />}
      </header>

      <ul className="divide-y divide-line">
        {members.map((member) => (
          <li key={member.developer?._id} className="p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                {initials(member.developer?.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{member.developer?.name}</p>
                    <p className="text-sm text-muted">
                      {member.role}, {member.developer?.seniority}, ${member.developer?.hourlyRate} per hour
                    </p>
                  </div>
                  <p className="text-right">
                    <span className="font-display text-2xl font-bold">{member.matchScore}</span>
                    <span className="block text-xs text-muted">match</span>
                  </p>
                </div>
                <p className="mt-2 text-sm">{member.reason}</p>
                <AvailabilityBar availableFrom={member.availableFrom} period={period} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {gaps.length > 0 && (
        <ul className="space-y-1 rounded-b-xl bg-partial/10 p-4 text-sm text-partial">
          {gaps.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

// Cost against budget: the line marks the budget, the bar is the cost
function BudgetMeter({ cost, budget }) {
  const scale = Math.max(cost, budget);
  const over = cost > budget;
  return (
    <div className="mt-5">
      <div className="relative h-2.5 rounded-full bg-paper">
        <div
          className={`h-full rounded-full ${over ? "bg-busy" : "bg-free"}`}
          style={{ width: `${(cost / scale) * 100}%` }}
        />
        <div className="absolute -top-1 h-4.5 w-0.5 bg-ink" style={{ left: `${(budget / scale) * 100}%` }} />
      </div>
      <p className={`mt-2 text-sm font-medium ${over ? "text-busy" : "text-free"}`}>
        {over
          ? `${money(cost - budget)} over the ${money(budget)} budget`
          : `${money(budget - cost)} under the ${money(budget)} budget`}
      </p>
    </div>
  );
}

// When this person is free inside the project period
function AvailabilityBar({ availableFrom, period }) {
  const total = period.end - period.start;
  const waitDays = Math.max(0, (new Date(availableFrom) - period.start) / DAY);
  const busyShare = Math.min(1, Math.max(0, (new Date(availableFrom) - period.start) / total));

  return (
    <div className="mt-3">
      <div className="flex h-2 overflow-hidden rounded-full bg-free">
        <div className="bg-slate-300" style={{ width: `${busyShare * 100}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted">
        {waitDays < 1 ? "Free for the whole project" : `Free from ${shortDate(availableFrom)}, ${Math.round(waitDays)} days after the start`}
      </p>
    </div>
  );
}
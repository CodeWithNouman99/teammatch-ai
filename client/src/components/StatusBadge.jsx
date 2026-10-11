// What each request status means for the user, and its colour
const statuses = {
  processing: { label: "Agents working", style: "bg-partial/15 text-partial" },
  proposed: { label: "Team options ready", style: "bg-free/15 text-free" },
  approved: { label: "Team approved", style: "bg-ink text-white" },
  failed: { label: "Failed", style: "bg-busy/15 text-busy" },
};

export default function StatusBadge({ status }) {
  const { label, style } = statuses[status] || { label: status, style: "bg-line text-ink" };
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${style}`}>
      {label}
    </span>
  );
}
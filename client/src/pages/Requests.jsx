import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import StatusBadge from "../components/StatusBadge";
import { timeAgo } from "../utils/format";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/requests")
      .then((response) => setRequests(response.data))
      .catch(() => setError("Could not load requests. Check that the backend is running."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Requests</h1>
          <p className="mt-1 text-muted">Every client request and how far its team search has got.</p>
        </div>
        <Link to="/requests/new" className="rounded-md bg-free px-4 py-2.5 font-medium text-white hover:bg-free/90">
          New request
        </Link>
      </div>

      {loading && <p className="mt-10 text-muted">Loading requests...</p>}

      {error && (
        <p role="alert" className="mt-10 rounded-md bg-busy/10 px-4 py-3 text-busy">
          {error}
        </p>
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-line bg-white p-10 text-center">
          <p className="font-display text-xl font-bold">No requests yet</p>
          <p className="mt-2 text-muted">Add the first client request and the agents will suggest a team for it.</p>
          <Link to="/requests/new" className="mt-5 inline-block font-medium text-free underline">
            Add a client request
          </Link>
        </div>
      )}

      {requests.length > 0 && (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
                   {requests.map((request) => (
            <li key={request._id}>
              <Link
                to={`/requests/${request._id}`}
                className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 p-5 hover:bg-paper"
              >
                <div className="min-w-0 flex-1 basis-80">
                  <p className="line-clamp-2">{request.rawText}</p>
                  <p className="mt-1.5 text-sm text-muted">
                    From {request.source}, added by {request.createdBy?.name || "unknown"} {timeAgo(request.createdAt)}
                  </p>
                </div>
                <StatusBadge status={request.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
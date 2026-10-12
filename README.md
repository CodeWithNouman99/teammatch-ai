# TeamMatch AI

Multi-agent AI system that matches a software house's developers to incoming client requests. A client request goes in, and a set of AI agents reads it, finds the right developers, checks who is free, and proposes ready-to-approve team options.

> 🚧 **In progress.** The MERN backend (models, auth, APIs) and the core frontend pages are built. The n8n agent workflows are being connected.

## How it works

1. **A client request comes in**: project type, required skills, timeline and budget.
2. **AI agents work on it**, each with one job:
   - **Requirement agent** breaks the request into roles and skills
   - **Matcher agent** scores developers against each role
   - **Availability agent** checks current allocations and who is free when
   - **Team lead agent** combines it all into team options
   - **Profile agent** writes a short client-facing profile for each developer
3. **Team proposals are created**: each option lists members, a match score with the reason, skill gaps and an estimated cost.
4. **A manager approves one option**, and the developers are allocated to the project.

Every agent run is logged, so you can see what each agent did and whether it succeeded.

## Tech stack

| Part | Tools |
|---|---|
| Frontend | React 19, React Router, Tailwind CSS, Vite, Axios |
| Backend | Node.js, Express 5, JWT auth, bcrypt |
| Database | MongoDB with Mongoose |
| AI agents | n8n workflows, RAG |

## Project structure

```
teammatch-ai/
├── client/                 React frontend
│   └── src/
│       ├── pages/          Login, Requests, New Request, Developers
│       ├── components/     Layout, protected routes, status badges
│       ├── context/        Auth context
│       └── api/            Axios client
└── server/                 Express API
    └── src/
        ├── models/         Developer, ClientRequest, TeamProposal, Allocation, AgentRun, Project, User
        ├── controllers/    Business logic for each resource
        ├── routes/         REST endpoints
        ├── middleware/     Auth (users and n8n), error handling
        └── seed/           Sample developers and projects
```

## Run it locally

**Backend**

```bash
cd server
npm install
# create a .env with MONGO_URI, JWT_SECRET, PORT and N8N_API_KEY
npm run seed    # optional: load sample data
npm run dev
```

**Frontend**

```bash
cd client
npm install
# create a .env with VITE_API_URL pointing to the backend
npm run dev
```

## Roadmap

- [x] Data models and REST APIs
- [x] JWT authentication and protected routes
- [x] Requests, new request and developers pages
- [ ] Connect the n8n agent workflows
- [ ] Team proposal review and approval screen
- [ ] Deploy a live demo

## Author

**Nouman Aslam**: [GitHub](https://github.com/CodeWithNouman99) · [LinkedIn](https://www.linkedin.com/in/nouman-aslam-a9a3a2333) · [Portfolio](https://portfolio-gilt-tau-48.vercel.app/)

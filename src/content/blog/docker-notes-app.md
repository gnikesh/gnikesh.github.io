---
title: 'Dockerized microservices backend: building software the way production teams ship it'
description: 'A hands-on Dockerized backend platform with a production-ready microservices architecture - two independent Express/MongoDB services behind an Nginx reverse proxy, with clear service boundaries, isolated networks, and environment parity from development to deployment.'
pubDate: 2026-02-22
tags: ['Computer', 'Programming']
---

I recently built a Dockerized backend platform with a production-ready microservices architecture and industry-standard engineering practices. It was a hands-on exercise in building software the way modern teams ship systems in real-world production environments - the kind of thing that's easy to read about and much more valuable to actually build.

The project is a note-taking API. But the interesting part isn't the notes - it's the architecture around them.

## The architecture

The backend is split into two independent services, one for **notes** and one for **notebooks**, both sitting behind an **Nginx reverse proxy**. Each service runs its own Express app and has its **own MongoDB instance on an isolated Docker network**.

```text
  Client :8080
      │
  ┌───▼────────────┐
  │  Nginx Proxy   │
  └───┬────────┬───┘
      │        │
  /notebooks  /notes
      │        │
  ┌───▼──┐  ┌──▼───┐
  │  nb  │  │notes │  (notes validates notebookId via HTTP)
  │  svc │  │  svc │
  └───┬──┘  └──┬───┘
      │         │
  ┌───▼──┐  ┌──▼───┐
  │  nb  │  │notes │
  │  db  │  │  db  │
  └──────┘  └──────┘
```

## The practices that mattered

**Clear service boundaries.** Each service owns its resource and its data. They don't share a database or a codebase - they communicate over the network. The one place they genuinely depend on each other is handled explicitly: when you create a note with a `notebookId`, the notes service validates that the notebook actually exists by calling the notebooks service over HTTP, instead of silently accepting bad references.

**Secure and consistent API routing.** Nginx is the single entry point on port 8080. It routes `api/notebooks` to the notebooks service and `api/notes` to the notes service, giving clients one consistent API surface regardless of how many services are behind it - and a natural place to apply uniform rules later.

Each service exposes the standard CRUD shape you'd expect:

| Notebooks - `/api/notebooks` | Notes - `/api/notes` |
| --- | --- |
| `POST` (create) with `{ name }` | `POST` (create) with `{ title, content, notebookId? }` |
| `GET` (list / by id) | `GET` (list / by id) |
| `PUT` / `DELETE` (update / remove) | `PUT` / `DELETE` (update / remove) |

**Environment parity.** One of the biggest sources of "works on my machine" problems is drift between development and production. Here, the same container images run everywhere. For development, Docker Compose Watch gives a hot-reload experience (`docker compose watch`) with an override file, while production just runs the same compose stack. Config like credentials comes from `.env` files that are templated via `.env.example` - no secrets hardcoded in code.

**Container-first workflow.** Everything - both services, both databases, and the proxy - is defined in `compose.yaml` and starts together with a single `docker compose up --build`. Networking is handled by Compose, which reinforces good isolation between services.

## Why build this?

Microservices get a lot of love (and a fair amount of hate) in discussions, but a lot of the real value is in the *habits* they force: thinking in terms of service boundaries, API contracts, data isolation, and reproducible environments.

Building this was a reminder that a small, well-scoped project is a great way to practice the engineering decisions that teams make every day - and that the fundamentals - routing, networking, environment management, clean separation of concerns - are where the reliability and maintainability actually come from.

Check out the code:

- GitHub: [github.com/gnikesh/docker-notes-app](https://github.com/gnikesh/docker-notes-app)

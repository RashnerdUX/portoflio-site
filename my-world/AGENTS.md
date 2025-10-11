# AGENTS.md

## 🧠 Purpose
Gives AI coding assistants (like Copilot) context to provide useful code suggestions when building the project.

## 🎯 Project Summary
This repository contains the backend and frontend source code for a multiverse rating and ranking platform. It allows users to rate, review, and explore superhero movies through a unique “Kelvinverse Index” system inspired by cosmic elements. Future versions will include versus battles, profiles, achievements, and real-time engagement features.

## 💡 Development Focus
- Backend: FastAPI or Django REST
- Frontend: React or Next.js with Tailwind
- Database: PostgreSQL
- ORM: SQLAlchemy / Prisma
- Auth: JWT
- Caching: Redis
- File Storage: S3 / Cloudinary

## 🧩 Core Entities
- Movie  
- KelvinverseIndex  
- User  
- UserRating  
- TimelineEvent  
- Battle (future)

## 🧭 Guidance for Copilot
- When generating API routes, adhere to RESTful naming conventions.  
- Use async endpoints where possible for performance.  
- Suggest model relationships using SQLAlchemy `relationship()` or Prisma `relation`.  
- When suggesting UI, favor modular components (e.g., `MovieCard`, `RatingSlider`, `TimelineMap`).  
- Prioritize clarity, modularity, and documentation in generated code.

---

**Maintainer:** Kelvin Akhigbe  
**Version:** 1.0.0  
**License:** MIT
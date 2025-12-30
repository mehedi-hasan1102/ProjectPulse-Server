# ProjectPulse – Backend

ProjectPulse is an internal project management and client feedback tracking system designed for IT firms to monitor project health, client satisfaction, and delivery risks in real-time.

---

## Table of Contents
- Features
- Tech Stack
- Project Health Score Logic
- Setup Instructions
- API Endpoints
- Demo Credentials

---

## Features
- Role-Based Access Control (RBAC): Dashboards for Admins, Employees, and Clients.
- Weekly Check-ins: Employees report progress, blockers, and confidence.
- Client Feedback: Weekly satisfaction tracking.
- Risk Management: Logging risks with severity levels.
- Automated Health Monitoring: Real-time calculation of project status.

---

## Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT-based
- Authorization: Role-based (Admin/Employee/Client)

---

## Project Health Score Logic
The Health Score (0–100) is calculated based on:
1. Client Feedback: Satisfaction (1–5) scaled to 100.
2. Employee Confidence: Confidence (1–5) scaled to 100.
3. Timeline: Completion % vs. Expected Timeline.
4. Deductions: Flagged issues or high-severity risks reduce the score.

Status Ranges:
- 80–100: On Track
- 60–79: At Risk
- Below 60: Critical

---

## Setup Instructions

1. Clone the repository:
   git clone <repo_url>
   cd ProjectPulse-server

2. Install dependencies:
   npm install

3. Create .env file:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Run seed script:
   npm run seed

5. Start the server:
   node src/server.js

---

## Demo Login Credentials

Role: Admin
Email: admin@test.com
Password: 123456

Role: Employee
Email: employee@test.com
Password: 123456

Role: Client
Email: client@test.com
Password: 123456

---

## API Overview

Auth:
- POST /api/auth/login -> Returns JWT token

Dashboard:
- GET /api/dashboard/ -> Returns role-based data (Header: Authorization: Bearer <token>)

Projects (Admin):
- CRUD operations for projects
- Assign clients & employees

Check-Ins (Employee):
- POST /api/check-ins (progress, blockers, confidence)

Feedback (Client):
- POST /api/feedback (satisfaction, clarity, flagged issues)

Risks:
- POST /api/risks (title, severity, mitigation)

---

## Deployment
- Frontend: [Your Vercel URL]
- Backend: [Your API URL]
- Database: MongoDB Atlas
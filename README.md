# ProjectMaster - Project Management App Built with Next.js

This project is an **intuitive project management application** designed for individuals to manage their projects and tasks efficiently. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, the app provides an easy way to track progress and stay organized.

The application allows users to create projects, manage tasks within those projects, and visualize task completion with a progress summary. Its user-friendly interface and responsive design make it a perfect tool for personal productivity.

Check out live [here](https://project-master-ten.vercel.app)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Future Enhancements](#future-enhancements)
- [Acknowledgments](#acknowledgments)

---

## About the Project

The app focuses on providing a straightforward workflow for project and task management:

1. **Projects**: Users can create, update, and delete projects.
2. **Tasks**: Each project can contain multiple tasks, which can be added, updated, and removed.
3. **Progress Tracking**:
   - Overview of completed and total tasks.
   - A visual percentage tracker for completed tasks.

This tool is ideal for users seeking a simple, no-frills way to manage their workload without complex collaboration or team-based features.

---

## Key Features

1. **User Authentication**:

   - Multiple sign-in options powered by NextAuth:
     - Email and password.
     - Email magic link.
     - Google and GitHub authentication.

2. **Project and Task Management**:

   - Create, edit, delete, and update projects.
   - Add, edit, delete, and manage tasks within projects.

3. **Task Progress Summary**:

   - Percentage progress tracker for completed tasks.
   - Quick overview of completed vs. total tasks.

4. **Responsive UI**:

   - Designed with Tailwind CSS for seamless responsiveness on all devices.

5. **Secure and Scalable**:
   - Authentication via Clerk for security.
   - Backend integration with Prisma and Supabase for database management.

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js, TypeScript
- **Database**: Prisma ORM with Prisma Postgres
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
  
---

## Future Enhancements

### Deadlines and Timelines

- **Deadlines**: Introduce due dates for tasks and projects to enhance time management.
- **Timeline Visualization Page**:
  - A separate page to display tasks and projects visually over time.
  - Interactive controls to zoom, sort, and filter tasks by progress or priority.

### Additional Features

- Integration with third-party tools like Google Calendar for better scheduling.
- Dark mode for improved user experience.
- Exportable timelines and reports for documentation and sharing.

---

## Acknowledgments

This project was initially inspired by the concepts presented in [this YouTube video](https://www.youtube.com/watch?v=8uAkZHnnt5k). However, the scope and features have significantly evolved to address the unique requirements of an individual project management tool. Special thanks to the Next.jsn and Prisma communities for their excellent documentation and support.

---

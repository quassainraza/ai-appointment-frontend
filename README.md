# AI Appointment Portal - Frontend Architecture & UX Design

This document outlines the engineering principles, architectural patterns, and UX decisions driving the frontend of the AI Appointment Portal. Built with a modern 2026 stack (**React 19**, **Vite**, **TypeScript**, **Zustand 5**, and **React Query v5**), this application is designed for extreme performance, strict type safety, and seamless user experiences.

## Component Structure and State Management

The application enforces a strict separation of concerns, decoupling UI presentation from business logic and state management.

### Component Hierarchy

- **Layouts (`src/layouts`)**: Structural wrappers (`MainLayout.tsx`, `AuthLayout.tsx`) handle route protection and persistent UI shells (like sidebars and navigation) to eliminate UI flickering during route transitions.
- **Pages (`src/pages`)**: High-level route components acting as conductors. They assemble smaller components and inject necessary data.
- **UI Components (`src/components`)**: Domain-specific, highly cohesive components such as:
  - `ChatBot.tsx` (the conversational interface)
  - `AppointmentList.tsx` (data grids)
  - `AppointmentForm.tsx` (confirmation modals)

### Dual-Engine State Management

We employ a strict divide between Client State and Server State to prevent cache staleness and optimize rendering cycles:

- **Client State (`Zustand`)**: Managed via localized stores (`useAuthStore.ts`, `useChatStore.ts`). Zustand handles purely synchronous UI state—such as active modals, sidebar toggles, and persisted JWT session states—with zero boilerplate.
- **Server State (`TanStack React Query`)**: Managed via custom hooks (`useAppointments.ts`). React Query handles all asynchronous operations, providing built-in caching, background refetching, request deduplication, and automatic query invalidation upon successful data mutations.

## API Integration Patterns

The networking layer is highly abstracted to keep components clean and strictly focused on rendering.

- **Centralized Client (`HttpClient.ts`)**: Utilizes a singleton Axios instance rather than raw fetch calls. This allows configuration of base URLs and timeout parameters in one place.
- **Automated Interceptors**: Axios interceptors seamlessly pull the user's JWT from the TokenManager and attach it to the `Authorization: Bearer` header of every outbound request.
- **Service Layer (`ApiService.ts`)**: UI components invoke strongly-typed methods from ApiService (e.g., `ApiService.createAppointment(data)`). This ensures total end-to-end type safety using models defined in `src/types/`.

## Handling Async Flows and Errors

Robust error handling is critical for trust and usability. The frontend employs a multi-layered approach:

- **Declarative Loading States**: Leveraging React Query's `isLoading` and `isPending` flags to render skeletal loaders or disable buttons during network requests.
- **Global Error Catching**: Axios response interceptor monitors for 401 Unauthorized responses. If a session expires, it clears the Zustand auth store and redirects to login.
- **Graceful UI Degradation**: API errors are caught and transformed into user-friendly toast notifications (via Ant Design's message API), providing actionable feedback instead of raw stack traces.

## Conversation-Driven UX Design

The core of this application is the AI scheduling assistant. The UX is designed to feel fluid, natural, and trustworthy:

- **Multi-Turn Contextual UI**: The `ChatBot.tsx` component renders a chat interface that streams responses while maintaining conversational history. Users can provide booking details over several messages (e.g., "I need a meeting next Tuesday," followed by "Actually, make it 3 PM").
- **Human-in-the-Loop Handshake**: The AI cannot mutate the database directly. Once it extracts JSON payloads (Date, Time, Title), the chat transitions into an `AppointmentForm.tsx`. This presents a confirmation screen before final API mutation.

# UI Clarity, Usability, and Polish

As an application built to professional standards,
the UI prioritizes accessibility, speed, and cognitive clarity:

- **Enterprise-Grade Design System:** Powered by Ant Design v6 with a polished Dark Theme. Forms, tables are accessible,
  keboard-navigable,
  and responsive across devices.
- **Iconography & Micro-interactions:** Using lucide-react for crisp icons; micro-interactions include hover states,
  and instant input validation for a premium feel.
- **Zero-Flash Architecture:** Utilizing React Router v7's loaders with separated layouts ensures users never see flashes of unauthenticated dashboards or experience delays due to hydration.

# Running the Frontend Locally

## System Requirements

- **Node.js:** Version 20.x or higher (v20+ recommended) installed globally.
- **Package Manager:** npm (bundled with Node.js).
- **Backend Server:** A running instance of the backend API (Express/Node.js with Supabase) running locally or accessible via a remote URL.

## Step-by-Step Setup Instructions

### 1. Navigate to the Frontend Directory:

```bash
cd frontend
```

### 2. Install Dependencies:

Install all production and dev dependencies listed in your package.json:

```bash
npm install
```

### 3. Configure Environment Variables:

Create a `.env` file in the root of the frontend directory:

```plaintext
VITE_API_URL=http://localhost:3000/api
```

### 4. Start the Development Server:

Launch the Vite HMR development server:

```bash
npm run dev
```

### 5. Access the Application:

Open your browser and navigate to the local development URL provided in your terminal (typically [http://localhost:5173](http://localhost:5173)).

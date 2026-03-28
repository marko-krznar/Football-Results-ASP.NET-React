# Project Architecture Documentation (C# / .NET 10)

This document explains the architectural patterns used in this project, focusing on **Separation of Concerns (SoC)** and **Dependency Injection (DI)**.

## 1. Layers Overview

The backend is structured into several logical layers, similar to professional Enterprise applications (BL/DAL pattern).

| Layer | Responsibility | Location | Industry Term |
| :--- | :--- | :--- | :--- |
| **Presentation** | Handles HTTP requests and returns JSON. | `Controllers/` | Controller |
| **Business Logic**| Contains rules, calculations, and data processing. | `Services/` | **BL** (Business Logic) |
| **Abstraction** | Defines the "Contract" (what the service can do). | `Interfaces/` | Interface |
| **Data Access** | Communicates directly with the database (EF Core). | `Data/` | **DAL** (Data Access Layer) |
| **Entities** | Represents the tables/objects in the database. | `Models/` | Domain Models |

---

## 2. Dependency Injection (DI) - The "Glue"

In `Program.cs`, we register how these layers are connected. This allows different parts of the app to "request" what they need without knowing how it's created.

### Registration Example:
```csharp
// Link the Interface (Contract) with the Concrete Class (Execution)
builder.Services.AddScoped<IMatchService, MatchService>();
```

**Why DI?**
*   **Flexibility:** Easily swap In-Memory DB with PostgreSQL without changing the BL.
*   **Testing:** Test the BL without needing a real database.
*   **Decoupling:** Each part of the app is independent of the others.

---

## 3. Data Flow (Request Lifecycle)

When the React frontend makes a `GET /api/matches` request:

1.  **Controller (`MatchesController.cs`):** Receives the request. It asks the DI container for an `IMatchService`.
2.  **Service / BL (`MatchService.cs`):** The DI container provides the service, injecting `AppDbContext` into it. The service processes the data (sorting, logic).
3.  **DAL (`AppDbContext.cs`):** Fetches raw records from the database (Memory or SQL).
4.  **The Result:** Data flows back: **DB -> Service -> Controller -> JSON Response.**

---

## 4. Why use Interfaces?

Interfaces (`IMatchService`) act as a **Menu**. 
*   The **Controller** looks at the menu and orders `GetAll()`.
*   The **Service** is the **Chef** who actually cooks the meal.
*   The **Controller** doesn't care *who* the chef is, as long as he follows the menu (Interface).

This allows us to change the "Chef" (the service implementation) at any time in `Program.cs` without breaking the "Waiter" (the controller).

---

## 5. Folder Structure Recommendation

```text
backend/
├── Controllers/   # Presentation Layer (API Endpoints)
├── Services/      # Business Logic (BL) Layer
├── Interfaces/    # Abstractions / Contracts
├── Data/          # Data Access Layer (DAL) / DbContext
├── Models/        # Database Entities
└── DTOs/          # Data Transfer Objects (Projections for Frontend)
```

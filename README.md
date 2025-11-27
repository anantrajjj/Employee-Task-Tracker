# Employee Task Tracker - Full Stack Application

A comprehensive full-stack employee task management system with **JWT authentication** and **role-based access control** built with the PERN stack (PostgreSQL/SQLite, Express, React, Node.js).

## 🌟 Features

### Core Features
- ✅ **Dashboard** with real-time statistics (Total Tasks, Completed Tasks, Total Employees, Completion Rate)
- ✅ **Task Management** - Create, Read, Update, Delete tasks
- ✅ **Employee Management** - Manage employee records
- ✅ **Advanced Filtering** - Filter tasks by status and employee
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### Bonus Features (Authentication & Authorization)
- 🔐 **User Authentication** - JWT-based login and registration
- 👥 **Role-Based Access Control** - Admin, Manager, and User roles
- 🔒 **Protected Routes** - Secure API endpoints and frontend pages
- 🛡️ **Password Security** - Bcrypt password hashing
- 👤 **User Profiles** - View current user information

## 📁 Project Structure

```
employee-task-tracker/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── authController.js        (Authentication logic)
│   │   │   ├── taskController.js        (Task CRUD operations)
│   │   │   ├── employeeController.js    (Employee management)
│   │   │   └── dashboardController.js   (Dashboard statistics)
│   │   ├── middleware/
│   │   │   └── auth.js                  (JWT verification & role checks)
│   │   └── routes/
│   │       ├── auth.js                  (Auth endpoints)
│   │       ├── tasks.js                 (Task endpoints)
│   │       ├── employees.js             (Employee endpoints)
│   │       └── dashboard.js             (Dashboard endpoint)
│   ├── prisma/
│   │   ├── schema.prisma                (Database schema)
│   │   ├── seed.js                      (Seed data script)
│   │   └── migrations/                  (Database migrations)
│   ├── .env                             (Environment variables)
│   ├── .env.example                     (Environment template)
│   ├── server.js                        (Express server)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx             (Task creation/edit form)
│   │   │   └── ProtectedRoute.jsx       (Route protection HOC)
│   │   ├── context/
│   │   │   └── AuthContext.jsx          (Authentication state)
│   │   ├── pages/
│   │   │   ├── Login.jsx                (Login page)
│   │   │   ├── Register.jsx             (Registration page)
│   │   │   ├── Dashboard.jsx            (Dashboard view)
│   │   │   └── Tasks.jsx                (Task list view)
│   │   ├── services/
│   │   │   └── api.js                   (API service layer)
│   │   ├── App.jsx                      (Main app component)
│   │   ├── main.jsx                     (Entry point)
│   │   └── index.css                    (Global styles)
│   ├── .env                             (Environment variables)
│   ├── .env.example                     (Environment template)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example file
   copy .env.example .env
   
   # Edit .env and update if needed (default values work fine)
   ```

4. **Setup database:**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Create database and run migrations
   npx prisma migrate dev --name init
   
   # Seed database with sample data
   npm run seed
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional):**
   ```bash
   # Copy the example file
   copy .env.example .env
   
   # Default API URL is already set correctly
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

### 🎉 You're Ready!

Open your browser and go to `http://localhost:3000/login`

## 👤 Demo Accounts

The seed script creates three demo accounts for testing:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | admin@company.com | password123 | Full access to all features |
| **Manager** | jane.smith@company.com | password123 | Can manage all tasks |
| **User** | bob.johnson@company.com | password123 | Can only view their assigned tasks |

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env` file:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="file:./dev.db"

# CORS
CORS_ORIGIN=http://localhost:3000

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Frontend Environment Variables

Create `frontend/.env` file:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📊 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Registration successful"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@company.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Task Endpoints (Protected)

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}

# Optional query parameters:
# ?status=TODO | IN_PROGRESS | DONE
# ?employeeId=1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete Q4 Sales Report",
      "description": "Analyze sales data...",
      "status": "IN_PROGRESS",
      "dueDate": "2025-12-15T00:00:00.000Z",
      "employeeId": 1,
      "employee": {
        "id": 1,
        "name": "Admin User",
        "email": "admin@company.com"
      }
    }
  ]
}
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "TODO",
  "dueDate": "2025-12-31",
  "employeeId": 1
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "DONE"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {token}
```

### Employee Endpoints (Protected)

```http
GET /api/employees              # Get all employees
GET /api/employees/:id          # Get single employee
POST /api/employees             # Create employee (Admin only)
PUT /api/employees/:id          # Update employee (Admin only)
DELETE /api/employees/:id       # Delete employee (Admin only)
```

### Dashboard Endpoint (Protected)

```http
GET /api/dashboard
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTasks": 5,
    "completedTasks": 1,
    "totalEmployees": 3,
    "todoTasks": 2,
    "inProgressTasks": 2,
    "completionRate": 20,
    "recentTasks": [...]
  }
}
```

## 🎨 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM for database management
- **SQLite** - Database (portable, zero-config)
- **JWT (jsonwebtoken)** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router DOM** - Client-side routing
- **Context API** - State management

## 🏗️ Architecture

### Backend Architecture (MVC Pattern)

- **Models**: Defined in Prisma schema
- **Controllers**: Business logic and database operations
- **Routes**: API endpoint definitions
- **Middleware**: Authentication and authorization
- **Validation**: Request validation in controllers
- **Error Handling**: Centralized error handling

### Frontend Architecture (Component + Service Layer)

- **Pages**: Route-level views
- **Components**: Reusable UI components
- **Services**: API communication layer (centralized)
- **Context**: Global state management (Auth)
- **Protected Routes**: HOC for route protection

### Key Design Patterns

✅ **Service Layer Pattern** - All API calls centralized in `api.js`  
✅ **Repository Pattern** - Prisma acts as data access layer  
✅ **Middleware Pattern** - JWT authentication middleware  
✅ **Context Pattern** - React Context for auth state  
✅ **HOC Pattern** - ProtectedRoute component  

## 🔐 Security Features

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **JWT Tokens** - Secure token-based authentication
- ✅ **Token Expiration** - Configurable token lifetime
- ✅ **Protected Routes** - Frontend and backend protection
- ✅ **Role-Based Access** - Different permissions per role
- ✅ **Input Validation** - Server-side validation
- ✅ **CORS Protection** - Configured allowed origins
- ✅ **SQL Injection Prevention** - Prisma parameterized queries

## 👥 Role-Based Permissions

### Admin
- ✅ View all tasks and employees
- ✅ Create, update, delete any task
- ✅ Create, update, delete employees
- ✅ Full dashboard access

### Manager
- ✅ View all tasks and employees
- ✅ Create, update, delete tasks
- ✅ View dashboard
- ❌ Cannot manage employees

### User (Regular Employee)
- ✅ View only their assigned tasks
- ✅ Update status of their tasks
- ✅ View personal dashboard stats
- ❌ Cannot see other users' tasks
- ❌ Cannot create/delete tasks
- ❌ Cannot manage employees

## 🛠️ Useful Commands

### Backend Commands

```bash
# Development
npm run dev              # Start development server with nodemon

# Production
npm start               # Start production server

# Database
npx prisma generate     # Generate Prisma Client
npx prisma migrate dev  # Create and apply migration
npx prisma studio       # Open Prisma Studio GUI
npm run seed           # Seed database with sample data

# Setup (runs all database commands)
npm run setup          # generate + migrate + seed
```

### Frontend Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Database Reset (if needed)

**PowerShell:**
```powershell
cd backend
Remove-Item -Recurse -Force prisma\migrations
Remove-Item prisma\dev.db -ErrorAction SilentlyContinue
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

**Command Prompt:**
```cmd
cd backend
rmdir /s /q prisma\migrations
del prisma\dev.db
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

## 🎯 Challenge Requirements Met

### Core Requirements (100 points)
| Requirement | Status | Implementation |
|-------------|--------|----------------|
| View employees & tasks | ✅ | Dashboard + Tasks page with full CRUD |
| Add/update tasks | ✅ | TaskForm component with validation |
| Filter by status/employee | ✅ | Query params on GET /api/tasks |
| Dashboard summary | ✅ | Statistics, completion rate, breakdowns |
| Frontend-Backend API | ✅ | REST API with axios service layer |
| Database persistence | ✅ | SQLite with Prisma ORM |
| Responsive UI | ✅ | Tailwind CSS with mobile-first design |
| Clear architecture | ✅ | MVC backend, Component/Service frontend |
| Code quality | ✅ | Modular, validated, error handling |
| Documentation | ✅ | Comprehensive README with examples |

### Bonus Features (Extra 10+ points)
| Feature | Status | Implementation |
|---------|--------|----------------|
| User Authentication | ✅ | JWT-based auth system |
| User Registration | ✅ | Registration page with validation |
| Role-Based Access | ✅ | Admin, Manager, User roles |
| Protected Routes | ✅ | Frontend & backend route protection |
| Password Security | ✅ | Bcrypt hashing with salt |
| Token Management | ✅ | LocalStorage + interceptors |
| User Context | ✅ | React Context for auth state |
| Access Control | ✅ | Role-based data filtering |

## 📸 Screenshots

### Login Page
Beautiful authentication page with demo account information displayed for easy testing.
<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/a6a913b1-5737-4cca-b807-53afa3ef74a5" />


### Dashboard
- Real-time statistics in a clean grid layout
- Total tasks, completed tasks, total employees
- Completion rate percentage
- Task breakdown by status (TODO, IN_PROGRESS, DONE)
- Recent tasks table with employee information
- <img width="1901" height="866" alt="image" src="https://github.com/user-attachments/assets/39893db0-3d34-4ded-aedf-dae7cbadb653" />


### Task Management
- Filterable task list by status and employee
- Role-based task visibility (users see only their tasks)
- Create, edit, delete operations
- Status badges with color coding
- Responsive table layout
- <img width="1822" height="855" alt="image" src="https://github.com/user-attachments/assets/23e49093-7277-4754-ba70-75960bb16cd0" />


### User Profile
- Current user information in navigation bar
- Role badge display
- Logout functionality
- <img width="1652" height="864" alt="image" src="https://github.com/user-attachments/assets/238e5749-8f22-4359-a154-b5f6b7be99b5" />


## 🚧 Assumptions & Limitations

### Assumptions
- Single-tenant application (no multi-company support)
- Task statuses limited to: TODO, IN_PROGRESS, DONE
- No task priority levels
- No file attachments on tasks
- No email notifications
- Simple authentication (no OAuth/SSO)

### Known Limitations
- No task comments or activity history
- No bulk operations (delete multiple tasks)
- No export functionality (CSV/PDF)
- Basic date handling (no timezone support)
- No real-time updates (requires page refresh)
- LocalStorage for token (consider httpOnly cookies for production)

### Future Enhancements
- 📧 Email notifications for due tasks
- 💬 Task comments and activity log
- 📎 File attachments on tasks
- 📊 Advanced analytics and reporting
- 🔔 Real-time updates with WebSockets
- 🌍 Internationalization (i18n)
- 📱 Mobile app (React Native)
- 🔍 Advanced search functionality
- 📅 Calendar view for tasks
- ⚡ Task priorities and labels

## 🧪 Testing the Application

### Manual Testing Checklist

**Authentication:**
- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Protected route redirection

**Admin Role:**
- [ ] View all tasks
- [ ] Create task for any employee
- [ ] Update any task
- [ ] Delete any task
- [ ] View all employees

**Manager Role:**
- [ ] View all tasks
- [ ] Create and manage tasks
- [ ] Cannot delete employees

**User Role:**
- [ ] View only assigned tasks
- [ ] Update own task status
- [ ] Cannot see other users' tasks

**Dashboard:**
- [ ] Statistics display correctly
- [ ] Recent tasks show correctly
- [ ] Completion rate calculates properly

**Task Filtering:**
- [ ] Filter by status works
- [ ] Filter by employee works
- [ ] Clear filters works

## 📦 Dependencies

### Backend Dependencies
```json
{
  "@prisma/client": "^5.7.0",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2"
}
```

### Backend Dev Dependencies
```json
{
  "nodemon": "^3.0.2",
  "prisma": "^5.7.0"
}
```

### Frontend Dependencies
```json
{
  "axios": "^1.6.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1"
}
```

### Frontend Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "tailwindcss": "^3.3.6",
  "vite": "^5.0.8"
}
```

## 🐛 Troubleshooting

### Backend Issues

**Problem: "Port 5000 already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

**Problem: "Prisma Client did not initialize yet"**
```bash
npx prisma generate
```

**Problem: "Unknown argument password"**
```bash
# Delete and regenerate
Remove-Item -Recurse -Force node_modules\.prisma
npx prisma generate
```

### Frontend Issues

**Problem: "Network Error" or "Request failed"**
- Check if backend is running on port 5000
- Verify CORS is configured correctly
- Check browser console for errors

**Problem: "White page / Nothing displays"**
- Check browser console for errors
- Verify all dependencies are installed
- Clear browser cache

**Problem: "Cannot find module"**
```bash
# Delete and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

## 📝 Code Quality Highlights

### Backend Best Practices
✅ **MVC Architecture** - Clear separation of concerns  
✅ **Try-Catch Blocks** - Comprehensive error handling  
✅ **Input Validation** - Server-side validation for all inputs  
✅ **Consistent Responses** - Standardized API response format  
✅ **Security Middleware** - JWT verification on protected routes  
✅ **Environment Variables** - Sensitive data in .env  
✅ **Database Relationships** - Proper foreign keys and cascading  

### Frontend Best Practices
✅ **Service Layer** - API calls centralized (no direct axios in components)  
✅ **Component Reusability** - DRY principle applied  
✅ **Protected Routes** - HOC pattern for route protection  
✅ **Context API** - Global auth state management  
✅ **Loading States** - UX feedback during async operations  
✅ **Error Handling** - User-friendly error messages  
✅ **Responsive Design** - Mobile-first Tailwind CSS  

## 🏆 Project Highlights

This project demonstrates:

1. **Full-Stack Proficiency** - Complete integration of frontend, backend, and database
2. **Security Awareness** - JWT authentication, password hashing, role-based access
3. **Clean Architecture** - MVC pattern, service layer, separation of concerns
4. **Modern Best Practices** - React Hooks, async/await, REST API design
5. **Production-Ready Code** - Error handling, validation, environment variables
6. **User Experience** - Responsive design, loading states, intuitive UI
7. **Documentation** - Comprehensive README with examples and setup instructions

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

## 🤝 Contributing

This is an internship challenge project. If you'd like to extend it:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 👨‍💻 Author

Created as part of a Full-Stack Development Internship Challenge.

**Tech Stack:** PERN (PostgreSQL/SQLite + Express + React + Node.js)  
**Special Features:** JWT Authentication, Role-Based Access Control  
**Time Invested:** ~10-12 hours

---

**⭐ If you found this project helpful, please consider giving it a star!**

## 📁 Project Structure

```
/root
  /backend
    /app
      /controllers
        - taskController.js
        - employeeController.js
        - dashboardController.js
      /routes
        - tasks.js
        - employees.js
        - dashboard.js
    /prisma
      - schema.prisma
      - seed.js
    - server.js
    - package.json
  /frontend
    /src
      /components
        - TaskForm.jsx
      /pages
        - Dashboard.jsx
        - Tasks.jsx
      /services
        - api.js
      - App.jsx
      - main.jsx
      - index.css
    - package.json
    - vite.config.js
    - tailwind.config.js
    - index.html
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma Client, run migrations, and seed database:**
   ```bash
   npm run setup
   ```
   
   Or run individually:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

**Backend** (`backend/.env`):
```bash
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
CORS_ORIGIN=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

Copy the `.env.example` files and rename them to `.env` before running the application.

## 📊 Features

### Dashboard
- Total Tasks count
- Completed Tasks count
- Total Employees count
- Completion Rate percentage
- Task breakdown by status (To Do, In Progress, Done)
- Recent tasks list with employee details

### Task Management
- View all tasks with filters (by Status and Employee)
- Create new tasks with validation
- Update task status and details
- Delete tasks with confirmation
- Assign tasks to employees

### API Endpoints

#### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

#### Tasks
- `GET /api/tasks` - Get all tasks (supports `?status=` and `?employeeId=` filters)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

#### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## 🗄️ Database Schema

### Employee Model
- `id` - Auto-incrementing integer
- `name` - String
- `email` - Unique string
- `role` - String (default: "USER")
- `tasks` - Relation to Task[]
- `createdAt` - DateTime

### Task Model
- `id` - Auto-incrementing integer
- `title` - String (required)
- `description` - Optional string
- `status` - String (TODO, IN_PROGRESS, DONE)
- `dueDate` - Optional DateTime
- `employeeId` - Integer (foreign key)
- `employee` - Relation to Employee
- `createdAt` - DateTime

## 🎨 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma** - ORM
- **SQLite** - Database (portable)

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing

## 📝 Architecture Highlights

### Backend (MVC Pattern)
- **Controllers**: Handle business logic and database operations
- **Routes**: Define API endpoints and map to controllers
- **Models**: Defined via Prisma schema
- **Validation**: Title and employeeId validation on task creation
- **Error Handling**: Try-catch blocks in all controllers

### Frontend (Component + Service Layer)
- **Services Layer**: All API calls centralized in `api.js`
- **Components**: Reusable UI components (e.g., TaskForm)
- **Pages**: Route-level views (Dashboard, Tasks)
- **No Direct API Calls**: Components never use axios/fetch directly

## 🧪 Testing the Application

The seed script creates:
- 3 Employees (John Doe, Jane Smith, Bob Johnson)
- 5 Sample Tasks with various statuses

You can immediately test all features after running the setup!

## 🛠️ Useful Commands

### Backend
```bash
npm run dev              # Start development server
npm run seed            # Reseed database
npm run prisma:studio   # Open Prisma Studio GUI
npm run prisma:migrate  # Run migrations
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 📦 Dependencies

### Backend Dependencies
- express
- @prisma/client
- cors

### Backend Dev Dependencies
- prisma
- nodemon

### Frontend Dependencies
- react
- react-dom
- react-router-dom
- axios

### Frontend Dev Dependencies
- vite
- @vitejs/plugin-react
- tailwindcss
- autoprefixer
- postcss

## 🎯 Challenge Requirements Met

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| View employees & tasks | ✅ | Dashboard + Tasks page |
| Add/update tasks | ✅ | TaskForm component with validation |
| Filter by status/employee | ✅ | Query params on GET /api/tasks |
| Dashboard summary | ✅ | Total tasks, completion rate, breakdowns |
| Frontend-Backend API | ✅ | REST API with axios service layer |
| Database persistence | ✅ | SQLite with Prisma ORM |
| Responsive UI | ✅ | Tailwind CSS with grid layouts |
| Clear architecture | ✅ | MVC backend, Component/Service frontend |
| Code quality | ✅ | Modular, validated, error handling |
| Documentation | ✅ | Comprehensive README with setup |

### Architecture Highlights
✅ **Strict Directory Structure**: MVC on backend, Component + Service on frontend  
✅ **Backend Validation**: Title and employeeId validation with try-catch blocks  
✅ **Service Layer**: All API calls in `services/api.js`  
✅ **No Direct API Calls**: Components import from api.js only  
✅ **Clean UI**: Tailwind CSS with responsive grid layouts  
✅ **Seed Script**: Immediate testing with sample data  
✅ **Complete CRUD**: Full task and employee management  
✅ **Advanced Filtering**: By status and employee via query parameters  

## 🎨 Screenshots

### Dashboard View
![Dashboard](./docs/dashboard.png)
*Shows task statistics, completion rate, and recent tasks*

### Task Management
![Tasks List](./docs/tasks-list.png)
*Filter tasks by status and employee, full CRUD operations*

### Task Form
![Task Form](./docs/task-form.png)
*Create and edit tasks with validation*

## 📝 API Response Examples

### GET /api/dashboard
```json
{
  "success": true,
  "data": {
    "totalTasks": 5,
    "completedTasks": 1,
    "totalEmployees": 3,
    "todoTasks": 2,
    "inProgressTasks": 2,
    "completionRate": 20,
    "recentTasks": [...]
  }
}
```

### POST /api/tasks
```json
{
  "success": true,
  "data": {
    "id": 6,
    "title": "New Task",
    "description": "Task description",
    "status": "TODO",
    "dueDate": "2025-12-31T00:00:00.000Z",
    "employeeId": 1,
    "employee": {...}
  },
  "message": "Task created successfully"
}
```

## 🚧 Assumptions & Limitations

### Assumptions
- Single-tenant application (no multi-company support)
- Task statuses limited to: TODO, IN_PROGRESS, DONE
- No task priority levels
- No file attachments on tasks
- No email notifications

### Known Limitations
- No authentication/authorization (bonus feature not implemented)
- No task comments or activity history
- No bulk operations (delete multiple tasks)
- No export functionality (CSV/PDF)
- Basic date handling (no timezone support)

### Future Enhancements
- Add user authentication with JWT
- Implement role-based access control
- Add task comments and attachments
- Real-time updates with WebSockets
- Email notifications for due tasks
- Advanced analytics and reporting

## 📄 License


MIT

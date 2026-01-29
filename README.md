# TasteTrail Frontend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

## Features

### Completed
- **Authentication**: User login/registration with JWT tokens
- **User Roles**: User and Admin role management
- **Dashboard**: Navigation-based user dashboard with 3 sections
- **Recipe Discovery**: Recipe list with search and filter
- **Recipe Detail**: Full recipe information with ingredients, instructions and reviews
- **Meal Planning**: Basic meal planning interface
- **Smart Grocery List**: Automatically generates grocery lists from meal plans
- **Landing Page**: Home page with navigation

### Project Structure

```
src/
├── components/
│   ├── dashboard/                  # User dashboard components
│   └── recipes/                   # Recipe-specific components
├── context/
│   └── AuthContext.jsx             # Authentication state
├── hooks/
├── pages/
│   ├── AdminDashboard.jsx           # Admin dashboard
│   ├── DashboardPage.jsx             # User dashboard
│   ├── LoginPage.jsx
│   ├── RegistrationPage.jsx
│   ├── Home_page.jsx
│   └── StartOrder.jsx
│   ├── ResetPassword.jsx
│   ├── RecipeList.jsx
│   ├── RecipeDetail.jsx
│   ├── MealPlanner.jsx
│   └── LandingPage.jsx
├── services/
│   └── api.js
├── utils/
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css
```

## Deployment

### Vercel Deployment

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` (your backend API URL)
5. Deploy!

## Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 18
- React Router 6
- Tailwind CSS 3
- Axios
- Vite
// Admin dashboard styling
// Recipe management UI
// Category management UI
// Review moderation UI
// User management UI
// Admin analytics dashboard
// Form validation improvements
// Responsive design enhancements
// API integration completion

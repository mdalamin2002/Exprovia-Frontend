import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserDashboard from './components/dashboard/UserDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryManagement from './pages/admin/CategoryManagement';
import RecipeManagement from './pages/admin/RecipeManagement';
import ReviewManagement from './pages/admin/ReviewManagement';
import UserManagement from './pages/admin/UserManagement';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MealPlanner from './pages/MealPlanner';
import RecipeDetail from './pages/RecipeDetail';
import RecipeList from './pages/RecipeList';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Redirect authenticated users
const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  }
  
  return children;
};

// Main App Component
const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/landing" 
          element={
            <RedirectIfAuthenticated>
              <LandingPage />
            </RedirectIfAuthenticated>
          } 
        />
        <Route 
          path="/login" 
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          } 
        />
        <Route 
          path="/register" 
          element={
            <RedirectIfAuthenticated>
              <Register />
            </RedirectIfAuthenticated>
          } 
        />
        
        {/* Protected User Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recipes" 
          element={
            <ProtectedRoute>
              <RecipeList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recipes/:id" 
          element={
            <ProtectedRoute>
              <RecipeDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/meal-planner" 
          element={
            <ProtectedRoute>
              <MealPlanner />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/recipes" 
          element={
            <ProtectedRoute adminOnly>
              <RecipeManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/categories" 
          element={
            <ProtectedRoute adminOnly>
              <CategoryManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reviews" 
          element={
            <ProtectedRoute adminOnly>
              <ReviewManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute adminOnly>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        
        {/* Default Redirect */}
        <Route 
          path="/" 
          element={<Navigate to="/landing" replace />} 
        />
      </Routes>
    </Router>
  );
};

// Main App with Auth Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

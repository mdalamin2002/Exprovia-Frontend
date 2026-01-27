import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">TasteTrail</h1>
            <div className="ml-10 flex space-x-8">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'discover' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Discover Recipes
              </button>
              <button
                onClick={() => setActiveTab('meal-plan')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'meal-plan' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Meal Planner
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'recommendations' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Recommendations
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 hidden md:block">Welcome, {user?.name}</span>
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                {user?.profilePhoto ? (
                  <img 
                    src={user.profilePhoto} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <span className="hidden md:inline">{user?.name || 'User'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discover');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'discover' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Recipes</h2>
              <p className="text-gray-600">Find your next favorite meal</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">���</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Recipe Discovery</h3>
              <p className="text-gray-600 mb-6">
                Browse thousands of recipes from around the world. Filter by cuisine, category, or dietary preferences.
              </p>
              <Link to="/recipes" className="btn-primary inline-block">
                Browse Recipes
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'meal-plan' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Meal Planner</h2>
              <p className="text-gray-600">Plan your meals for the week</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">���</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Meal Planning</h3>
              <p className="text-gray-600 mb-6">
                Plan your meals for the week, generate grocery lists, and track your cooking progress.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/meal-planner" className="btn-primary">
                  Plan Meals
                </Link>
                <Link to="/meal-planner" className="btn-secondary">
                  Grocery List
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personalized Recommendations</h2>
              <p className="text-gray-600">Recipes tailored just for you</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">���</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 mb-6">
                Get personalized recipe suggestions based on your cooking history, preferences, and ratings.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="btn-primary" disabled>
                  View Recommendations (Coming Soon)
                </button>
                <button className="btn-secondary" disabled>
                  Trending Recipes (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;

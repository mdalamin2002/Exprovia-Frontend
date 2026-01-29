import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { recipeAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    pendingReviews: 0,
    featuredRecipes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch recipes
      const recipeResponse = await recipeAPI.getAll();
      const recipes = recipeResponse.data.recipes || [];
      
      // For user stats, we'll need a user API endpoint
      // This is a placeholder - you'd need to implement this on the backend
      const userStats = {
        totalUsers: 9, // From our test data
        pendingReviews: 2, // Placeholder
        featuredRecipes: recipes.filter(r => r.featured).length
      };

      setStats({
        totalRecipes: recipes.length,
        totalUsers: userStats.totalUsers,
        pendingReviews: userStats.pendingReviews,
        featuredRecipes: userStats.featuredRecipes
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Recipes',
      value: stats.totalRecipes,
      icon: '🍳',
      color: 'bg-blue-500',
      change: '+12% from last month'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-green-500',
      change: '+8% from last month'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: '⭐',
      color: 'bg-yellow-500',
      change: '3 requiring moderation'
    },
    {
      title: 'Featured Recipes',
      value: stats.featuredRecipes,
      icon: '🌟',
      color: 'bg-purple-500',
      change: 'Showing in homepage'
    }
  ];

  if (loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminSidebar>
    );
  }

  return (
    <AdminSidebar>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Recipes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Recipes</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600">🍝</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Spaghetti Carbonara</p>
                    <p className="text-sm text-gray-500">Added today</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Published
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600">🍛</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Chicken Tikka Masala</p>
                    <p className="text-sm text-gray-500">Added yesterday</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Pending
                  </span>
                </div>
              </div>
              <button className="mt-4 w-full text-center text-primary-600 hover:text-primary-700 font-medium py-2">
                View All Recipes →
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl mb-2">➕</span>
                  <span className="text-sm font-medium text-gray-700">Add Recipe</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl mb-2">🏷️</span>
                  <span className="text-sm font-medium text-gray-700">Add Category</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl mb-2">⭐</span>
                  <span className="text-sm font-medium text-gray-700">Review Moderation</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-2xl mb-2">📊</span>
                  <span className="text-sm font-medium text-gray-700">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Database</p>
                  <p className="text-sm text-gray-500">Connected and healthy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">API Server</p>
                  <p className="text-sm text-gray-500">Running smoothly</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Storage</p>
                  <p className="text-sm text-gray-500">85% capacity used</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminDashboard;
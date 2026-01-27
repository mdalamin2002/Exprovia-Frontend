import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">TasteTrail Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin: {user?.name}</span>
              <button
                onClick={logout}
                className="btn-primary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">���</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
            <p className="text-gray-600">Manage recipes, categories, and user reviews.</p>
            <p className="text-gray-600 mt-2">Admin features coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

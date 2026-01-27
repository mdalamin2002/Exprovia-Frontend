import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">TasteTrail</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal <span className="text-primary-600">Recipe Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Discover, plan, and cook delicious meals tailored to your taste. 
            TasteTrail helps you organize your culinary adventures with smart recommendations and meal planning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Start Cooking Today
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Cook Smarter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From recipe discovery to meal planning, we've got you covered with all the tools you need to become a kitchen master.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recipe Discovery */}
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">���</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Recipe Discovery</h3>
              <p className="text-gray-600 mb-6">
                Browse thousands of recipes from around the world. Filter by cuisine, category, or dietary preferences.
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Search by ingredients or recipe name</li>
                <li>• Filter by cuisine and category</li>
                <li>• Save your favorite recipes</li>
                <li>• Read user reviews and ratings</li>
              </ul>
            </div>

            {/* Meal Planning */}
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">���</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Meal Planning</h3>
              <p className="text-gray-600 mb-6">
                Plan your meals for the week and generate grocery lists automatically.
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Weekly meal planning calendar</li>
                <li>• Track cooking progress</li>
                <li>• Auto-generate grocery lists</li>
                <li>• Mark items as purchased</li>
              </ul>
            </div>

            {/* Recommendations */}
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">���</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
              <p className="text-gray-600 mb-6">
                Get recipe suggestions tailored to your taste and cooking history.
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• AI-powered recommendations</li>
                <li>• Based on your preferences</li>
                <li>• Trending and popular recipes</li>
                <li>• Seasonal suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of home cooks who are already discovering new recipes and planning delicious meals with TasteTrail.
          </p>
          <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105">
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-primary-400 mb-4">TasteTrail</h3>
              <p className="text-gray-400 mb-4">
                Your personal recipe recommendation and meal planning companion. 
                Discover, plan, and cook delicious meals tailored to your taste.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Recipe Discovery</li>
                <li>Meal Planning</li>
                <li>Smart Grocery Lists</li>
                <li>Personalized Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TasteTrail. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

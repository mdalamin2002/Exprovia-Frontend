import { useEffect, useState } from 'react';
import RecipeCard from '../components/recipes/RecipeCard';
import { useAuth } from '../context/AuthContext';
import { categoryAPI, recipeAPI } from '../services/api';

const RecipeList = () => {
  const { addFavorite, removeFavorite } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cuisines = [
    'Italian', 'Mexican', 'Indian', 'Chinese', 'Thai', 'French', 
    'American', 'Japanese', 'Korean', 'Middle Eastern', 'Greek', 'Mediterranean', 'Other'
  ];
  
  const difficulties = ['Easy', 'Medium', 'Hard'];

  useEffect(() => {
    fetchCategories();
    fetchRecipes();
  }, [currentPage, searchTerm, selectedCategory, selectedCuisine, selectedDifficulty]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = {
        page: currentPage,
        keyword: searchTerm || undefined,
        category: selectedCategory || undefined,
        cuisine: selectedCuisine || undefined,
        difficulty: selectedDifficulty || undefined,
      };

      const response = await recipeAPI.getAll(params);
      setRecipes(response.data.recipes);
      setTotalPages(response.data.pages);
    } catch (error) {
      setError('Failed to fetch recipes');
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRecipes();
  };

  const handleFavorite = async (recipeId) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isFavorite = user.favorites?.includes(recipeId);
    
    try {
      if (isFavorite) {
        await removeFavorite(recipeId);
      } else {
        await addFavorite(recipeId);
      }
      // Refresh recipes to update favorite status
      fetchRecipes();
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  const handleAddToMealPlan = (recipe) => {
    // This will be implemented when meal planner is ready
    alert(`Add ${recipe.name} to meal plan - coming soon!`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCuisine('');
    setSelectedDifficulty('');
    setCurrentPage(1);
  };

  if (loading && recipes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Recipes</h1>
          <p className="text-gray-600">Find your next favorite meal</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Recipes
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or ingredient..."
                  className="input"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cuisine Filter */}
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine
                </label>
                <select
                  id="cuisine"
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="input"
                >
                  <option value="">All Cuisines</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="input"
                >
                  <option value="">All Levels</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={resetFilters}
                className="btn-secondary"
              >
                Reset Filters
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {recipes.length} recipes
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && ` in ${selectedCategory}`}
            {selectedCuisine && ` from ${selectedCuisine}`}
          </p>
        </div>

        {/* Recipe Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onFavorite={handleFavorite}
                onAddToMealPlan={handleAddToMealPlan}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages));
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
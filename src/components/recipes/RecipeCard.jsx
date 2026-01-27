import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RecipeCard = ({ recipe, onAddToMealPlan, onFavorite }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const isFavorite = user?.favorites?.includes(recipe._id);
  
  const handleCardClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onFavorite && isAuthenticated) {
      onFavorite(recipe._id);
    }
  };
  
  const handleMealPlanClick = (e) => {
    e.stopPropagation();
    if (onAddToMealPlan && isAuthenticated) {
      onAddToMealPlan(recipe);
    }
  };

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <div className="relative">
        {recipe.image ? (
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-2">
          {isAuthenticated && (
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:bg-red-100 transition-colors`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
          {isAuthenticated && (
            <button
              onClick={handleMealPlanClick}
              className="p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Add to meal plan"
            >
              📅
            </button>
          )}
        </div>
        {recipe.featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
            {recipe.cuisine}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {recipe.category}
          </span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {recipe.difficulty}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <span>⏱️ {recipe.cookingTime} min</span>
            <span className="mx-2">•</span>
            <span>🔥 {recipe.calories} cal</span>
          </div>
          <div className="flex items-center">
            {recipe.averageRating > 0 && (
              <>
                <span className="text-yellow-500">⭐</span>
                <span className="ml-1">{recipe.averageRating.toFixed(1)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
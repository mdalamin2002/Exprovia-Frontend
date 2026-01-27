import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recipeAPI, reviewAPI } from '../services/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, addFavorite, removeFavorite } = useAuth();
  
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const isFavorite = user?.favorites?.includes(id);

  useEffect(() => {
    fetchRecipe();
    fetchReviews();
  }, [id]);

  const fetchRecipe = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await recipeAPI.getById(id);
      setRecipe(response.data);
    } catch (error) {
      setError('Failed to fetch recipe details');
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getByRecipe(id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
      fetchRecipe(); // Refresh to update favorite status
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  const handleAddToMealPlan = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // This will be implemented when meal planner is ready
    alert(`Add ${recipe?.name} to meal plan - coming soon!`);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSubmittingReview(true);
    setReviewError('');

    try {
      await reviewAPI.create({
        recipeId: id,
        rating: parseInt(newReview.rating),
        comment: newReview.comment,
      });
      
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(); // Refresh reviews
    } catch (error) {
      setReviewError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/recipes')}
            className="btn-primary"
          >
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/recipes')}
          className="mb-6 flex items-center text-primary-600 hover:text-primary-700"
        >
          ← Back to Recipes
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="lg:col-span-2">
            {/* Recipe Image */}
            <div className="card mb-6">
              {recipe.image ? (
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <span className="text-gray-500 text-xl">No image available</span>
                </div>
              )}
            </div>

            {/* Recipe Details */}
            <div className="card mb-6">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
                  {isAuthenticated && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleFavorite}
                        className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-red-100 transition-colors`}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        {isFavorite ? '❤️' : '🤍'}
                      </button>
                      <button
                        onClick={handleAddToMealPlan}
                        className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                        aria-label="Add to meal plan"
                      >
                        📅
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{recipe.description}</p>
                
                {/* Recipe Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{recipe.cookingTime}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{recipe.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{recipe.servings}</div>
                    <div className="text-sm text-gray-600">Servings</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{recipe.difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.cuisine}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.category}
                  </span>
                  {recipe.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                {/* Rating */}
                {recipe.averageRating > 0 && (
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star}
                          className={`text-2xl ${star <= recipe.averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-medium text-gray-900">
                      {recipe.averageRating.toFixed(1)}
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({recipe.numReviews} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div className="card mb-6">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-gray-600">{ingredient.quantity} {ingredient.unit}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No ingredients listed</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions && recipe.instructions.length > 0 ? (
                    recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                          {instruction.step}
                        </span>
                        <span className="pt-1">{instruction.description}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No instructions provided</li>
                  )}
                </ol>
              </div>
            </div>
          </div>

          {/* Right Column - Reviews */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
                
                {/* Add Review Form */}
                {isAuthenticated && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Add a Review</h3>
                    {reviewError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3 text-sm">
                        {reviewError}
                      </div>
                    )}
                    <form onSubmit={handleSubmitReview} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        <select
                          value={newReview.rating}
                          onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                          className="input w-full"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Comment
                        </label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                          placeholder="Share your experience with this recipe..."
                          className="textarea"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="w-full btn-primary disabled:opacity-50"
                      >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review._id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span 
                                key={star}
                                className={`text-sm ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {review.user?.name || 'Anonymous'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No reviews yet. Be the first to review this recipe!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
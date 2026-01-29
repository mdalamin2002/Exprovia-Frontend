import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { reviewAPI } from '../../services/api';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getAll();
      let filteredReviews = response.data;
      
      if (filter === 'pending') {
        filteredReviews = filteredReviews.filter(review => !review.approved);
      } else if (filter === 'approved') {
        filteredReviews = filteredReviews.filter(review => review.approved);
      }
      
      setReviews(filteredReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      await reviewAPI.approve(reviewId);
      fetchReviews();
    } catch (error) {
      console.error('Failed to approve review:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.delete(reviewId);
        fetchReviews();
      } catch (error) {
        console.error('Failed to delete review:', error);
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'pending') return !review.approved;
    if (filter === 'approved') return review.approved;
    return true;
  });

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
            <p className="text-gray-600 mt-2">Moderate user reviews and ratings</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pending ({reviews.filter(r => !r.approved).length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'approved' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Approved ({reviews.filter(r => r.approved).length})
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {review.user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.user?.name || 'Anonymous'}</h3>
                    <p className="text-sm text-gray-500">for {review.recipe?.name || 'Unknown Recipe'}</p>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star}
                          className={`text-lg ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {!review.approved && (
                    <button
                      onClick={() => handleApprove(review._id)}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 text-sm font-medium"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{review.comment}</p>
              </div>
              
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>Submitted: {new Date(review.createdAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  review.approved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {review.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">⭐</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'pending' ? 'No pending reviews' : 
               filter === 'approved' ? 'No approved reviews' : 'No reviews found'}
            </h3>
            <p className="text-gray-500">
              {filter === 'pending' ? 'All reviews are approved!' : 
               filter === 'approved' ? 'No reviews have been approved yet' : 
               'Reviews will appear here once users submit them'}
            </p>
          </div>
        )}
      </div>
    </AdminSidebar>
  );
};

export default ReviewManagement;
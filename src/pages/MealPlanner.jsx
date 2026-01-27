import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { groceryListAPI, mealPlanAPI } from '../services/api';

const MealPlanner = () => {
  const { user } = useAuth();
  const [mealPlans, setMealPlans] = useState([]);
  const [groceryList, setGroceryList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('planner');
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

  function getCurrentWeek() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    fetchMealPlans();
    fetchGroceryList();
  }, [selectedWeek]);

  const fetchMealPlans = async () => {
    try {
      const response = await mealPlanAPI.getWeekly(selectedWeek);
      setMealPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch meal plans:', error);
    }
  };

  const fetchGroceryList = async () => {
    try {
      const response = await groceryListAPI.getByWeek(selectedWeek);
      setGroceryList(response.data);
    } catch (error) {
      console.error('Failed to fetch grocery list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateGroceryList = async () => {
    try {
      const response = await groceryListAPI.generate({
        week: selectedWeek,
      });
      setGroceryList(response.data);
    } catch (error) {
      console.error('Failed to generate grocery list:', error);
    }
  };

  const handleToggleItem = async (itemId, purchased) => {
    try {
      await groceryListAPI.updateItem(selectedWeek, itemId, { purchased: !purchased });
      fetchGroceryList();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Meal Planner</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('planner')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'planner' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Meal Plan
              </button>
              <button
                onClick={() => setActiveTab('grocery')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'grocery' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Grocery List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Week Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Week
          </label>
          <input
            type="week"
            value={selectedWeek.replace('-W', '-W')}
            onChange={(e) => setSelectedWeek(e.target.value.replace('-W', '-W'))}
            className="input max-w-xs"
          />
        </div>

        {activeTab === 'planner' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Weekly Meal Plan</h2>
              <button className="btn-primary" disabled>
                Add Meal (Coming Soon)
              </button>
            </div>
            
            {mealPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                  const dayPlans = mealPlans.filter(plan => {
                    const planDate = new Date(plan.date);
                    return planDate.getDay() === index;
                  });
                  
                  return (
                    <div key={day} className="bg-white rounded-lg shadow-md p-4">
                      <h3 className="font-bold text-gray-900 mb-3">{day}</h3>
                      {dayPlans.length > 0 ? (
                        <div className="space-y-2">
                          {dayPlans.map((plan) => (
                            <div key={plan._id} className="border-l-4 border-primary-500 pl-2">
                              <p className="font-medium text-gray-900">{plan.recipe?.name}</p>
                              <p className="text-sm text-gray-600">{plan.mealType}</p>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                plan.status === 'Cooked' ? 'bg-green-100 text-green-800' :
                                plan.status === 'Cooking' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {plan.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No meals planned</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-6xl mb-4">���</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Meal Plans Yet</h3>
                <p className="text-gray-600 mb-6">
                  Start planning your meals for the week by adding recipes to your meal plan.
                </p>
                <button className="btn-primary" disabled>
                  Add Meal (Coming Soon)
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'grocery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Grocery List</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleGenerateGroceryList}
                  className="btn-primary"
                >
                  Generate List
                </button>
                <button className="btn-secondary" disabled>
                  Export List (Coming Soon)
                </button>
              </div>
            </div>
            
            {groceryList && groceryList.items.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Week {selectedWeek.split('-W')[1]} Grocery List
                  </h3>
                  <p className="text-sm text-gray-500">
                    {groceryList.items.filter(item => item.purchased).length} of {groceryList.items.length} items purchased
                  </p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {groceryList.items.map((item) => (
                    <div key={item._id} className="p-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={item.purchased}
                        onChange={() => handleToggleItem(item._id, item.purchased)}
                        className="h-4 w-4 text-primary-600 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className={`font-medium ${item.purchased ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {item.category}
                          </span>
                          {item.recipe && (
                            <span className="text-xs text-gray-500">
                              For: {item.recipe.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-6xl mb-4">���</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Grocery List</h3>
                <p className="text-gray-600 mb-6">
                  Generate a grocery list based on your meal plans for the week.
                </p>
                <button
                  onClick={handleGenerateGroceryList}
                  className="btn-primary"
                >
                  Generate Grocery List
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;

import { StarIcon, ThermometerIcon } from '@phosphor-icons/react';

export default function TodaysOutfit() {
  const todaysOutfit = {
    weather: '22°C, Sunny',
    mood: 'Professional',
    items: ['Navy Blazer', 'White Blouse', 'Black Jeans', 'Leather Boots'],
    confidence: 95,
  };
  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Today's Perfect Match
        </h2>
        <div className="flex items-center space-x-2">
          <ThermometerIcon className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">{todaysOutfit.weather}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="grid grid-cols-4 gap-3">
          {todaysOutfit.items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-2">
                <span className="text-2xl">
                  {item.includes('Blazer')
                    ? '🧥'
                    : item.includes('Blouse')
                      ? '👔'
                      : item.includes('Jeans')
                        ? '👖'
                        : '🥾'}
                </span>
              </div>
              <p className="text-xs text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">
            Confidence: {todaysOutfit.confidence}%
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Shuffle
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
            I Love It!
          </button>
        </div>
      </div>
    </div>
  );
}

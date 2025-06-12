import { TrophyIcon } from '@phosphor-icons/react';

export default function ActiveChallenges() {
  const challenges = [
    { id: 1, title: 'Monochrome Monday', progress: 75, reward: '50 pts' },
    { id: 2, title: 'Sustainable Style', progress: 40, reward: '100 pts' },
    { id: 3, title: 'Color Pop Week', progress: 20, reward: '75 pts' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Active Challenges
        </h3>
        <TrophyIcon className="w-5 h-5 text-yellow-500" />
      </div>
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-xl p-4 shadow-sm border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                {challenge.title}
              </span>
              <span className="text-sm text-purple-600 font-medium">
                {challenge.reward}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

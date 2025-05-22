import React, { useState } from 'react';

const themeIcons = {
  "Haunted Mansion Mystery": "https://funnelmates.com/wp-content/uploads/2025/05/Haunted-Mansion.png",
  "Space Station Adventure": "https://funnelmates.com/wp-content/uploads/2025/05/Space-Station.png",
  "Ancient Egyptian Tomb": "https://funnelmates.com/wp-content/uploads/2025/05/Ancient-Egyptian-Tomb.png",
  "Medieval Castle Quest": "https://funnelmates.com/wp-content/uploads/2025/05/Medieval-Castle-Quest.png",
  "Underwater Laboratory": "https://funnelmates.com/wp-content/uploads/2025/05/Underwater-Laboratory.png",
  "Lost Jungle Temple": "https://funnelmates.com/wp-content/uploads/2025/05/Lost-Jungle-Temple.png",
  "Steampunk Workshop": "https://funnelmates.com/wp-content/uploads/2025/05/Steampunk-Workshop.png",
  "Arctic Research Base": "https://funnelmates.com/wp-content/uploads/2025/05/Arctic-Research-Base.png",
  "Time Travel Agency": "https://funnelmates.com/wp-content/uploads/2025/05/Time-Travel-Agency.png",
  "Wizard's Library": "https://funnelmates.com/wp-content/uploads/2025/05/Wizards-Library.png"
};

export default function ThemeSelector({ onSelect }) {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    onSelect(theme);
  };

  const handleCustomTheme = () => {
    if (customTheme.trim()) {
      handleThemeSelect(customTheme);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(themeIcons).map(([theme, iconUrl]) => (
          <button
            key={theme}
            onClick={() => handleThemeSelect(theme)}
            className={`relative h-48 overflow-hidden rounded-lg transition-all transform hover:scale-105 ${
              selectedTheme === theme
                ? 'ring-2 ring-blue-500'
                : 'hover:ring-1 hover:ring-gray-400'
            }`}
          >
            <img
              src={iconUrl}
              alt={theme}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-medium text-center">
              {theme}
            </h3>
          </button>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-xl font-medium mb-4">Create Your Own Theme</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={customTheme}
            onChange={(e) => setCustomTheme(e.target.value)}
            placeholder="Enter your custom theme..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCustomTheme}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={!customTheme.trim()}
          >
            Create Theme
          </button>
        </div>
      </div>
    </div>
  );
}

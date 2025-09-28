import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim().replace('@', ''));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram username..."
            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-1.5 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              'Analyze'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-500">
          Try: <button 
            onClick={() => setUsername('aakanksha.monga')}
            className="text-blue-500 hover:underline"
          >
            Aakanksha Monga
          </button>, <button 
            onClick={() => setUsername('diptipariharsharma')}
            className="text-blue-500 hover:underline"
          >
            @Dipti Parihar Sharma
          </button>, or any public profile
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
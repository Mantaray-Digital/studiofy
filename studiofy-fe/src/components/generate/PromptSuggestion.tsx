'use client';

interface PromptSuggestionProps {
  text: string;
  onClick: (text: string) => void;
}

export function PromptSuggestion({ text, onClick }: PromptSuggestionProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(text)}
      className="w-full text-left px-5 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl transition-colors"
    >
      <p className="text-sm">{text}</p>
    </button>
  );
}

interface PromptSuggestionsListProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export function PromptSuggestionsList({ suggestions, onSelect }: PromptSuggestionsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {suggestions.map((suggestion, index) => (
        <PromptSuggestion
          key={index}
          text={suggestion}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}

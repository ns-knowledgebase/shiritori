interface InputProps {
  url: string;
  placeholder?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearName: () => void;
  onEnter?: () => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

export default function Input({
  url,
  placeholder,
  className,
  onChange,
  clearName,
  onEnter,
  onPaste,
}: InputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter?.();
    }
  };

  return (
    <div className={className}>
      <input
        tabIndex={1}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onPaste={onPaste}
        value={url}
        type="text"
        className="block w-full rounded-lg border border-gray-200 px-4 py-3 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:border-neutral-700 dark:focus:ring-neutral-600"
        placeholder={placeholder}
        autoComplete="off"
      />
      {url && (
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white pl-1 dark:bg-neutral-900"
          onClick={clearName}
        >
          <button
            tabIndex={2}
            className="inline-flex items-center justify-center rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-600 dark:text-white dark:hover:bg-neutral-700"
          >
            <p>Clear</p>
          </button>
        </div>
      )}
    </div>
  );
}

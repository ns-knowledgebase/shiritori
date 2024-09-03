import { tv } from 'tailwind-variants';
import { Plus, Minus } from 'lucide-react';

// Tailwind Variants for button
const buttonStyle = tv({
  base: 'inline-flex items-center justify-center gap-x-2 rounded-lg border px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50',
  variants: {
    color: {
      primary: 'border-transparent bg-blue-600 text-white hover:bg-blue-700',
      secondary:
        'border-gray-200 text-gray-800 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800',
    },
    font: {
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
});

interface ButtonProps {
  type: 'submit' | 'button';
  disabled?: boolean;
  color: 'primary' | 'secondary';
  font: 'medium' | 'semibold';
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  type,
  disabled = false,
  color,
  font,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonStyle({ color, font })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus:shadow-focus inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-400 outline-none hover:bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
    >
      <Plus size={18} />
    </button>
  );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus:shadow-focus inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-400 outline-none hover:bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
    >
      <Minus size={18} />
    </button>
  );
}

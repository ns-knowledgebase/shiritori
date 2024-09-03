'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/container';

export default function NotFound() {
  const router = useRouter();

  const handle = () => {
    router.push(window.location.origin);
  };

  return (
    <Container>
      <title>404: This page could not be found.</title>
      <div className="w-full max-w-sm space-y-4 rounded-lg border border-gray-200 p-4 dark:border-neutral-700 dark:text-white">
        <p className="text-sm font-medium">
          This page could not be found.
          <br />
          Error code:{' '}
          <span className="font-mono font-semibold">`NOT_FOUND`</span>
          <br />
          <button
            className="text-blue-600 decoration-2 hover:underline dark:text-blue-500"
            onClick={handle}
          >
            Back to Services
          </button>
        </p>
      </div>
    </Container>
  );
}

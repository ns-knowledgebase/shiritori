'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/container';

export default function License() {
  const router = useRouter();

  const handle = () => {
    router.push(
      process.env.NEXT_PUBLIC_GITHUB_URL
        ? `${process.env.NEXT_PUBLIC_GITHUB_URL}/blob/main/LICENSE`
        : '/'
    );
  };

  return (
    <Container>
      <div className="w-full max-w-sm space-y-4 rounded-lg border border-gray-200 p-4 dark:border-neutral-700 dark:text-white">
        <p className="text-sm font-medium">
          This website is open source
          <br />
          See the GitHub page for licenseinformation
          <br />
          <button
            className="text-blue-600 decoration-2 hover:underline dark:text-blue-500"
            onClick={handle}
          >
            Go to the license
          </button>
        </p>
      </div>
    </Container>
  );
}

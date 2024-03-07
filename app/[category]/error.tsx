"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <div>
        <h2>مشکلی به وجود آمد!</h2>
        <Link href={"/"}>
          <button>بازگشت به خانه</button>
        </Link>
      </div>
    </div>
  );
}

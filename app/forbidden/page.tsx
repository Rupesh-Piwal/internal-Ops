import Link from "next/link";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">403 - Forbidden</h1>
      <p className="mt-4 text-lg">
        You do not have permission to access this page.
      </p>
      <Link href="/" className="mt-8 text-blue-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default ForbiddenPage;

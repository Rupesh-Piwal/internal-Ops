import { checkRole } from "@/app/lib/roles";
import { redirect } from "next/navigation";

const AdminPage = () => {
  if (!checkRole("admin")) {
    redirect("/forbidden");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Admin Page</h1>
      <p className="mt-4 text-lg">
        This page is only accessible to users with the "admin" role.
      </p>
    </div>
  );
};

export default AdminPage;

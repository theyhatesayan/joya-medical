import AdminSidebar from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex flex-col lg:flex-row min-h-screen">
  <AdminSidebar />

  <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
    {children}
  </main>
</div>
  );
}
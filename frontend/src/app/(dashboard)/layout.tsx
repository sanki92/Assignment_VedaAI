import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen gap-3 bg-canvas p-3">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col gap-3">{children}</div>
    </div>
  );
}

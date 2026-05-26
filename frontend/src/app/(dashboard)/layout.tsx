import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen gap-3 overflow-hidden bg-gradient-to-b from-[#eeeeee] to-[#dadada] p-3">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">{children}</div>
    </div>
  );
}

import SidebarContent from "@/components/layout/SidebarContent";

export default function Sidebar() {
  return (
    <aside className="hidden w-[264px] shrink-0 flex-col rounded-2xl bg-surface p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:flex">
      <SidebarContent />
    </aside>
  );
}

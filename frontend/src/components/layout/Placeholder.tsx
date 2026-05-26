import Topbar from "@/components/layout/Topbar";

export default function Placeholder({ title }: { title: string }) {
  return (
    <>
      <Topbar title={title} />
      <main className="flex flex-1 items-center justify-center rounded-2xl bg-surface">
        <div className="text-center">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted">This section is coming soon.</p>
        </div>
      </main>
    </>
  );
}

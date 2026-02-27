import { DemoAccessForm } from "@/components/demo/demo-access-form";

export default async function DemoLoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next || "/";

  return (
    <div className="mx-auto max-w-md pt-8">
      <DemoAccessForm nextPath={nextPath} />
    </div>
  );
}

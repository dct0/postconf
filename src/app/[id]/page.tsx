import { notFound } from "next/navigation";
import { getDirect } from "../server/actions";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export const revalidate = 86400;

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const direct = await getDirect(id);

  if (!direct) {
    return notFound();
  }

  return (
    <div className="">
      <main>
        <header className="text-center">
          <h1 className="text-3xl font-bold">{direct.title}</h1>
          <h2>{direct.description}</h2>
          <Separator className="mt-2 mb-4" />
        </header>
        {direct.fields.map((field, i) => (
          <div key={`${field.name}-${i}`}>
            <Label>{field.name}</Label>
            <a href={field.url}>{field.url}</a>
          </div>
        ))}
      </main>
    </div>
  );
}

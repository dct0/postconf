import { Separator } from "@/components/ui/separator";
import Content from "./content";

export default function Home() {
  return (
    <div>
      <header>
        <h1 className="text-4xl text-center font-bold">PostConf</h1>
        <Separator className="mt-2 mb-4" />
      </header>
      <main>
        <Content />
      </main>
    </div>
  );
}

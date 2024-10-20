"use client";

import DirectPreview from "@/components/direct-card";
import { Form } from "@/components/ui/form";
import { insertDirectSchema, SelectDirect } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CreateDirectForm from "./form";

const mockDirect: SelectDirect = {
  id: "1",
  title: "Direct Title",
  description: "Direct Description",
  fields: [
    {
      name: "Field 1adaskdhaskjdhasjkdsahdkasjdhasjkdhkjhjk",
      url: "https://example.com",
    },
    {
      name: "Field 2",
      url: "https://example.com",
    },
    {
      name: "Field 3",
      url: "https://example.com",
    },
    {
      name: "Field 4",
      url: "https://example.com",
    },
  ],
  createdAt: new Date().toLocaleString(),
  expiresAt: new Date().toLocaleString(),
};

export default function Content() {
  const form = useForm<z.infer<typeof insertDirectSchema>>({
    resolver: zodResolver(insertDirectSchema),
    defaultValues: {
      title: "",
      description: "",
      fields: [
        {
          name: "",
          url: "",
        },
      ],
    },
  });

  const preview = form.watch();

  return (
    <Form {...form}>
      <div className="flex flex-col lg:flex-row gap-4">
        <CreateDirectForm />
        <DirectPreview className="flex-grow" direct={preview} />
      </div>
    </Form>
  );
}

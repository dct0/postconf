"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InsertDirect, insertDirectSchema } from "@/db/schema";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import { z, ZodError } from "zod";
import { createDirect } from "./server/actions";

export default function CreateDirectForm() {
  const form = useFormContext<z.infer<typeof insertDirectSchema>>();
  const { fields, append, remove } = useFieldArray({
    name: "fields",
    control: form.control,
    rules: {
      maxLength: 10,
    },
  });

  const [id, setId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<InsertDirect> = async (data) => {
    startTransition(async () => {
      try {
        const res = await createDirect(data);

        setId(res.id);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error(error);
          return;
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create a direct</CardTitle>
        <CardDescription>Share your links with your audience.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          id="create-direct-form"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Fields</FormLabel>
            <fieldset>
              {fields?.map((field, i) => (
                <div key={field.id} className="flex gap-4 mt-2">
                  <div className="basis-1/4">
                    <FormField
                      control={form.control}
                      name={`fields.${i}.name`}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...f} placeholder="Name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name={`fields.${i}.url`}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...f} placeholder="URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    onClick={() => remove(i)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <Button
                className="mt-2"
                variant="outline"
                size="sm"
                type="button"
                onClick={() => append({ name: "", url: "" })}
              >
                {/* <Plus /> */}
                Add Field
              </Button>
            </fieldset>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full self-center"
          type="submit"
          form="create-direct-form"
          disabled={isPending}
        >
          Create
        </Button>
        <Link href={`/${id}`} target="_blank">
          {id && <p>{id}</p>}
        </Link>
      </CardFooter>
    </Card>
  );
}

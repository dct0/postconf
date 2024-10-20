import { SelectDirect } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { LucideLink } from "lucide-react";
import Link from "next/link";
import { DeepPartial } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

interface DirectCardProps {
  className?: ClassValue;
  direct: DeepPartial<SelectDirect>;
}

export default function DirectCard({ className, direct }: DirectCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>Start typing!</CardDescription>
      </CardHeader>
      <CardContent>
        <article>
          <header className="text-center space-y-0.5">
            {direct.title ? (
              <h1 className="text-3xl font-bold">{direct.title}</h1>
            ) : (
              <Skeleton className="h-[36px] rounded-sm" />
            )}
            {direct.description ? (
              <h2>{direct.description}</h2>
            ) : (
              <Skeleton className="h-[24px] rounded-sm" />
            )}
            <Separator className="!my-6" />
          </header>
          <div className="grid grid-cols-2 gap-4">
            {direct.fields?.map((field, i) => (
              <div
                className="grid col-span-1 grid-rows-subgrid row-span-2 gap-0.5"
                key={`${field?.name}-${i}`}
              >
                {field?.name ? (
                  <Label className="font-medium w-[128px] break-words">
                    {field.name}
                  </Label>
                ) : (
                  <Skeleton className="h-[14px] rounded-sm" />
                )}
                {field?.url ? (
                  <div className="flex w-full items-center">
                    <Link
                      className="hover:underline"
                      href={field.url}
                      prefetch={false}
                      target="_blank"
                    >
                      {field.url}
                    </Link>
                    <div className="ml-auto">
                      <Link href={field.url} target="_blank">
                        <LucideLink size="16" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Skeleton className="h-[24px] rounded-sm" />
                )}
              </div>
            ))}
          </div>
        </article>
      </CardContent>
    </Card>
  );
}

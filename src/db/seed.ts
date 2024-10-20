import { db } from ".";
import { directsTable } from "./schema";

async function seed() {
  await db.insert(directsTable).values([
    {
      title: "Hello World",
      description: "This is a description",
      fields: [
        {
          name: "Test Field",
          url: "https://example.com",
        },
      ],
    },
  ]);

  console.log("Seeded!");
}

seed();

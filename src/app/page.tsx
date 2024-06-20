"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const inputSchema = z.object({
  entryId: z.string(),
  path: z.array(z.string()),
});

const schema = z
  .object({
    input: z.string().refine(
      (value) => {
        try {
          return z.array(inputSchema).safeParse(JSON.parse(value)).success;
        } catch (e) {
          return false;
        }
      },
      {
        message: "Invalid JSON",
      }
    ),
  })
  .required();

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      input: "",
    },
  });
  const [output, setOutput] = useState("");

  const onSubmit = form.handleSubmit(({ input }) => {
    fetch("/api/converter", {
      method: "POST",
      body: input,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ output }) => {
        setOutput(JSON.stringify(output, null, 4));
      });
  });

  return (
    <main className="container h-screen flex flex-col justify-center py-24 gap-12">
      <h1 className="font-bold text-4xl self-center">List to Tree converter</h1>
      <div className="flex flex-grow gap-8">
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col flex-grow gap-4 basis-0"
          >
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-grow">
                  <FormControl>
                    <Textarea className="flex flex-grow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="self-center w-full"
              type="submit"
              disabled={form.formState.isLoading}
            >
              {form.formState.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Convert
            </Button>
          </form>
        </Form>
        <Textarea className="flex flex-grow basis-0" disabled value={output} />
      </div>
    </main>
  );
}

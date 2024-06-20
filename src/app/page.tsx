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
import { AnimatePresence, motion } from "framer-motion";

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

const prettifyJson = (json: string | object) =>
  typeof json === "string"
    ? JSON.stringify(JSON.parse(json), null, 4)
    : JSON.stringify(json, null, 4);

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      input: "",
    },
  });
  const [output, setOutput] = useState("");

  const onSubmit = form.handleSubmit(async ({ input }) => {
    form.setValue("input", prettifyJson(input));
    await fetch("/api/converter", {
      method: "POST",
      body: input,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // Simulate a delay to show the loading state
      .then(
        (res) =>
          new Promise<typeof res>((resolve) =>
            setTimeout(() => resolve(res), 1000)
          )
      )
      .then(({ output }) => {
        setOutput(prettifyJson(output));
      });
  });

  return (
    <main className="container h-screen flex flex-col justify-center py-24 gap-12 overflow-hidden">
      <h1 className="font-bold text-4xl self-center">List to Tree converter</h1>
      <div className="flex flex-grow gap-8">
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col flex-grow gap-4 basis-0 transition-all"
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
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Convert
            </Button>
          </form>
        </Form>

        <AnimatePresence>
          {Boolean(output) && (
            <motion.div
              className="flex flex-col gap-4 basis-0"
              initial={{ opacity: 0, width: 0, x: 500, flexGrow: 0 }}
              animate={{
                opacity: 1,
                width: "auto",
                x: 0,
                flexGrow: 1,
              }}
              transition={{ duration: 0.4, ease: "circInOut" }}
            >
              <Textarea
                className="flex flex-grow basis-0"
                disabled
                value={output}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

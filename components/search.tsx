"use client"

import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  search: z
    .string()
    .trim()
    .min(3, { message: "Digite no mínimo 3 caracteres" }),
})

export function Search() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  function handleSubmitSearch(data: z.infer<typeof formSchema>) {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitSearch)}
        className="flex gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Buscar"
                  {...field}
                  className="w-full border-gray03"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-[8px] bg-primaryPurple hover:bg-primaryPurple/80"
        >
          <SearchIcon size={16} />
        </Button>
      </form>
    </Form>
  )
}

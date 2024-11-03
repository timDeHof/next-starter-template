"use client";
import { InsertGuestbookEntrySchema } from "@/db/schema/guestbook-entries";
import { useForm} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createGuestbookEntry } from "./actions";

export default function GuestbookClient() {
  const [lastResult, action] = useFormState(createGuestbookEntry, undefined);
  const [form, fields] = useForm({

    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InsertGuestbookEntrySchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} className='mt-4 flex flex-col gap-2'>
      <Textarea name={fields.message.name} placeholder="Your message here..." className="w-full" key={fields.message.key} isInvalid={!fields.message.valid} errorMessage={fields.message.errors} />
      <Button type="submit" className="w-full mt-4 bg-primary text-white rounded-md py-2 px-4">Create</Button>
    </form>)




}
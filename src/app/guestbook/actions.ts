'use server'; // action.ts

import options from '@/config/auth';
import db from '@/db';
import guestbookEntries, { InsertGuestbookEntrySchema } from '@/db/schema/guestbook-entries';
import requireAuth from '@/utils/require-auth';
import { parseWithZod } from '@conform-to/zod';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createGuestbookEntry(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: InsertGuestbookEntrySchema,
  });
  await requireAuth();


  if (submission.status !== 'success') {
    return submission.reply();
  }
  const session = (await getServerSession(options))!;
  await db.insert(guestbookEntries).values({
   userId: session.user.id,
   message: submission.value.message,
  });
  revalidatePath('/guestbook');
  redirect('/guestbook');
}
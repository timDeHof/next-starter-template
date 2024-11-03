import db from "@/db";

import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import GuestbookClient from "./page.client";

const Guestbook = async () => {
 const entries = await db.query.guestbookEntries.findMany(
 {
  orderBy: (entry, { desc }) => desc(entry.createdAt),
  with: {
   user: true,
  },

}
);
  return (
  <Card className="max-w-lg mx-auto mt-4">
   <CardBody>
    <h1 className="text-5xl text-center"> Welcome to my guestbook</h1>
    <GuestbookClient />
  </CardBody>
  {entries.map((entry)=> (
    <Card key={entry.id} className="m-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={entry.user.image} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{entry.user.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{entry.user.email}</h5>
          </div>
        </div>

      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          {entry.message}
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className=" text-default-400 text-small">{entry.createdAt.toLocaleString()}</p>
        </div>
      </CardFooter>
    </Card>

))}
</Card>
)
};

export default Guestbook;

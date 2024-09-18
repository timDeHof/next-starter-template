import Link from "next/link";
import React from "react";

import { Card, CardBody, User } from "@nextui-org/react";
import { getServerSession } from "next-auth";

import options from "@/config/auth";

async function Profile() {
  const session = await getServerSession(options);
  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardBody>
        <User
          name={session?.user?.name}
          description={session?.user?.email}
          avatarProps={{
            showFallback: !session?.user?.image,
            src: session?.user?.image || "",
          }}
        />
      </CardBody>
    </Card>
  );
}

export default Profile;

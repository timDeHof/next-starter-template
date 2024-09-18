import React from "react";

import { CircularProgress } from "@nextui-org/react";

const Loading = () => {
  return (
    <CircularProgress
      className="mx-auto"
      classNames={{
        svg: "size-36",
      }}
      aria-label="Loading..."
    />
  );
};

export default Loading;

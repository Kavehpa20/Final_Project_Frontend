"use client";

import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";

export const LoadingButton = ({ name, className }) => {
  return (
    <Button
      className={className}
      size="sm"
      isProcessing
      processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
    >
      {name}
    </Button>
  );
};

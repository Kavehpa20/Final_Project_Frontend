"use client";

import { Button } from "flowbite-react";
import { ReactNode } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface IButton {
  name?: ReactNode;
  className: string | undefined;
}

export const LoadingButton = ({
  name,
  className,
}: IButton): React.ReactNode => {
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

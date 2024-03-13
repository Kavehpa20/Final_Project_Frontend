"use client";

import { getNameById } from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";

export const TableName = ({ id }: { id: string }) => {
  const nameList = async (id: string) => {
    const names = await getNameById(id);
    // const myName = names.find((name) => name._id === id);
    return names;
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["name"],
      queryFn: () => nameList(id),
      placeholderData: keepPreviousData,
    });

  !isPending ? console.log(data) : "";

  return isPending ? (
    <p>Loading ...</p>
  ) : isError ? (
    <div>Error: {error.message}</div>
  ) : (
    <p>call</p>
  );
  {
    isFetching ? <span> Loading...</span> : null;
  }
  {
    (" ");
  }
};

export default TableName;

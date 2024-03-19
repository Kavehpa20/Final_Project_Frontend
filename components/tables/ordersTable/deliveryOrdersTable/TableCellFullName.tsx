"use client";

import { useEffect, useState } from "react";

import { getNameById } from "@/apis/requestsAPI";
import { useAdminPanel } from "@/contexts/AdminPanelContext";

export const TableCellFullName = ({ index }: { index: number }) => {
  const { OrdersDeliveryData } = useAdminPanel();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({} as Users);

  const getUsers = async () => {
    setLoading(true);
    const res = await getNameById(
      OrdersDeliveryData.data.data.orders[index].user,
    );
    setLoading(false);
    setUsers(res);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    !loading && (
      <p>
        {users.firstname} {users.lastname}
      </p>
    )
  );
};

export default TableCellFullName;

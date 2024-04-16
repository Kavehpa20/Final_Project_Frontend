"use client";

import { useEffect, useState } from "react";

import { getNameSubcategoryById } from "@/apis/requestsAPI";
import { useAdminPanel } from "@/contexts/AdminPanelContext";

const CategoryAndSubcategoryName = ({ index }: { index: number }) => {
  const { CategoryAndSubcategory } = useAdminPanel();
  const [loading, setLoading] = useState(true);
  const [CategorySubcategory, setCategorySubcategory] = useState(
    {} as IDataSubcategory,
  );

  const getCategorySubcategory = async () => {
    setLoading(true);
    const res = await getNameSubcategoryById(
      CategoryAndSubcategory.data.data.products[index].subcategory,
    );

    setLoading(false);
    setCategorySubcategory(res);
  };

  useEffect(() => {
    getCategorySubcategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    !loading && (
      <p>
        {CategorySubcategory.data.subcategory.category.name} /{" "}
        {CategorySubcategory.data.subcategory.name}
      </p>
    )
  );
};

export default CategoryAndSubcategoryName;

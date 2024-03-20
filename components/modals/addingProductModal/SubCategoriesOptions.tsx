"use client";

import { useEffect, useState } from "react";

import { getSubcategoryByCategory } from "@/apis/requestsAPI";

export const SubCategoriesOptions = ({ CategoriesNameData, value }) => {
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState();

  const category = CategoriesNameData.find(
    (category: ICategory) => category.name === value,
  );

  const getSubCategory = async () => {
    setLoading(true);
    if (!category._id) return;
    const res = await getSubcategoryByCategory(category._id);
    setLoading(false);
    setSubCategory(res);
  };

  useEffect(() => {
    getSubCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    !loading &&
    subCategory.data.subcategories.map((subcat: ISubcategories) => (
      <option key={subcat._id}>{subcat.name}</option>
    ))
  );
};
export default SubCategoriesOptions;

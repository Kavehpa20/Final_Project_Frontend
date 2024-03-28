"use client";

import { useEffect, useState } from "react";

import { getSubcategoryByCategory } from "@/apis/requestsAPI";

export const SubCategoriesOptions = ({
  CategoriesNameData,
  categoryValue,
}: {
  CategoriesNameData: ICategory[];
  categoryValue: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState({} as ISubcategory);

  const getSubCategory = async () => {
    setLoading(true);
    const category = CategoriesNameData.find(
      (category: ICategory) => category.name === categoryValue,
    );
    if (!category) return;
    const res = await getSubcategoryByCategory(category._id);
    setLoading(false);
    setSubCategory(res);
  };

  useEffect(() => {
    getSubCategory();
    // console.log(subCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryValue]);

  return loading ? (
    <option>Loading ...</option>
  ) : (
    subCategory.data.subcategories.map((subcat: ISubcat) => (
      <option key={subcat._id} value={subcat.name}>
        {subcat.name}
      </option>
    ))
  );
};
export default SubCategoriesOptions;

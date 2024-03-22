"use client";

import { useEffect, useState } from "react";

import { getSubcategoryByCategory } from "@/apis/requestsAPI";

export const SubCategoriesOptions = ({ CategoriesNameData, categoryValue }) => {
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState();

  const getSubCategory = async () => {
    setLoading(true);
    const category = await CategoriesNameData.find(
      (category: ICategory) => category.name === categoryValue,
    );

    const res = await getSubcategoryByCategory(category._id);
    setLoading(false);
    setSubCategory(res);
  };

  useEffect(() => {
    getSubCategory();
  }, [categoryValue]);

  return loading ? (
    <option>Loading ...</option>
  ) : (
    subCategory.data.subcategories.map(
      (subcat: ISubcategories, index: number) => (
        <option key={subcat._id} value={subcat.name}>
          {subcat.name}
        </option>
      ),
    )
  );
};
export default SubCategoriesOptions;

"use client";

import { Button, TableCell, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductCell = ({
  initialValue,
  onSave,
  index,
  quantity,
}: {
  initialValue: number | undefined;
  onSave: Function;
  index: number;
  quantity: number | undefined;
}) => {
  const dispatch = useDispatch();
  const productStore = useSelector((state: IRootState) => state.cart.product);
  const productAddingCount = useSelector(
    (state: IRootState) => state.cart.productAddingCount,
  );

  const [value, setValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleDoubleClick = () => {
    setEditMode(true);
    setNewValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newValue && newValue < 1) {
      setError("تعداد نمی تواند کمتر از 1 باشد !!");
      setNewValue(1);
    } else if (newValue && quantity && newValue > quantity) {
      setError(`حداکثر تعداد قابل خرید ${quantity} می باشد!!`);
      setNewValue(quantity);
    } else if (newValue && quantity && newValue >= 1 && newValue <= quantity) {
      setNewValue(Number(e.target.value));
    } else {
      setError("تعداد وارد شده صحیح نمی باشد");
      setNewValue(1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveValue();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const saveValue = () => {
    if (newValue && newValue < 1) {
      setError("تعداد نمی تواند کمتر از 1 باشد !!");
      setNewValue(1);
    } else if (newValue && quantity && newValue > quantity) {
      setError(`حداکثر تعداد قابل خرید ${quantity} می باشد!!`);
      setNewValue(quantity);
    } else if (newValue && quantity && newValue >= 1 && newValue <= quantity) {
      onSave(newValue);
      setValue(newValue);
      setError("");
    } else {
      setError("تعداد وارد شده صحیح نمی باشد");
      setNewValue(1);
    }

    setEditMode(false);
  };

  const cancelEdit = () => {
    setNewValue(value);
    setEditMode(false);
  };

  return (
    <TableCell className="font-IRANSans" onDoubleClick={handleDoubleClick}>
      {editMode ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <TextInput
            sizing="sm"
            className="remove-arrow w-1/3 "
            type="number"
            value={newValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            min={1}
            max={quantity}
          />
          <div className="flex gap-1">
            <Button
              className="p-0 md:text-sm"
              color="success"
              onClick={saveValue}
            >
              ذخیره
            </Button>
            <Button
              className="p-0 md:text-sm"
              color="warning"
              onClick={cancelEdit}
            >
              کنسل
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div>{value}</div>
          {error ? (
            <p className="text-xs font-semibold text-red-600">{error}</p>
          ) : (
            ""
          )}
        </>
      )}
    </TableCell>
  );
};

export default ProductCell;

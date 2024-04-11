import { useEffect, useState } from "react";
import {
  Flowbite,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Button,
} from "flowbite-react";

import {
  editProductInventoryApi,
  getInventoryAndPrices,
} from "@/apis/requestsAPI";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { TableTheme } from "../../forms/TableTheme";
import PaginationComponent from "../../pagination/PaginationComponent";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

const InventoryAndPrices = () => {
  const { currentPage } = useAdminPanel();

  const inventoryAndPricesReq = async () => {
    try {
      const InventoryAndPricesList = await getInventoryAndPrices(currentPage);
      return InventoryAndPricesList;
    } catch (error) {
      // console.log(error.message);
    }
  };

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["InventoryAndPricesList", currentPage],
    queryFn: inventoryAndPricesReq,
    placeholderData: keepPreviousData,
  });

  const [disableButton, setDisableButton] = useState(true);
  const [list, setList] = useState([] as any);
  const [editedCells, setEditedCells] = useState([] as IEditedCell[]);
  const [editedValues, setEditedValues] = useState(
    {} as Record<string, string>,
  );

  useEffect(() => {
    if (data) {
      setList(data.data.products);
    }
  }, [data]);

  const handleEdit = (rowIndex: number, key: string, productId: string) => {
    setDisableButton(false);
    setEditedCells((prevEditedCells) => [
      ...prevEditedCells,
      { rowIndex, key, productId },
    ]);

    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [`${rowIndex}-${key}`]: list[rowIndex][key],
    }));
  };

  const handleSave = () => {
    setDisableButton(true);
    const newData = [...list];
    editedCells.forEach((editedCell) => {
      newData[editedCell.rowIndex || 0][editedCell.key || 0] =
        editedValues[`${editedCell.rowIndex}-${editedCell.key}`];
    });

    function mixObjectsByIndex(
      arr1: IEditedCell[],
      arr2: {
        [x: string]: string | number;
        index: number;
      }[],
    ) {
      const mixedArray = [];
      for (let i = 0; i < arr1.length; i++) {
        const obj = {} as any;
        const obj1 = arr1[i] as any;
        const obj2 = arr2[i] as any;

        for (const key in obj1) {
          obj[key] = obj1[key];
        }

        for (const key in obj2) {
          obj[key] = obj2[key];
        }

        mixedArray.push(obj);
      }

      return mixedArray;
    }

    const valuesArray = Object.entries(editedValues).map(([key, value]) => {
      const [index, property] = key.split("-");
      return { index: parseInt(index), [property]: value };
    });

    editedCells.sort((a, b) => (a.rowIndex || 1) - (b.rowIndex || 2));
    valuesArray.sort((a, b) => a.index - b.index);

    const resultArray = mixObjectsByIndex(editedCells, valuesArray);

    function removeFields(data: any) {
      const combinedData = {} as any;
      data.forEach((entry: any) => {
        const { rowIndex, key, index, ...rest } = entry;
        const productId = entry.productId;
        if (!combinedData[productId]) {
          combinedData[productId] = { productId, ...rest };
        } else {
          combinedData[productId] = { ...combinedData[productId], ...rest };
        }
      });

      return Object.values(combinedData);
    }

    const patchPromises = removeFields(resultArray).map((data) => {
      const { productId, ...rest } = data as any;
      return editProductInventoryApi(rest, productId);
    });

    Promise.all(patchPromises)
      .then((responses: AxiosResponse<any, any>[]) => {
        toast.success("تمامی آیتم ها با موفقیت به روزرسانی شدند.", {
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("خطایی در به روزرسانی آیتم ها رخ داده است!", {
          theme: "colored",
        });
        console.error(error);
      });

    setList(newData);
    setEditedCells([]);
    setEditedValues({});
  };

  const handleCancel = () => {
    setDisableButton(true);
    setEditedCells([]);
    setEditedValues({});
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      handleCancel();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    key: string,
  ) => {
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [`${rowIndex}-${key}`]: event.target.value,
    }));
  };

  return isPending ? (
    <div>
      <span className="text-lg text-gray-800 dark:text-white">
        {" "}
        در حال بارگذاری{" "}
      </span>
      <Spinner aria-label="Large spinner example" size="lg" />
    </div>
  ) : isError ? (
    <div>Error: {error.message}</div>
  ) : (
    <Flowbite theme={{ theme: TableTheme }}>
      <div className="mx-4 mt-2 overflow-x-auto">
        <div className="mx-10 mb-5 flex items-center justify-between">
          <span className="font-medium text-gray-800 dark:text-white">
            مدیریت موجودی و قیمت ها
          </span>
          <Button
            onClick={() => handleSave()}
            disabled={disableButton}
            color="success"
          >
            ذخیره
          </Button>
        </div>
        <Table striped>
          <TableHead>
            <TableHeadCell>کالا</TableHeadCell>
            <TableHeadCell>قیمت</TableHeadCell>
            <TableHeadCell>موجودی</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {list.map((product: IProduct, rowIndex: number) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={product._id}
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </TableCell>
                <TableCell className="flex cursor-pointer justify-center font-IRANSans">
                  {editedCells.some(
                    (editedCell) =>
                      editedCell.rowIndex === rowIndex &&
                      editedCell.key === "price",
                  ) ? (
                    <div className="flex justify-center">
                      <TextInput
                        className="remove-arrow w-3/4"
                        type="number"
                        min={1000}
                        max={50000000}
                        value={
                          editedValues[`${rowIndex}-price`] ?? product.price
                        }
                        onChange={(event) =>
                          handleInputChange(event, rowIndex, "price")
                        }
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <p
                      onClick={() =>
                        handleEdit(rowIndex, "price", product._id as string)
                      }
                    >
                      {product.price?.toLocaleString()}
                    </p>
                  )}
                </TableCell>
                <TableCell className="cursor-pointer font-IRANSans">
                  {editedCells.some(
                    (editedCell) =>
                      editedCell.rowIndex === rowIndex &&
                      editedCell.key === "quantity",
                  ) ? (
                    <div className="flex justify-center">
                      <TextInput
                        sizing="sm"
                        className="remove-arrow w-1/3"
                        type="number"
                        min={1}
                        max={1000}
                        value={Number(
                          editedValues[`${rowIndex}-quantity`] ??
                            product.quantity,
                        )}
                        onChange={(event) =>
                          handleInputChange(event, rowIndex, "quantity")
                        }
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <p
                      onClick={() =>
                        handleEdit(rowIndex, "quantity", product._id as string)
                      }
                    >
                      {product.quantity}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isFetching ? (
          <>
            <span className="text-lg text-gray-800 dark:text-white">
              {" "}
              در حال بارگذاری{" "}
            </span>
            <Spinner aria-label="Large spinner example" size="lg" />
          </>
        ) : null}{" "}
        {data.total_pages === 1 ? (
          ""
        ) : (
          <PaginationComponent totalPages={data.total_pages} />
        )}
      </div>
    </Flowbite>
  );
};

export default InventoryAndPrices;

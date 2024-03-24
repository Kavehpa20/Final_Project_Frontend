import { Avatar, Spinner } from "flowbite-react";
import {
  Button,
  Flowbite,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import CategoryAndSubcategoryName from "./CategoryAndSubcategory";
import PaginationComponent from "../../pagination/PaginationComponent";
import { TableTheme } from "../../forms/TableTheme";

const AssetsManager = () => {
  const { CategoryAndSubcategory } = useAdminPanel();

  return CategoryAndSubcategory.isPending ? (
    <div>
      <span className="text-lg text-gray-800 dark:text-white">
        {" "}
        در حال بارگذاری{" "}
      </span>
      <Spinner aria-label="Large spinner example" size="lg" />
    </div>
  ) : CategoryAndSubcategory.isError ? (
    <div>Error: {CategoryAndSubcategory.error.message}</div>
  ) : (
    <Flowbite theme={{ theme: TableTheme }}>
      <div className="mx-4 mt-2 overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>تصویر</TableHeadCell>
            <TableHeadCell>نام کالا</TableHeadCell>
            <TableHeadCell>دسته بندی</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {CategoryAndSubcategory.data.data.products.map(
              (product: IProduct, index: number) => (
                <TableRow
                  className="bg-white text-xs dark:border-gray-700 dark:bg-gray-800 md:text-base"
                  key={product._id}
                >
                  <TableCell className="px-2">
                    <Avatar
                      img={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                      rounded
                      bordered
                      color="gray"
                      size="lg"
                    />
                  </TableCell>
                  <TableCell className="font-IRANSans">
                    {product.name}
                  </TableCell>
                  <TableCell className="font-IRANSans">
                    <CategoryAndSubcategoryName index={index} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-end gap-7 md:flex-row">
                      <Button color="failure" pill>
                        حذف
                      </Button>
                      <Button color="warning" pill>
                        ویرایش
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
        {CategoryAndSubcategory.isFetching ? (
          <>
            <span className="text-lg text-gray-800 dark:text-white">
              {" "}
              در حال بارگذاری{" "}
            </span>
            <Spinner aria-label="Large spinner example" size="lg" />
          </>
        ) : null}{" "}
        {CategoryAndSubcategory.data.total_pages === 1 ? (
          ""
        ) : (
          <PaginationComponent
            totalPages={CategoryAndSubcategory.data.total_pages}
          />
        )}
      </div>
    </Flowbite>
  );
};

export default AssetsManager;

"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { deleteProductById, getProductNameById } from "@/apis/requestsAPI";

const AskingDeleteModal = () => {
  const { openDeleteModal, setOpenDeleteModal, productId, setProductId } =
    useAdminPanel();

  const productName = async () => {
    if (productId)
      try {
        const res = await getProductNameById(productId);
        return res.name;
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              آیا مطمئن هستید میخواهید کالای{" "}
              <span className="font-bold">{productId && productName()}</span> را
              حذف کنید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={async () => {
                  const response = await deleteProductById(productId || "");
                  if (response.status === "success") {
                    toast.success("کالا با موفقیت حذف گردید", {
                      theme: "colored",
                    });
                  } else {
                    toast.error("خطا در حذف کالا !", {
                      theme: "colored",
                    });
                    console.log(response);
                  }
                  setOpenDeleteModal(false);
                  setProductId("");
                }}
              >
                {"بله مطمئن هستم"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                {"خیر، لغو"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AskingDeleteModal;

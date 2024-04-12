"use client";

import {
  removeFromCartAction,
  removeProductAction,
} from "@/redux/slices/cart/cartSlice";
import { Button, Modal } from "flowbite-react";
import React, { Dispatch, SetStateAction } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const RemoveProductModal = ({
  openModal,
  setOpenModal,
  productId,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  productId: string;
}) => {
  const dispatch = useDispatch();
  const productStore = useSelector((state: IRootState) => state.cart.product);
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              آیا مطمئن هستید می خواهید این کالا را از سبد خرید خود حذف کنید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false);
                  const filteredArray = productStore?.filter(
                    (product: IProduct) => product._id !== productId,
                  );
                  if(filteredArray)dispatch(removeProductAction(filteredArray));
                  dispatch(removeFromCartAction());
                }}
              >
                {"بله، مطمئن هستم"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                خیر کنسل
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveProductModal;

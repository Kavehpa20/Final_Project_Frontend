"use client";

import { useAdminPanel } from "@/contexts/AdminPanelContext";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const deleteToken = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};

const LogoutModal = () => {
  const router = useRouter();
  const { openModal, setOpenModal } = useAdminPanel();
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
              آیا مطمئن هستید میخواهید خارج شوید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  deleteToken(), router.push("/admin"), setOpenModal(false);
                }}
              >
                {"بله مطمئن هستم"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                خیر، کنسل
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LogoutModal;

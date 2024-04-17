// Modal.js
import { useEthereum } from "@/context/cipMainContext";
import React, { useState } from "react";
import { Button, Input } from "..";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, setOpen, onClose, buttonProps, addNewAdmin }: any) => {
  const { currentWalletAddress } = useEthereum();
  let testAdminObject = {
    adminAddress: "",
    name: "",
    addedOrUpdatedBy: currentWalletAddress.toLowerCase(),
    isSuperAdmin: false,
  };
  const [adminObjectState, setadminObjectState] = useState(testAdminObject);

  const closeModal = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative z-50 bg-black-700 rounded-lg p-5 max-w-md w-full shadow-md">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <IoClose />
            </button>

            <div className="pt-5">
              <label
                htmlFor="stakeAmount"
                className="text-neutral-500 font-medium text-xs md:text-base"
              >
                Admin Address:
              </label>
              <Input
                type="text"
                placeholder="0x..."
                name="stakeAmount"
                solidBg
                className="mt-1 md:mt-3 mb-5 text-xs"
                value={adminObjectState.adminAddress}
                onChange={(e: any) => {
                  setadminObjectState((pre) => ({
                    ...pre,
                    adminAddress: e.target.value.toLowerCase(),
                  }));
                }}
                // min="100"

                required
              />
              <label
                htmlFor="stakeAmount"
                className="text-neutral-500 font-medium text-xs md:text-base"
              >
                Admin Name:
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                name="stakeAmount"
                solidBg
                className="mt-1 md:mt-3 mb-5 text-xs"
                value={adminObjectState.name}
                onChange={(e: any) => {
                  setadminObjectState((pre) => ({
                    ...pre,
                    name: e.target.value,
                  }));
                }}
                // min="100"

                required
              />
            </div>
            <Button
              className="w-full md:text-base text-sm"
              disabled={
                adminObjectState.adminAddress == "" ||
                adminObjectState.name == "" || adminObjectState.addedOrUpdatedBy ==''
              }
              onClick={() => {addNewAdmin(adminObjectState);
                setOpen(false);
            
                setadminObjectState({
                    adminAddress: "",
                    name: "",
                    addedOrUpdatedBy: currentWalletAddress.toLowerCase(),
                    isSuperAdmin: false,
                  })
            }}
            >
              {buttonProps.label}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

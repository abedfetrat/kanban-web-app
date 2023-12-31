import { Dialog, Transition } from "@headlessui/react";
import { ComponentPropsWithoutRef, Fragment } from "react";

export type ModeType = "add" | "edit";

export type BaseModalType = ComponentPropsWithoutRef<"div"> & {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export type AddEditModalType = BaseModalType & {
  mode: ModeType;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  ...props
}: BaseModalType) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10"
        onClose={onClose}
        {...props}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"></div>
        </Transition.Child>
        <div className="grid h-screen place-items-center overflow-y-auto p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl transform rounded-md bg-white p-6 text-left align-middle transition-all dark:bg-dark-grey md:p-8">
              {title && (
                <div className="mb-4 md:mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold md:text-xl"
                  >
                    {title}
                  </Dialog.Title>
                </div>
              )}
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

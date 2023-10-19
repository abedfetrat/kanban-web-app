import { Dialog, Transition } from "@headlessui/react";
import { ComponentPropsWithoutRef, Fragment } from "react";

type ModalType = ComponentPropsWithoutRef<"div"> & {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  OptionsMenu?: React.ComponentType;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  OptionsMenu,
  children,
  ...props
}: ModalType) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose} {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[480px] transform rounded-md bg-white p-6 text-left align-middle transition-all dark:bg-dark-grey md:p-8">
                <div className="mb-4 flex items-center justify-between gap-x-4">
                  {title && (
                    <Dialog.Title as="h3" className="text-lg font-bold">
                      {title}
                    </Dialog.Title>
                  )}
                  {OptionsMenu && <OptionsMenu />}
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, closeModal, title, children, description }: IProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="backdrop-blur-sm fixed inset-0"></div>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-black/25 fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="rounded-2xl w-full max-w-md p-6 text-left align-middle transition-all transform bg-white shadow-xl">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="mb-2 text-lg font-bold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description as="p" className="leading-6 text-gray-500">
                      {description}
                    </Dialog.Description>
                  )}
                  <div className="mt-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;

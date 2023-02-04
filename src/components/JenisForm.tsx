import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { trpc } from "../utils/trpc";

type JenisFormProps = {
  openJenisForm: boolean;
  setOpenJenisForm: (openJenisForm: boolean) => void;
};

export default function JenisForm({ openJenisForm, setOpenJenisForm }: JenisFormProps) {

  const [jenis, setJenis] = useState("");

  const storeDetail = trpc.sale.storeDetail.useMutation();

  const handleSubmitJenis = () => {
    console.log(jenis);
    storeDetail
      .mutateAsync({ name: jenis })
      .then(() => {
        setJenis("");
        setOpenJenisForm(false);
      })
      .catch((err) => {
        console.log(err);
      }
      );
  };

  return (
    <Transition.Root show={openJenisForm} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={setOpenJenisForm}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Masukkan jenis</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Isi dibawah
                    </p>
                  </div>
                  <div className="flex flex-row space-x-2">

                    <div className="w-full">
                      <div className="mt-1">
                        <input
                          onChange={(e) => setJenis(e.target.value)}
                          type="text"
                          name="jenis"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Ayam"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 ">
                  </div>
                  <div className="flex justify-start items-start mt-4">
                    <button
                      onClick={handleSubmitJenis}
                      className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {storeDetail.isLoading ? "Loading..." : "Simpan"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
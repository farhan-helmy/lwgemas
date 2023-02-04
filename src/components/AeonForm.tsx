import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { trpc } from "../utils/trpc";

type AeonFormProps = {
  openAeonForm: boolean;
  setOpenAeonForm: (openAeonForm: boolean) => void;
};
export default function AeonForm({ openAeonForm, setOpenAeonForm }: AeonFormProps) {
  const [aeonBody, setAeonBody] = useState({
    amount: "",
    date: "",
    detail: "AEON",
    type: "AEON",
  })
  const saveAeonSales = trpc.sale.storeAeon.useMutation();

  const handleSave = () => {

    saveAeonSales
      .mutateAsync(aeonBody)
      .then(() => {
        setOpenAeonForm(false);
        setAeonBody({
          amount: "",
          date: "",
          detail: "AEON",
          type: "AEON",
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Transition.Root show={openAeonForm} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenAeonForm}>
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Aeon Sales</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Isi dibawah
                    </p>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="w-full">
                      <label htmlFor="Tarikh" className="block text-sm font-medium text-gray-700">
                        Tarikh
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={(e) => { setAeonBody({ ...aeonBody, date: e.target.value }) }}
                          type="date"
                          name="date"
                          id="date"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="Tarikh" className="block text-sm font-medium text-gray-700">
                        Jumlah
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={(e) => { setAeonBody({ ...aeonBody, amount: e.target.value }) }}
                          type="number"
                          name="jumlah"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="RM .."
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-start mt-4">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {saveAeonSales.isLoading ? "Loading..." : "Simpan"}
                    </button>

                    {saveAeonSales.isError && (
                      <div className="text-red-500 text-sm ml-2 mt-2">
                        Sila isi semua field
                      </div>
                    )}
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
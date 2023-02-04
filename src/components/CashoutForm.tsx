import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { trpc } from "../utils/trpc";

type CashoutFormProps = {
  openCashoutForm: boolean;
  setOpenCashoutForm: (openAeonForm: boolean) => void;
};

type JenisCashout = {
  id?: string
  name?: string
}[]

const jenisCashOut: JenisCashout = [
  { id: "te", name: 'Pilih Jenis' },
]

export default function CashoutForm({ openCashoutForm, setOpenCashoutForm }: CashoutFormProps) {
  const [openJenisForm, setOpenJenisForm] = useState(false);
  const details = trpc.sale.getDetails.useQuery()
  const [selected, setSelected] = useState(jenisCashOut[0])
  const [dtl, setDtl] = useState("")

  useEffect(() => {
    details.data?.map((detail) => {
      jenisCashOut.push({ id: detail.id, name: detail.name })
    }
    )
  }, [details.data])

  const [cashoutBody, setCashoutBody] = useState({
    amount: "",
    date: "",
    detail: selected?.name as string,
    type: "CASHOUT",
  });

  const saveCashout = trpc.sale.storeCashout.useMutation();

  const handleSave = () => {
    console.log(cashoutBody)
    saveCashout
      .mutateAsync(cashoutBody)
      .then(() => {
        setOpenCashoutForm(false);
        setCashoutBody({
          amount: "",
          date: "",
          detail: "",
          type: "CASHOUT",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCashoutBody({
      ...cashoutBody,
      detail: selected?.name as string
    })
  }, [selected])

  return (
    <>
      <Transition.Root show={openCashoutForm} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setOpenCashoutForm}>
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
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Cashout form</h3>
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
                            onChange={(e) => setCashoutBody({ ...cashoutBody, date: e.target.value })}
                            type="date"
                            name="date"
                            id="date"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label htmlFor="Tarikh" className="block text-sm font-medium text-gray-700">
                          Jumlah
                        </label>
                        <div className="mt-1">
                          <input
                            onChange={(e) => setCashoutBody({ ...cashoutBody, amount: e.target.value })}
                            type="number"
                            name="jumlah"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="RM .."
                          />
                        </div> 
                      </div>
                    </div>
                    <div className="mt-1 ">
                      <Dropdown selected={selected} setSelected={setSelected} details={details} />
                    </div>
                    <div className="flex justify-start items-start mt-4">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {saveCashout.isLoading ? "Loading..." : "Simpan"}
                      </button>
                      <button

                        onClick={() => setOpenJenisForm(!openJenisForm)}
                        className="ml-2 inline-flex items-center rounded border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Tambah Jenis
                      </button>
                      {saveCashout.isError && (
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


    </>

  )
}
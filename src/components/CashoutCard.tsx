import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { trpc } from '../utils/trpc'

interface CashoutCardProps {
  openCashoutCard: boolean
  setOpenCashoutCard: (openCashoutCart: boolean) => void
  date: Date
}
export default function CashoutCard({ openCashoutCard, setOpenCashoutCard, date }: CashoutCardProps) {
  const getCashoutOnDate = trpc.sale.getCashoutOnDate.useQuery({ date: new Date(date) })

  return (
    <Transition.Root show={openCashoutCard} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenCashoutCard}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex items-center justify-center">
                  <div className="px-5 w-full">
                    <h2 className="text-xs leading-3">Cashout items</h2>
                    <h1 className="text-lg font-bold text-gray-800 leading-5 pt-2">{date.toDateString()}</h1>
                    {getCashoutOnDate.isLoading && (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                    {getCashoutOnDate.data?.map((cashout) => (
                        <div className="pt-6 relative" key={cashout.id}>
                          <div className="uppercase text-xs text-blue-600 font-bold">RM {cashout.amount}</div>
                          <p className="text-xs italic pt-1 leading-3 text-gray-400">Other details..</p>
                          <div className="flex items-center justify-left">
                            <div className="text-green-500 bg-green-200 py-1 px-2 rounded text-xs leading-3 mt-2">{cashout.detail.name}</div>
                          </div>
                        </div>
                    ))}
                    <div className="pt-6 relative">
                      <div className="mt-5 sm:mt-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                          onClick={() => setOpenCashoutCard(false)}
                        >
                          Go back to dashboard
                        </button>
                      </div>

                    </div>
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

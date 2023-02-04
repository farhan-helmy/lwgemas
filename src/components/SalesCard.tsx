import AeonForm from "./AeonForm"
import { useEffect, useState } from "react"
import CashoutForm from "./CashoutForm"
import { trpc } from "../utils/trpc"
import JenisForm from "./JenisForm"
import CashoutCard from "./CashoutCard"

interface SalesCardProps {
  type: string
}

export default function SalesCard({ type }: SalesCardProps) {
  const [openAeonForm, setOpenAeonForm] = useState(false)
  const [openCashoutForm, setOpenCashoutForm] = useState(false)
  const [openJenisForm, setOpenJenisForm] = useState(false)
  const [saleType, setSaleType] = useState(type)
  const [openCashoutCard, setOpenCashoutCard] = useState(false)
  const [dateCashout, setDateCashout] = useState(new Date())
  const sales = trpc.sale.getSales.useQuery({ type: saleType });

  const getStatusColor = (type: string) => {
    switch (type) {
      case "aeon":
        return "bg-indigo-100 text-indigo-800"
      case "cashout":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100"
    }
  }

  const openForm = (type: string) => {
    if (type === "aeon") {
      setOpenAeonForm(true)
    } else {
      setOpenCashoutForm(true)
    }
  }

  const handleOpenCashoutCard = (date: Date) => {
    setDateCashout(date)
    setOpenCashoutCard(true)
  }

  useEffect(() => {

    setSaleType(type.toUpperCase())
  }, [type])

  useEffect(() => {
    sales.refetch()
  }, [openAeonForm, openCashoutForm, openJenisForm, openCashoutCard])
  return (
    <>
      <AeonForm openAeonForm={openAeonForm} setOpenAeonForm={setOpenAeonForm} />
      <CashoutForm openCashoutForm={openCashoutForm} setOpenCashoutForm={setOpenCashoutForm} />
      <JenisForm openJenisForm={openJenisForm} setOpenJenisForm={setOpenJenisForm} />
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4">
          <button
            onClick={() => openForm(type)}
            className="inline-flex rounded-full border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >

            {
              type === "cashout" ? "Tambah transaksi" : "+"
            }
          </button>
          {type === "cashout" &&
            (
              <button
                onClick={() => setOpenJenisForm(true)}
                className="ml-2 inline-flex rounded-full border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Tambah jenis
              </button>
            )}
        </div>
        {type === "aeon" && sales.data?.map((sale, index) =>
          <div className="flex w-2/5 flex-col bg-white overflow-hidden rounded-sm border-b mb-2 cursor-pointer" onClick={() => alert("gk")} key={index}>
            <div className="flex justify-between items-center px-2 py-2">
              <div className="text-xs font-extralight text-gray-700">{sale.date.toDateString()}</div>
              <span className={`${getStatusColor(type)} text-white uppercase inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium`}>
                {type}
              </span>
            </div>
            <div className="px-2">
              <div className="uppercase text-xs text-blue-600 font-bold">RM {sale._sum.amount}</div>
            </div>
          </div>
        )}

        {type === "cashout" && sales.data?.map((sale, index) =>
        <>
            <div className="flex w-2/5 flex-col bg-white overflow-hidden rounded-sm border-b mb-2 cursor-pointer" onClick={() => handleOpenCashoutCard(sale.date)} key={index}>
            <div className="flex justify-between items-center px-2 py-2">
              <div className="text-xs font-extralight text-gray-700">{sale.date.toDateString()}</div>
              <span className={`${getStatusColor(type)} text-white uppercase inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium`}>
                {type}
              </span>
            </div>
            <div className="px-2">
              <div className="uppercase text-xs text-blue-600 font-bold">RM {sale._sum.amount}</div>
            </div>
          </div>
          </>
        )}
        <CashoutCard openCashoutCard={openCashoutCard} setOpenCashoutCard={setOpenCashoutCard} date={dateCashout} />
      </div>

    </>
  )
}
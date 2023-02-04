import { type ReactElement } from "react";
import { DashboardLayout } from "../../components/layout/dashboard";
import Table from "../../components/table";

const AeonSales = () => {
  return (
    <div>
     <Table/>
    </div>
  )
}

AeonSales.getLayout = function (page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
};

export default AeonSales
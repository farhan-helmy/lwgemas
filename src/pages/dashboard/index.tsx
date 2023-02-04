import { type ReactElement } from "react";
import { DashboardLayout } from "../../components/layout/dashboard";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

Dashboard.getLayout = function (page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
};


export default Dashboard
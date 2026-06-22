import { useEffect, useState } from "react";
import {
  dummyEmployeeDashboardData,
  dummyAdminDashboardData,
} from "../assets/assets.jsx";
import Loading from "../components/Loading.js";
import EmployeeDashboard from "../components/EmployeeDashboard.js";
import AdminDashboard from "../components/AdminDashboard.js";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyEmployeeDashboardData);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  }, []);

  if (loading) <Loading />;
  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load dashboard
      </p>
    );

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }

  return <div>Dashboard</div>;
};
export default Dashboard;

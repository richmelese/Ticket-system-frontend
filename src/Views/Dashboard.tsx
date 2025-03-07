import { useContext, useEffect, useState } from "react";
import DashboardCard from "../Components/DashboardCard";
import AlertContext from "../Contexts/AlertContext";
import PieChart from "../Components/PieChart";
import BarChart from "../Components/BarChart";
import { useCookies } from "react-cookie";

export default function Dashboard() {
  const [users, setUsers] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(0);
  const [closedTickets, setClosedTickets] = useState<number>(0);
  const [openTickets, setOpenTickets] = useState<number>(0);
  const { setWaiting } = useContext(AlertContext);
  const [cookies] = useCookies(["login_token"]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setWaiting(true);
      try {
        const response = await fetch("http://49.13.66.115:5000/api/dashboard", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.login_token}`,
          },
        });
       
        const data = await response.json();
        setUsers(data.totalUsers);
        setTickets(data.totalTickets);
        setClosedTickets(data.totalClosed);
        setOpenTickets(data.totalOpen);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setWaiting(false);
      }
    };

    fetchDashboardData();
  }, [cookies.login_token]);

  const dashboardData = [
    { title: "Total Users", value: users, icon: <UsersIcon /> },
    { title: "Total Tickets", value: tickets, icon: <TicketsIcon /> },
    { title: "Total Closed Tickets", value: closedTickets, icon: <ClosedTicketsIcon /> },
    { title: "Total Open Tickets", value: openTickets, icon: <OpenTicketsIcon /> },
  ];

  return (
    <div className="p-6">
      <p className="text-3xl font-bold mb-6 text-gray-800">Dashboard</p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dashboardData.map((data, index) => (
          <DashboardCard key={index} title={data.title} value={data.value} icon={data.icon} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <ChartContainer title="Users vs Tickets (Pie Chart)">
          <PieChart 
            data={{
              labels: ["Users", "Tickets", "Closed", "Open"],
              values: [users, tickets, closedTickets, openTickets],
              colors: ['#1a8cff', '#EC4899', '#10B981', '#EF4444'],
              borderColors: ['#1a8cff', '#EC4899', '#10B981', '#EF4444'], 
            }} 
          />
        </ChartContainer>
        <ChartContainer title="Users vs Tickets (Bar Chart)">
          <BarChart 
            data={{
              labels: ["Users", "Tickets", "Closed", "Open"],
              values: [users, tickets, closedTickets, openTickets],
              colors: ['#1a8cff', '#EC4899', '#10B981', '#EF4444'], // Blue, Pink, Green, Red
              borderColors: ['#1a8cff', '#EC4899', '#10B981', '#EF4444'],
            }} 
          />
        </ChartContainer>
      </div>
    </div>
  );
}

const ChartContainer = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-center rounded-lg p-6 w-full h-auto">
    <h2 className="text-lg font-bold mb-4 text-gray-700">{title}</h2>
    <div className="w-full h-72">{children}</div>
  </div>
);

const UsersIcon = () => (
  <svg className="h-10 w-10 text-[#1D4ED6]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.96.05C15.64 15.27 17 16.46 17 18v3h7v-3c0-2.66-5.33-4-8-4z" />
  </svg>
);

const TicketsIcon = () => (
  <svg className="h-10 w-10 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V10h14v9zM7 12h5v5H7z" />
  </svg>
);

const ClosedTicketsIcon = () => (
  <svg className="h-10 w-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 16h14V5H5v14zM11 14l4-4-1.41-1.41L11 11.17l-1.59-1.58L8 11l3 3z" />
  </svg>
);

const OpenTicketsIcon = () => (
  <svg className="h-10 w-10 text-red-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5zm2 0v14h14V5H5zm6 9l4-4-1.41-1.41L11 11.17l-1.59-1.58L8 11l3 3z" />
  </svg>
);

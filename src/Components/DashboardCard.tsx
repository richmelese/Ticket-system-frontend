

export default function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: JSX.Element;
}) {
  return (
    <div className="bg-white rounded-lg p-5 flex items-center justify-between w-full">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-black text-2xl font-bold">{value}</p>
      </div>
      <div className="flex items-center justify-center bg-indigo-100 rounded-lg h-16 w-16">
        {icon}
      </div>
    </div>
  );
}

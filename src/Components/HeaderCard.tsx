interface HeaderCardProps {
    title: string;
    value: string | number;
    icon: JSX.Element;
    width: string; // Added width prop
  }
  
  const HeaderCard = ({ title, value, icon, width }: HeaderCardProps) => {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 flex items-center justify-between w-[1050px] ${width}`}>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-black text-2xl font-bold">{value}</p>
        </div>
        <div className="flex items-center justify-center bg-indigo-100 rounded-lg h-16 w-16">
          {icon}
        </div>
      </div>
    );
  };
  
  export default HeaderCard;
  
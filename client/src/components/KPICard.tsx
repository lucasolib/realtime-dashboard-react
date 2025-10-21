import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  unit: string;
  color: 'blue' | 'green' | 'purple';
}

const colorMap = {
  blue: 'border-blue-500 text-blue-800 bg-blue-50',
  green: 'border-green-500 text-green-800 bg-green-50',
  purple: 'border-purple-500 text-purple-800 bg-purple-50',
};

const KPICard: React.FC<KPICardProps> = ({ title, value, unit, color }) => {
  const selectedColor = colorMap[color];

  return (
    <div className={`p-6 rounded-xl shadow-lg border-l-4 ${selectedColor} transition-shadow duration-300 hover:shadow-xl`}>
      <p className="text-sm font-medium mb-2 text-gray-500">{title}</p>
      <div className="flex items-baseline">
        <span className="text-4xl font-extrabold mr-2">
          {value}
        </span>
        <span className="text-lg font-medium opacity-75 mt-1">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default KPICard;
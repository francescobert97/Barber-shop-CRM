import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Chart({ data }: { data: { name: string, value: number }[] }) {
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  // Funzione per aggiornare le dimensioni del contenitore
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth < 600 ? 250 : 300;
      const height = width;
      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PieChart width={dimensions.width} height={dimensions.height}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

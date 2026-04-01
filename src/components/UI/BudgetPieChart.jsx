import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export const BudgetPieChart = ({ data, TotalSpent, TotalLimit }) => {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={85}
          TotalSpent={TotalSpent}
          TotalLimit={TotalLimit}
        >
          {data.map((item, index) => (
            <Cell key={index} fill={item.color}></Cell>
          ))}
        </Pie>
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          className="fw-bold"
          style={{ fontSize: "1.5rem" }}
        >
          ${TotalSpent}
        </text>

        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          className="text-muted"
          style={{ fontSize: "0.9rem" }}
        >
          of ${TotalLimit} limit
        </text>
        <Tooltip></Tooltip>
      </PieChart>
    </ResponsiveContainer>
  );
};

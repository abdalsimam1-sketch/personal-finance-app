import { PieChart, Pie, Content, Tooltip, ResponsiveContainer } from "recharts";

export const BudgetPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={85}
        >
          {data.map((item, index) => (
            <Content key={index} fill={item.color}></Content>
          ))}
        </Pie>
        <Tooltip></Tooltip>
      </PieChart>
    </ResponsiveContainer>
  );
};

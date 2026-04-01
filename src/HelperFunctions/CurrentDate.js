const Today = new Date("2024-8-19");
const soon = new Date(Today.getTime() + 2 * 24 * 60 * 60 * 1000);
export const CheckIfPaid = (date) => {
  const BillDate = new Date(date);
  if (date > Today && date <= soon) {
    return "soon";
  } else if (date === Today) {
    return "due";
  } else if (date > Today) {
    return "upcoming";
  } else if (date < Today) {
    return "paid";
  }
};

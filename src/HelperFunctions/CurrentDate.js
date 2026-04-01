const Today = new Date("2024-8-1");
const soon = new Date(Today.getTime() + 2 * 24 * 60 * 60 * 1000);
export const CheckIfPaid = (date) => {
  const BillDate = new Date(date);
  if (BillDate > Today && BillDate <= soon) {
    return "soon";
  } else if (BillDate === Today) {
    return "due";
  } else if (BillDate > Today) {
    return "upcoming";
  } else if (BillDate < Today) {
    return "paid";
  }
};

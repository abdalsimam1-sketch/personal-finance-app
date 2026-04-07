const Today = new Date("2024-8-1");
const soon = new Date(Today.getTime() + 5 * 24 * 60 * 60 * 1000);
export const CheckIfPaid = (date) => {
  const BillDate = new Date(date);
  if (BillDate.getTime() === Today.getTime()) {
    return "due";
  } else if (BillDate > Today && BillDate <= soon) {
    return "soon";
  } else if (BillDate > Today) {
    return "upcoming";
  } else if (BillDate < Today) {
    return "paid";
  }
};

export const suffix = (date) => {
  if (date === 1) {
    return "st";
  } else if (date === 2) {
    return "nd";
  } else if (date === 3) {
    return "rd";
  } else {
    return "th";
  }
};

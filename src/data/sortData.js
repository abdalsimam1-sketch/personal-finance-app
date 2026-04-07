export const Sort = [
  {
    name: "Latest",
  },
  {
    name: "Oldest",
  },
  {
    name: "A-Z",
  },
  {
    name: "Z-A",
  },
  {
    name: "Highest",
  },
  {
    name: "Lowest",
  },
];

export const sorting = (SelectedSort, dataToSort) => {
  const prev = [...dataToSort];
  if (SelectedSort === "Oldest") {
    prev.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (SelectedSort === "Latest") {
    prev.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (SelectedSort === "A-Z") {
    prev.sort((a, b) => a.name.localeCompare(b.name));
  } else if (SelectedSort === "Z-A") {
    prev.sort((a, b) => b.name.localeCompare(a.name));
  } else if (SelectedSort === "Highest") {
    prev.sort((a, b) => b.amount - a.amount);
  } else if (SelectedSort === "Lowest") {
    prev.sort((a, b) => a.amount - b.amount);
  }
  return prev;
};

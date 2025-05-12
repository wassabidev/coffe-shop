export const formatDate = (date) => {
  const customDate = new Date(date);
  return customDate.toLocaleDateString("py-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

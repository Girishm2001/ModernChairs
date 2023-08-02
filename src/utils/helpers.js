export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let alltypes = data.map((item) => {
    return item[type];
  });
  if (type === "colors") {
    alltypes = alltypes.flat();
  }
  return ["all", ...new Set(alltypes)];
};

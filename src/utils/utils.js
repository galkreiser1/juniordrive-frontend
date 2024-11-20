const capitalizeCompanyName = (companyName) => {
  if (!companyName) return "";

  return companyName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default capitalizeCompanyName;

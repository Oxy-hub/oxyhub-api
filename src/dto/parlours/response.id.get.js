module.exports = parlour => {
  const {
    name,
    ownerName,
    ownerContact,
    storeId,
    location: { address, district, stateCode, pincode }
  } = parlour;

  return {
    name,
    ownerName,
    ownerContact,
    storeId,
    location: { address, district, stateCode, pincode }
  };
};

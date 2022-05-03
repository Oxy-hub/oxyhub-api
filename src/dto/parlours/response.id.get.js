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
    owner_name: ownerName,
    owner_contact: ownerContact,
    store_id: storeId,
    location: { address, district, state_code: stateCode, pincode }
  };
};

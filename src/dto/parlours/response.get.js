module.exports = parlours => ({
  parlours:
    parlours.length > 0
      ? parlours.map(
          ({
            name,
            storeId,
            location: { stateCode, district, address, pincode }
          }) => ({
            name,
            storeId,
            location: { stateCode, district, address, pincode }
          })
        )
      : [],
  total: parlours.length
});

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
            store_id: storeId,
            location: { state_code: stateCode, district, address, pincode }
          })
        )
      : [],
  total: parlours.length
});

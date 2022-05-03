module.exports = parlours => ({
  parlours:
    parlours.length > 0
      ? parlours.map(
          ({
            name,
            storeId,
            location: { stateCode, district, address, pincode },
            availabilityStatus
          }) => ({
            name,
            storeId,
            location: { stateCode, district, address, pincode },
            availabilityStatus
          })
        )
      : [],
  total: parlours.length
});

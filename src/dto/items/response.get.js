module.exports = items => ({
  items: items.map(({ storeId, variants, productId, cylinderType }) => ({
    store_id: storeId,
    product_id: productId,
    cylinder_type: cylinderType,
    variants: variants.map(
      ({ name, height, price, waterCapacity, oxygenCapacity }) => ({
        name,
        height,
        waterCapacity,
        oxygenCapacity,
        price
      })
    )
  }))
});

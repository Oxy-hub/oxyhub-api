module.exports = items => ({
  items: items.map(({ storeId, variants, productId, cylinderType }) => ({
    store_id: storeId,
    product_id: productId,
    cylinder_type: cylinderType,
    variants: variants.map(
      ({ sku, name, height, price, waterCapacity, oxygenCapacity }) => ({
        sku,
        name,
        height,
        waterCapacity,
        oxygenCapacity,
        price
      })
    )
  }))
});

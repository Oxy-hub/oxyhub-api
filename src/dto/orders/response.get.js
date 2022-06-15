module.exports = orders => ({
  total: orders.length,
  orders: orders.map(order => {
    const {
      razorpay,
      orderId,
      createdAt,
      paymentStatus,
      storeInfo: {
        ownerName,
        ownerContact,
        // eslint-disable-next-line no-unused-vars
        storeId,
        location: { stateCode, ...restLocation },
        ...restStore
      },
      pricing: { purchaseType, ...restPricing },
      // eslint-disable-next-line no-unused-vars
      productInfo: { productId, sku, ...restProduct }
    } = order;

    return {
      order_id: orderId,
      created_at: createdAt,
      payment_status: paymentStatus,
      razorpay: {
        order_id: razorpay.orderId
      },
      store_info: {
        ...restStore,
        owner_name: ownerName,
        owner_contact: ownerContact,
        location: {
          state_code: stateCode,
          ...restLocation
        }
      },
      product_info: {
        ...restProduct
      },
      pricing: {
        purchase_type: purchaseType,
        ...restPricing
      }
    };
  })
});

const yup = require('yup');

module.exports = yup.object().shape({
  sku: yup.string().trim().required('SKU is missing!'),
  store_id: yup.string().trim().required('Store id is missing!'),
  product_id: yup.string().trim().required('Product id is missing!'),
  purchase_type: yup
    .number()
    .oneOf([0, 1], 'Invalid purchase type')
    .required('Purchase type is missing!'),
  duration: yup.number().when('purchase_type', {
    is: 0,
    then: yup
      .number()
      .required('Duration must be present if purchase type is 0'),
    otherwise: yup
      .number()
      .nullable()
      .default(null)
      .transform(() => null)
  })
});

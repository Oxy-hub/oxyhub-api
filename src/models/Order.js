const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      trim: true,
      type: String,
      default: nanoid
    },
    userId: {
      trim: true,
      type: String,
      required: true
    },
    storeInfo: {
      storeId: {
        trim: true,
        type: String,
        required: true
      },
      name: {
        trim: true,
        type: String,
        required: true
      },
      ownerName: {
        trim: true,
        type: String,
        required: true
      },
      ownerContact: {
        trim: true,
        type: String,
        maxLength: 10,
        required: true
      },
      location: {
        address: {
          trim: true,
          type: String,
          required: true
        },
        stateCode: {
          trim: true,
          type: String,
          required: true
        },
        district: {
          trim: true,
          type: String,
          required: true
        },
        pincode: {
          maxLength: 6,
          minLength: 6,
          type: String,
          required: true
        }
      }
    },
    productInfo: {
      productId: {
        trim: true,
        type: String,
        required: true
      },
      type: {
        trim: true,
        type: String,
        required: true,
        enum: ['Steel', 'Aluminium']
      },
      variant: {
        trim: true,
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D']
      },
      sku: {
        trim: true,
        type: String,
        required: true
      }
    },
    pricing: {
      purchaseType: {
        type: Number,
        enum: [0, 1], // 0 : Rent , 1 : Buy
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        // eslint-disable-next-line
        required: function () {
          return this.purchaseType === 0;
        }
      },
      total: {
        type: Number,
        required: true
      }
    },
    razorpay: {
      status: {
        default: 0,
        type: Number,
        enum: [0, 1] // 0 : Pending, 1 : Complete
      },
      orderId: {
        trim: true,
        type: String,
        required: true
      },
      paymentId: { trim: true, type: String },
      signature: { trim: true, type: String }
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

// eslint-disable-next-line func-names
orderSchema.virtual('paymentStatus').get(function () {
  switch (this.razorpay.status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Confirmed';

    default:
      return null;
  }
});

orderSchema.set('toJSON', { virtuals: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

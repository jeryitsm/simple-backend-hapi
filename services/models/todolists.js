const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Product = new Schema({
	product_code: { type: String, required: true },
	product_name: { type: String, required: true },
	product_qty: { type: Number, default: 0 },
	product_price: { type: Number, default: 0 },
	product_detail: { type: String, default: null },
	product_group: { type: String, default: null },
	product_img: [],
	product_isAssign: {type: Schema.Types.ObjectId, ref: 'User',default: null},
	product_isActive: { type: Boolean, default: true },
	product_lastUpdate: { type: Date, default: Date.now }
})

module.exports = Mongoose.model('Todolist', Product)

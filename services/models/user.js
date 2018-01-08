const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const User = new Schema({
	user_firstname: { type: String, default: null },
	user_lastname: { type: String, default: null },
	user_email: { type: String, default: null },
	user_username: { type: String, required: true, unique: true, trim: true },
	user_password: { type: String, required: true },
	user_role: { type: String, enum: ['User', 'Admin', 'Owner', 'Other'] },
	user_usercread: { type: Date, default: Date.now },
	user_assignment : [{ type: Schema.Types.ObjectId, ref: 'Todolist'}]
})
module.exports = Mongoose.model('User', User)
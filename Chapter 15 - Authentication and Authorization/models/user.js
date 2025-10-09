const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
	username:{
		type:String,
		required:[true,"username must be required"]		
	},
	email:{
		type:String,
		required:[true,"email must be required"],
		unique:true
	},
	password:{
		type:String,
		required:[true,"Password must be required"]
	},
	UserType:{
		type:String,
		enum:{"guest":"host"},
		default:"guest"
	}
});



module.exports = mongoose.model('User', userSchema);

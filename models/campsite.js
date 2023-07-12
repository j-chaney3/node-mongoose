const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const campsiteSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		//let every campsite document contain multiple comments documents stored within an array
		comments: [commentSchema],
	},
	{
		timestamps: true,
	}
);

//capitalize single word for name of collection in first argument, ie: Campsites => Campsite
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;

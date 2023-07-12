const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://127.0.0.1:27017/nucampsite';
const connect = mongoose.connect(url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connect.then(() => {
	console.log('Connected correctly to server');

	const newCampsite = new Campsite({
		name: 'React Lake Campground',
		description: 'test',
	});

	//save document to db and return a promise indicating failure or success
	newCampsite
		.save()
		.then((campsite) => {
			console.log(campsite);
			//find saved documents based on campsite model
			return Campsite.find();
		})
		.then((campsites) => {
			console.log(campsites);
			return Campsite.deleteMany();
		})
		.then(() => {
			return mongoose.connection.close();
		})
		.catch((err) => {
			console.log(err);
			mongoose.connection.close();
		});
});

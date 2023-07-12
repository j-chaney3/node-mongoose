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

	//argument new object to create, and automatically saves it, thus negating the .save()
	Campsite.create({
		name: 'React Lake Campground',
		description: 'test',
	})
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

const mongoose = require("mongoose");

module.exports = () => {

	try {
		mongoose.connect('mongodb://127.0.0.1/sateur',
			{   useNewUrlParser: true,
				useUnifiedTopology: true });
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};

module.exports = {
	login: req => {
		// get database context
		const db = req.app.get('db');
		//Destructure things sent from the body.
		const { email, password } = req.body;
		//Check if the email corresponds to a user.

		//Catch user
		let catchUser = {};

		db.user_table
			.findOne({ email })
			.then(user => {
				if (!user) {
					throw 'No user for that email';
				}
				//Compare the password
				//user.password will be the hash.
				catchUser = user;
				return bcrypt.compare(password, user.password);
			})
			.then(isMatch => {
				// handle bad password
				if (!isMatch) {
					throw `You're credentials don't match our records.`;
				}
				//prepare user for frontend
				delete catchUser.password;

				req.session.user = catchUser;
				return { success: true, user: catchUser };
			})
			.catch(err => {
				return { success: false, err };
			});
	},
	register: req => {
		// get database context
		const db = req.app.get('db');
		//Destructure things sent from the body.
		const { email, password, first_name, last_name, username } = req.body;

		// Handle if user already exists.
		db.user_table
			.findOne({ email })
			.then(user => {
				if (user) {
					throw 'user already exists. Please login';
				}
				//encypt password
				return bcrypt.hash(password, 10);
			})
			.then(hash => {
				// add user to database *Make sure to save hash as password
				return db.user_table.insert({ email, password: hash, first_name, last_name, username });
			})
			.then(user => {
				//Prepare user object to send back to frontend and set session
				delete user.password;
				req.session.user = user;
				return { success: true, user };
			})
			.catch(err => {
				//handle all erros
				return { success: false, err };
			});
	},
	logout: req => {
		// this destroys the session and removes the user object.
		req.session.destroy();
		return{ success: true };
	}
};

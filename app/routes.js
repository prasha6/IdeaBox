var User = require('./models/User');

module.exports = function(app) {

	app.get("/", isLoggedIn, function(req, res)
	{
		res.sendfile("./public/pages/main.html");	
	});

	app.get("/login", function(req, res)
	{
		res.sendfile("./public/pages/login.html");		
	});

	app.post("/api/login", function(req, res)
	{
		User.findOne({ username: req.body.username, password: req.body.password }, function(err, user)
		{
			if (err)
			{
				console.log("Error");
				res.redirect("/login");
			}
			else if (!user)
			{
				console.log("User not found");
				res.redirect("/login");
			}
			else
			{
				console.log("No error, authenticated");

				req.session.isAuthenticated = true;
				req.session.username = req.body.username;

				console.log("Sendng post");
				res.redirect("/");
			}
		});
	});

	app.get("/api/logout", function(req, res)
	{
		console.log("Logging out");
		req.session.destroy();

		console.log("Destroyed session");
		res.redirect("/login");
	});

	app.post("/api/idea/create", isLoggedIn, function(req, res)
	{
		// do insert here

		res.redirect("/");
	});

	app.get("*", function(req, res)
	{
		res.redirect("/");
	});
};

function isLoggedIn(req, res, next)
{
	if (req.session.isAuthenticated)
	{
		next();
	}
	else
	{
		res.redirect("/login");
	}
} 
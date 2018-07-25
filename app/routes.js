var User = require('./models/User');
var Idea = require('./models/Idea');

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

	app.get("/api/logout", isLoggedIn, function(req, res)
	{
		console.log("Logging out");
		req.session.destroy();

		console.log("Destroyed session");
		res.redirect("/login");
	});

	app.post("/api/user/register", function(req, res)
	{
		User.findOne({ username: req.body.username}, function(err, user)
		{
			if (err)
			{
				console.log("Error");
				res.redirect("/login");
			}
			else if (user)
			{
				console.log("User already exists");
				res.redirect("/login");
			}
		});

		var newUser = User(
			{
				username: req.body.username,
				password: req.body.password
			});

		newUser.save(function(err, idea)
		{
			req.session.isAuthenticated = true;
			req.session.username = req.body.username;

			res.redirect("/");
		});
	});

	app.post("/api/idea/submit", isLoggedIn, function(req, res)
	{
		console.log("We got to the server.");
		var newIdea = Idea(
			{
				title: req.body.title,
				tags: req.body.tags,
				idea: req.body.idea,
				creator: req.session.username
			});

		newIdea.save(function(err, idea)
		{
			res.redirect("/");
		});
	});


	app.get("/api/get/ideas", isLoggedIn, function(req, res)
	{
		console.log("getting ideas from server");
		Idea.find({}, function(err, idea)
		{			

			// res.sendfile('./public/pages/main.html');
			res.render("../public/views/home.hbs", {items: idea});
		});
	});

	app.get("*", isLoggedIn, function(req, res)
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
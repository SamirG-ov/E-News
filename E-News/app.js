//jshint esversion:6

const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require('mysql');

var email;
var password;
var user;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwerty123@",
  database: "enewsweb",
});

const app = express();

app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  savedUser: {},
  allArticles: {}
}));

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB!");
  connection.query("SELECT * FROM usert", function(err, result, fields) {
    console.log(result);
  });
  connection.query("SELECT * FROM admint", function(err, result2, fields) {
    console.log(result2);
  });
  connection.query("SELECT * FROM article", function(err, result1, fields) {
    console.log(result1);
  });
});


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home");
});




app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/aboutLoggedin", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);

  res.render("aboutLoggedin", {user: user});
});

app.get("/contactLoggedin", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);

  res.render("contactLoggedin", {user: user});
});


app.get("/worldnews", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);
  console.log(allArticles);

  connection.query('SELECT * FROM article WHERE P_Category = "worldnews"', function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }
    allArticles = results;
    res.render("worldnews", {user: user, allArticles: allArticles});
  });
});

app.get("/uofc", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);
  console.log(allArticles);

  connection.query('SELECT * FROM article WHERE P_Category = "uofc"', function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }
    allArticles = results;
    res.render("uofc", {user: user, allArticles: allArticles});
  });
});

app.get("/articles/:articleID", function(req, res){

  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);

  const requestedArticleID = req.params.articleID;

  connection.query('SELECT * FROM article WHERE A_ID = ?',[requestedArticleID], function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }
    console.log("111");

    if (!results.length) {
      console.log("Article not found");
      return res.status(404).send("Article not found");
    }
    console.log("222");

    connection.query('SELECT * FROM comment1 where A_ID = ?', [results[0].A_ID], function(error, results1, fields1) {

      if (results1.length > 0) {
        connection.query('SELECT * FROM usert where U_ID = ?', [results1[0].U_ID], function(error, results2, fields2) {
          console.log(results);
          console.log(results1);
          res.render("articles", {
            user: user,
            aid: results[0].A_ID,
            pic: results[0].pic || "",
            title: results[0].title || "",
            content: results[0].content || "",
            allComments: results1
          });
        });
      } else {
        res.render("articles", {
          user: user,
          aid: results[0].A_ID,
          pic: results[0].pic || "",
          title: results[0].title || "",
          content: results[0].content || "",
          allComments: ""
        });
      }
    });
  });
});

app.post("/articles/:articleID", function(req, res){


    req.session.loggedin = true;

    var user = {
      id: savedUser.id,
      username: savedUser.username,
      status: savedUser.status
    }
    console.log(user);

    const requestedArticleID = req.params.articleID;

    connection.query('SELECT * FROM comment1', function(error, results4, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }

    connection.query('INSERT INTO comment1 (A_ID, U_ID, username, aComment) VALUES (?, ?, ?, ?)', [requestedArticleID, user.id, user.username, req.body.inputComment], function(error, data) {
      if(error) {
        console.log("Error inserting user:", error);
        res.status(500).send("Error inserting article");
      }

    connection.query('SELECT * FROM article WHERE A_ID = ?',[requestedArticleID], function(error, results, fields) {
      if(error) {
        console.log("Error checking user:", error);
        res.status(500).send("Error checking user");
      }
      console.log("111");

      if (!results.length) {
        console.log("Article not found");
        return res.status(404).send("Article not found");
      }
      console.log("222");

      connection.query('SELECT * FROM comment1 where A_ID = ?', [results[0].A_ID], function(error, results1, fields1) {

        if (results1.length > 0) {
          connection.query('SELECT * FROM usert where U_ID = ?', [results1[0].U_ID], function(error, results2, fields2) {
            console.log(results);
            console.log(results1);
            res.render("articles", {
              user: user,
              aid: results[0].A_ID,
              pic: results[0].pic || "",
              title: results[0].title || "",
              content: results[0].content || "",
              allComments: results1
            });
          });
        } else {
          res.render("articles", {
            user: user,
            aid: results[0].A_ID,
            pic: results[0].pic || "",
            title: results[0].title || "",
            content: results[0].content || "",
            allComments: ""
          });
        }
      });
    });
  });
});
});

app.get("/compose", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);

  res.render("compose", {user: user});
});

app.post("/compose", function(req, res){

  req.session.loggedin = true;

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    category: req.body.category,
    file: req.body.filename
  };

  console.log(post);

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);

  connection.query('SELECT * FROM article', function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }

    connection.query('INSERT INTO article (U_ID, date1, content, title, pic, P_Category) VALUES (?, ?, ?, ?, ?, ?)', [savedUser.id, new Date(), post.content, post.title, post.file, post.category], function(error, data) {
      if(error) {
        console.log("Error inserting user:", error);
        res.status(500).send("Error inserting article");
      }

      res.render("compose", {user: user});
    });
  });
});

app.get("/gaming", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);
  console.log(allArticles);

  connection.query('SELECT * FROM article WHERE P_Category = "gaming"', function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }
    allArticles = results;
    res.render("gaming", {user: user, allArticles: allArticles});
  });
});

app.get("/politics", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);
  console.log(allArticles);

  connection.query('SELECT * FROM article WHERE P_Category = "politics"', function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }
    allArticles = results;
    res.render("politics", {user: user, allArticles: allArticles});
  });
});

app.get("/sports", function(req, res){
  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);
  console.log(allArticles);

  connection.query('SELECT * FROM article WHERE P_Category = "sports"', function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }
    allArticles = results;
    res.render("sports", {user: user, allArticles: allArticles});
  });
});

app.get("/userpage", function(req, res){

  req.session.loggedin = true;

  var user = {
    id: savedUser.id,
    username: savedUser.username,
    status: savedUser.status
  }
  console.log(user);

  res.render("userpage", {user: user});
});


app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", function(req, res) {
  email = req.body.inputEmail;
  password = req.body.inputPassword;

  connection.query('SELECT * FROM enewsweb.admint WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
    if(error) throw error;

    if(results.length > 0) {
      var user = {
        id: results[0].Admin_ID,
        username: results[0].username,
        status: results[0].status
      };

      console.log(user);
      req.session.loggedin = true;
      savedUser = user;

      connection.query('SELECT * FROM article', function(error, results, fields) {
        if(error) {
          console.log("Error checking user:", error);
          res.status(500).send("Error checking user");
        }
        allArticles = results;
        res.render("userpage", {user: user});
      });
    } else {
      connection.query('SELECT * FROM enewsweb.usert WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        // if there is error
        if(error) throw error;
        //if the account exists
        if(results.length > 0) {
          var user = {
            id: results[0].U_ID,
            username: results[0].username,
            status: results[0].status
          };
          console.log(user);
          req.session.loggedin = true;
          savedUser = user;

          connection.query('SELECT * FROM article', function(error, results, fields) {
            if(error) {
              console.log("Error checking user:", error);
              res.status(500).send("Error checking user");
            }
            allArticles = results;
            res.render("userpage", {user: user});
          });
        } else {
          res.send("Incorrect email/password!");
        }
      });
    }
  });
});


app.get("/signup", function(req, res){
  res.render("signup");
});

app.post("/signup", function(req, res) {
  var username = req.body.inputUsername;
  var status = req.body.inputStatus;
  var email = req.body.inputEmail;
  var password = req.body.inputPassword;

  connection.query('SELECT * FROM enewsweb.usert WHERE email = ?', [email], function(error, results, fields) {
    if(error) {
      console.log("Error checking user:", error);
      res.status(500).send("Error checking user");
    }

    if(results.length > 0) {
      res.render("login");
    } else {
      connection.query('INSERT INTO usert (username, status, email, password) VALUES (?, ?, ?, ?)', [username, status, email, password], function(error, data) {
        if(error) {
          console.log("Error inserting user:", error);
          res.status(500).send("Error inserting user");
        }

        res.render("login");
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

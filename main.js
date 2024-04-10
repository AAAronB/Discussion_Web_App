module.exports = function(app, ForumData) {

  // Handle our routes
  function isLoggedIn(req, res, next) {
    if (req.session.user) {
    next();
    } else {
    res.redirect('/login');
    }
}
  app.get('/', isLoggedIn, (req, res) => {
    res.redirect('/index');
  });
  
  // Login page
  app.get('/login', (req, res) => {
    res.send(`
      <form method="post" action="/login">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">Login</button>
      </form>
    `);
  });
  
  // Logout route
  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  });
  
  // Login POST route
  app.post('/login', (req, res) => {
    let sqlquery = "SELECT * FROM Users"; // query database to get all the Users
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./');  // redirects to the home page if the query fails 
        }
        let newData = Object.assign({}, ForumData, {listOfUsers:result});
        const user = newData.listOfUsers.find(u => u.username === req.body.username && u.password === req.body.password);

 
  
    if (user) {
      // Store user in session
      req.session.user = user;
      res.redirect('/');
    } else {
      res.send('Invalid credentials. <a href="/login">Try again</a>');
    }
    })
  });
  
  app.get('/index',function(req,res){
    res.render('index.ejs',ForumData)
  });
  
  app.get('/about',function(req,res){
    let sqlquery = "SELECT topic FROM Post"; // query database to get all the posts
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./');  // redirects to the home page if the query fails 
        }
        let newData = Object.assign({}, ForumData, {listOfPosts:result});// creates a new object listOfPosts
        res.render('about.ejs', newData);
     });
  });
  app.post('/postadded',function(req,res){
    let sqlquery = "INSERT INTO Post (name,topic,username,content)VALUES(?,?,?,?)";
    // execute sql query
    let newrecord = [req.body.title, req.body.topic, req.body.username, req.body.Post_content];
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        return console.error(err.message);
    
        // There is an error message to inform us if there has been a problem with adding the post
        // to the database
      }
      else {
        res.send('Post added');
        // Message to verify that the post has been added to the database
      }
    });
  });
  app.get('/register', function (req,res) {
    res.render('register.ejs', ForumData);
  });
  app.post('/registered', function (req,res) {
    // saving data in database and outputting it to the screen
    let addquery = "INSERT INTO users(first_name,last_name,username,email) VALUES" + "('" + req.body.first + "','" + req.body.last + "','" + req.body.username + "','" + req.body.email +"');"; 
    // adds a user's details to the database
    db.query(addquery, (err, result) => {
        if (err) {
            return console.error(err.message); // returns an error message if the query fails
         }else{
            res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email); 
            // Output lets us know that the user has been successfully added to the database
         }
    });  
  });
  app.get('/displayPost', function(req, res) {
    let sqlquery = "SELECT name,topic,username,content FROM Post"; // query database to get the name of post, the topic of the post, the username and the content of the post
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./');  // redirects to the home page if the query fails 
        }
        let newData = Object.assign({}, ForumData, {listOfPosts:result});// creates a new object avaliableBooks which uses
        // result to store an array of books
        res.render('displayPost.ejs', newData);
     });
  });
  app.get('/displayUser', function(req, res) {
    let sqlquery = "SELECT * FROM Users"; // query database to get all the Users
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./');  // redirects to the home page if the query fails 
        }
        let newData = Object.assign({}, ForumData, {listOfUsers:result});/// creates a new object listOfUsers
        res.render('displayUser.ejs', newData);
     });
  });
  app.get('/searchUser',function(req,res){
    res.render("searchUser.ejs", ForumData);
  });
  app.get('/search-result', function (req, res) {
    //searching in the database using a Join Statement to link the Users and the Post tables together and select all records in the table that include the name of the keyword inputted by the user 
    let sqlquery = "SELECT Post.name, Post.topic, Users.first_name, Users.last_name FROM Post JOIN Users ON Post.username = Users.username WHERE Users.username LIKE"+"'%"+req.query.keyword+"%'";
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); // redirects to the home page if the query fails 
        }
        let newData = Object.assign({}, ForumData, {listOfPosts:result}); // creates a new object listOfPosts
        res.render('search-result.ejs', newData);
     });
  });
  app.get('/searchTopic',function(req,res){
    res.render("searchTopic.ejs", ForumData);
  });
  app.get('/search-results', function (req, res) {
    let sqlquery = "SELECT Post.name, Users.username FROM Post JOIN Users ON Post.username = Users.username WHERE Post.topic LIKE"+"'%"+req.query.keyword+"%'"; // query database the keyword where it searches for the post
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); // redirects to the home page if the query fails 
        }
        let newData = Object.assign({}, ForumData, {listOfPosts:result}); // creates a new object listOfPosts
        res.render('search-results.ejs', newData);
     });
  });
  app.get('/deletePost',function(req,res){
    res.render("deletePost.ejs", ForumData);
  });
  app.get('/post-deleted', function (req, res) {
    //searching in the database
    let sqlquery = "DELETE FROM Post WHERE Post.name LIKE"+"'%"+req.query.keyword+"%'"; // query database the keyword where it searches for the post
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); // redirects to the home page if the query fails 
        } else {res.send("Post Deleted.");}
     });
  });
}

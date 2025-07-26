# Discussion Web App

A simple forum web application built with Node.js, Express, MySQL, and EJS templating. Users can register, log in, create posts, search for posts by user or topic, and manage users and posts.

## Features
- User registration and login
- Create, view, and delete posts
- Search posts by user or topic
- View all users
- Delete users
- Responsive and styled UI with custom CSS

## Screenshots & ER Diagram
- See `ER diagram.png` for the database schema.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [MySQL](https://www.mysql.com/)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Discussion_Web_App
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up the database:**
   - Open MySQL and run the SQL script to create the database and tables:
     ```sql
     -- In your MySQL client:
     SOURCE create_db.sql;
     ```
   - (Optional) Insert test data:
     ```sql
     SOURCE insert_test_data.sql;
     ```

4. **Configure database credentials:**
   - The app expects the following MySQL user (see `create_db.sql`):
     - User: `appuser`
     - Password: `app2027`
     - Database: `myForum`
   - Update `index.js` if you use different credentials.

5. **Start the application:**
   ```bash
   node index.js
   ```
   The app will run on [http://localhost:8000](http://localhost:8000)

## Project Structure
- `index.js` — Main entry point, sets up Express, sessions, and database connection
- `main.js` — All route handlers (register, login, post, search, delete, etc.)
- `views/` — EJS templates for all pages
- `styling/` — CSS files for styling
- `create_db.sql` — SQL script to create the database and tables
- `insert_test_data.sql` — SQL script to insert sample data
- `ER diagram.png` — Entity-Relationship diagram for the database

## Usage
- Register a new user or log in with an existing account
- Create new posts, view all posts, or search by user/topic
- Delete posts or users as needed
- All actions are available via the navigation bar

## Customization
- Update styles in the `styling/` directory (`main.css`, `register.css`, `result.css`)
- Modify EJS templates in `views/` for UI changes
- Update SQL scripts for custom database structure

## Dependencies
- express
- ejs
- body-parser
- express-session
- mysql

## Credits
- Created by [Your Name]
- See `about.ejs` for more info

---

*This project is for educational/demo purposes. Passwords are stored in plaintext for simplicity—do not use in production without proper security improvements!* 
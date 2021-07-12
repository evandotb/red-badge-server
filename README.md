# Anon Server
The github repo for the server of anon.herokuapp.com, an anonymous forum created by me!

# 17 Enpoints
Endpoints for users and admins. Includes role based access control.

# CRUD
Full CRUD on the comment and post tables.

# Data
PostgreSQL and sequelize handles the data.

# Database Associations
Post and comments belong to the user. Comments belong to a single post and a single user.

# Authentication
This application uses bcrypt for password encryption and jwt to validate sessions.

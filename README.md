# test-UsersDatabase-Auth-Role

The app should implement simple organization user structure management operations.
The following user roles should be supported:
a. Administrator (top-most user)
b. Boss (any user with at least 1 subordinate)
c. Regular user (user without subordinates)

Each user except the Administrator must have a boss (strictly one).
The following REST API endpoints should be exposed:
1. Register user
2. Authenticate as a user
3. Return list of users, taking into account the following:
- administrator should see everyone
- boss should see herself and all subordinates (recursively)
- regular user can see only herself
4. Change user's boss (only boss can do that and only for her subordinates)

Technologies: ● Javascript ● Node.js ● Express ● PostgreSQL ● Sequelize

-----------------------------------------------------------------------------------------------------

Tutorial for use:

FOR RUN APP YOU NEED: type in the project console: NODE_ENV=tarasov(or yours) npm run start

If app was started you can see:

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/Screenshot_2.png)

For comfortable use service you can use Postman - https://www.postman.com/downloads/

My database options:

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/Screenshot_1.png)

Service paths:

- POST http://localhost:4000/api/user/registration - reg user 
- POST http://localhost:4000/api/user/registration/admin - reg admin
- GET http://localhost:4000/api/user/login - login
- GET http://localhost:4000/api/user/ - get users by permission
- PUT http://localhost:4000/api/user/ - create(by admin) or change boss(by boss)

-----------------------------------------------------------------------------------------------------

POST: Reg user tutorial http://localhost:4000/api/user/registration

Open Postman and choose HTTP methot to POST, type path, then choose body to raw and type JSON\

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/Screenshot_3.png)

Example:
{\
    "name": "maxix",\
    "surname": "art",\
    "login": "artr1",\
    "password" : "qwerty"\
}

Rsponse:\
{\
    "message": "success",\
    "root": "user",\
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibG9naW4iOiJwIjoxNjMyNDE2MzU2fQ.V75Jmczr4RgEsvKy0Ng511kg-Yj51B3g-LGSjvGTq4c"\
}

-----------------------------------------------------------------------------------------------------

POST: Reg admin tutorial http://localhost:4000/api/user/registration/admin

Open Postman and choose HTTP methot to POST, type path, then choose body to raw and type JSON

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/regadmin.png)

Example:
{\
    "name": "artur",\
    "surname": "art",\
    "login": "admin",\
    "password" : "qwerty"\
}

Response:
{\
    "message": "success",\
    "root": "admin",\
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiLCJpYXQiOxODEyMH0.8GQeS6jtnWw2ZqPx-qJ9zmSngvjjKj3C5Iv0udRCmhE"\
}

-----------------------------------------------------------------------------------------------------

GET: Simple login tutorial http://localhost:4000/api/user/login

Open Postman and choose HTTP methot to GET, type path, then choose auth and change to Basic Auth

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/Screenshot_4.png)

Response:
{\
    "message": "successful login",\
    "root": "admin",\
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXmlhdCI6MTYzMjMyODA2NywiZXhwIjoxNjMyNDE0NDY3fQ.UNxd0yTNyxeEdBqkj2GhKh9CAz0H8AGx1z_l-hLD3EE"\
}

-----------------------------------------------------------------------------------------------------

GET: Get users by permission http://localhost:4000/api/user

Open Postman and choose HTTP methot to GET, type path, then choose auth and change to Basic Auth

Get user by "user":

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/getuser.png)

Get all users by "admin":

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/getall.png)

Get boss id and his subordinates by "boss"

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/checksubboss.png)

-----------------------------------------------------------------------------------------------------

!ATTENTION - the service does not work correctly and has bugs (SERVICE NOT FINISHED!!!)

Open Postman and choose HTTP methot to PUT, type path, then choose auth and change to Basic Auth, and type request body

PUT: Create boss(any user with at least 1 subordinate) by admin and change boss/transfer subordinates by boss

For create boss you must follow these steps:
1) Login as admin (user with permission - admin)

2) Type JSON with next fields: userId - user id who should become boss, subordinates - array of users id who should become subordinates

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/createbossbody.png)

3) For see changes you can login as admin and get all users 

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/checkboss.png)

-----------------------------------------------------------------------------------------------------

For change boss/tranfer subordinates you must follow these steps:
1) Login as boss

2) Type JSON with next fields: userId - user id who should become boss, subordinates - array of users id who should become subordinates

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/changeboss.png)

For see changes you can login as admin and get all users http://localhost:4000/api/user/:

![image](https://github.com/Tarasofff/test-UsersDatabase-Auth-Role/blob/main/img/checknewbossbyadminpng.png)

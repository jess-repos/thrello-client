# thrello-client

client code for thrello app
this application is a simplified clone of trello

## technologies used

- axios - simplify fetching data by using async/await with axios
- react-router-dom - navigation between pages

## how to start

1. clone the repository by using either of the 2 methods
   a. git clone https://github.com/jess-repos/thrello-client.git
   b. download and extract zip file from https://github.com/jess-repos/thrello-client.git
2. npm install - this will install all the packages required by from the package.json file
3. app is can be accessed on http://localhost:3000/

## how the react app works

the app mostly uses try/catch and async/await rather than .then/.catch to have a cleaner and more readable code.

### navigation/routes

- "/login" => login page
- "/register" => register page
- [private] "/" => dashboard (display all boards related to the user)
- [private] "/board/:\_id" => opened board uses board's id as url parameter (display all lists and list items related to the board)

### authorization

- private routes - app will redirect user to /login if the app doesn't have a user state 

### authentication

- token - successful login gives us a token which will be used when requesting resources to the server. the token will then be attached to the request headers to authenticate users.

### modals

1. add board modal
  - board title/name
  - board description
  - board isPrivate (default = false)

## RELATED

- client app for the image-uploader https://github.com/jess-repos/image-uploader

# thrello-client

**client code for thrello app**

- this application is a simplified clone of trello
- live link: https://nodemcthrello.netlify.app/
- trial username: _test_user_
- trial password: t*est_password*

## technologies used

1. axios => simplify fetching data by using async/await with axios
2. react-router-dom => navigation between pages

## how to start

1. clone the repository by using either of the 2 methods
   - git clone https://github.com/jess-repos/thrello-client.git
   - download and extract zip file from https://github.com/jess-repos/thrello-client.git
2. npm install - this will install all the packages required by from the package.json file
3. app is can be accessed on http://localhost:3000/

## how the react app works

the app mostly uses try/catch and async/await rather than .then/.catch to have a cleaner and more readable code.

### navigation/routes

1. "/login" => login page
2. "/register" => register page
3. [private] "/" => dashboard (display all boards related to the user)
4. [private] "/board/:\_id" => opened board uses board's id as url parameter (display all lists and list items related to the board)

### authorization

1. private routes => app will redirect user to /login if the app doesn't have a user state

### authentication

1. token => successful login gives us a token which will be used when requesting resources to the server. the token will then be attached to the request headers to authenticate users.

### modals

1. add board modal
   - board title/name (required)
   - board description (optional)
   - board isPrivate (default = false)

### colors

**colors are defined in :root{} at index.css file which can be accessed globally**

```
:root {
  --c-primary: rgb(47, 128, 237);
  --c-primary-hover: rgb(39, 98, 177);
  --c-complement: rgb(237, 156, 47);
  --c-secondary: rgb(189, 189, 189);
  --c-secondary-hover: rgb(143, 143, 143);
  --c-error: rgb(235, 87, 87);
  --c-success: rgb(144, 238, 144);
  --c-dark: rgb(60, 60, 60);
  --c-white: rgb(255, 255, 255);
  --c-light: rgb(212, 212, 212);
  --c-light-hover: rgb(196, 196, 196);
  --c-backdrop: rgba(0, 0, 0, 0.5);
  --c-transparent: rgba(0, 0, 0, 0);
}
```

## RELATED

- client app for the image-uploader https://github.com/jess-repos/thrello-server

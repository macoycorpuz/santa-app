# Santa App

_Project was published to github because nodejs 20 wasn't working in glitch_

The application was created using react for client and express for server

- Install the packages using `yarn install`
- To run the project, run the following command: `yarn start` 
- Client and Server can run separately using the following command: `yarn start:client` and `yarn start:server`
- App can be accessed from `http://localhost:3000/`
- To be able to see email messages, check logs and click preview URL. (ie. https://ethereal.email/message/Zm80lf6C5BlireoVZm81L1bGCTYj7a4FAAAACr0lgJdXLpW3AVcDEbkxrK0)

## Project Structure

- `/server` - Contains all server side code
  - `index` - Starting point of express application and declaration of endpoints
  - `child` - Contains the logic to fetch users, user profile and age validation
  - `mailer` - Contains the code to send pending wishes through mail every 15 seconds. To simplify mail configurations, test account is used.
  - `data` - In memory data for pending wishes. In real world scenario, this should be replaced by on-disk database.
- `/src` - Contains all client side code.


## Packages added

- `nodemailer` - to send email from nodejs
- `axios` - used to fetch data from users.json and userProfiles.json and post wish in client
- `cors` - to allow client access resource from server
- `concurrently` - to run server and client at the same time
- `nodemon` - to run server and watch changes

## Objectives overview:

The webapp should display a form for children to enter their id and a free text message to santa.

When submitting the form, the server should check:

1.  that the child is registered
2.  that the child is less than 10 years old.
    To this purpose, the server can fetch user and profiles data in JSON format from:

- https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json
- https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json

If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic error page with an error message explaining the problem.\
If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.

Every 15seconds, the server should send an email with information on all pending (not yet sent) requests including:

- child username (eg. charlie.brown)
- child's address (eg. 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo)
- request free text as was input in the form

Email sender should be set as do_not_reply@northpole.com, and sent to santa@northpole.com

## Tips and detailed instructions:

- Somebody started to work on the app, but left it unfinished and did not use any modern technology. We added React for you to have a clean base but feel free to use any other technology you might prefer.
- The UI and UX of the application for this challenge is not the priority. The pages/email do not need to look good, as long as they convey the information effectively.
- You should fetch the JSON data at every form submission (consider it as an API).
- For the sake of the challenge, you can keep the requests in-memory only.
- You are encouraged to select and use npm packages as needed (you can add packages by editing package.json, or using `npm install` from the glitch console).
- To get an smtp server for emails, go to https://ethereal.email/ and click "Create Ethereal Account".\
  This will give you an account (take note of your username and pwd if you need to re-logon later) and smtp server (actual emails do not get delivered).\
  Go to https://ethereal.email/messages to see the emails that have been received by the smtp server.

## Some things we will look for in your submission

- Code quality (readability, use of modern syntax...)
- Does the app work as designed (cf. objectives overview)
- App architecture (folder structure, configuration management...)
- Documentation (why did you choose to change or add a package...)

## Tips on usage of glitch

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.
When your app is running, you can access logs and console using the "Tools" button at the bottom left.

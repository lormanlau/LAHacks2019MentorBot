# LAHacks2019MentorBot

## Configure
1. Configure a programmable sms service from twilio
2. Have your twilio account send sms POST requests to your backend using /sms
3. Add your twilio sid and token to server.js
4. Change the baseURL inside index.js to your backend

## How to use
1. Log into helpdesk.lahacks.com
2. Have a deployed backend
3. Run the top script of index.js in the console of your web browser.
- in Google Chrome: right-click -> inspect -> console tab
4. Open https://helpdesk.lahacks.com/api/ticket/open in a new tab.
5. Run the bottom script of index.js in the bottom console of your web browser.

# How it works
The top script of index.js clicks on the refresh button so that you can keep the authToken from lahacks.com refreshed.
The bottom script of index.js converts the JSON from the lahacks api to base64 and sends it to your backend by adding it into the URL
The backend then checks to see if it has seen it already or not and sends the new message accordingly.
Both index.js scripts runs every minute.

# Issues that I ran into
Originally I wanted to send a post request with all the json to my backend but LAHacks cors prevents post requests.
Sometimes the LAHacks api would time out my auth token and I would recent unauthorized user. 
I solved this by just creating something that would click the refresh button to refresh the login token.

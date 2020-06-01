## Day 4 // 2020.05.25

**6:30pm:**
We are reviewing Joel’s server addition. Discussing the best way to integrate this sort of service. May require refactoring of server functionality. Joel realized this. 

We can also utilize express-swagger-generator to automate documentation.

Push API server to Heroku, separate from the readline server. Use Superagent inside of readline to interact with the database. Before, we used the readline app to connect to the DB. Which makes it tricky to access data within the client app. Because the clients won’t have an ENV file. So we need to funnel that process through a server. 

Before, we had the terminal connect with the mongo DB. That requires credentials tied to the terminal. Now instead we will have the terminal connect to the API server, then have that server connect to the DB. That way the client doesn’t need to have any credentials tied to it. 

Goals for today, move all the server/API stuff and then get the logins working again. 

Will need to create route file with User/New and Character/New eventually. Will eventually need to send tokens from client to server as well. To keep user logged in.

Modify readline files to do superagent call instead of using a UserModel

Client App:
Dbjson: this means the client holds all char creation info and only needs to talk to the server in order to save that information

API App:
Mongoose server stuff

**7:00pm:**
Began mob coding out refactor of single app into client app and server

Following fully restful API conventions

In regards to hashing passwords on client side, we suspect we will need to rehash it on server side in order for bcrypt to effectively read it. May need to consult with Sonia about this nuance to see if we are doing it right. 

On the original Development branch, we removed the READLINE folder and the db.json file from DATA folder. 

Move the readme from the first one onto the client-readme. So the client-readme covers all bases. 

**8:00pm:**
Got client-side app working for the most part. 

Now working on server side. Going to clean up files, then deploy to Heroku. Get routes situated. Using comments to denote which route needs auth.

**8:55pm:**
Got login route built. Testing now. 

**9:05pm:**
Got it working but didn’t complete the hashing element. Will push to Heroku to test there. 

**9:30pm:** 
Pushed to Heroku. Ran into a function error. `unset` is not a recognized function! Fixed. Testing. Ran into issues. Removed the hashing and got it working. Now rethinking our entire security flow. We may want to build with minimal security and then worry about total security once the app is fully built. 
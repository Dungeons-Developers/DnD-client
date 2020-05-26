# TOC 
pending anchor tags. test below

[Day 4 // 2020.05.25](#Day-4-//-2020.05.25)

### [Day 1 // 2020.05.20]

**7:30pm:** We quickly formed our group and drafted the Team Agreement + Project Description. We brainstormed MVP ideas along with stretch goals. We also got our repo and branch control set up.

### Day 2 // 2020.05.21

**6:30pm:** We put together a list of user stories focused on MVP. We also built a rough Domain Model to help structure our data flow. 

### Day 3 // 2020.05.23

**9:45am:** We are trying to dial in the directions for the build

Char creation will have defaults built in, regarding starting equipment and spells. This will make it easier for us to build this app.

API has starting equipment already built in for us. 

We will have prebuilt stats to start with as well

Tasks:
* Object modeling
* User flow, terminal wire framing
* Setup mongo DB, get that connected to app
* Get user logins working before end of day
* Endgame: we will need to create npm package
* User then uses keywords to run app

/// How to Use
- Run `npm start` to fire up app during dev
- User will need to download npm package we make

// start building out responses
// figure out cli-select to get UI to feedback

/// big createChar function
- Build char object at start
- Saves lots of values along many steps
- Spits out built char at end of it

/// Database
- Users
- Characters stuff tied to users

/// API
- We will have locally stored version for simplicity
- Be stored as JSON files. Can be worried about later

Build auth into user stuff

/// UI in Terminal
- Readline module
- CLI-select

Fuzzy5E - reference for direction we can go in

/// User Flow

- User login
  - New? Saved?
  - Username & password input
- Character creation (display all possible options in prompt)
  - (Will need validation)
    - CLI-select will remove that step as they can’t enter bad input
  - Name
  - Race
  - Class
  - Alignment (can change text color based on alignment) CHALK package
  - Deity
  - Skills
    - You can choose some depending on class/race/level
    - We can set a default for 2 for each class
    - Leave these to default for MVP
  - Armor class
    - Tied to classes, we will default that
  - Equipment
    - Set to default for MVP

/ / /  Packages
- mongoose
- bcrypt
- Chalk
- Readline (built into node)
- Cli-select

**4:00pm:** We ran into two critical bugs. Had to call in Sonia to help debug. That somehow took an hour and the team was drained. So we called the day early at 5:00pm.

### Day 4 // 2020.05.25

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

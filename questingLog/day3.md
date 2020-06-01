## Day 3 // 2020.05.23

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
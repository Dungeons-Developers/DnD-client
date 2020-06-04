# DnD NPM Package
A space for our Dungeons and Dragons App Back End Development project!

### Team Members
* [Kory Jackson - Lead Tester](https://www.linkedin.com/in/kory-jackson-927363164/)
* [Clayton Jones - Lead Dev](https://www.linkedin.com/in/claytonjjones/)
* [Daniel Nguyen - Project Manager](https://www.linkedin.com/in/danielknguyen/)
* [Madison Stehle - Code Reviewer](https://www.linkedin.com/in/madison-stehle/)
* [Joel Watson - DevOps](https://www.linkedin.com/in/jwatsondev/)

## Project Summary

Our plan for this project is to create a robust tool that allows players to create, track, and maintain characters & campaigns in an online database. We want to put online many of the offline elements of D&D. Things like character creation, stat tracking, equipment tracking, campaign notes, campaign progress, and DM campaign variables are typically maintained with pen and paper. This tool, if fully realized, could help create an online database to track, analyze, and crowd-source aggregate player data. This data can be used to make the game as paperless as possible. It could also help users see what kind of classes, spells, and tactics are commonly used or most effective for any given campaign. In essence, this tool could help form a metagame for a game-space that typically does not engage in metagames. 

## Install
- `npm i -g dnd-scribe`

[NPM Package](https://www.npmjs.com/package/dnd-scribe)

## Usage

### Start

After you install the application, you can start it with `dnd-scribe`. You will then see this view:

<img src="https://github.com/Dungeons-Developers/DnD-client/blob/development/assets/usage1.png" width="500">

### Login / Signup

You can then input `1` to login or `2` to signup. Let's show the signup path.

<img src="https://github.com/Dungeons-Developers/DnD-client/blob/development/assets/usage2.png" width="500">

### Main Menu

Once signed in, you can view or create a character. 

<img src="https://github.com/Dungeons-Developers/DnD-client/blob/development/assets/usage3.png" width="500">

### Character Create

To create a character, you will begin by choosing a name. Then just follow the given directions until you finish creating your new adventurer!

<img src="https://github.com/Dungeons-Developers/DnD-client/blob/development/assets/usage4.png" width="500">

<img src="https://github.com/Dungeons-Developers/DnD-client/blob/development/assets/usage5.png" width="500">

### View Characters

After you create your character, or after you login, you will see the main menu. Select `1` to view a list of all created characters. 

<img src="https://github.com/Dungeons-Developers/DnD-client/blob/development/assets/usage6.png" width="500">

### Character Select

Once you have selected a previously created character, you will be able to see all the attributes tied to that character. From here you can delete your character or return to the main menu.

<img src="https://github.com/Dungeons-Developers/DnD-client/blob/development/assets/usage7.png" width="500">

## [Project Board with User Stories](https://github.com/Dungeons-Developers/DnD/projects/1?add_cards_query=is%3Aopen)

## Domain Model

![domain model](/assets/domain-model2.png)

## Team Agreement
<details>
  <summary>View More</summary>

### Team: Kory Jackson, Clayton Jones, Daniel Nguyen, Madison Stehle, Joel Watson

**Communication plan:** 
How will your group communicate with each other? What is your strategy for ensuring everyone’s voices are heard, and that contributions from both loud and soft voices are listened to? Do you have a plan for managing psychological safety?

Slack will be our primary channel for communication. We will be sure to have each member contribute to all discussions, assuming they feel they have something to say. Nothing is required.
In the event of psychological safety issues, concerned members should reach out to a 3rd party within the group to mediate. If that is not amenable or if that fails to mitigate the issue, the concerned members will reach out to Sonia or CF admins to escalate the issue.

**Conflict plan:** What will your group do when it encounters conflict? What will your process be to resolve it?
Should a conflict arise, we will discuss it as a group. We can either vote or refer to the lead for that scope to break ties. If the conflict is personal, we will revert to the guidelines outlined in our Communication Plan. 

**Work plan:** How you will identify tasks, assign tasks, know when they are complete, and manage work in general? In particular, make sure you know how you’ll track whether everyone is contributing equally to all parts of the application, and that each person is working on “meaty” problems. What project management tool will be used?

We will use Github Projects for task management. We will aim to balance the number of commits equally across the team. We may or may not assign a Project Manager role to the team (Daniel volunteers).

**Git process:** What is your Git flow? How many people must review a PR? Who merges PRs? How often will you merge? How will you communicate that it’s time to merge?

`Master > Dev > Feature`

Feature merges into Dev branch will require one other team member to approve. Merges from dev into master will require every member of the team to approve, pending a code review.

Merge communication will happen via Slack, or over comms via Remo.

**Anything else you feel is important:** Expectations around work times, stand-up times(outside of the ones schedule with the instructional team), taking breaks/seeking help when you’re stuck, etc.

Regarding working windows, we will stick to class hours (6:30 to 9:30pm, M-Th) as a bare minimum. If folks want to start earlier or work later, that is totally okay too! 

</details>

## Origin Story

- We are all huge fans of the Dungeons & Dragons universe and the many, many fantasy worlds it has inspired. Building out some kind of D&D-focused application has been a goal for us ever since we started taking classes at Code Fellows. We are also tryhard gamers and wanted to incorporate some kind of shared tracking system into a gaming space that was traditionally managed with paper and pencil. We are hoping that our application can illustrate how making it easy to share, manipulate, and analyze D&D aggregate data could help create a digital online metagame for an analog gamespace.

## Things To Watch For

- We did not add strong user account authorization (yet) as it was complicating our work to get in the weeds on that feature. We wanted to get the application fully built and running first. That may come with a later update.
- We limited character creation to Level 1 characters to decrease project scope and complexity. Later updates may include the ability to update a character beyond the initial build. 

## [Change Log](/questingLog/log.md)

## Credits

* [D&D Beyond](https://www.dndbeyond.com/)
* [D&D 5th Edition API](https://www.dnd5eapi.co/)
* [Gary Gygax](https://en.wikipedia.org/wiki/Gary_Gygax)
* [D&D 5th Edition Reference for Terminal](https://github.com/cachance7/fuzzy5e)


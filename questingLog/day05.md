## Day 5 // 2020.05.26

**6:45pm:** Review to make sure that everybody understands what needs to be done next. 

**7:00pm:** We are going to work on finishing the signup route + JSON Web Token to complete the login process. All on the server side.  

Readme notes regarding auth:
Mention that we skipped it as it is not necessary right now. Since our users will exist in a bubble and we won’t need persistent auth for this scope. 

**7:25pm:** Got signup route working. Going to push up to Heroku and test with the client side. Seems to be working.

**7:40pm:** Made progress on login auth, specifically checking for duplicate usernames during the signup process.

**7:45pm:** Sonia let us know that we don’t need to send the pw from client in hashed form. Sending via basic auth encoding is fine since http is a secure connection. 

**8:00pm:** Testing signup and login routes for edge cases.

**8:30pm:** Ran into a user authentication issue regarding looping a recursive function. Spent a good chunk of time trying to get that working cleanly. Calling in Sonia again to help debug.

**9:00pm:** Fixed the login loop issue. Pushing code up to development branch now. 

Tomorrow’s goals:
Build out character routes for View and Create. Have API ready for them to make calls to API. We just need to be able to have users create Name, Race, and Class. We will need to build out model/schema for chars too. 

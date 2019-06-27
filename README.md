# Train_Scheduler

In this assignment, I created a train schedule application that incorporates Firebase to host arrival and departure data. The app will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

When adding trains, administrators are able to submit the following:
  * Train Name
  * Destination 
  * First Train Time -- in military time
  * Frequency -- in minutes

The app will then: 
  * Calculate when the next train will arrive relative to the current time.
  * Allow other machines to users to view same train times.
  * Store the information in Firebase. 

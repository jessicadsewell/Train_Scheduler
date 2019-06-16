var firebaseConfig = {
    apiKey: "AIzaSyDuNfiseeGzk2_RCBg8bqfx8OTy9KUxWUE",
    authDomain: "practicepractice-ddde9.firebaseapp.com",
    databaseURL: "https://practicepractice-ddde9.firebaseio.com",
    projectId: "practicepractice-ddde9",
    storageBucket: "practicepractice-ddde9.appspot.com",
    messagingSenderId: "349538534707",
    appId: "1:349538534707:web:d206d9f0f6ac5d77"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var trainData = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    // Holds new train data
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Upload to the database
    trainData.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    alert("New train time added");
  });
  
  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    var newTrain = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newFrequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;
  
    var timeArr = firstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    //https://momentjs.com/
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    // If the first train is later than the current time, set arrival to the first train time
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
      // Minutes until arrival
      // Calculate the minutes till arrival. Current time in unix subtract the FirstTrain time
      // and find the modulus between the difference and the frequency.
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(newTrain),
        $("<td>").text(newDestination),
        $("<td>").text(newFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
      )
    );
  });
  
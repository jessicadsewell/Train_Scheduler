var firebaseConfig = {
  apiKey: "AIzaSyDJwBjS65Ii_vKLJwzRPB4FxYxRGqvkqHc",
  authDomain: "train-4db43.firebaseapp.com",
  databaseURL: "https://train-4db43.firebaseio.com",
  projectId: "train-4db43",
  storageBucket: "train-4db43.appspot.com",
  messagingSenderId: "536886829682",
  appId: "1:536886829682:web:de3a89db6c2a6cec"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#submit-button").on("click", function (event) {
  event.preventDefault();
  console.log("hi")
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

  console.log(newTrain);

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
});

trainData.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var newTrain = childSnapshot.val().name;
  var newDestination = childSnapshot.val().destination;
  var newFrequency = childSnapshot.val().frequency;
  var tfirstTrain = childSnapshot.val().firstTrain;


  var convertedT = moment(tfirstTrain, "HH:mm").subtract(1, "day");

  var differenceTimes = moment().diff(moment(convertedT), "minutes");
  var tRemainder = differenceTimes % newFrequency;
  var tMinutes = newFrequency - tRemainder;
  var tArrival = moment().add(tMinutes, "minutes").format("HH:mm");
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

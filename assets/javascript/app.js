var config = {
    apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
    authDomain: "time-sheet-55009.firebaseapp.com",
    databaseURL: "https://time-sheet-55009.firebaseio.com",
    storageBucket: "time-sheet-55009.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = moment($("#frequency-input").val().trim(), "MM/DD/YYYY").format("X");
    var nextArrival = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var trainName = {
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      nextArrival: trainNextArrival
    };
  
    // Uploads employee data to the database
    database.ref().push(trainName);
  
    // Logs everything to console
    console.log(trainName.name);
    console.log(trainDestination.destination);
    console.log(trainFrequency.frequency);
    console.log(trainNextArrival.nextArrival);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#nextarrival-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("train_added", function(trainSnapshot) {
    console.log(trainSnapshot.val());
  
    // Store everything into a variable.
    var trainName = trainSnapshot.val().name;
    var trainDestination = trainSnapshot.val().role;
    var trainFrequency = trainSnapshot.val().start;
    var trainNextArrival = trainSnapshot.val().rate;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainNextArrival);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainNextArrival),
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  

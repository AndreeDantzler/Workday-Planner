var time = setTime();
var updateTime = setInterval(setTime, 1000);
function setTime() {
  var reformatDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  $("#currentDay").text(reformatDate);
}

//setting initial data to either be nothing or to be what we fetched from localstorage

var data = JSON.parse(localStorage.getItem('scheduler'))|| {};
console.log(data);
console.log(Object.entries(data));

//selecting items from local storage and setting them back on html
Object.entries(data).forEach(function([key,value]) {
  console.log(`${key} ${value}`);
  $(`.time-${key}`).val(value);
});


//what is each timeblock, each timeblock is the row, the hour of the timeblock needs to be
//compared with the current hour. if the hour of the timeblock is greater than current time, then it becomes future
//if timeblock hour is equal to current time, then the class of presnet should be added to the element
//if timeblock hour is lesser than current hour, then the class of past should be added to the element

var possibleHour = [
  "12AM",
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];
var currentHour = moment().format("ha").toUpperCase();
console.log(currentHour);

//Need to define in poss hour the arrays for past time and future times as this is what will be used to assign class

var pastTime = possibleHour.slice(0, possibleHour.indexOf(currentHour));
var futureTime = possibleHour.slice(possibleHour.indexOf(currentHour) + 1);
var element = document.getElementsByClassName(`.time-${currentHour}`);

//if current time

if (element) {
  $(`.time-${currentHour}`).addClass("present");
}

//if future time

futureTime.forEach(function (time) {
  if (element) {
    $(`.time-${time}`).addClass("future");
  }
});

//if past time

pastTime.forEach(function (time) {
  if (element) {
    $(`.time-${time}`).addClass("past");
  }
});

//saving data from textarea

//i need to create a variable that captures input from text area and time associated with it
//that combination will be data i will store

$(".saveBtn").each(function () {
  $(this).on("click", function () {
    var value = $(this).prev().val();
    var key = $(this).attr("id");
    data[key] = value;
    console.log(data);
    localStorage.setItem("scheduler", JSON.stringify(data));
  });
});



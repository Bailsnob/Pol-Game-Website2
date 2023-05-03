/**Unique user idea obtained when registered with server's session manager. */
let id;
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

/* First function to run when page loads. */
onload = () => {
  /* Register with the server, then initialize the HTML elements, etc. */
  register().then(() => initialize());
};

/*******************************************************************************
 * Register with the server's session manager to obtain a session id string.
 ******************************************************************************/
async function register() {
  // declaring the function as async automatically makes it return a promise
  await fetch("session") // await says not to resolve until it is done
    .then((response) => response.json()) // expecting json from the response
    .then((json) => (id = json.id)); // extract id from the json & save it
}

/*******************************************************************************
 * Handles click on the start button.
 ******************************************************************************/
function handleStart() {
  document.getElementById("start-overlay").style.display = "none";

  //"min-year-delete", "min-year-replaced", "max-year-replaced", "max-margin", "date-padding", "margin-padding"

  /* Convert the minimum and maximum year values to numbers. */
  const selectedStates = getSelectedStates(document.getElementById("states-start"));
  console.log(selectedStates);
  const minYearDelete = Number(
    document.getElementById("states-start").value
  ); //TODO: this should be replaced with the states list
  const minYearReplaced = Number(
    document.getElementById("min-year-replaced").value
  );
  const maxYearReplaced = Number(
    document.getElementById("max-year-replaced").value
  );
  const maxMargin = Number(document.getElementById("max-margin").value);
  const datePadding = Number(document.getElementById("date-padding").value);
  const marginPadding = Number(document.getElementById("margin-padding").value);

  /* Call "start" route on the server as a "POST", passing id & year range. */
  fetch("start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      minYearDelete,
      minYearReplaced,
      maxYearReplaced,
      maxMargin,
      datePadding,
      marginPadding,
    }),
  })
    .then((response) => response.blob()) // expecting an image blob as response
    .then((blob) => URL.createObjectURL(blob)) // create url for the image
    .then((url) => (document.getElementById("main-img").src = url)); // display
}

function handleGuess() {
  //TODO: make sure the parameters cannot be altered after the submit button is pressed
  //"winner-guess", "date-guess", "margin-guess"

  const winnerGuess = document.getElementById("winner-guess").value; //TODO: confirm that .value gives what we want for selector
  const dateGuess = Number(document.getElementById("date-guess").value);
  const marginGuess = Number(document.getElementById("margin-guess").value);

  /* Call "start" route on the server as a "POST", passing id & year range. */
  fetch("guess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      winnerGuess,
      dateGuess,
      marginGuess,
    }),
  })
    .then((response) => response.json()) // expecting an image blob as response
    .then((json) => console.log(json)) // create url for the image
    .catch((error) => console.error("Cats like fishies"));
}

/*******************************************************************************
 * Sets event listeners, etc.
 ******************************************************************************/
function initialize() {
  document
    .getElementById("start-button")
    .addEventListener("click", handleStart);
  document
    .getElementById("guess-button")
    .addEventListener("click", handleGuess);
  initializeStatesStart();
  console.log("id: ", id);
}

function initializeStatesStart() {
  const statesStart = document.getElementById("states-start");
  for (let state of states) {
    const option = document.createElement("option");
    option.setAttribute("value", state);
    option.innerHTML = state;
    statesStart.appendChild(option);
  }
}

function getSelectedStates(select) {
  const result = [];
  const options = select && select.options;
  for (let option of options) {
    if (option.selected) {
      result.push(option.value || option.text);
    }
  } 
  return result;
}
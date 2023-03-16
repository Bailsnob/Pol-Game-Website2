/**Unique user idea obtained when registered with server's session manager. */
let id;

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

  /* Convert the minimum and maximum year values to numbers. */
  const minYear = Number(document.getElementById("min-year").value);
  const maxYear = Number(document.getElementById("max-year").value);

  /* Call "start" route on the server as a "POST", passing id & year range. */
  fetch("start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, minYear, maxYear }),
  })
    .then((response) => response.blob()) // expecting an image blob as response
    .then((blob) => URL.createObjectURL(blob)) // create url for the image
    .then((url) => (document.getElementById("main-img").src = url)); // display
}

/*******************************************************************************
 * Sets event listeners, etc.
 ******************************************************************************/
function initialize() {
  document
    .getElementById("start-button")
    .addEventListener("click", handleStart);
  console.log("id: ", id);
}
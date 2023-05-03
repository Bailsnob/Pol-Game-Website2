import { promises as fs } from "fs"; //async version
import getRandomState from "./states.mjs";
import getRandomYear from "./years.mjs";

export default class Game {
  constructor(session) {
    this.session = session;
    this.isStarted = false;
    this.state = undefined;
    this.year = undefined;
    this.minYear = undefined;
    this.maxYear = undefined;
  }
  async guess(winnerGuess, dateGuess, marginGuess) {
    //TODO: determine whether function must be async
    this.winnerGuess = winnerGuess;
    this.dateGuess = dateGuess;
    this.marginGuess = marginGuess;
    this.evaluation = this.getEvaluation();

    return {
      type: "application/json",
      data: JSON.stringify(this.evaluation), //TODO: idaho map not centered for some reason (fix it)
    };
  }
  async start(
    minYearDelete,
    minYearReplaced,
    maxYearReplaced,
    maxMargin,
    datePadding,
    marginPadding
  ) {
    this.minYearDelete = minYearDelete;
    this.minYearReplaced = minYearReplaced;
    this.maxYearReplaced = maxYearReplaced;
    this.maxMargin = maxMargin;
    this.datePadding = datePadding;
    this.marginPadding = marginPadding;
    this.state = getRandomState(minYearDelete); //TODO: this has to be replaced with state restraints
    //TODO: fix states.mjs getRandomState()
    this.year = getRandomYear(this.minYearReplaced, this.maxYearReplaced);
    //TODO: figure out how to filter based on the max margin
    this.results = JSON.parse(
      await fs.readFile(`./maps/Presidential/2000/Kansas.json`)
    );
    console.log("##################################");
    console.log(this.results);
    this.victor = "taco"; //TODO: get victor from somewhere
    this.margin = 23; //TODO: get margin from somewhere
    this.isStarted = true;

    return {
      type: "image/png",
      data: await fs.readFile(this.chooseMap()), //TODO: idaho map not centered for some reason (fix it)
    };
  }
  chooseMap() {
    return `./maps/Presidential/${this.year}/${this.state}.png`;
  }
  getEvaluation() {
    //TODO: make this function
    const evaluation = {
      state: this.state,
      party: {
        guess: this.winnerGuess,
        actual: this.results.victor,
        result: "",
      },
      year: { guess: this.dateGuess, actual: this.results.year, result: "" },
      margin: {
        guess: this.marginGuess,
        actual: this.results.margin,
        result: "",
      },
    };
    evaluation.party.result =
      evaluation.party.guess === evaluation.party.actual
        ? "Correct!"
        : "Incorrect";
    evaluation.year.result =
      evaluation.year.guess === evaluation.year.actual
        ? "Correct!"
        : "Incorrect";
    evaluation.margin.result =
      evaluation.margin.guess === evaluation.margin.actual
        ? "Correct!"
        : "Incorrect";

    return evaluation;
    //ternary operator: relates to assignment; if a condition is true it assigns
    // a certain value and if not it assigns another value
  }
}

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
  async start(minYear, maxYear) {
    this.minYear = minYear;
    this.maxYear = maxYear;
    this.state = getRandomState();
    this.year = getRandomYear(this.minYear, this.maxYear);
    this.isStarted = true;
    return {
      type: "image/jpeg",
      data: await fs.readFile("./private/secret-map.jpg"),
    };
  }
}

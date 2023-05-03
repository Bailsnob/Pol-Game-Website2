const states = ["Kansas", "Idaho"];

export default function getRandomState() {
  return states[Math.floor(states.length * Math.random())];
}

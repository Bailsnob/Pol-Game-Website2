const states = ["Alabama", "Alaska"];

export default function getRandomState() {
  return states[Math.floor(states.length * Math.random())];
}

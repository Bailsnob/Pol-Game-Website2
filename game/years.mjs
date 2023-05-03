const years = [2000, 2004, 2008];

export default function getRandomYear(minYear, maxYear) {
  //TODO
  return years[Math.floor(years.length * Math.random())];
}
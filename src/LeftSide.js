import logo from "./Images/clouds.png";
import "./css/LeftSide.css";

const date = new Date();
const day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const current_date =
  date.getHours() +
  ":" +
  date.getMinutes() +
  "-" +
  day[date.getDay()] +
  "," +
  date.getDate() +
  " " +
  months[date.getMonth()] +
  " " +
  date.getFullYear();

function leftSide({ temp, name, desc }) {
  return (
    <div className="App-Image">
      <div className="App-Image-inner">
        <p>{temp}</p>
        <div className="Option-1">
          <h1>{name.toUpperCase()}</h1>
          <span>{current_date}</span>
        </div>
        <div className="Option-2">
          <img src={logo} alt="" />
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default leftSide;

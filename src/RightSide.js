import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import React from "react";
import icon from "./Images/clouds.png";
import "./css/rightSide.css";

function RightSide({ temp, wind, desc, forcast }) {
  return (
    <div>
      <p className="App-details-title">Weather Details</p>
      <div className="App-details">
        <p>Temperature</p>
        <span>{temp}</span>
        <p>Wind</p>
        <span>{wind}</span>
        <p>Description</p>
        <span>{desc}</span>
      </div>
      <Divider />
      <p className="App-details-title">Forecast</p>
      <div className="App-Forecast">
        <Grid container spacing={0}>
          {forcast.map((items) => (
            <React.Fragment key="123">
              <Grid item xs={4}>
                <div className="App-Forecast-inner">
                  <p>DAY {items[0].day}</p>
                  <img src={icon} alt="" />
                  <div>
                    <p>{items[0].temperature}</p>
                    <p>{items[0].wind}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="App-Forecast-inner">
                  <p>DAY {items[1].day}</p>
                  <img src={icon} alt="" />
                  <div>
                    <p>{items[1].temperature}</p>
                    <p>{items[1].wind}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="App-Forecast-inner">
                  <p>DAY {items[2].day}</p>
                  <img src={icon} alt="" />
                  <div>
                    <p>{items[2].temperature}</p>
                    <p>{items[2].wind}</p>
                  </div>
                </div>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default RightSide;

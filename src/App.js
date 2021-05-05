import "./css/App.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useEffect } from "react";

import RightSide from "./RightSide";

import LeftSide from "./LeftSide";
import platform from "platform";

const StyledTextField = withStyles(() => ({
  root: {
    width: 300,
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "gray",
    },
    "& label.Mui-focused": {
      color: "gray",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "gray",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "gray",
    },
  },
}))(TextField);

const os = platform.os.family;

function App() {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [desc, setDesc] = useState("None");
  const [forcast, setForcast] = useState([]);
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://goweather.herokuapp.com/weather/Pune`
      );
      const data = await response.json();
      setName("Pune");
      setTemp(data.temperature);
      setWind(data.wind);
      setDesc(data.description);
      setForcast([data.forecast]);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    await e.preventDefault();
    const response = await fetch(
      `https://goweather.herokuapp.com/weather/${name}`
    );
    const data = await response.json();
    setMsg(data.message);
    setTemp(data.temperature);
    setWind(data.wind);
    setDesc(data.description);
    setForcast([data.forecast]);
  };
  return (
    <div>
      {msg === "NOT_FOUND" ? (
        <p>Page not Found</p>
      ) : (
        <div className="App-body">
          <Container maxWidth="md">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <Paper>
                  <LeftSide temp={temp} name={name} desc={desc} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper square className="App-form" id="style-1">
                  <Paper
                    style={{ backgroundColor: "rgba(1, 28, 37, 255)" }}
                    square
                  >
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <div>
                          <form
                            method="get"
                            onSubmit={handleSubmit}
                            autoComplete="true"
                          >
                            <StyledTextField
                              label="Enter Location : "
                              placeholder="eg. Pune"
                              style={{
                                marginLeft: "50px",
                                marginRight: "52px",
                                marginTop: "33px",
                                width: "60%",
                              }}
                              inputProps={{
                                maxLength: 10,
                              }}
                              value={name}
                              onChange={handleChange}
                            />
                            {os === "Android" || os === "iOS" ? (
                              <></>
                            ) : (
                              <SearchIcon
                                style={{
                                  textAlign: "right",
                                  backgroundColor: "black",
                                  color: "white",
                                  fontSize: "80px",
                                  padding: "20px",
                                }}
                              />
                            )}
                          </form>
                        </div>
                        <Divider />
                        <RightSide
                          temp={temp}
                          wind={wind}
                          desc={desc}
                          forcast={forcast}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
            <div className="footer">
              <p>&copy; Crispin Thomas</p>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default App;

import React, {Component} from "react";
import {StyleSheet, Text, View, TextInput, Image,ImageBackground} from "react-native";
import Forecast from "./Forecast";
import OpenWeatherMap from "./open_weather_map";

class WeatherProject extends Component {
  constructor(props){
    super(props);
    this.state = { zip: "", forecast: null};
  }

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    // this.setState({zip:event.nativeEvent.text });
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
      console.log(forecast);
      this.setState({forecast:forecast});
    })
  }

  // <Text style={styles.welcome}>
  //   Your input {this.state.zip}
  // </Text>
  // {content}
  // <TextInput
  //   style={styles.input}
  //   onSubmitEditing={this._handleTextChange}
  // />

  render(){
    let content = null;

    if (this.state.forecast !== null){
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }

    return(
      <View style={styles.container}>


        <ImageBackground
          source={require("./artAssets/flowers.png")}
          resizeMode="cover"
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing = {event=> this._handleTextChange(event)}
                />
              </View>
            </View>
            {content}
          </View>
        </ImageBackground>




      </View>
    )
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#666666",
  },
  backdrop: {
    flex:1,
    flexDirection:"column",
    alignItems: "stretch",
  },
  overlay: {
    paddingTop:5,
    backgroundColor: "#000000",
    opacity: 0.5,
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 30
  },
  zipContainer:{
    height: baseFontSize + 10,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth:1,
    marginLeft: 5,
    marginTop:3
  },
  zipCode:{
    flex: 1,
    flexBasis: 1,
    width: 50,
    height: baseFontSize
  },
  Welcome: {fontSize:20, textAlign: "center", margin:10},
  input: {
    fontSize: 20,
    borderWidth: 2,
    padding: 2,
    height: 40,
    width: 100,
    textAlign: "center"
  }
});

export default WeatherProject;

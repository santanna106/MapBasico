import React, { PROVIDER_GOOGLE,Component} from 'react';
import MapView from 'react-native-maps';

import {
  StyleSheet,
   View,
  Text,
  Button,
  
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

//-12.958927, -38.495056
//-12.958916, -38.495704
//-12.958794, -38.494995

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      region: {
        latitude: -12.958622,
        longitude:-38.497794,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      texto: ''
    };

    this.moverCidade = this.moverCidade.bind(this);
    this.mudouMapa = this.mudouMapa.bind(this);
    this.clicou = this.clicou.bind(this);

  }

  clicou(e){
    alert('latitude clicada: ' + e.nativeEvent.coordinate.latitude + '\n logitude: ' +  e.nativeEvent.coordinate.longitude);
  }

  mudouMapa(region){
      let state = this.state;
      state.texto = region.latitude;
      state.region = {
        latitude: region.latitude,
        longitude:region.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
      this.setState(state);
  }

 moverCidade(lat,long){
   let state = this.state;
   let region = {
    latitude: lat,
    longitude:long,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
   }
   state.region = region;
   this.setState(state);

 }

  render() {
    const {region,texto} = this.state;
    return (
        <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
            <Button title="Beco"  onPress={() => {this.moverCidade(-12.958916,-38.495704)}}/>
            <Button title="Joana Darc" onPress={() => {this.moverCidade(-12.958927,-38.495056)}} />
            <Button title="Barbalho" onPress={() => {this.moverCidade(-12.958794, -38.494995)}} />
          </View>
        <Text>{region.latitude} | {region.longitude}</Text>
        <Text>Latitude Atual</Text>
        <Text>{texto}</Text>
        <MapView
         /* onMapReady={() => {alert('Mapa Totalmente Carregado!')}}*/
        /* onRegionChangeComplete = {this.mudouMapa}*/
          onPress={this.clicou}
          // mapType=standard | satellite | hybrid
          showsTraffic={true}
         
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={region}
        >
        </MapView>
      </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5FCFF',
  },
  map: {
    width:'100%',
    height:500
  },
 });
 

export default App;

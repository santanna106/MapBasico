import React, { PROVIDER_GOOGLE,Component} from 'react';
import MapView,{Marker} from 'react-native-maps';

import {
  StyleSheet,
   View,
  Text,
  Button,
  
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Pin from './src/Pin';

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
      texto: '',
      
      markers:[
        {key:0,coords:{latitude:-12.950385,longitude:-38.487950},pinColor:'#FF0000'},
        {key:1,coords:{latitude:-12.950730,longitude:-38.485976},pinColor:'#0000FF'},
      ],
      cars:[
        {key:0,image:require('./assets/carro.png'),coords:{latitude:-12.957493,longitude: -38.496548}},
        {key:1,image:require('./assets/carro_left.png'),coords:{latitude:-12.957002,longitude:-38.494992}},
      ], 
      markersEstilizados:[
        {key:0,aviso:"Cuidado",coords:{latitude:-12.957955,longitude:-38.492380},pinColor:'#FF0000'},
        {key:1,aviso:"Tranquilo",coords:{latitude:-12.957673,longitude:-38.492938},pinColor:'#0000FF'},
      ],
    };

    this.moverCidade = this.moverCidade.bind(this);
    this.mudouMapa = this.mudouMapa.bind(this);
    this.clicou = this.clicou.bind(this);
    this.newMarker = this.newMarker.bind(this);

  }

  newMarker(e){
    let state = this.state;
    state.markers.push({

      key:state.markers.length,
      coords: {
        latitude:e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      },
      pinColor:'#FF0000'
    });
    

    this.setState(state);

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
    const {region,texto,markers,cars,markersEstilizados} = this.state;
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
         // onPress={this.newMarker}
          // mapType=standard | satellite | hybrid
          showsTraffic={true}
         
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={region}
          >
            
            <Marker 
              coordinate={{ latitude: -12.958622,longitude:-38.497794,}} 
              title="Meu Carro"
              description="Gol 1.6"
              pinColor={'#00FF00'}
            />
            
            <Marker 
              coordinate={{ latitude: -12.958916,longitude:-38.495704,}} 
              title="Minha Casa"
              description="Rua"
              pinColor={'#FF0000'}
            />

            {markers.map((marker) => {
              return(
                <Marker key={marker.key}
                coordinate={marker.coords} 
                title="Minha Casa"
                description="Rua"
                pinColor={marker.pinColor}
                 />
              );
            })}

          {cars.map((car) => {
              return(
                <Marker key={car.key}
                image={car.image}
                coordinate={car.coords} 
                title="Minha Casa"
                description="Rua"
               
                 />
              );
            })} 


          {markersEstilizados.map((marker) => {
              return(
                <Marker key={marker.key}
                coordinate={marker.coords} 
                title="Minha Casa"
                description="Rua"
                
                >
                  <Pin aviso={marker.aviso} corFundo={marker.pinColor}/>
                </Marker>
              );
            })}



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
  viewMarker: {
    height:30,
    padding:5,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5
    
  },

  textoMarker: {
    color:'#FFF'
  }

 });
 

export default App;

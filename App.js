import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -22.722321840810423,
        longitude: -43.3184095851323,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },

      texto: '',
      markers: [
        {
          key: 0,
          coords: {latitude: -22.722321840810423, longitude: -43.3184095851323},
          pinColor: '#ff0000',
        },
        {
          key: 1,
          coords: {latitude: -22.725421840810423, longitude: -43.3194095851323},
          pinColor: '#00ff00',
        },
      ],
    };

    this.newMarker = this.newMarker.bind(this);
    this.mapChanged = this.mapChanged.bind(this);
  }

  newMarker(e) {
    const coordinate = e.nativeEvent.coordinate;
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja criar um novo pin?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const {markers} = this.state;
            const newMarker = {
              key: markers.length,
              coords: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              },
              pinColor: '#FF0000',
            };

            this.setState(prevState => ({
              markers: [...prevState.markers, newMarker],
            }));
          },
        },
      ],
      {cancelable: true},
    );
  }

  mapChanged(region) {
    this.setState({
      texto: region.latitude,
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  }

  render() {
    const {region, texto, markers} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.latLong}>
          {region.latitude} | {region.longitude}
        </Text>
        <Text style={styles.latLong}>latitude atual</Text>
        <Text>{texto}</Text>
        <MapView
          onPress={this.newMarker}
          showsTraffic={true} // mostrar transito
          style={styles.maps}
          region={region}
          onRegionChangeComplete={this.mapChanged}>
          {markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              pinColor={marker.pinColor}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  maps: {
    width: '100%',
    height: 550,
  },
  latLong: {
    fontSize: 15,
    color: '#515151',
  },
});

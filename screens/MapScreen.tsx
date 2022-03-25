// I followed code from
// https://dev.to/peterklingelhofer/an-introduction-to-google-maps-in-react-native-expo-1g7d
// I ended up removing prop types not sure if thats a big deal

import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';

import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.9990674;
const LONGITUDE = -90.0852767;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default function MapScreen() {
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  // need to pull actual coordinates of boreholes from a database
  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
    },
    {
      coordinate: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE - SPACE,
      },
    },
    {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    },
    {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE - SPACE / 2,
      },
    },
  ]);

  // https://stackoverflow.com/questions/58936356/dynamically-rendering-mapview-marker-react-native 
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} zoomTapEnabled={false}>
        {markers.map((val, index) => {
        return (<Marker
          coordinate={val.coordinate}
          key={index}
          title = {"borehole point"}
         />); 
        })}
 
      </MapView>
      <View style={styles.buttonContainer}>
        <View style={styles.bubble}>
          <Text>Tap on markers to see different callouts</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 140,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
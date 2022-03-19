// TabTwoScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';

import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import CustomCallout from '../components/CustomCallout';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.9990674;
const LONGITUDE = -90.0852767;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default function TabTwoScreen({provider}) {
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

  const [markerRefs, setMarkerRefs] = useState([
    {
      ref: null,
    },
    {
      ref: null,
    },
    {
      ref: null,
    },
    {
      ref: null,
    },
  ]);

  const show = () => {
    markerRefs[0].ref.showCallout();
  };

  const hide = () => {
    markerRefs[0].ref.showCallout();
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={provider}
        style={styles.map}
        initialRegion={region}
        zoomTapEnabled={false}
      >
        <Marker
          ref={(ref) => {
            let updateRef = markerRefs;
            updateRef[0].ref = ref;
            setMarkerRefs(updateRef);
          }}
          coordinate={markers[0].coordinate}
          title="This is a native view"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
        />
        <Marker coordinate={markers[1].coordinate}>
          <Callout style={styles.plainView}>
            <View>
              <Text>This is a plain view</Text>
            </View>
          </Callout>
        </Marker>
        <Marker
          coordinate={markers[2].coordinate}
          calloutOffset={{ x: -8, y: 28 }}
          calloutAnchor={{ x: 0.5, y: 0.4 }}
          ref={(ref) => {
            let updateRef = markerRefs;
            updateRef[1].ref = ref;
            setMarkerRefs(updateRef);
          }}
        >
          <Callout
            alphaHitTest
            tooltip
            onPress={(e) => {
              if (
                e.nativeEvent.action === 'marker-inside-overlay-press' ||
                e.nativeEvent.action === 'callout-inside-press'
              ) {
                return;
              }

              Alert.alert('callout pressed');
            }}
            style={styles.customView}
          >
            <CustomCallout>
              <Text>{`This is a custom callout bubble view ${count}`}</Text>
              <CalloutSubview
                onPress={() => {
                  setCount(count + 1);
                }}
                style={[styles.calloutButton]}
              >
                <Text>Click me</Text>
              </CalloutSubview>
            </CustomCallout>
          </Callout>
        </Marker>
        <Marker
          ref={(ref) => {
            let updateRef = markerRefs;
            updateRef[3].ref = ref;
            setMarkerRefs(updateRef);
          }}
          coordinate={markers[3].coordinate}
          title="You can also open this callout"
          description="by pressing on transparent area of custom callout"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <View style={styles.bubble}>
          <Text>Tap on markers to see different callouts</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => show()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Show</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => hide()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Hide</Text>
        </TouchableOpacity>
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
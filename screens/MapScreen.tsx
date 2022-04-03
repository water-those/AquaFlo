// I followed code from
// https://dev.to/peterklingelhofer/an-introduction-to-google-maps-in-react-native-expo-1g7d
// I ended up removing prop types not sure if thats a big deal

import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { getWaterSourcesByLocation } from "../api/watersource";
import { WaterSource } from "../api/schemas";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Font from "expo-font";
import MapBottomSheet from "../components/MapBottomSheet";
import AppLoading from "expo-app-loading";
import * as Location from "expo-location";
import Colours from "../constants/Colours";
import { BROKEN, UNDER_REPAIR } from "../constants/WatersourceStatus";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 7.5291486;
const LONGITUDE = -12.514372;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
interface MapState {
  fontsLoaded: boolean;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers: Array<WaterSource>;
  selectedWaterSource: WaterSource | null;
}

const sampleWatersource: WaterSource = {
  id: "123",
  status: UNDER_REPAIR,
  source_type: "Borehole",
  tech_type: "AfriDev",
  management: "management",
  country: "Sierra Leone",
  install_year: "ex",
  area1: "area1",
  area2: "area2",
  area3: "area3",
  area4: "Bonthe Urban",
  location: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
  },
  geohash: "geohash",
};

export default class MapScreen extends React.Component<any, MapState> {
  private bottomSheetModalRef;

  constructor(props: any) {
    super(props);

    this.bottomSheetModalRef = React.createRef<BottomSheetModal>();

    this.state = {
      fontsLoaded: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      selectedWaterSource: null,
    };
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    Font.loadAsync({
      "SFProText-Semibold": require("../assets/fonts/SFProText-Semibold.otf"),
      "SFProText-Regular": require("../assets/fonts/SFProText-Regular.otf"),
      "SFProText-Bold": require("../assets/fonts/SFProText-Bold.otf"),
    }).then(() => this.setState({ fontsLoaded: true }));

    // getWaterSourcesByLocation(LATITUDE, LONGITUDE, 0.5).then((watersources) => {
    //   this.setState({ markers: watersources! });
    // });
  }

  mapMarkers = () => {
    return this.state.markers.map((marker, index) => (
      <Marker
        coordinate={{ latitude: marker.location.latitude, longitude: marker.location.longitude }}
        key={index}
        title={marker.id}
        onPress={() => {
          this.handlePresentModalPress(marker);
        }}
      ></Marker>
    ));
  };

  handlePresentModalPress = (marker: WaterSource) => {
    this.setState({ selectedWaterSource: marker });
    this.bottomSheetModalRef.current?.present();
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    return (
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <MapView style={styles.map} initialRegion={this.state.region} showsUserLocation={true} showsCompass={true}>
            {this.mapMarkers()}
            <Marker
              coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }}
              key={0}
              title={"EXAMPLE"}
              onPress={() => {
                console.log("PRESSED");
                this.handlePresentModalPress(sampleWatersource);
              }}
              pinColor={
                sampleWatersource.status == BROKEN
                  ? Colours.red
                  : sampleWatersource.status == UNDER_REPAIR
                  ? Colours.yellow
                  : Colours.green
              }
            ></Marker>
          </MapView>

          <MapBottomSheet watersource={this.state.selectedWaterSource} bottomSheetModalRef={this.bottomSheetModalRef} />
        </View>
      </BottomSheetModalProvider>
    );
  }
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

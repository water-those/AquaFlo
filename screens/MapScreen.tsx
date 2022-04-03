import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Map, { Marker } from "react-native-maps";
import ProviderPropType from "react-native-maps";
import MapView from "react-native-map-clustering";
import { getWaterSourcesByLocation } from "../api/watersource";
import { WaterSource } from "../api/schemas";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Font from "expo-font";
import MapBottomSheet from "../components/MapBottomSheet";
import AppLoading from "expo-app-loading";
import * as Location from "expo-location";
import Colours from "../constants/Colours";
import { AVAILABLE, BROKEN, UNDER_REPAIR } from "../constants/WatersourceStatus";

const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

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
  userLocation: Location.LocationObject | null;
}

interface MapProps {
  provider: ProviderPropType;
}

const sampleWatersource: WaterSource = {
  id: "123",
  status: AVAILABLE,
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
    latitude: 7.5291486,
    longitude: -12.514372,
  },
  geohash: "geohash",
};

export default class MapScreen extends React.Component<MapProps, MapState> {
  private bottomSheetModalRef;
  private mapRef;

  constructor(props: any) {
    super(props);

    this.bottomSheetModalRef = React.createRef<BottomSheetModal>();
    this.mapRef = React.createRef<Map>();

    this.state = {
      fontsLoaded: false,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      selectedWaterSource: null,
      userLocation: null,
    };
  }

  componentDidMount() {
    Font.loadAsync({
      "SFProText-Semibold": require("../assets/fonts/SFProText-Semibold.otf"),
      "SFProText-Regular": require("../assets/fonts/SFProText-Regular.otf"),
      "SFProText-Bold": require("../assets/fonts/SFProText-Bold.otf"),
    }).then(() => this.setState({ fontsLoaded: true }));

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ userLocation: location });
    };

    (async () => {
      await getLocation().then(() => {
        this.setState({
          region: {
            latitude: this.state.userLocation!.coords.latitude,
            longitude: this.state.userLocation!.coords.longitude,
            latitudeDelta: 10,
            longitudeDelta: 10,
          },
        });
        this.animateMap(this.state.userLocation!.coords.latitude, this.state.userLocation!.coords.longitude);

        // COMMENTED OUT TO REDUCE QUERIES TO FIREBASE
        // getWaterSourcesByLocation(
        //   this.state.userLocation!.coords.latitude,
        //   this.state.userLocation!.coords.longitude,
        //   5
        // ).then((watersources) => {
        //   this.setState({ markers: watersources! });
        // });
      });
    })();
  }

  animateMap = (lat: number, lng: number) => {
    this.mapRef.current?.animateToRegion({
      longitude: lng,
      latitude: lat,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  mapMarkers = () => {
    return this.state.markers.map((marker, index) => (
      <Marker
        coordinate={{ latitude: marker.location.latitude, longitude: marker.location.longitude }}
        key={index}
        onPress={() => {
          this.handlePresentModalPress(marker);
        }}
        pinColor={
          marker.status == BROKEN ? Colours.red : marker.status == UNDER_REPAIR ? Colours.yellow : Colours.green
        }
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
          <MapView
            ref={this.mapRef}
            style={styles.map}
            initialRegion={this.state.region}
            showsUserLocation={true}
            showsCompass={true}
            onRegionChangeComplete={(newRegion) => {
              this.setState({ region: newRegion });
              // COMMENTED OUT TO REDUCE QUERIES TO FIREBASE
              // getWaterSourcesByLocation(this.state.region.latitude, this.state.region.longitude, 5).then(
              //   (watersources) => {
              //     const allWaterSources = new Set();
              //     this.state.markers.forEach((marker) => {
              //       allWaterSources.add(marker.id);
              //     });

              //     const newWatersources: Array<WaterSource> = watersources!.filter(
              //       (watersource: WaterSource) => !allWaterSources.has(watersource.id)
              //     );
              //     const allsource = this.state.markers.concat(newWatersources);
              //     this.setState({ markers: allsource });
              //   }
              // );
            }}
          >
            {this.mapMarkers()}
            <Marker
              coordinate={{
                latitude: sampleWatersource.location.latitude,
                longitude: sampleWatersource.location.longitude,
              }}
              key={0}
              title={"EXAMPLE POINT"}
              onPress={() => {
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

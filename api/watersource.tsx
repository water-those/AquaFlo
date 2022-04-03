import { db } from "../configs/firebase.js";
import firebase from "firebase/compat/app";
import { watersourceSchema, WaterSource } from "./schemas";

// Based on geohash queries as documented by firebase: https://firebase.google.com/docs/firestore/solutions/geoqueries#query_geohashes
export const getWaterSourcesByLocation = (xcoordinate: number, ycoordinate: number, radius: number) => {
  const geofire = require("geofire-common");
  // Find cities within 50km of London
  const center = [xcoordinate, ycoordinate];
  const radiusInM = radius * 1000;

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];

  for (const b of bounds) {
    const q = db.collection("watersources").orderBy("geohash").startAt(b[0]).endAt(b[1]);
    promises.push(q.get());
  }

  // Collect all the query results together into a single list
  return Promise.all(promises)
    .then((snapshots) => {
      const matchingDocs: Array<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>> = [];

      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const location = doc.get("location");
          const lat = location.latitude;
          const lng = location.longitude;

          // We have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
          const distanceInKm = geofire.distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;

          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc);
          }
        }
      }
      console.log("Num of results is", matchingDocs.length);
      var watersources: Array<WaterSource> = [];

      matchingDocs!.forEach((matchingDoc) => {
        var matchingObject = matchingDoc.data();
        matchingObject["id"] = matchingDoc.id;
        watersources.push(watersourceSchema.validateSync(matchingObject));
      });

      return watersources;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateWaterSource = (id: string, changes: object) => {
  return db.collection("watersources").doc(id).update(changes);
};

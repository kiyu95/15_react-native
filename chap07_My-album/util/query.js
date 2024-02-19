import * as SQLite from "expo-sqlite";
import { Places } from "../model/place";

//
const database = SQLite.openDatabase("place.db");

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tr) => {
            tr.executeSql(`SELECT * FROM place ORDER BY id`,
                [],
                (_, result) => {
                    const place = [];
                    for (const dp of result.rows._array){
                        place.push(new Places(dp.title, dp.imageUri, {lat:dp.lat, lng:dp.lng, address:dp.address}, dp.id));
                    }
                    resolve(place);
                },
                (_, error) => {reject(error)}
            );
        });
    });

    return promise;
}

export const fetchedPlaceDetails = (id) => {

    const promise = new Promise((resolve, reject) => {
        database.transaction((tr) => {
            tr.executeSql("SELECT * FROM place WHERE id=?",
            [id],
            (_, result) => {
                const dbplace = result.rows._array[0];
                const place = new Places(dbplace.title, dbplace.imageUri, {lat:dbplace.lat, lng:dbplace.lng, address:dbplace.address}, dbplace.id);
                resolve(place);
            },
            (_,error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export const insertPlace = (place) => {

    const promise = new Promise((resolve, reject) => {
        console.log(place)
        database.transaction((tr) => {
            tr.executeSql(`
                INSERT INTO place(
                    title,
                    imageUri,
                    address,
                    lat,
                    lng
                )VALUES(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `,
            [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],
            (_, result) => resolve(result),
            (_, error) => reject(error)
            );
        });
    });
    return promise;
}

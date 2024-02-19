import * as SQLite from "expo-sqlite";

// SQLite 사용하기 위한 인스톨
// npx expo install expo-sqlite
const database = SQLite.openDatabase("place.db");

// 모바일 단말기에 데이터베이스를 생성함
export const Connection = () => {

    const promise = new Promise((resolve, reject) => { // 비동기이므로 promise 사용
        database.transaction((tr) => {
            tr.executeSql(`
                CREATE TABLE IF NOT EXISTS place(
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`,
                [],
                () => { // 성공했을 때 반환값
                    resolve();
                },
                (_, error) => { // 실패했을 때 반환값, _: 첫번째 매개변수 생략하겠다
                    reject(error);
                }
            );
        });
    });

    return promise;
}
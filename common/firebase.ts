import * as firebase from 'firebase/app';
import "firebase/database";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBwc5tkZM3fEQcyPC1-HfguTbIt8woO9iA",
        authDomain: "shushu-cb26c.firebaseapp.com",
        databaseURL: "https://shushu-cb26c.firebaseio.com",
        storageBucket: "shushu-cb26c.appspot.com"
    });    
}

const fb = {
    getOnceList: (): Promise<any []> => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('reply').once('value').then(result => {
                resolve(result.val())
            }).catch((error) => {
                reject(error);
            })
        })
    },
    writeReply: (str: string): Promise<boolean> => {
        const data = {
            context: str,
            time: firebase.database.ServerValue.TIMESTAMP
        }


        return new Promise((resolve, reject) => {
            firebase.database().ref('reply').push(data).then(result => {
                resolve(true)
            }).catch((error) => {
                reject(error);
            })
        })
    }
}

export {
    fb
}
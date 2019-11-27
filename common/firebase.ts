import * as firebase from 'firebase/app';
import 'firebase/database';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBwc5tkZM3fEQcyPC1-HfguTbIt8woO9iA',
        authDomain: 'shushu-cb26c.firebaseapp.com',
        databaseURL: 'https://shushu-cb26c.firebaseio.com',
        storageBucket: 'shushu-cb26c.appspot.com',
    });
}

const fb = {
    getOnceList: (): Promise<any []> => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('reply').once('value').then((result) => {
                resolve(result.val());
            }).catch((error) => {
                reject(error);
            });
        });
    },
    writeReply: (seq: number, params: { str: string; user?: string; pw?: string }): Promise<boolean> => {
        const timeStamp = firebase.database.ServerValue.TIMESTAMP;
        return new Promise((resolve, reject) => {
            firebase.database().ref(`reply/${seq}`).push({...params, time: timeStamp}).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    removeReply: (seq: number, key: string) => {
        firebase.database().ref(`reply/${seq}`).orderByChild('time').equalTo(key).once('value', (snap) => {
            if (snap) {
                const result = snap.val();

                Object.keys(result).map((uk: string) => {
                    if (result[uk].hasOwnProperty('pw') && result[uk].pw.length > 0) {
                        // private
                        const promptPW = window.prompt('비밀번호 입력');
                        if (promptPW === result[uk].pw) {
                            firebase.database().ref(`reply/${seq}/${uk}`).remove();
                        } else if (promptPW !== null) {
                            alert('비밀번호 다름');
                        }

                    } else {
                        console.log('공개');
                        firebase.database().ref(`reply/${seq}/${uk}`).remove();
                    }
                });
            }
        });
    },
};

export {
    fb,
};

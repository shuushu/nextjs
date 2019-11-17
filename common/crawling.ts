import axios from 'axios';

class Crawling {
    private url: string;
    constructor(url?: string) {
        this.url = url || 'http://nate.com';
    }

    async getData() {
        const res = await axios(`${'https://cors-anywhere.herokuapp.com/'}${this.url}`);
        if (res.status === 200) {
            return res.data;
        } else {
            return false;
        }
    }
}

export default Crawling;

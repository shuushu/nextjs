import axios from 'axios';
import cheerio from 'cheerio';

export interface PropsNewsList {
   title: string;
   path: null | string;
   parag: null | string;
}

class Crawling {
    private url: string;
    constructor(url?: string) {
        this.url = url || 'http://www.itworld.co.kr/news';
    }

    async getData() {
        const res = await axios(`${'https://cors-anywhere.herokuapp.com/'}${this.url}`);
        if (res.status === 200) {
            const $ = cheerio.load(res.data);

            const target = $('#m_topic_new li');
            const temp: PropsNewsList[] = [];
            let cnt = -1;

            for (let i = 0; i < target.length; i += 1) {
                const tObj = cheerio(target[i]);
                if (tObj.hasClass('cb') === false) {

                    if (tObj.find('h2').text().length > 0) {
                        cnt++;
                        temp[cnt] = {
                            title: tObj.find('h2').text().replace(/\s/g, ''),
                            path: null,
                            parag: null,
                        };

                    }

                    if (tObj.find('.fit_image').attr('src')) {
                        temp[cnt].path = 'http://files.itworld.co.kr/' + tObj.find('.fit_image').attr('src');
                    }

                    if (tObj.find('#m_topic_news_list_summary').text().length > 0) {
                        temp[cnt].parag = tObj.find('#m_topic_news_list_summary').text().replace(/\s/g, '');
                    }
                }
            }

            return temp;
        } else {
            return false;
        }
    }
}

export default Crawling;

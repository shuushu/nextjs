import {NextPage} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Crawling from '../common/crawling';
import cheerio from 'cheerio';

interface PropsNewsList {
    title: string;
    path: null | string;
    parag: null | string;
    link: string;
 }
interface PropsRouterQuery {
    [key: string]: any;
}

const Index = ({ query }: { query: PropsRouterQuery }) => {
    const params = query.id || 1;
    const [list, setList] = useState();
    const [page, setPage] = useState(0);
    const itemRender = () => {
        if (list) {
            return list.map((item: PropsNewsList, idx: any) => {
                return (
                    <li key={idx} >
                        <Link href={`/news?id=${item.link}`} as={`/news`}>
                        <div>
                            <h2>{item.title}</h2>
                            {item.path && <img src={item.path} alt="" />}
                            <p>{item.parag}</p>
                        </div>
                        </Link>
                    </li>
                );
            });
        }
    };
    const renderPaging = (() => {
        const str = [];
        for (let i = 1; i <= page; i += 1) {
            if (Number(params) === i) {
                str.push(<strong key={`page-item${i}`} >{i}</strong>);
            } else {
                str.push(<Link key={`page-item${i}`} href={`/index?id=${i}`} ><span>{i}</span></Link>);
            }
        }

        return str;
    })();

    function parseHTML(data: string) {
        const $ = cheerio.load(data);

        const target = $('#m_topic_new li');
        const pageNode = $('.fr .pagination.hidden-phone li');
        const temp: PropsNewsList[] = [];
        let cnt = -1;

        setPage(pageNode.length)

        for (let i = 0; i < target.length; i += 1) {
            const tObj = cheerio(target[i]);
            if (tObj.hasClass('cb') === false) {

                if (tObj.find('h2').text().length > 0) {
                    cnt++;
                    temp[cnt] = {
                        title: tObj.find('h2').text().replace(/\s/g, ''),
                        path: null,
                        parag: null,
                        link: (tObj.find('h2 a').attr('href')).split('/news/')[1] || '#',
                    };

                }

                if (tObj.find('.fit_image').attr('src')) {
                    const path = tObj.find('.fit_image').attr('src');
                    temp[cnt].path = 'http://files.itworld.co.kr/' + path.split('/files/itworld')[1];
                }

                if (tObj.find('#m_topic_news_list_summary').text().length > 0) {
                    temp[cnt].parag = tObj.find('#m_topic_news_list_summary').text().replace(/\s/g, '');
                }
            }
        }
        return temp;
    }
    function init() {
        console.log('init')
        const craw = new Crawling(`http://www.itworld.co.kr/news?page=${params}`);
        craw.getData().then((res: string) => {
            const getItemData = parseHTML(res)
            setList(getItemData);
        });
    }

    useEffect(() => {
        init();
        console.log('eplat', params);
    }, [params]);

    return (
        <div>
            <ul>
                { itemRender() }
            </ul>
            { page > 0 && renderPaging }
        </div>

    );
};

Index.getInitialProps = ({query}: { query: PropsRouterQuery}) => {
    return { query };
}

export default Index;

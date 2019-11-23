import Link from 'next/link';
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
interface PageProps {
    str: string; 
    link: string;
}

const Index = ({ query }: { query: PropsRouterQuery }) => {
    const params = query.id || 1;
    const [isLoad, setLoad] = useState(true);
    const [list, setList] = useState();
    const [page, setPage] = useState<PageProps[]>([]);
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
    const renderPaging = page.map((i, idx: number) => {
        return (
            <span key={`item${idx}`}>
                <a href={`/index?id=${i.link}`}>{i.str}</a>
            </span>
        )
    })

    function parseHTML(data: string) {
        const $ = cheerio.load(data);

        const target = $('#m_topic_new li');
        const pageNode = $('.fr .pagination.hidden-phone li');
        const temp: PropsNewsList[] = [];
        const pageArr: PageProps[] = [];
        let cnt = -1;

        

        for (let i = 0; i < pageNode.length; i += 1) {
            const pObj = cheerio(pageNode[i]);
            const v = pObj.find('a').attr('href');
            pageArr.push({
                str: pObj.text(),
                link: v.split('=')[1]
            })
            
        }

        setPage(pageArr);

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
        const craw = new Crawling(`http://www.itworld.co.kr/news?page=${params}`);
        craw.getData().then((res: string) => {
            const getItemData = parseHTML(res)
            setList(getItemData);
            setLoad(false);
        });
    }

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            init();
        }
        
        console.log('copmdidMount')
        return () => {
            isCancelled = true;
        };
    }, [params]);

    return (
        <div>
            { isLoad ? <div>데이터 가져오는 중....</div> : 
            <ul>
                { itemRender() }
                { page && renderPaging }
            </ul>
            }
        </div>

    );
};

Index.getInitialProps = ({query}: { query: PropsRouterQuery}) => {
    return { query };
}

export default Index;

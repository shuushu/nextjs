import Link from 'next/link';
import { useState, useEffect } from 'react';
import { crawling } from '../common/util';
import main from '../asset/style.scss';
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
                    <li key={idx} className={main.list} >
                        <Link href={`/news?id=${item.link}`} as={`/news`}>
                        <a>
                            {item.path &&
                                <span className={main.thumb}><img  src={item.path} alt="" /></span>
                            }
                            <p className={main.tit}>{item.title}</p>
                            <p className={main.parag}>{item.parag}</p>
                        </a>
                        </Link>
                    </li>
                );
            });
        }
    };
    const renderPaging = page.map((i, idx: number) => {
        return (
            <span className={main.item} key={`item${idx}`}>
                <Link href={`/index?id=${i.link}`} as={'/'}><a>{i.str}</a></Link>
            </span>
        );
    });

    function parseHTML(data: string) {
        const $ = cheerio.load(data);

        const target = $('#m_topic_new li');
        const pageNode = $('.pagination').eq(0).find('li');
        const temp: PropsNewsList[] = [];
        const pageArr: PageProps[] = [];
        let cnt = -1;
        for (let i = 0; i < pageNode.length; i += 1) {
            const pObj = cheerio(pageNode[i]);
            const v = pObj.find('a').attr('href');
            pageArr.push({
                str: pObj.text(),
                link: v.split('=')[1],
            });
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
                    const regex = /(\/files\/itworld\/)/g;
                    if (regex.test(path)) {
                        temp[cnt].path = 'http://files.itworld.co.kr/' + path.split('/files/itworld')[1];
                    } else {
                        const regex2 = /(\/files\/ciokr\/)/g;
                    }
                }

                if (tObj.find('#m_topic_news_list_summary').text().length > 0) {
                    temp[cnt].parag = tObj.find('#m_topic_news_list_summary').text().replace(/\s/g, '');
                }
            }
        }
        return { item: temp, page: pageArr };
    }
    function init() {
        crawling(`http://www.itworld.co.kr/news?page=${params}`).then((res: any) => {

            const { item, page } = parseHTML(res);
            const parseItem = {
                seq: params,
                data: item,
                page,
            };
            sessionStorage.setItem('list', JSON.stringify(parseItem));
            setList(item);
            setLoad(false);
        });
    }

    useEffect(() => {
        const getStorage = sessionStorage.getItem('list');
        setLoad(true);
        if (getStorage) {
            const initObj = JSON.parse(getStorage);

            if (initObj.seq === params) {
                setList(initObj.data);
                setPage(initObj.page);
                setLoad(false);
            } else {
                init();
            }
        } else {
            init();
        }
    }, [params]);

    return (
        <div className={main.card}>
            { !isLoad &&
                <>
                <ul>
                    { itemRender() }
                </ul>
                <hr/>
                { page && <div className={main.paging}>{ renderPaging }</div> }
                </>
            }
        </div>

    );
};

Index.getInitialProps = ({query}: { query: PropsRouterQuery}) => {
    return { query };
};

export default Index;

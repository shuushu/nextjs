import { SFC } from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { crawling } from '../common/util';
import style from '../asset/style.scss';
import cheerio from 'cheerio';

interface PropsNewsList {
    title: string;
    path: null | string;
    parag: null | string;
    link: string;
 }
 interface Props {
    params: string;
}
interface PageProps {
    str: string; 
    link: string;
}
const Content: SFC<Props> = (props) => {
	const { params } = props
    const [isLoad, setLoad] = useState(true);
    const [view, setView] = useState();
    const [title, setTitle] = useState('');

    function parseHTML(data: string) {
		const $ = cheerio.load(data, {
			normalizeWhitespace: true,
			decodeEntities: false
		});
		const contNode = $('.node_body.cb')
        const titleText = $('.node_title').eq(0).text()
        setTitle(titleText)
		if (contNode.length > 0) {
			const str: any = contNode.html()
			if (str.indexOf('/files/') > 0) {
				const regex = /(\/files\/itworld\/)/g;
				if (regex.test(str)) {
					return str.replace(regex, 'http://files.itworld.co.kr/')
				} else {
					const regex2 = /(\/files\/ciokr\/)/g;
					return str.replace(regex2, 'http://files.ciokorea.com/')
				}
			} else {
				return str;
			}
		}
		
    }
    function init() {
        crawling(`http://www.itworld.co.kr/news/${params}`).then((res: any) => {
            const getData = parseHTML(res)
            setView(getData);
            setLoad(false);
        })
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
    }, [props]);

    return (
        <>
            { isLoad ? <div>데이터 가져오는 중....</div> :
                <article className={style.contentView}>
                    <h1 className={style.title}>{title}</h1>
                    <hr/>
                    <div className={style.view} dangerouslySetInnerHTML={ {__html: view} }></div>
                </article>
            }
        </>

    );
};

export default Content;

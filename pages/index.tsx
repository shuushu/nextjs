import {NextPage} from 'next';
import { BaseSyntheticEvent, useState, useEffect } from 'react';
import Crawling, { PropsNewsList } from '../common/crawling';

const Index: NextPage = () => {
    const [list, setList] = useState([]);
    const itemRender = list.map((item: PropsNewsList, idx: any) => {
        return (
            <div key={idx}>
                <h2>{item.title}</h2>
                {item.path && <img src={item.path} alt="" />}
                <p>{item.parag}</p>
            </div>
        );
    });

    useEffect(() => {
        const craw = new Crawling();
        craw.getData().then((res: any) => {
            setList(res);
        });
    });

    return (
        <div>
            { itemRender }
        </div>
    );
}
export default Index;

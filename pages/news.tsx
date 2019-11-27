import { withRouter } from 'next/router';
import { NextPage } from 'next';
import { useEffect } from 'react';
import Content from '@/Content';
import Reply from '@/Reply';

interface RouterProps {
    [key: string]: any;
}

const News: NextPage<RouterProps> = (props) => {
    const { query, push } = props.router;
    useEffect(() => {
        if (!query.id) {
            push({ pathname: '/index' });
        }
    }, []);

    const init = (() => {
        if (query.id) {
            return (
                <main>
                    <Content params={query.id} />
                    <hr/>
                    <Reply seq={query.id} />
                </main>
            );
        }
    })();

    return <>{ init }</>;
};
/*News.getInitialProps = ({query, url}: { query: RouterProps; url: RouterProps}) => {
    return { query, url };
};*/

export default withRouter(News);

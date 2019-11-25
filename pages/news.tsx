import { withRouter } from 'next/router';
import {NextPage} from 'next';
import Content from '@/Content';
import Reply from '@/Reply';

interface RouterProps {
    [key: string]: any;
}

const News: NextPage<RouterProps> = (props) => {
    const { query, push } = props.router;

    if (!query.hasOwnProperty('id')) {
        push({ pathname: '/error' });
    }

    return (
        <div>
            <Content params={query.id} />
            <hr/>
            <Reply seq={query.id} />
        </div>
    );
};
/*News.getInitialProps = ({query, url}: { query: RouterProps; url: RouterProps}) => {
    return { query, url };
};*/

export default withRouter(News);

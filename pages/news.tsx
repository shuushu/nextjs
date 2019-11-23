import Content from '@/Content'

interface PropsRouterQuery {
    [key: string]: any;
}

const News = ({ query }: { query: PropsRouterQuery }) => {
    return (
        <div>
            <Content params={query.id} />
        </div>
    );
};
News.getInitialProps = ({query}: { query: PropsRouterQuery}) => {
    return { query };
}

export default News;

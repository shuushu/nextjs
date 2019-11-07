import {NextPage} from "next";
import * as React from "react";

import Header from "@/Header";
import Form from "@/Form";

interface Props {
    userAgent?: string;
}

const Index: NextPage<Props> = ({ userAgent }) => {
    const [count, setCount] = React.useState(0)
    const [str, setValue] = React.useState('shushu')

    function onInputChange(e: React.BaseSyntheticEvent) {
        setValue(e.target.value)
    }

    return (
        <main>
            <Header />
            Your user agent: {userAgent}
            <p>2222222ou clicked {count} times</p>
            <p onClick={() => setCount(count + 1)} >click</p>


            <Form onInputChange={onInputChange} text={str} />
        </main>
    );
}


Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};
export default Index;

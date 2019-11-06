import {NextPage} from "next";
import * as React from "react";

import Header from "@/Header";
import {Props} from "./props";

interface HelloProps {
    name: string;
}

const Hello = (props: HelloProps) => <h1>{props.name}</h1>;

const Index: NextPage<Props> = ({ userAgent }) => (
    <main>
        <Header />
        Your user agent: {userAgent}
        <div>dsadsad</div>
        <Hello name="shushu" />
    </main>
);

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};
export default Index;

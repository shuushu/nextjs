import * as React from "react";
import { NextPage } from 'next'

import Header from 'comp/Header'

interface Props {
  userAgent?: string
}

interface HelloProps {
	name: string
}

const Hello = (props: HelloProps) => <h1>{props.name}</h1>

const Index: NextPage<Props> = ({ userAgent }) => (
	<main>
		<Header />
		Your user agent: {userAgent}
		<div>dsadsad</div>
		<Hello name="shushu" />
	</main>
)

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}
export default Index;
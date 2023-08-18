import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import User, { UserProps } from "../components/User"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
    const user = await prisma.user.findMany({});

    return {
        props: {
            user,
        },
    }
};


type Props = {
    feed: UserProps[]
}

const UserConfig: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="page">
                <h1>Public Feed</h1>
                <main>
                    {props.feed.map((user) => (
                        <div key={user.id} className="post">
                            <User user={user} />
                        </div>
                    ))}
                </main>
            </div>
            <style jsx>{`
          .post {
            background: white;
            transition: box-shadow 0.1s ease-in;
          }
  
          .post:hover {
            box-shadow: 1px 1px 3px #aaa;
          }
  
          .post + .post {
            margin-top: 2rem;
          }
        `}</style>
        </Layout>
    )
}

export default UserConfig
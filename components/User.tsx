import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  const userName = user.name
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${user.id}`)}>
      <h2>{userName}</h2>
      <ReactMarkdown children={user.email} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default User;

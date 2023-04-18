import Link from "next/link";
import React from "react";
import Header from "~/components/common/Header/Header";

type Props = {};

const index = (props: Props) => {
  return (
    <div>
      <Header />
      <Link href="/boards/new">Create board</Link>
    </div>
  );
};

export default index;

import Link from "next/link";
import React from "react";
import Header from "~/components/common/Header/Header";
import { api } from "~/utils/api";

type Props = {};

const Boards = (props: Props) => {
  const boards = api.board.getAccessibleBoards.useQuery();
  if (!boards.data) {
    return <div>No data :(</div>;
  }

  return (
    <div>
      <Header />
      <div>
        {boards.data.map((board) => (
          <div key={board.id}>
            Board: <Link href={`/boards/${board.id}`}>{board.name}</Link>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;

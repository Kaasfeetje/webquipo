import { useRouter } from "next/router";
import React from "react";
import Header from "~/components/common/Header/Header";
import { api } from "~/utils/api";

type Props = {};

const Board = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const board = api.board.getBoard.useQuery({ id: id as string });

  if (!board.data) {
    return <div>no data :(</div>;
  }

  return (
    <div>
      <Header />
      <div>Board: {board.data?.name}</div>
    </div>
  );
};

export default Board;

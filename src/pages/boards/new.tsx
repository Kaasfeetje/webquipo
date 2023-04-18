import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import Header from "~/components/common/Header/Header";
import { api } from "~/utils/api";

type Props = {};

const New = (props: Props) => {
  const createBoardMutation = api.board.createBoard.useMutation();
  const router = useRouter();

  const [name, setName] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const board = await createBoardMutation.mutateAsync({ name: name });
    router.push(`/boards/${board.id}`);
  };

  return (
    <div>
      <Header />
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default New;

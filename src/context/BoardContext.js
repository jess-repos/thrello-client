import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

// const FETCH_API = "https://nodemcthrello.herokuapp.com/api/boards/fetch";
// const CREATE_API = "https://nodemcthrello.herokuapp.com/api/boards/create";
const FETCH_API = "http://localhost:7000/api/boards/fetch";
const CREATE_API = "http://localhost:7000/api/boards/create";

const BoardContext = createContext({
  boards: [],
  createBoard: () => {},
  clearBoard: () => {},
  getBoard: () => {},
  members: [],
});

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const getBoards = async () => {
        let config = {
          headers: {
            token: user.token,
          },
        };
        const { data } = await axios.post(
          FETCH_API + "/fetch-boards",
          {},
          config
        );
        setBoards(data.boards);
        setMembers(data.members);
      };
      getBoards();
    }
    setLoading(false);
  }, [user]);

  const createBoard = async (name, description, isPrivate) => {
    try {
      const { data } = await axios.post(
        CREATE_API + "/create-board",
        {
          name,
          description,
          isPrivate,
        },
        { headers: { token: user.token } }
      );
      setBoards((prev) => [...prev, data.savedBoard]);
      setMembers((prev) => [...prev, data.savedMember]);
      return { valid: true };
    } catch (err) {
      return { valid: false };
    }
  };
  const getBoard = async (_id) => {
    console.log(_id);
    try {
      const { data } = await axios.post(
        FETCH_API + "/fetch-board",
        { board_id: _id },
        { headers: { token: user.token } }
      );
      // console.log("[selected board]", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const clearBoard = () => {
    setBoards([]);
    setMembers([]);
  };
  const value = { boards, members, createBoard, clearBoard, getBoard };
  return (
    <BoardContext.Provider value={value}>
      {loading ? null : children}
    </BoardContext.Provider>
  );
};

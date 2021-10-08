import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useBoard } from "../../context/BoardContext";
import Nav from "../nav/Nav";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import "./Main.css";

export default function Main() {
  const history = useHistory();
  const { _id } = useParams();
  const { getBoard } = useBoard();
  const [board, setBoard] = useState({});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await getBoard(_id);
        console.log(response);
        setBoard(response.board);
        setMembers(response.members);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBoard();
  }, []);

  if (loading) return null;

  return (
    <div className="main">
      <Nav>
        <div className="main-nav">
          <h3>{board.name}</h3>
          <span />
          <Button
            startIcon="fas fa-th"
            variant="secondary"
            onClick={() => history.push("/")}
          >
            All Board
          </Button>
        </div>
      </Nav>
      <div className="header">
        <div className="header-main">
          <Button
            startIcon={`fas fa-${board.isPrivate ? "lock" : "globe"}`}
            variant="secondary"
            // onClick={() => history.push("/")}
          >
            {board.isPrivate ? "Private" : "Public"}
          </Button>
          {members.map((member) => (
            <Avatar avatarName={member.username} />
          ))}
          <Button iconOnly="fas fa-plus"></Button>
        </div>
        <Button startIcon="fas fa-ellipsis-h" variant="secondary">
          Show Menu
        </Button>
      </div>
    </div>
  );
}

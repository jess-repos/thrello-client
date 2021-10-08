import React from "react";
import { useBoard } from "../../../context/BoardContext";
import Avatar from "../../ui/Avatar";
import Card from "../../ui/Card";
import "./Board.css";

import image from "../../../assets/Logo.svg";
import { useHistory } from "react-router";

export default function Board({ board }) {
  const history = useHistory();
  const { members } = useBoard();

  const relatedMembers = members.filter(
    (member) => member.board_id === board._id
  );

  const showMembers = relatedMembers.map(
    (member, index) => index < 3 && member
  );

  const clickHandler = () => {
    console.log(board._id);
    history.push("/board/" + board._id);
  };
  return (
    <Card className="board" onClick={clickHandler}>
      <p className="privacy">
        {board.isPrivate ? (
          <span>
            <i className="fas fa-lock"></i>Private
          </span>
        ) : (
          <span>
            <i className="fas fa-globe"></i>Public
          </span>
        )}
      </p>
      <img src={image} alt="" />
      <h3>{board.name}</h3>
      <div className="members">
        {showMembers.map((member, index) => (
          <Avatar
            key={index}
            avatarName={member.username}
            isAdmin={member.isAdmin}
          />
        ))}
        {relatedMembers.length > 3 && (
          <p>+ {relatedMembers.length - 3} others</p>
        )}
      </div>
    </Card>
  );
}

import React, { useState, useEffect } from "react";
import { useBoard } from "../../../context/BoardContext";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Alert from "../../ui/Alert";
import Board from "./Board";
import imageIcon from "../../../assets/image.svg";

import "./Boards.css";
import InputType from "../../ui/InputType";

const isImage = (icon) => {
  const ext = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".svg"];
  return ext.some((el) => icon.toLowerCase().endsWith(el));
};

export default function Boards() {
  const { boards, createBoard } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setError();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const clearImage = () => {
    setImage();
    setPreviewImage();
    setError();
  };

  const clearModal = () => {
    setIsPrivate(false);
    setTitle("");
    setDescription("");
    setImage();
    setPreviewImage();
    setError();
  };

  useEffect(() => {
    clearModal();
  }, [isModalOpen]);

  const fileChangeHandler = (file) => {
    if (!isImage(file.name)) {
      console.log("Not and Image");
      setError("File must me an image!");
    } else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await createBoard(title, description, isPrivate);
    if (response.valid) {
      setIsModalOpen(false);
    } else {
      setError("Failed to create board!");
    }
    setLoading(false);
  };

  return (
    <div className="boards">
      <div className="header">
        <h3>All Boards</h3>
        <Button startIcon="fas fa-plus" onClick={() => setIsModalOpen(true)}>
          Add
        </Button>
      </div>
      <div className="content">
        {boards.map((board) => (
          <Board key={board._id} board={board} />
        ))}
      </div>
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="add-board"
      >
        {error && <Alert variant="error">{error}</Alert>}
        {image ? (
          <div className="image-preview">
            <Button iconOnly="fas fa-times" onClick={clearImage}></Button>
            <img src={previewImage} alt="" />
          </div>
        ) : (
          <div className="image-placeholder">
            <img src={imageIcon} alt="" />
          </div>
        )}
        <form onSubmit={createHandler}>
          <Input
            fullWidth
            placeholder="Add board title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            fullWidth
            placeholder="Add board description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="add-board-input">
            <InputType
              label="Cover"
              startIcon="fas fa-image"
              type="file"
              id="add-board-cover"
              disabled
              onChange={(e) => fileChangeHandler(e.target.files[0])}
            />
            <InputType
              label="Private"
              startIcon="fas fa-lock"
              type="checkbox"
              id="add-board-private"
              value={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
              active={isPrivate}
            />
          </div>
          <div className="add-board-cta">
            <Button variant="text" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              startIcon="fas fa-plus"
              type="submit"
              disabled={title.length < 4 || loading}
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useAuth } from "../../context/AuthContext";
import {
  getNotes,
  createNotes,
  updateNote,
  deleteNote,
} from "../../services/api/createNotes";
import Loader from "../Common/Loader/Loader";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [noteData, setNoteData] = useState({ title: "", content: "" });
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loader, setLoader] = useState(true);
  // const [post, setPost] = useState(false);
  const user = useAuth();

  // console.log("activeNoteId", activeNoteId);

  const fetchNotes = async () => {
    const data = await getNotes({
      token: user.user.token,
      userId: user.user.userId,
    });
    setNotes([...data]);
    setLoader(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const closeModal = () => {
    setIsEditing(false);
    setActiveNoteId(null);
    setNoteData({ title: "", content: "" });
    setModalOpen(false);
    setSelectedNote(null);
  };

  const editNote = (note) => {
    setLoader(true);
    // setIsEditing(true);
    setNoteData({ title: note.title, content: note.content });
    setSelectedNote(note);
    setModalOpen(true);
    setLoader(false);
  };

  const createNewNote = async () => {
    setLoader(true);
    await createNotes({
      token: user.user.token,
      userId: user.user.userId,
      ...noteData,
    });
    fetchNotes();
    closeModal();
    setLoader(false)
  };

  const updateExistingNote = async () => {
    setLoader(true);
    if (selectedNote) {
      await updateNote({
        token: user.user.token,
        userId: user.user.userId,
        id: selectedNote._id,
        ...noteData,
      });
      fetchNotes();
      closeModal();
    }
    setLoader(false);
  };

  const deleteExistingNote = async () => {
    setLoader(true);
    if (selectedNote) {
      await deleteNote({
        token: user.user.token,
        userId: user.user.userId,
        id: selectedNote._id,
      });
      fetchNotes();
      closeModal();
    }
    setLoader(false);
  };

  return (
    <div className={styles.homeContainer}>
      {loader && <Loader />}
      <h1 className={styles.heading}>Notes App</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? updateExistingNote() : createNewNote();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          className={styles.inputField}
        />
        <textarea
          placeholder="Content"
          value={noteData.content}
          onChange={(e) =>
            setNoteData({ ...noteData, content: e.target.value })
          }
          className={styles.textareaField}
        />
        <button type="submit" className={styles.createButton}>
          {isEditing ? "Update Note" : "Create Note"}
        </button>
      </form>
      <div className={styles.notesContainer}>
        {notes.map((note, index) => (
          <div
            key={index}
            className={styles.note}
            onClick={() => {
              editNote(note);
              setActiveNoteId(note._id);
            }}
          >
            <h2 className={styles.noteTitle}>{note.title}</h2>
            <p className={styles.noteContent}>{note.content}</p>
          </div>
        ))}
      </div>

      {modalOpen && selectedNote && (
        <div className={styles.modalBackground} onClick={closeModal}>
          <div
            className={styles.noteModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>
              {isEditing ? "Edit Note" : "Note Details"}
            </h2>

            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateExistingNote();
                }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={noteData.title}
                  onChange={(e) =>
                    setNoteData({ ...noteData, title: e.target.value })
                  }
                  className={styles.modalInputField}
                />
                <textarea
                  placeholder="Content"
                  value={noteData.content}
                  onChange={(e) =>
                    setNoteData({ ...noteData, content: e.target.value })
                  }
                  className={styles.modalTextareaField}
                />
              </form>
            ) : (
              <>
                {" "}
                <h3>{noteData.title}</h3>
                <p className={styles.noteContent}>{noteData.content}</p>
              </>
            )}
            <div className={styles.modalButtons}>
              {/* {!isEditing && ( */}
              {isEditing ? (
                <button className={styles.editButton} onClick={updateExistingNote}>
                  Save
                </button>
              ) : (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
              {/* )} */}
              <button
                className={styles.deleteButton}
                onClick={deleteExistingNote}
              >
                Delete
              </button>
              <button className={styles.closeButton} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

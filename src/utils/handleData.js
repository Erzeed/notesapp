import { getActiveNotes, getArchivedNotes } from "../utils/data-api";

export const searchData = async (event) => {
  const text = event.target.value;
  const dataActiveNote = await getActiveNotes();
  const newData = [];
  dataActiveNote.data.filter((note) => {
    if (note.title.toLowerCase().includes(text.toLowerCase())) {
      return newData.push(note);
    }
  });
  return newData;
};

export const searchDataArsip = async (event) => {
  const text = event.target.value;
  const dataActiveArsip = await getArchivedNotes();
  const newData = [];
  dataActiveArsip.data.filter((note) => {
    if (note.title.toLowerCase().includes(text.toLowerCase())) {
      return newData.push(note);
    }
  });
  return newData;
};

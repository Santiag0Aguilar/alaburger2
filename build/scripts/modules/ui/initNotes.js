import { saveNotes, getNotes } from "./../utils/cartNotes.js";

export function initCartNotes() {
  const textarea = document.querySelector(".cart__notes");
  if (!textarea) return;

  textarea.value = getNotes();

  textarea.addEventListener("input", () => {
    saveNotes(textarea.value);
  });
}

initCartNotes();

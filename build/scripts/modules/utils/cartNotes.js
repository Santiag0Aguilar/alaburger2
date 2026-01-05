const NOTES_KEY = "cart_notes";

export function saveNotes(text) {
  localStorage.setItem(NOTES_KEY, text);
}

export function getNotes() {
  return localStorage.getItem(NOTES_KEY) || "";
}

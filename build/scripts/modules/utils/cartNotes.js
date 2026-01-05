const NOTES_KEY = "cart_notes";

export function saveNotes(text) {
  localStorage.setItem(NOTES_KEY, text);
}

export function getNotes() {
  return localStorage.getItem(NOTES_KEY) || "";
}

// utils/cartNotes.js
const FORM_KEY = "cart_form_data";

export function saveFormData(data) {
  localStorage.setItem(FORM_KEY, JSON.stringify(data));
}

export function getFormData() {
  return JSON.parse(localStorage.getItem(FORM_KEY)) || {};
}

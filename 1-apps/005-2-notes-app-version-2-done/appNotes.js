// elements
const notesListDOM = document.querySelector('.notes-list');
const noteTitleDOM = document.querySelector('.note-title');
const noteTextDOM = document.querySelector('.note-text');
const noteAlertDOM = document.querySelector('.note-alert');
// buttons
const noteAddBtn = document.querySelector('.btn-noteAdd');
const noteApp = document.querySelector('#noteApp');
const notePinBtn = document.querySelector('#note-pin');
const noteFullScr = document.querySelector('#btn-fullscr');
// edit options
let editTitleNote;
let editTextNote;
let editFlag = false;
let editID = '';

// get value from
const noteTitleInput = document.querySelector('.input-title');
const noteTextInput = document.querySelector('.input-text');
noteCreate();

// ANCHOR:          note conditional
function noteCreate() {
	noteAddBtn.addEventListener('click', () => {
		console.log('edit status conditional', editID != '');
		console.log('edit status conditional 1', !!editID);
		console.log('edit status conditional 2 ', editID != '' && !!editFlag);
		if (!editFlag) {
			if (noteTitleInput.value === '' || noteTextInput.value === '') {
				noteAlertDOM.innerHTML = 'Please fill in the blanks';
			} else if (
				noteTitleInput.value !== '' &&
				noteTextInput.value !== ''
			) {
				createNewNote();
				setBackToDefault();
			}
		} else if (editID != '' && !!editFlag) {
			console.log(
				'what is',
				editID,
				noteTitleInput.value,
				noteTextInput.value
			);
			console.log('what is', editTitleNote.parentElement);
			editTitleNote.innerHTML = noteTitleInput.value;
			editTextNote.innerHTML = noteTextInput.value;
			editFromLocalStorage(
				editID,
				noteTitleInput.value,
				noteTextInput.value
			);
			setBackToDefault();
		}
	});
}

//   ANCHOR *** create new note
function createNewNote() {
	let noteTitleValue = noteTitleInput.value;
	let noteTextValue = noteTextInput.value;
	let noteID = generateID();
	noteRender(noteTitleValue, noteTextValue, noteID);
	addToLocalStorage(noteID, noteTitleValue, noteTextValue);
}
function noteRender(noteTitleValue, noteTextValue, noteID) {
	const note = document.createElement('div');
	note.setAttribute('data-id', noteID);
	note.classList.add('note');

	note.innerHTML = `
          <div class="note-bar">
              <h3 class="note-title">${noteTitleValue}</h3>
              <i class="fa-solid fa-pencil btn-edit"></i>
              <i class="fa-solid fa-xmark btn-del"></i>
          </div>
              <p class="note-text">${noteTextValue}</p>
      `;

	//   const btnPins = document.querySelectorAll(".btn-pin");
	const btnDel = note.querySelector('.btn-del');
	btnDel.addEventListener('click', deleteNote);
	const btnEdit = note.querySelector('.btn-edit');

	btnEdit.addEventListener('click', () => {
		editNote();
	});
	notesListDOM.appendChild(note);
}

// ANCHOR *** create random ID
function generateID() {
	return Math.floor(Math.random() * 100 + Math.random() * 10);
	// return Math.floor(Math.random() * notesListDOM.length)
}

// TODO - delete note
function deleteNote(e) {
	const noteEl = e.currentTarget.parentElement.parentElement;
	// get id to remove note from localStorage
	const id = noteEl.dataset.id;
	console.log('id note click delete', id);

	notesListDOM.removeChild(noteEl);
	removeFromLocalStorage(id);
}

// TODO - edit note
function editNote(e) {
	const noteEl = e.currentTarget.parentElement.parentElement;
	const id = noteEl.dataset.id;

	noteAddBtn.value = 'Save Note';
	// get element DOM
	editTitleNote = e.currentTarget.parentElement.children[0];
	editTextNote = e.currentTarget.parentElement.parentElement.children[1];

	// get input(title, text) value
	console.log(editTitleNote);
	alert(editTitleNote.innerHTML);
	noteTitleInput.value = editTitleNote.innerHTML;
	noteTextInput.value = editTextNote.innerHTML;
	editFlag = true;
	editID = noteEl.dataset.id;
	console.log('title value before edit', editTitleNote, editID);
}

function setBackToDefault() {
	noteTitleInput.value = '';
	noteTextInput.value = '';

	noteAlertDOM.innerHTML = '';

	editFlag = false;
	editID = '';
	noteAddBtn.value = 'Add Note';
}

// ANCHOR *** localStorage
function addToLocalStorage(id, title, text) {
	const note = { id, title, text };
	let notes = getLocalStorage();
	notes.push(note);
	localStorage.setItem('noteAppDev', JSON.stringify(notes));
}

function getLocalStorage() {
	return localStorage.getItem('noteAppDev')
		? JSON.parse(localStorage.getItem('noteAppDev'))
		: [];
}

function setupItems() {
	// get notes from local storage
	let notes = getLocalStorage();
	console.log(notes);
	if (notes.length > 0) {
		notes.forEach((note) => {
			getNoteFromLocalStorage(note.id, note.title, note.text);
		});
	}
}

function getNoteFromLocalStorage(id, title, text) {
	setupItems();
	let noteTitleValue = title;
	let noteTextValue = text;
	let noteID = id;
	noteRender(noteTitleValue, noteTextValue, noteID);
}

function removeFromLocalStorage(id) {
	let notes = getLocalStorage();
	console.log('notes before delete', notes);
	console.log('removeFromLocalStorage', id);

	notes = notes.filter(function (note) {
		return note.id != id;
	});

	console.log('notes after deleted', notes);
	localStorage.setItem('noteAppDev', JSON.stringify(notes));
}

function editFromLocalStorage(id, title, text) {
	let notes = getLocalStorage();
	console.log('notes before edit', notes);
	console.log('edit', id);

	notes = notes.filter(function (note) {
		if (note.id == id) {
			note.title = noteTitleInput.value;
			note.text = noteTextInput.value;
		}
		return note;
	});

	console.log('notes after edited', notes);
	localStorage.setItem('noteAppDev', JSON.stringify(notes));
}

notePinBtn.addEventListener('click', () => {
	noteApp.classList.toggle('pinNote');
	noteApp.classList.toggle('note-smallSrc');
});
// noteFullScr.addEventListener("click", () => {
//     noteApp.classList.toggle('note-fullscreen')
// })

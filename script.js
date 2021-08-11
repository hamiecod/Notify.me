let addNoteBtn = document.getElementById("addNoteBtn");
showNotes();

addNoteBtn.addEventListener("click", () => {
  let addNoteTitle = document.getElementById("addNoteTitle");
  let addNoteText = document.getElementById("addNoteText");
  let notes = localStorage.getItem("notes");
  if (notes == (null || undefined || "")) {
    // notes array contains all the notes
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }

  notesArr.push({
    // adds new note
    title: addNoteTitle.value,
    text: addNoteText.value,
  });
  // sends the note to local storage
  localStorage.setItem("notes", JSON.stringify(notesArr));
  addNoteTitle.value = "";
  addNoteText.value = "";

  showNotes();
});

// function to show elements from the local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == (null || undefined || "")) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  let html = "";
  notesArr.forEach((element, index) => {
    html += `<div class="noteCard card my-2 mx-2" style="width: 19rem;">
        <div class="card-body">
        <h5 class="noteTitle card-title ">${element.title}</h5>
        <p class="card-text noteText">${element.text}</p>
        <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary mx-1 noteRemoveBtn">Remove Note</button>
        </div>
        </div>
        </div>`;
  });
  // the button holds the id of the note, and that is sent as a parameter to deleteNote()

  // displays the notes
  let notesContainer = document.getElementById("notes");
  if (notesArr.length == 0) {
    notesContainer.innerHTML = '<p class="text-center">No notes to show</p>';
  } else {
    notesContainer.innerHTML = html;
  }
}

// function to remove a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == (null || undefined || "")) {
    notesArr = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  // deletes a note

  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

let searchText = document.getElementById("searchText");

// search functionality
searchText.addEventListener("input", () => {
  let inputVal = searchText.value.toUpperCase();
  // it is the search text uppercased

  let noteCards = document.getElementsByClassName("noteCard");
  // all the notes

  [...noteCards].forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText.toUpperCase();
    let cardTitle = element
      .getElementsByTagName("h5")[0]
      .innerText.toUpperCase();
    // contains the values of the note

    if (cardText.includes(inputVal) || cardTitle.includes(inputVal)) {
      element.style.display = "block";
      // shows a note if it has the text specified in the serach
    } else {
      element.style.display = "none";
      // hides a note if it does not have the text specified in the search
    }
  });
});
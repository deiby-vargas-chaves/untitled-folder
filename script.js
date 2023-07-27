
// aparecer y desaparecer el formulario
const div1 = document.getElementById("addBookModal");
const div2 = document.getElementById("overlay");
const botonDesaparecer = document.getElementById("add");

botonDesaparecer.addEventListener("click", function(){
    div1.classList.add("active"); 
    div2.classList.add("active");
})
;

div2.addEventListener("click", function(){
    div1.classList.remove("active"); 
    div2.classList.remove("active");
})


let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/**
 * The `render` function is responsible for rendering a library of books on a webpage.
 */
function render() {
    let libraryEl = document.getElementById("booksGrid");
    libraryEl.innerHTML = "";
  
    for (let i = 0; i < myLibrary.length; i++) {
      let book = myLibrary[i];
      let bookEl = document.createElement("div");
      bookEl.classList.add("book-card"); 
      bookEl.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <div class="buttons">
          <button class="btn-card ${book.read ? 'btn-blue' : 'btn-red'}" onclick="toggleRead(${i})">${book.read ? "Read" : "Not read"}</button>
          <button class="btn-card btn-remove" onclick="removeBook(${i})">Remove</button>
        </div>`;
      libraryEl.appendChild(bookEl);

    
    }
  }
  function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
  }  

  /* The `Book.prototype.toggleRead` function is a method added to the `Book` prototype. It is used to
  toggle the `read` property of a book object. When called, it changes the value of `this.read` to
  its opposite value (if it was `true`, it becomes `false`, and vice versa). Finally, it returns the
  updated value of `this.read`. */
  
  Book.prototype.toggleRead = function(){
    this.read = !this.read;
    return this.read;
  }
  
  /**
   * The function `toggleRead` toggles the read status of a book in the `myLibrary` array and then
   * calls the `render` function.
   * @param index - The index parameter is the position of the book in the myLibrary array that you
   * want to toggle the read status of.
   */
  function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();}

/* The `addBookToLibrary` function is responsible for adding a new book to the library. It retrieves
the values of the title, author, pages, and read status from the input fields in the form. It then
creates a new `Book` object using these values and pushes it to the `myLibrary` array. Finally, it
calls the `render` function to update the display of the library on the webpage. */
function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook)
  render();
}

document.querySelector("#addBookForm").addEventListener("submit",function(){
    event.preventDefault();
    addBookToLibrary();
})
'use strict';
// * select Elements

const plus = document.querySelector('.plus');
const blur = document.querySelector('.blur');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form');
const close = document.querySelector('.close');
const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const inputPages = document.querySelector('.pages');
const submitButton = document.querySelector('.submit');
const update = document.querySelector('.book-update');
const deleteBook = document.querySelector('.book--delete');

const bookContainer = document.querySelector('.book-container')
let book = document.querySelector('.book')

const removeHidden = () => {
  blur.classList.toggle('hidden');
  plus.classList.toggle('rotate');
  formContainer.classList.toggle('hidden');
};
plus.addEventListener('click', removeHidden);
close.addEventListener('click', removeHidden);
document.addEventListener('keydown', function (e) {
    if(e.key === 'Escape' && !formContainer.classList.contains('hidden')) removeHidden();
})

let myLibrary = [];

// * constructor function

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    static renderLibrary() {
        book.innerHTML = '';
        myLibrary.forEach((newBook, i) => {
            let bookTab = document.createElement('div');
            bookTab.classList.add('book--tab');
            bookTab.innerHTML = `
            <div class=book--detail>
                <h3>Title:</h3>
                <p>${newBook.title}</p>
            </div>
            <div class=book--detail>
                <h3>Author:</h3>
                <p>${newBook.author}</p>
            </div>
            <div class=book--detail>
                <h3>Page:</h3>
                <p>${newBook.pages}</p>
            </div>
            <div class=book--detail>
                <h3>Read it:</h3>
                <p class="read">${newBook.read ? "read 🙂" : "No 🙅‍♂️"}</p>
            </div>
            <button  class="book--delete" onclick="Book.removeBooks(${i})">
                 Delete <i class="ri-delete-bin-5-line edit"></i>
            </button>
             <div class="book--update" onclick="Book.toggleRead(${i})">
                 Update <i class="ri-edit-line edit" ></i>
             </div>
            `
            
            
            book.appendChild(bookTab);
        })
    }

     static removeBooks(index) {
        myLibrary.splice(index, 1);
        this.renderLibrary();
    }

    static toggleRead(index) {
        myLibrary[index].toggleRead2();
        this.renderLibrary();
    }

 

    static addBookToLibrary() {
        let title = inputTitle.value;
        let author = inputAuthor.value
        let pages = inputPages.value;
        let read = document.querySelector('.read').checked;
        let newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        console.log(myLibrary);

        // * render Library.
        this.renderLibrary();
    }

    static clearForm() {
        inputAuthor.value = inputPages.value = inputTitle.value = '';
    }


}

Book.prototype.toggleRead2 = function () {
    this.read = !this.read;
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    Book.addBookToLibrary();
    Book.clearForm();
});





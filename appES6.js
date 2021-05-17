class Book {

    constructor(title, author, isbn) {

        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }

}

class UI {

    addBookToList(book) {

        const list = document.getElementById('book-list');

        //Create TR Element
        const row = document.createElement('tr');

        //Insert Cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class = "delete">X</a></td>
        `;

        list.appendChild(row);

    }

    showAlert(message, className) {

        //Create DIV
        const div = document.createElement('div');

        //Add Class Name
        div.className = `alert ${className}`;

        //Add Text
        div.appendChild(document.createTextNode(message));

        //Get Parent
        const container = document.querySelector('.container');

        //Get Form
        const form = document.querySelector('#book-form');

        //Insert Alert
        container.insertBefore(div, form);

        //Timeout After 3 Secs
        setTimeout(function() {

            document.querySelector('.alert').remove();

        }, 3000);

    }

    deleteBook(target) {

        if(target.className === 'delete'){

            target.parentElement.parentElement.remove();
    
        }

    }

    clearFields() {

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }

}

//Local Storage Class
class Store {

    static getBooks() {

        let books;

        if(localStorage.getItem('books') === null) {

            books = []

        } else {

            books = JSON.parse(localStorage.getItem('books'));

        }

        return books;

    }

    static displayBooks() {

        const books = Store.getBooks();

        books.forEach(function(book) {

            const ui = new UI;

            //Add Book
            ui.addBookToList(book);

        });

    }

    static addBook(book) {

        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {

        console.log(isbn);

        const books = Store.getBooks();

        books.forEach(function(book, index) {

            if(book.isbn === isbn) {

                console.log('hi');

                books.splice(index, 1);

            }

        });

        localStorage.setItem('books', JSON.stringify(books));

    }

}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Event Listener For Addition
document.getElementById('book-form').addEventListener('submit', function(e){

    //Get Form Values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
                isbn = document.getElementById('isbn').value;

    //Instantiate Book
    const book = new Book(title, author, isbn);

    //Instantiate UI Object
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === '') {

        //Error Alert
        ui.showAlert('Please Fill In All Fields!', 'error');

    } else {

        //Add Book To List
        ui.addBookToList(book);

        //Add To Local Storage 
        Store.addBook(book);

        //Show Success Alert
        ui.showAlert('Book Added!', 'success');

        //Clear Fields
        ui.clearFields();

    }

    e.preventDefault();

});

//Event Listener For Delete 
document.getElementById('book-list').addEventListener('click', function(e) {

    //Instantiate UI Object
    const ui = new UI();

    //Delete Book
    ui.deleteBook(e.target);

    //Remove From Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show Alert
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();

});
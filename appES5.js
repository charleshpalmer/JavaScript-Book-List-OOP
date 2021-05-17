//Book Constructor
function Book (title, author, isbn) {

    this.title = title;
    this.author = author;
    this.isbn = isbn;

}


//UI Constructor 
function UI() {}


//Add Book To List
UI.prototype.addBookToList = function(book){

    const list = document.getElementById('book-list');

    //Create TR Element
    const row = document.createElement('tr');

    //Insert Cols
    row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td> <a href = "#" class = "delete"> X </a> </td>
    `;

    list.appendChild(row);

}

//Show Alerts
UI.prototype.showAlert = function(message, className) {

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

//Delete Book
UI.prototype.deleteBook = function(target) {

    if(target.className === 'delete'){

        target.parentElement.parentElement.remove();

    }

}

//Clear Fields
UI.prototype.clearFields = function(){

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

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

    //Show Alert
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();

});
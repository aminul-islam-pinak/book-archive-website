const loadBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // error handling check
    if (searchText === '') {
        alert("you didn't search anything");
    }
    else {
        // hidding search data displaying spinner
        toggleSpinner('visible');
        toggleSearchResult('hidden');
        //  fetching book data from api 
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(result => result.json())
            .then(data => displayBookData(data.docs));
    }

};
// toggle spinner and search result by function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.visibility = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('book-details').style.visibility = displayStyle;
    document.getElementById('total-result-container').style.visibility = displayStyle;
}

// displaying book data 
const displayBookData = books => {
    const bookDataContainer = document.getElementById('book-details');
    bookDataContainer.textContent = '';
    // updating total result 
    const totalResult = document.getElementById('total-result');
    totalResult.innerText = books.length;
    // error handling 
    if (books.length === 0) {
        alert('the searching book is not exist');
    }
    // loop through books array to find all book details 
    books.slice(0, 30).forEach(book => {
        // creating  a new card div for each book 
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow-lg rounded-3">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : -1}-M.jpg" class="card-img-top h-75" alt="cover pic not found">
                <div class="card-body">
                    <h5 class="card-title">Book Title: ${book.title}</h5>
                    <p class="card-text"><span class="fw-bold">Author Name:</span> ${book.author_name ? book.author_name : 'unknown'}</p>
                    <p class="card-text"><span class="fw-bold">Publisher:</span> ${book.publisher ? book.publisher : 'unknown'}</p>
                    <p class="card-text"><span class="fw-bold">First Publish Year:</span> ${book.first_publish_year ? book.first_publish_year : 'unknown'}</p>
                   
                </div>
            </div>
        `;
        bookDataContainer.appendChild(div);
    });
    // displaying search data and total result data and hidding spinner
    toggleSpinner('hidden');
    toggleSearchResult('visible');

};











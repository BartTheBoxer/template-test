const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden=false;
    loader.hidden = true;
}


// Show new Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from the apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    // If author is blank, replace with "Anonymous"
    if (!quote.author)
        author.textContent = 'Anonymous'
    else
        author.textContent = quote.author;
    // Check quote length to determine styling
    if (quote.text.length > 100)  {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

// Get quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
    } catch (error) {
        console.log(error);
        // Error handler
    }
}

// Tweet quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuotes();
// showLoadingSpinner();
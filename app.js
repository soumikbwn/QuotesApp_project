const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "A rose by any other name would smell as sweet. - William Shakespeare",
    "All that glitters is not gold. - William Shakespeare",
    "Ask not what your country can do for you; ask what you can do for your country. - John Kennedy",
    "Ask, and it shall be given you; seek, and you shall find. - The Bible",
    "Genius is one percent inspiration and ninety-nine percent perspiration. - Thomas Edison",
    "If you want something said, ask a man; if you want something done, ask a woman. - Margaret Thatcher",
    "Life is like a box of chocolates. You never know what you’re gonna get. - Forest Gump (Movie Character)",
    // Add more quotes as needed
  ];
  
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = document.getElementById('quote-text');
    quoteText.textContent = quotes[randomIndex];
  }
  
  function shareQuote() {
    const quoteText = document.getElementById('quote-text').textContent;
  
    if (navigator.onLine) {
      if (navigator.share) {
        navigator.share({
          title: 'Inspiration Quote',
          text: quoteText,
        })
          .then(() => console.log('Quote shared successfully'))
          .catch((error) => console.error('Error sharing quote:', error));
      } else if (navigator.userAgent.match(/Android/i)) {
        // For Android devices, use the Android Intent system
        const intent = `intent:#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.TEXT=${quoteText};end`;
  
        window.location.href = intent;
      } else {
        alert('Sharing is not supported on your device. Please share the quote manually.');
      }
    } else {
      alert('No internet connection. Please check your network settings.');
    }
  }
  
  
  function saveFavoriteQuote() {
    const quoteText = document.getElementById('quote-text').textContent;
    const favoriteQuotesList = document.getElementById('favorite-quotes-list');
    
    // Check if the quote is already in the favorites
    if (!isQuoteInFavorites(quoteText)) {
      const li = document.createElement('li');
      li.textContent = quoteText;
      favoriteQuotesList.appendChild(li);
      
      // Save to local storage
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.push(quoteText);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  
  function isQuoteInFavorites(quote) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(quote);
  }
  
  function loadFavoriteQuotes() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteQuotesList = document.getElementById('favorite-quotes-list');
    
    favorites.forEach((quote) => {
      const li = document.createElement('li');
      li.textContent = quote;
      favoriteQuotesList.appendChild(li);
    });
  }
  
  // Initialization
  getRandomQuote();
  loadFavoriteQuotes();
  
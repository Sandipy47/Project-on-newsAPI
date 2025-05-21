
        const apiKey = 'ff5098cb2c4145208089aa29ff72bc33'; 
        const newsContainer = document.getElementById('news-container'); 
        const searchInput = document.getElementById('Search');
        const searchButton = document.getElementById('btn');

        async function fetchNews(query = 'general') {
            try {
                const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&q=${query}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === 'ok' && data.articles) {
                    displayNews(data.articles);
                } else {
                    newsContainer.innerHTML = '<p>Failed to load news.</p>';
                    console.error("Error fetching news:", data);
                }
            } catch (error) {
                newsContainer.innerHTML = '<p>An error occurred while fetching news.</p>';
                console.error("Fetch error:", error);
            }
        }

        function displayNews(articles) {
            newsContainer.innerHTML = ''; 

            articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');

                const title = document.createElement('h3');
                title.textContent = article.title;

                const description = document.createElement('p');
                description.textContent = article.description || 'No description available.';

                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = 'Read More';
                link.target = '_blank'; 

                newsItem.appendChild(title);
                newsItem.appendChild(description);
                newsItem.appendChild(link);
                newsContainer.appendChild(newsItem);
            });
        }

       
        fetchNews();

       
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                fetchNews(query);
            } else {
                fetchNews();
            }
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
   
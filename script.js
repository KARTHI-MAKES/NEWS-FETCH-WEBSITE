const apiKey = "5ac56e2aa16e42c6910a6df17fac822a";
const blogContainer = document.getElementById("Blog-container");
const searchField = document.getElementById("search-box")
const searchButton = document.getElementById("search")

async function fetchNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=16&apiKey=${apiKey}`;  // Fixed the line break
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);  // Added error logging
        return [];
    }
}

 searchButton.addEventListener("click",async()=>{
    const query = searchField.value.trim()
    if(query!==""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlog(articles)
        }
        catch(error){
            console.log("Error fetching news in query",error)
        }
    }
 })

  async function fetchNewsQuery(query){ try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=16&apiKey=${apiKey}`;  // Fixed the line break
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
} catch (error) {
    console.error("Error fetching random news", error);  // Added error logging
    return [];
}

 }

function displayBlog(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("Blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length>30?article.title.slice(0,30)+"....":article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDes = article.description.length>120?article.description.slice(0,120)+"....":article.description;
        description.textContent = truncatedDes;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank")
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchNews();  
        displayBlog(articles);
    } catch (error) {
        console.error("Error fetching random news");
    }
})();

// posts.json থেকে news load করার code
fetch('posts.json')
  .then(res => res.json())
  .then(posts => {

    // ----------------------------
    // Home page top news
    // ----------------------------
    const topContainer = document.querySelector('.top-news-wrapper');
    if(topContainer){
      let topNews = posts.filter(p => p.top_news);
      topNews.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
      topContainer.innerHTML = '';
      topNews.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('top-news');
        div.innerHTML = `
          <img src="${post.image}" alt="">
          <div class="top-text">
            <h2>${post.title}</h2>
            <p>${post.summary}</p>
            <a href="news.html?id=${post.id}" class="btn">পুরো খবর পড়ুন</a>
          </div>
        `;
        topContainer.appendChild(div);
      });
    }

    // ----------------------------
    // Home page category section
    // ----------------------------
    const categories = ['সারাদেশ','রাজনীতি','খেলাধুলা','আন্তর্জাতিক','বিনোদন'];
    categories.forEach(cat => {
      const h3 = [...document.querySelectorAll('.category h3')].find(el => el.innerText === cat);
      if(h3){
        let catPosts = posts.filter(p => p.category === cat);
        catPosts.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
        const container = h3.nextElementSibling;
        container.innerHTML = '';
        catPosts.forEach(post => {
          const div = document.createElement('div');
          div.classList.add('top-news');
          div.innerHTML = `
            <img src="${post.image}" alt="">
            <div class="top-text">
              <h2>${post.title}</h2>
              <p>${post.summary}</p>
              <a href="news.html?id=${post.id}" class="btn">খবর পড়ুন</a>
            </div>
          `;
          container.appendChild(div);
        });
      }
    });

    // ----------------------------
    // Individual page (bangladesh.html etc)
    // ----------------------------
    const pageName = document.body.getAttribute('data-page');
    if(pageName){
      const container = document.querySelector('.news-section'); // news-section কে container ধরা
      if(container){
        let pagePosts = posts.filter(p => p.page === pageName);
        pagePosts.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
        container.innerHTML = ''; // পুরানো content clear

        let row;
        pagePosts.forEach((post, index) => {
          if(index % 3 === 0){ // প্রতি 3 post এ নতুন row
            row = document.createElement('div');
            row.classList.add('news-row');
            container.appendChild(row);
          }
          const article = document.createElement('article');
          article.innerHTML = `
            <img src="${post.image}" alt="">
            <h4><a href="news.html?id=${post.id}">${post.title}</a></h4>
          `;
          row.appendChild(article);
        });
      }
    }

    // ----------------------------
    // news.html detail page
    // ----------------------------
    if(window.location.pathname.includes('news.html')){
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('id');
      const post = posts.find(p => p.id == postId);
      if(post){
        const newsTitle = document.querySelector('.news-title');
        const newsImage = document.querySelector('.news-image');
        const newsContent = document.querySelector('.news-content');

        if(newsTitle) newsTitle.innerText = post.title;
        if(newsImage) newsImage.src = post.image;
        if(newsContent) newsContent.innerText = post.content;
      }
    }

  });

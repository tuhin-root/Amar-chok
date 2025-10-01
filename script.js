// posts.json থেকে news load করার code
fetch('posts.json')
  .then(res => res.json())
  .then(posts => {

    // Home page top news
    const topContainer = document.querySelector('.top-news-wrapper');
    if(topContainer){
      let topNews = posts.filter(p => p.top_news);
      topNews.sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp));
      topContainer.innerHTML = '';
      topNews.forEach(post=>{
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

    // Category section (index.html)
    const categories = ['সারাদেশ','রাজনীতি','খেলাধুলা','আন্তর্জাতিক','বিনোদন'];
    categories.forEach(cat=>{
      const h3 = [...document.querySelectorAll('.category h3')].find(el=>el.innerText===cat);
      if(h3){
        let catPosts = posts.filter(p=>p.category===cat);
        catPosts.sort((a,b)=> new Date(b.timestamp)-new Date(a.timestamp));
        const container = h3.nextElementSibling;
        container.innerHTML='';
        catPosts.forEach(post=>{
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

    // Individual page (bangladesh.html etc)
    const pageName = document.body.getAttribute('data-page'); // html body te data-page attribute add করতে হবে
    if(pageName){
      const container = document.querySelector('.category-posts');
      if(container){
        let pagePosts = posts.filter(p=>p.page===pageName);
        pagePosts.sort((a,b)=> new Date(b.timestamp)-new Date(a.timestamp));
        container.innerHTML='';
        pagePosts.forEach(post=>{
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
    }

    // news.html
    if(window.location.pathname.includes('news.html')){
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('id');
      const post = posts.find(p=>p.id==postId);
      if(post){
        document.querySelector('.news-title').innerText = post.title;
        document.querySelector('.news-image').src = post.image;
        document.querySelector('.news-content').innerText = post.content;
      }
    }

  });


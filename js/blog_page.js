
function mostrarMes(data) {
  //console.log(data)
  fetch(data)
    .then((response) => response.json())
    .then((json) => {
      //console.log(json)
      document.getElementById(`post_${data}`).innerHTML = 
      ` <h2>${json['title']}</h2> 
        ${json['content']}
        <hr>
        <figcaption>—${json["date"]}</figcaption>`
    })
}

fetch('../blog/index.json')
  .then((response) => response.json())
  .then((jsonIndex) => {
      // READ THE BLOG INDEX TITLES
      jsonIndex.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            //console.log(`${key} ${value}`);
        });
        //console.log('-------------------');
        document.getElementById("blog_wrapper").innerHTML += 
      `<br><div class="blog_preview" id='post_${obj['path']}'>
            <h2>${obj['title']}</h2>`
        fetch(obj['path'])
          .then((response) => response.json())
          .then((json) => {
              //console.log(json)
              if (json['content'].length < 97){
                document.getElementById(`post_${obj['path']}`).innerHTML += 
                `${json['content']}
                  <hr>
                  <figcaption>—${json["date"]}</figcaption>
                  </div> <!-- WRAPPER --> 
                `;
              } else {
                document.getElementById(`post_${obj['path']}`).innerHTML += 
                `${json['content'].slice(0, 97) + '...'}
                  <br><br>
                  <button onclick="mostrarMes('${obj['path']}')">Llegir més</button>
                  <hr>
                  <figcaption>—${json["date"]}</figcaption>
                  </div> <!-- WRAPPER --> 
                `;
              }
          });
      });
  });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('blog'));
  if (urlParams.get('blog')){
    fetch('/blog/' + urlParams.get('blog'))
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      document.getElementById(`modal`).innerHTML = 
      ` <h2>${json['title']}</h2> 
        ${json['content']}
        <hr>
        <figcaption>—${json["date"]}</figcaption>`
    })
    document.querySelector("dialog").showModal(); 
  }
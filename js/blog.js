
fetch('../blog/index.json')
    .then((response) => response.json())
    .then((jsonIndex) => {
        // READ THE BLOG INDEX
        document.getElementById("title").innerHTML = jsonIndex[0].title
        fetch(jsonIndex[0].path)
          .then((response) => response.json())
          .then((json) => {
              // READ THE BLOG INDEX
              document.getElementById("title").innerHTML = json.title
              
              if (json.content.length < 50){
                document.getElementById("content").innerHTML = json.content;
              } else {
                document.getElementById("content").innerHTML = json.content.slice(0, 97) + "..."; 
                document.getElementById("content").innerHTML += `<br><br>
                  <button onclick="window.location.assign('/blog/?blog=${jsonIndex[0].path.substring(6)}');">Llegir més</button>`
              }
          });
    });

//Nem a buscar el index del blog
fetch('/blog/index.json')
    .then((response) => response.json())
    .then((jsonIndex) => {
        // Agafem el primer registre i el posem al titol (No el vull)
        //document.getElementById("title").innerHTML = jsonIndex[0].title;
        // A el valor de path tenim el path a el json del blog
        fetch(jsonIndex[0].path + '.json')
          .then((response) => response.json())
          .then((json) => {
              // Llegim el titul de DINS del blog
              document.getElementById("title").innerHTML = json.title
              
              // Si el contingun es mes llarg de 50 caracters el posem sencer
              if (json.content.length < 50){
                document.getElementById("content").innerHTML = json.content;
              } else {
                // Sino l'acortem (perque vas posar 97 luna? tho deixo igual pero wtf)
                document.getElementById("content").innerHTML = json.content.slice(0, 97) + "..."; 
              }
              // Creem un boto de llegir mes, que portara a la pagina del blog i mitjançant magia fara apareixer l'article com pop up
              // (La magia es posarho com a valor de la url (nose perque faig un substring de 6...))
              document.getElementById("content").innerHTML += `<br><br>
                <button onclick="window.location.assign('/blog/?blog=${jsonIndex[0].path.substring(6)}');">Llegir més</button>`;
          });
    });
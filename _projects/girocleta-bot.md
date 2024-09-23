---
layout: project
title: "Girocleta BOT"
image: "/imgs/girocletabot.png"
category: "altres"
link: "https://twitter.com/girocletabot"
date: "01-01-2023"
---
Bot de twitter que publica en intervals de 30 minuts la situació de les parades de girocleta.

Sorgeix de la necessitat de consultar la web de girocleta recurrentment per saber si trobaré bicicleta. 

La informació que es mostra és la d'estacions que es troben amb 5 o menys bicicletes i/o 5 o menys espais lliures, ja que en les primeres versions es tuitava tot l'estat de la xarxa, i era massa informació per un tuit.

Actualment, en la seva última versió, es publica amb un mapa d'estacions amb les respectives dades sobreposades.

![Mapa de estacions de girocleta sobre el mapa de girona](/imgs/girocleta.png)

Fet amb js, hostejat i executat amb [GitHub Actions](https://github.com/akaluna99/girocletaBOT)
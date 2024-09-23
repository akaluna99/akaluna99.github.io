---
layout: post
title: Creant un bot de Twitter (X) amb GitHub Actions
categories: paraules
---
## Creant un bot de Twitter (X) amb GitHub Actions
Un dels meus projectes actius es el compte [girocletaBOT](https://twitter.com/girocletaBOT) a la xarxa social Twitter (X). Aquest compte es dedica a tuitar en intervals de 30 minuts l'estat de la xarxa de bicicletes compartides de la ciutat de Girona, a.k.a [Girocleta](https://www.girocleta.cat/). 

Les publicacions es composen d'un text indicant la hora de publicació i un llistat on es detallen les bicicletes disponibles i els espais lliures per cada parada que, o bé tingui 5 o menys bicicletes o 5 o menys espais lliures. Al final del post s'incorpora un mapa de Girona amb la informació del tuit superposada a la ubicació de les estacions.

![Imatge del tuit de girocleta bot](/imgs/posts/girocleta-tweet.jpg)

## Part 1: Necesitat i recerca de alternatives
Desde fa ben bé 2 anys soc usuaria de forma casi diaria del servei de Girocletes. Tinc la sort de tenir una parada prop d'on visc i un altre a prop d'on treballo, així que l'elecció d'aquest transport es casi obvia. L'estació al costat del meu pis es tracta d'una estació on hi ha molt moviment, cosa que provoca que a les 8:00 quan solc agafarles sigui una loteria el fet de trobar o no bicicletes, sobretot els dilluns.

Per tal de no trobar l'estacio buida pel mati i haver de fer mitja volta per anar a la seguent, em vaig acostumbrar a revisar el [mapa d'estacions oficial](https://www.girocleta.cat/mapaestacions.aspx) i qualsevol que hagi usar el mapa oficial podra estar d'acord que, sobretot al movil, es molt poc `user friendly`. Els icones es moven de manera horrible, no estan ben centrats, la informació massa.

![Imatge del mapa de estacions oficial](/imgs/posts/girocleta-mapa.jpg)

D'aqui va neixer la voluntat de trobar una alternativa, i quan l'unica que vaig trobar va ser un [bot de telegram](https://github.com/Lloople/bot-girocleta) que feia 4 anys que no s'actualitzava vaig pensar que hauria de practicar les meves habilitats trobant una sol·lució.

## Part 2: Origen de les dades
Desde el prinicipi tenia clar que la clau del projecte era la obtencio de dades. Vaig pensar que el mapa d'estacions tindria una cosa semblant a una API... Si voleu mireu amb el codi de la pagina d'estacions per veure com esta fet... yikes. Es més, vaig pensar en buscar l'empresa responsable de l'instalació de les Girocletes, Emovity, filla de Icnita. Us animo a buscar en Google la situacio d'aquestes dues empreses.

Veient que no hi havia cap solució vaig pensar en fer un scraping del web, pero llavors vaig topar-me amb la api de [CityBikes](https://api.citybik.es/v2/). La felicitat que vaig sentir al trobar aquesta api va ser com descobrir el Sant Grial. Amb només un endpoint ja tenia sol·lucionat aquet problema, asobre en un molt assolible format [JSON](https://api.citybik.es/v2/networks/girocleta).

Com a curiositat, CityBikes funciona mitjançant scraping, i a la part del [codi](https://github.com/eskerda/pybikes/blob/master/pybikes/emovity.py) que fa scrpaping del mapa de girocletes hi ha aquest comentari:
![Comentari al codi scraping](/imgs/posts/girocleta-comment.jpg)

A la següent part explicaré com funciona el bot

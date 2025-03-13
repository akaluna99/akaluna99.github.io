---
layout: post
title: "Descarregar de Texture Haven en baixa qualitat (a propòsit)"
categories: paraules
tags: tools, codi, javascript
---
M'encanta utilitzar [Texture Haven](https://polyhaven.com/textures) per als meus projectes.

És una eina que he fet servir molts cops i em meravella la qualitat de les textures i que siguin tan accessibles.

Però molts cops les textures tenen massa qualitat per als meus jocs low poly. Al descarregar, la qualitat mínima és de 1k (1024x1024). 

![Al descarregar, la qualitat mínima és 1k](/imgs/posts/texturehaven-download.jpg)

Que pot semblar poc (ho és) però per als meus jocs web això pot arribar a repercutir gairebé 1mb d'espai per textura! I si és un material PBR ja multiplica això per 5. 

## Rescalat
Molts cops havia de, abans d'usar la textura, descarregar-la, descomprimir-la i anar una per una reescalant la imatge. Avorrit si em pregunten.

Això fins que vaig adonar-me que a la previsualització, apareixen els materials PBR.

![Al descarregar, la qualitat mínima és 1k](/imgs/posts/texturehaven-thumbnail.jpg)

Obrint aquests thumbnails en una nova finestra ens desvela el següent format de URL:

`
nomMaterial/nomMaterial_tipusTextura_1k.jpg?height=midaPixels&width=midaPixels
`

Bingo. Amb aquesta adreça podíem trobar un .webp de la textura 1k escalada a la mida que volgués (sempre que no excedís 1024). Perfecte, perquè a sobre Godot em deixa ficar .webp com textures.

## La màgia dels bookmarks de Chrome
Amb aquesta URL podia anar per cada tipus de textura i descarregar en una mida tipus 512x512. Però igualment continuava sent més lent.

Buscaba una manera de fer aquest process més rapid, en concret perque estava fent el meu ultim joc [Corridors of Power](https://lunamoreno.itch.io/corridors-of-power)

Així que vaig fer un programet en JS que ho fes per mi. Detectés la textura on fos, em fes un prompt de la mida a la que volia les imatges i m'obrís en finestres noves cada tipus de textura. Voilà!

```javascript
javascript:(function () {
    function openNewTab(url) {
        window.open(url, "_blank");
    }
    let currentUrl = window.location.href;
    if (currentUrl.includes("https://polyhaven.com/a")) {
        let pixel_size = prompt("Mida en px: (1,1080)");
        let varMaterial = currentUrl.split("/")[4];
        let textureTypes = ["ao", "diff", "nor_gl", "rough"];
        textureTypes.forEach(function (textureType) {
            let url = `https://cdn.polyhaven.com/asset_img/map_previews/${varMaterial}/${varMaterial}_${textureType}_1k.jpg?height=${pixel_size}&width=${pixel_size}`;
            openNewTab(url);
        });
    } else {
        openNewTab("https://polyhaven.com/textures");
    }
})();
```

Per poder-ho executar, ho vaig posar com una de les meves funcions preferides dels bookmarks de Chrome: un enllaç que executi JS.

Per afegir-ho al Chrome simplement selecciona el codi de dalt i arrossega-ho a la barra d'adreces.

![Exemple assignació bookmark](/imgs/posts/texturehaven-bookmark.gif)


## Funcionament
El funcionament és molt senzill. Si s'executa en una pàgina que no és la d'una textura de Polyhaven, redireccionarà a la pàgina principal de textures.

Un cop la pestanya actual sigui d'una textura, al prémer el botó demanarà la mida de textura desitjada (més de 1080 no tindrà efecte).

Al prémer acceptar, obrirà en una nova finestra les textures PBR corresponents. L'única feina manual que s'ha de fer és 1 per 1 descarregar les textures de les pestanyes.

![Exemple us extensió](/imgs/posts/texturehaven-tutorial.gif)

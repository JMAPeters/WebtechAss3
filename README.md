# Node.js App

## Installatie

Deze commands heb ik uitgevoerd, en zou je dus niet nog een keer uit hoeven voeren.

```powershell
npm init
npm install express pug ejs --save
```

## Server starten

Pas in app.js `const port = 8036;` aan naar de poort die je moet hebben.

```powershell
node app.js
```

Dat is de website lokaal in ieder geval bereikbaar op `localhost:8036`. Ik weet niet precies hoe dit op de server van de uni zou moeten gaan.

Ik denk dat de website van express best goede uitleg heeft: https://expressjs.com/. Zie de tabjes "Getting started" en "Guide", in die volgorde. Alleen skip "Express generator", omdat jullie het van scratch willen opzetten. 

## Templates

Als het mag voor de opdracht, kan je `jade` (de nieuwe versie heet `pug`) gebruiken. Ik heb `pug` al geinstalleerd. Zie de `/home` route in `app.js` voor een voorbeeld.

Ik heb ook EJS toegevoegd, dit ziet er meer uit als pure html. Je kan er zetzelfde mee maar ziet er iets anders uit. Zie de `/test` route in `app.js` voor een voorbeeld.

Gebruik er 1, niet meerdere door elkaar (zoals nu wel in `app.js` staat). Doe dus maar 1 keer `app.set('view engine', ...)` bovenin.
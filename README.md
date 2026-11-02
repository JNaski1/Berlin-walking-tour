# Berliini kävellen

Suomenkielinen, mobiililaitteille suunniteltu kävelyopas Berliinin 21 historialliseen kohteeseen. Kartta näyttää alkuperäisen tai arvioidun lyhyemmän kävelyjärjestyksen, etenemisen ja seuraavan kohteen. Käyntejä voi merkitä itse tai antaa paikannuksen tunnistaa ne. Edistyminen tallentuu laitteen selaimen localStorageen.

Karttasuodattimella voi näyttää lisäksi 13 kävelykierroksen ulkopuolista kohdetta, mukaan lukien Siegessäulen, tai kaikki kohteet. Violetit tähdet eivät kuulu reittiin, etenemiseen tai automaattiseen käyntien tunnistukseen. Mauerparkin kirpputorin sunnuntain aukioloaika perustuu [Berliinin kaupungin tietoihin](https://www.berlin.de/en/shopping/markets/flea-markets/1998222-2983302-flea-market-at-mauerpark.en.html); ajat voivat muuttua. Mustafan nykyinen osoite on tarkistettu [yrityksen sivulta](https://mustafas.de/).

## Tekniikka ja käynnistys

React, TypeScript, Vite, Leaflet, OpenStreetMap, selaimen Geolocation API ja localStorage. Palvelinta tai tietokantaa ei tarvita. Tarvitset Node.js:n version 22.12 tai uudemman 22.x-version, 24.x-version tai vähintään version 26.

```sh
npm ci
npm run dev
```

Avaa Viten ilmoittama localhost-osoite. Tuotantoversio ja testit:

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

`dist/` sisältää julkaistavan staattisen sivuston. Viten `base: './'` tekee resurssipoluista suhteellisia, joten sama build toimii myös alihakemistossa, kuten `https://käyttäjä.github.io/varasto/`.

## Julkaisu GitHub Pagesiin

1. Luo julkinen GitHub-repositorio ja vie projektin tiedostot (myös `package-lock.json` ja `.github/workflows/deploy.yml`) sen `main`-haaraan.
2. Avaa repositorion **Settings → Pages → Build and deployment** ja valitse **Source: GitHub Actions**.
3. Työnnä muutokset `main`-haaraan tai käynnistä **Actions → Deploy to GitHub Pages → Run workflow**. Workflow asentaa riippuvuudet, suorittaa testit ja buildin ja julkaisee `dist/`-kansion.
4. Kun workflow onnistuu, avaa Settings → Pages -sivulla näkyvä osoite, tavallisesti `https://KÄYTTÄJÄ.github.io/REPOSITORIO/`. Käyttäjä- tai organisaatiosivuston osoite voi olla juuriosoitteessa.

Jos oletushaara on muu kuin `main`, muuta workflow'n `push.branches` vastaavasti tai käynnistä se käsin oikeasta haarasta. Käyttöönotto edellyttää, että GitHub Pages ja Actions ovat sallittuja kyseisessä repositoriossa.

## Paikannus ja käynnit

Salli sijainti selaimessa. Geolocation vaatii HTTPS:n tai paikallisen `localhost`-ympäristön; pelkkä paikallisverkon HTTP-osoite puhelimessa ei yleensä riitä. Paikannus päivittyy sovelluksen ollessa aktiivinen. Selaimen keskeyttäessä sivun taustapaikannusta ei taata.

Automaattinen merkintä vaatii vähintään kaksi tuoretta GPS-havaintoa noin 10 sekunnin ajalta. Koko ilmoitetun tarkkuussäteen on mahduttava 50 metrin säteeseen kohteesta; epätarkka havainto, poistuminen tai pitkä havaintotauko aloittaa seurannan alusta. Keskellä rakennusta oleva karttapiste ei aina ole saavutettavissa kadulta, joten käytä tarvittaessa manuaalista merkintää. Etäisyys seuraavaan kohteeseen on **linnuntietä**, ei kävelymatka. Tallennus on laite- ja selainkohtainen, ja selaimen tietojen tyhjentäminen voi poistaa sen.

Aiemman 22 kohteen kierroksen käynnit siirtyvät automaattisesti uuteen tallennusversioon. Siegessäulen vanhaa käyntimerkintää ei lasketa mukaan; muiden kohteiden käyntitiedot säilyvät. Alkuperäistä tallennusta ei poisteta.

## Reititys ja tietosuoja

Sovellus käyttää julkista [OSRM:n OpenStreetMap-jalankulkureititystä](https://routing.openstreetmap.de/) (`routed-foot`); API-avainta tai palvelimen asetuksia ei tarvita. Palvelun saatavuus, käyttöehdot ja mahdolliset käyttörajat ovat sen ylläpitäjän hallinnassa. Yhteyden tai palvelun häiriöstä ilmoitetaan eikä suoraa viivaa esitetä kävelyreittinä. Kävelyaika on palvelun arvio ilman pysähdyksiä.

Alkuperäinen järjestys pysyy täsmälleen määriteltynä. Optimoitu vaihtoehto aloittaa Hauptbahnhofista ja käyttää palvelun kävelyetäisyysmatriisia, lähimmän naapurin hakua ja 2-opt-parannusta. Se on heuristinen arvio eikä takaa maailmanlaajuisesti lyhintä reittiä. Algoritmi säilyttää alkuperäisen järjestyksen, jos sen laskettu etäisyys on lyhyempi.

Karttalaatat ladataan OpenStreetMapilta ja reitin kohdekoordinaatit lähetetään reitityspalvelulle. GPS-sijaintia ei lähetetä reitityspalvelulle; Google Maps -linkki avataan vain käyttäjän painikkeesta. Ulkoiset palvelut saavat yhteyden teknisiä tietoja, kuten IP-osoitteen. Reitityspalvelun vaihtaminen edellyttää yhteensopivan jalankulkua tukevan OSRM-palvelun URL-osoitteen muuttamista tiedostossa `src/routing.ts`. Älä lisää yksityisiä API-avaimia selaimeen toimitettavaan koodiin.

Kunkin kohteen lähdelinkit avautuvat tietopaneelista; sijaintipisteet perustuvat OpenStreetMapin kohteisiin. Historiakuvaukset ovat tiivistelmiä, eivät täydellisiä historiikkeja.

import type { Destination } from './types'

type Data = Omit<Destination, 'id' | 'sources'> & { article: string; osm: string }

const data: Data[] = [
  {
    name: 'Berlin Hauptbahnhof', shortName: 'Hauptbahnhof', latitude: 52.5250175, longitude: 13.3694480,
    history: [
      'Berliinin päärautatieasema avattiin vuonna 2006 entisen Lehrter Bahnhofin alueelle. Vanha asema vaurioitui toisessa maailmansodassa ja purettiin myöhemmin. Kylmän sodan aikana rajavyöhyke ja kaupunkia halkonut muuri katkaisivat yhteyksiä lähistöllä.',
      'Uusi lasinen risteysasema syntyi yhdistyneen kaupungin liikenteelliseksi solmukohdaksi. Junat kulkevat useassa tasossa: itä–länsisuunnan raiteet ylittävät pohjois–eteläsuuntaisen tunnelin. Asema kertoo, miten Saksa ja Berliini yhdistivät infrastruktuuriaan vuoden 1990 jälkeen.',
    ],
    today: 'Asemahallissa näkyvät päällekkäiset laituritasot, lasikatto sekä vilkas kauko- ja paikallisjunaliikenne. Spree ja hallintokortteli ovat lyhyen kävelyn päässä.',
    fact: 'Aseman nimi oli suunnittelun aikana Lehrter Bahnhof; nykyinen nimi korostaa sen asemaa koko kaupungin pääasemana.',
    article: 'Berlin_Hauptbahnhof', osm: 'relation/3600565',
  },
  {
    name: 'Bundeskanzleramt (Waschmaschine)', shortName: 'Bundeskanzleramt', latitude: 52.5201946, longitude: 13.3691292,
    history: [
      'Liittokanslerinvirasto on Saksan hallituksen johtamisen keskus. Nykyinen rakennus otettiin käyttöön vuonna 2001, kun yhdistyneen Saksan hallinnon painopiste oli siirtynyt Bonnista takaisin Berliiniin.',
      'Rakennuksen arkkitehtuuri liittyy Spreejoen ylittävään parlamentti- ja hallintorakennusten kokonaisuuteen, jota kutsutaan nimellä Band des Bundes. Kokonaisuus yhdistää entisiä Itä- ja Länsi-Berliinin alueita. Hallituksen päätöksiä valmistellaan virastossa, vaikka itse parlamentti kokoontuu läheisessä Reichstagissa.',
    ],
    today: 'Katso suurta valkoista julkisivua ja sen kaarevia muotoja joen ja Willy-Brandt-Straßen suunnasta. Rakennus on virastokäytössä eikä yleensä avoin vapaaseen vierailuun.',
    fact: 'Berliiniläisten lempinimi Waschmaschine, pesukone, viittaa julkisivun suureen pyöreään aukkoon.',
    article: 'German_Chancellery', osm: 'way/157390075',
  },
  {
    name: 'Paul-Löbe-Haus', shortName: 'Paul-Löbe-Haus', latitude: 52.5201476, longitude: 13.3748004,
    history: [
      'Paul-Löbe-Haus valmistui liittopäivien käyttöön yhdistyneen Saksan uuden hallintoalueen osana. Siellä työskentelevät parlamentin valiokunnat ja monet kansanedustajat. Valiokunnissa lakiesityksiä käsitellään yksityiskohtaisesti ennen parlamentin täysistuntoja.',
      'Talo on nimetty sosiaalidemokraatti Paul Löben mukaan. Hän oli Weimarin tasavallan valtiopäivien puhemies ja natsien vastustaja; kansallissosialistien noustua valtaan hänet vangittiin. Sodan jälkeen hän osallistui uudelleen demokratian rakentamiseen Länsi-Saksassa.',
    ],
    today: 'Pitkä rakennus ja sen lasiset osat näkyvät hyvin Spreen rannalta. Vastapäätä on muita parlamenttirakennuksia; vierailu sisätiloihin edellyttää yleensä järjestettyä ohjelmaa.',
    fact: 'Paul Löbe avasi vuonna 1949 uuden Länsi-Saksan ensimmäisen liittopäivien istunnon ikäpuhemiehenä.',
    article: 'Paul-L%C3%B6be-Haus', osm: 'relation/3349',
  },
  {
    name: 'Reichstagsgebäude', shortName: 'Reichstag', latitude: 52.5186538, longitude: 13.3761015,
    history: [
      'Vuonna 1894 valmistunut valtiopäivätalo on kokenut Saksan historian jyrkät käänteet. Vuonna 1918 sen ikkunasta julistettiin tasavalta. Vuoden 1933 tulipalon jälkeen natsit käyttivät tilannetta hyväkseen perusoikeuksien rajoittamiseen ja vastustajiensa vainoamiseen.',
      'Rakennus vaurioitui pahoin toisen maailmansodan lopussa. Jaetussa Berliinissä se jäi lähelle muuria länsipuolelle. Yhdistymisen jälkeen talo kunnostettiin, ja Saksan liittopäivät aloittivat siellä jälleen työnsä vuonna 1999.',
    ],
    today: 'Platz der Republikilta näkee historiallisen kivijulkisivun ja modernin lasikupolin. Kupoliin pääsy edellyttää ennakkorekisteröintiä; tarkista vierailuehdot liittopäiviltä.',
    fact: 'Lasikupolin kävelyreitiltä voi katsoa alaspäin kohti parlamenttisalia: avoimuus on osa rakennuksen symboliikkaa.',
    article: 'Reichstag_building', osm: 'relation/2201742',
  },
  {
    name: 'Sowjetisches Ehrenmal Tiergarten', shortName: 'Sowjetisches Ehrenmal', latitude: 52.5166949, longitude: 13.3719190,
    history: [
      'Neuvostoliiton sotamuistomerkki pystytettiin vuonna 1945 Berliinin taistelussa kaatuneiden puna-armeijan sotilaiden muistoksi. Taistelu päätti natsi-Saksan vallan Berliinissä, mutta siihen liittyi myös valtavaa inhimillistä kärsimystä sotilaille ja siviileille.',
      'Muistomerkki sijaitsi Berliinin jaon aikana brittiläisellä sektorilla Länsi-Berliinissä. Neuvostosotilaat vartioivat sitä kuitenkin erityisjärjestelyin. Se on samalla hautapaikka, joten alueella on syytä liikkua kunnioittavasti.',
    ],
    today: 'Pylväikköä reunustavat panssarivaunut ja tykit. Takana olevalla puutarha-alueella on sotilaiden hautoja. Kohde sijaitsee Siegessäulen ja Brandenburgin portin välisellä suunnalla.',
    fact: 'Muistomerkki valmistui jo muutamia kuukausia Euroopan sodan päättymisen jälkeen.',
    article: 'Soviet_War_Memorial_(Tiergarten)', osm: 'way/41368167',
  },
  {
    name: 'Brandenburger Tor', shortName: 'Brandenburger Tor', latitude: 52.5162699, longitude: 13.3777034,
    history: [
      'Brandenburgin portti valmistui 1700-luvun lopussa Preussin kuninkaan Fredrik Vilhelm II:n aikana. Antiikin arkkitehtuurista vaikutteita saanut portti on nähnyt keisarikunnan, tasavallan ja diktatuurin sekä tuhoisan maailmansodan.',
      'Vuodesta 1961 Berliinin muuri sulki portin ympäristön rajavyöhykkeeksi. Portista tuli jaetun kaupungin symboli. Muurin avauduttua vuonna 1989 ihmiset kokoontuivat sen luo, ja yhdistymisen jälkeen siitä tuli myös yhtenäisyyden tunnus.',
    ],
    today: 'Portin läpi voi kävellä Pariser Platzin ja Tiergartenin välillä. Katso pylväitä, portin päällä olevaa nelivaljakkoa ja aukiota ympäröiviä jälleenrakennettuja rakennuksia.',
    fact: 'Napoleon vei portin nelivaljakon Pariisiin vuonna 1806; se palautettiin Berliiniin vuonna 1814.',
    article: 'Brandenburg_Gate', osm: 'way/518071791',
  },
  {
    name: 'Denkmal für die ermordeten Juden Europas', shortName: 'Holokaustin muistomerkki', latitude: 52.5138731, longitude: 13.3787346,
    history: [
      'Euroopan murhattujen juutalaisten muistomerkki avattiin vuonna 2005 natsi-Saksan ja sen yhteistyökumppanien murhaamien juutalaisten muistoksi. Holokaustissa surmattiin kuusi miljoonaa juutalaista eri puolilla Eurooppaa.',
      'Peter Eisenmanin suunnittelema muistomerkki ei esitä tapahtumia kirjaimellisesti: sen säännöllinen, mutta korkeudeltaan vaihteleva kivikenttä jättää tilaa yksilölliselle kokemukselle. Maanalainen tietokeskus kertoo vainosta, perheistä ja uhreista historiallisten dokumenttien avulla.',
    ],
    today: 'Kävele rauhallisesti betonipaasien välissä ja huomaa maanpinnan sekä kivien korkeuden vaihtelu. Tietokeskuksen sisäänkäynti on muistomerkin reunalla; tarkista aukioloajat etukäteen.',
    fact: 'Kentässä on 2 711 erikorkuista betonipaasia eli steelaa.',
    article: 'Memorial_to_the_Murdered_Jews_of_Europe', osm: 'way/172234733',
  },
  {
    name: 'Führerbunker – historiallinen sijainti', shortName: 'Führerbunker', latitude: 52.5124742, longitude: 13.3809333,
    history: [
      'Tällä alueella sijaitsi valtakunnankanslian maanalainen bunkkerikompleksi. Adolf Hitler vietti siellä natsi-Saksan viimeiset viikot ja kuoli itsemurhaan 30. huhtikuuta 1945 Berliinin taistelun aikana. Euroopan sota päättyi pian tämän jälkeen.',
      'Bunkkeri liittyy diktatuurin ja sen aloittaman tuhoisan sodan viimeisiin hetkiin. Sodan jälkeen rakennelmaa purettiin ja täytettiin vaiheittain. Alue rakennettiin uudelleen, eikä paikalla ole yleisölle avointa bunkkeria.',
    ],
    today: 'Nykyinen ympäristö on tavallista asuin- ja pysäköintialuetta. Historiasta kertoo opastaulu; kunnioita lähialueen asukkaita ja vältä etsimästä sisäänkäyntiä, jota ei ole.',
    fact: 'Alueen vaatimaton opastus pyrkii kertomaan historiasta tekemättä paikasta diktatuurin ihailun kohdetta.',
    article: 'F%C3%BChrerbunker', osm: 'node/271767774',
  },
  {
    name: 'Potsdamer Platz', shortName: 'Potsdamer Platz', latitude: 52.5098014, longitude: 13.3755898,
    history: [
      'Potsdamer Platz oli ennen toista maailmansotaa yksi Berliinin vilkkaimmista liikenteen ja kaupunkielämän keskuksista. Pommitukset ja sodan loppuvaiheen taistelut vaurioittivat aluetta pahoin.',
      'Sodan jälkeen aukio jäi miehityssektorien rajalle. Vuonna 1961 rakennettu muuri ja rajavyöhyke jakoivat paikan vuosikymmeniksi. Yhdistymisen jälkeen valtavasta rakennustyömaasta syntyi uusi toimistojen, kauppojen ja kulttuurin kaupunginosa, jonka arkkitehtuuri kertoo 1990-luvun jälleenrakentamisen tavoitteista.',
    ],
    today: 'Aukiolla ja sen ympärillä näkee moderneja korkeita rakennuksia, rautatieaseman ja muurin historiaa esitteleviä merkintöjä. Lähistöllä on säilytettyjä muurin osia.',
    fact: 'Paikalle pystytettiin vuonna 1924 yksi Euroopan varhaisista liikennevalotorneista; nykyinen torni on jäljennös.',
    article: 'Potsdamer_Platz', osm: 'relation/3200536',
  },
  {
    name: 'Detlev-Rohwedder-Haus', shortName: 'Detlev-Rohwedder-Haus', latitude: 52.5086330, longitude: 13.3835559,
    history: [
      'Valtava virastotalo rakennettiin 1930-luvulla natsi-Saksan ilmailuministeriölle, jota johti Hermann Göring. Rakennuksen mittakaava ilmentää diktatuurin hallintoarkkitehtuuria. Se säilyi sodasta paremmin kuin suuri osa ympäristöstä.',
      'Sodan jälkeen rakennusta käyttivät Itä-Saksan viranomaiset. Kesäkuussa 1953 lähistölle kokoontui mielenosoittajia DDR:n hallintoa vastaan; kansannousu tukahdutettiin neuvostojoukkojen avulla. Yhdistymisen jälkeen rakennus liittyi valtionomaisuuden yksityistämiseen ja sai nykyisen nimensä.',
    ],
    today: 'Rakennuksessa toimii Saksan valtiovarainministeriö. Ulkoa voi tarkastella pitkää julkisivua ja 17. kesäkuuta 1953 muistavaa historiallista ympäristöä.',
    fact: 'Nimi kunnioittaa Treuhandanstaltin johtajaa Detlev Karsten Rohwedderia, joka murhattiin vuonna 1991.',
    article: 'Detlev-Rohwedder-Haus', osm: 'relation/280070',
  },
  {
    name: 'Berliner Mauer – Niederkirchnerstraße', shortName: 'Berliinin muuri', latitude: 52.5073563, longitude: 13.3853662,
    history: [
      'Berliinin muuri rakennettiin vuonna 1961 estämään ihmisten lähtö DDR:stä Länsi-Berliiniin. Niederkirchnerstraßen kohdalla se erotti Itä-Berliinin Kreuzbergin kaupunginosasta. Rajajärjestelmään kuului paljon muutakin kuin yksittäinen betoniseinä: esteitä, valvontaa ja vartiointia.',
      'Muuri avautui 9. marraskuuta 1989. Suurin osa siitä purettiin myöhemmin, mutta tällä kadulla säilytettiin pitkä osa muistuttamaan kaupungin jaosta ja niiden ihmisten kohtaloista, jotka yrittivät ylittää rajan.',
    ],
    today: 'Kadun varrella on rosoinen, osittain vaurioitunut muurin jakso Topographie des Terrors -alueen reunassa. Alueen opasteet auttavat hahmottamaan sekä muurin että aiemman natsihallinnon historian.',
    fact: 'Muurin itä- ja länsipuolen ympäristöt erosivat: länsipuolella se oli monin paikoin graffitien peittämä, itäpuolella rajavyöhykkeelle ei päässyt vapaasti.',
    article: 'Berlin_Wall', osm: 'way/591200192',
  },
  {
    name: 'Topographie des Terrors', shortName: 'Topographie des Terrors', latitude: 52.5062137, longitude: 13.3841548,
    history: [
      'Tällä paikalla sijaitsivat natsihallinnon terrorikoneiston keskeiset virastot, muun muassa Gestapon päämaja sekä SS:n ja turvallisuuspoliisin toimintoja. Näissä organisaatioissa suunniteltiin ja toimeenpantiin vainoa, vangitsemisia ja murhia Saksassa ja miehitetyillä alueilla.',
      'Sodan tuhojen ja rakennusten purkamisen jälkeen tontin historiaa selvitettiin uudelleen. Nykyinen dokumentaatiokeskus käsittelee erityisesti tekijöitä, instituutioita ja niiden uhrien kohtaloita. Ulkonäyttely tuo esiin myös paikan rakennusten perustuksia.',
    ],
    today: 'Vieraile dokumentaatiokeskuksen sisä- ja ulkonäyttelyissä sekä katso kadun varrella säilynyttä Berliinin muuria. Näyttelyiden aukioloajat kannattaa tarkistaa etukäteen.',
    fact: 'Sama tontti kertoo kahdesta diktatuurista: natsien turvallisuuskoneistosta ja myöhemmästä DDR:n rajajärjestelmästä.',
    article: 'Topography_of_Terror', osm: 'way/24368681',
  },
  {
    name: 'Checkpoint Charlie', shortName: 'Checkpoint Charlie', latitude: 52.5074321, longitude: 13.3903814,
    history: [
      'Checkpoint Charlie oli kylmän sodan tunnettu rajanylityspaikka Friedrichstraßella Yhdysvaltain ja Neuvostoliiton sektorien välissä. Sitä käyttivät erityisesti liittoutuneiden edustajat ja ulkomaalaiset; tavallisten itäsaksalaisten vapaa matkustaminen länteen oli estetty.',
      'Lokakuussa 1961 yhdysvaltalaiset ja neuvostoliittolaiset panssarivaunut seisoivat rajalla vastakkain. Tilanne laukesi ilman laukaustenvaihtoa, mutta havainnollisti jakautuneen kaupungin ja ydinasevaltojen välisiä jännitteitä.',
    ],
    today: 'Risteyksessä näkyy jäljennetty vartijakoppi ja rajapaikan historiaa käsitteleviä opasteita. Vilkas kaupallinen ympäristö eroaa kylmän sodan rajavyöhykkeestä.',
    fact: 'Charlie on Naton foneettisten aakkosten C-kirjain; läntisillä liittoutuneilla oli myös Alpha- ja Bravo-nimiset tarkastuspisteet.',
    article: 'Checkpoint_Charlie', osm: 'node/417346627',
  },
  {
    name: 'Gendarmenmarkt – Deutscher Dom ja Französischer Dom', shortName: 'Gendarmenmarkt', latitude: 52.5135698, longitude: 13.3922970,
    history: [
      'Gendarmenmarktin aukio rakentui Berliinin kasvaessa 1600- ja 1700-luvuilla. Sen reunojen saksalainen ja ranskalainen kirkko kertovat eri seurakunnista; ranskalainen seurakunta muodostui muun muassa uskonnollista vainoa paenneista hugenoteista.',
      'Kahden kirkon tornit ja keskellä oleva konserttitalo muodostavat tunnetun arkkitehtonisen kokonaisuuden. Rakennukset vaurioituivat toisessa maailmansodassa ja ne kunnostettiin myöhemmin. Aukio kertoo sekä muuttoliikkeestä että kaupungin pitkästä kulttuurihistoriasta.',
    ],
    today: 'Aukiolla voit vertailla vastakkaisten kupolitornien julkisivuja ja Konzerthausin portaita. Rakennusten käyttö ja mahdolliset työmaat voivat vaikuttaa vierailuun.',
    fact: 'Nimien Dom-sana viittaa tässä kupoliin tai torniin, eikä kumpikaan rakennus ole nykymerkityksessä piispan katedraali.',
    article: 'Gendarmenmarkt', osm: 'way/844740667',
  },
  {
    name: 'Bebelplatz – Bücherverbrennung ja Juristische Fakultät', shortName: 'Bebelplatz', latitude: 52.5164872, longitude: 13.3938262,
    history: [
      'Bebelplatzilla natsien tukemat opiskelijat ja muut osallistujat polttivat 10. toukokuuta 1933 tuhansia kirjoja. Kohteina olivat kirjailijat ja ajatukset, joita natsit pitivät ei-toivottuina, mukaan lukien monet juutalaiset ja poliittiset vastustajat.',
      'Kirjarovio oli näkyvä osa sananvapauden tukahduttamista ja akateemisen elämän alistamista diktatuurille. Aukion ympäristössä on valistusajan rakennuksia, ja Humboldt-yliopiston oikeustieteellinen tiedekunta toimii entisessä kuninkaallisessa kirjastorakennuksessa.',
    ],
    today: 'Etsi aukion pinnasta lasilevy, jonka alla näkyy Micha Ullmanin tyhjiä kirjahyllyjä esittävä muistomerkki. Katso myös oopperataloa ja oikeustieteellisen tiedekunnan rakennusta.',
    fact: 'Muistomerkin yhteydessä lainataan Heinrich Heinen vuonna 1821 kirjoittamia sanoja kirjojen ja lopulta ihmisten polttamisesta.',
    article: 'Bebelplatz', osm: 'way/205728152',
  },
  {
    name: 'Neue Wache', shortName: 'Neue Wache', latitude: 52.5179046, longitude: 13.3955371,
    history: [
      'Karl Friedrich Schinkelin suunnittelema Neue Wache valmistui 1800-luvun alussa alun perin vartiotaloksi. Sen käyttötarkoitus on sittemmin muuttunut useita kertoja, ja rakennus on ollut muistopaikka eri poliittisten järjestelmien aikana.',
      'Nykyisin se on Saksan liittotasavallan keskeinen sodan ja tyrannian uhrien muistomerkki. Muistaminen ulottuu sotilaiden lisäksi vainottuihin ja siviiliuhreihin. Rakennuksen hiljainen sisätila kutsuu pohtimaan sodan seurauksia ilman voittajien juhlistamista.',
    ],
    today: 'Unter den Lindenin varrella näkyvät klassistinen pylväikkö ja päätykolmio. Sisällä on veistos äidistä kuolleen poikansa kanssa avoimen kattoaukon alla.',
    fact: 'Sisätilan veistos perustuu Käthe Kollwitzin teokseen Äiti ja kuollut poika; Kollwitz menetti poikansa ensimmäisessä maailmansodassa.',
    article: 'Neue_Wache', osm: 'way/24240381',
  },
  {
    name: 'Museumsinsel', shortName: 'Museumsinsel', latitude: 52.5180166, longitude: 13.3993794,
    history: [
      'Museosaari on Spreen saaren pohjoisosaan muodostunut museokokonaisuus. Sen museot rakennettiin vaiheittain 1800- ja 1900-luvuilla, kun eurooppalaiset hallitsijat ja tutkijat perustivat julkisia kokoelmia taiteen ja antiikin esittämiseen.',
      'Museot vaurioituivat toisessa maailmansodassa, ja niiden kunnostus sekä uudistaminen on jatkunut pitkään. Kokoelmat herättävät myös kysymyksiä esineiden alkuperästä ja siirtomaa-ajan perinnöstä. Museumsinsel liitettiin Unescon maailmanperintöluetteloon vuonna 1999.',
    ],
    today: 'Saarella sijaitsevat muun muassa Altes Museum, Neues Museum, Alte Nationalgalerie, Bode-Museum ja Pergamonmuseum. Osa tiloista voi olla remontin vuoksi suljettuna.',
    fact: 'Museosaari ei ole erillinen luonnonsaari, vaan Spreen ja Kupfergrabenin rajaaman saaren pohjoisosa.',
    article: 'Museum_Island', osm: 'node/12070800377',
  },
  {
    name: 'Berliner Dom', shortName: 'Berliner Dom', latitude: 52.5190822, longitude: 13.4010942,
    history: [
      'Berliinin nykyinen tuomiokirkko valmistui vuonna 1905 Saksan keisarikunnan aikana. Se rakennettiin Hohenzollernien hallitsijasuvun edustuskirkoksi ja protestanttisen seurakunnan käyttöön vanhemman kirkon paikalle.',
      'Toisen maailmansodan pommitukset vaurioittivat kirkkoa pahoin. Jälleenrakentaminen kesti vuosikymmeniä, ja kupolin ulkomuotoa yksinkertaistettiin. Rakennus kertoo keisarillisen Berliinin kunnianhimosta sekä sodanjälkeisestä pitkästä korjaustyöstä.',
    ],
    today: 'Lustgartenista näkee suuren kupolin ja koristeellisen julkisivun. Kirkossa järjestetään jumalanpalveluksia ja konsertteja; sisätiloihin ja näköalatasanteelle pääsy riippuu lipuista ja aukioloajoista.',
    fact: 'Nimestään huolimatta Berliner Dom ei ole katolisen piispan katedraali, vaan protestanttinen kirkko.',
    article: 'Berlin_Cathedral', osm: 'way/313670734',
  },
  {
    name: 'Marx-Engels-Forum', shortName: 'Marx-Engels-Forum', latitude: 52.5185014, longitude: 13.4047672,
    history: [
      'Marx-Engels-Forum avattiin vuonna 1986 DDR:n pääkaupungissa. Keskusveistokset esittävät Karl Marxia ja Friedrich Engelsiä, joiden ajatuksiin Itä-Saksan hallinto vetosi. Heidän työnsä vaikutti voimakkaasti 1800- ja 1900-lukujen yhteiskunnallisiin liikkeisiin.',
      'DDR:n valtio käytti Marxin ja Engelsin perintöä oman valtansa oikeuttamiseen, vaikka todellinen yhteiskunta oli yksipuoluehallinnon ja valvonnan leimaama. Yhdistymisen jälkeen muistomerkin säilyttämisestä ja paikasta on keskusteltu osana kaupungin ristiriitaista muistia.',
    ],
    today: 'Puistomaisella alueella näkee istuvan Marxin ja seisovan Engelsin patsaat sekä muita historialliseen kokonaisuuteen kuuluvia teoksia. Ympäristöä on muutettu rakennustöiden aikana.',
    fact: 'Patsaat ovat suosittu kohtaamis- ja kuvauspaikka, vaikka ne ovat myös kiistanalainen DDR-ajan muistomerkki.',
    article: 'Marx-Engels-Forum', osm: 'way/16872940',
  },
  {
    name: 'Alexanderplatz', shortName: 'Alexanderplatz', latitude: 52.5219814, longitude: 13.4136358,
    history: [
      'Alexanderplatz on ollut markkina- ja liikennepaikka sekä Berliinin itäisen keskustan solmukohta. Se sai nimensä Venäjän keisari Aleksanteri I:n vierailun yhteydessä vuonna 1805. Aukio ja sen lähialue vaurioituivat pahasti toisessa maailmansodassa.',
      'DDR rakensi alueen uudelleen moderniksi sosialistisen pääkaupungin keskukseksi. Marraskuun 4. päivänä 1989 suuri mielenosoitus kokosi aukiolle ihmisiä vaatimaan vapauksia ja uudistuksia. Vain viisi päivää myöhemmin muurin rajanylityspaikat avautuivat.',
    ],
    today: 'Aukiolla on vilkas joukkoliikenteen solmukohta, tavarataloja ja maailmankello. Ympäristössä näkyy sekä DDR-ajan rakennuksia että myöhempää rakentamista.',
    fact: 'Urania-maailmankello näyttää eri aikavyöhykkeiden aikoja, ja siitä tuli tunnettu tapaamispaikka.',
    article: 'Alexanderplatz', osm: 'way/783052052',
  },
  {
    name: 'Berliner Fernsehturm', shortName: 'Fernsehturm', latitude: 52.5208279, longitude: 13.4094214,
    history: [
      'Berliinin televisiotorni avattiin vuonna 1969 DDR:n 20-vuotisjuhlien aikaan. Se suunniteltiin sekä radiolähetysten välitykseen että näkyväksi modernin sosialistisen pääkaupungin maamerkiksi.',
      'Torni näkyy yli entisen kaupunginrajan ja on säilynyt yhdistyneen Berliinin tunnuksena. Sen korkeus, tekninen käyttötarkoitus ja julkinen näköalakerros yhdistävät infrastruktuurin kaupunkikuvaan. Torni tarjoaa reitin lopuksi näkymän alueille, joiden historiaan kävelyllä on tutustuttu.',
    ],
    today: 'Tornin jalalta näkee pallomaisen näköalakerroksen ja antennin. Näköalatasanteelle ja ravintolaan tarvitaan yleensä lippu; tarkista aukiolo ja esteettömyys palveluntarjoajalta.',
    fact: 'Auringonvalo muodostaa tornin palloon usein ristinmuotoisen heijastuksen, jota alettiin kutsua paavin kostoksi.',
    article: 'Fernsehturm_Berlin', osm: 'way/556435241',
  },
]

const historicalContext = [
  'Lehrter Bahnhof avattiin jo vuonna 1871, jolloin rautatiet yhdistivät nopeasti kasvavaa pääkaupunkia muihin kaupunkeihin. Nykyinen asema rakennettiin uuden pohjois–eteläsuuntaisen yhteyden ympärille. Myös asemaa ympäröivä alue on muuttunut: entisille ratapihoille on noussut uusia kortteleita, ja hallintorakennukset ulottuvat joen etelärannalle.',
  'Saksan liittokansleri johtaa liittohallitusta ja määrittää hallituspolitiikan suuntaviivat. Kansleria tukevat viraston asiantuntijat ja hallinnollinen henkilökunta. Sijainti aivan parlamentin tuntumassa muistuttaa hallituksen ja kansan valitsemien liittopäivien välisestä suhteesta: demokratian toiminta tarvitsee sekä päätöksentekoa että parlamentaarista valvontaa.',
  'Valiokuntatyö on usein vähemmän näkyvää kuin täysistunnot, mutta sillä on tärkeä merkitys: eri puolueiden edustajat perehtyvät asioihin, kuulevat asiantuntijoita ja valmistelevat päätöksiä. Rakennuksen avoimet ja läpinäkyvät osat kuuluvat yhdistymisen jälkeiseen arkkitehtuuriin, jolla haluttiin antaa parlamentaariselle työlle näkyvä paikka kaupunkikuvassa.',
  'Arkkitehti Norman Fosterin uudistuksessa vanhan rakennuksen kerroksia säilytettiin uuden tekniikan ja lasikupolin rinnalla. Ulkoseinän teksti Dem Deutschen Volke, ”Saksan kansalle”, on peräisin keisarikunnan ajalta. Sen merkitys on muuttunut sitä mukaa, kun rakennusta käyttäneet poliittiset järjestelmät ovat vaihtuneet.',
  'Berliinin valtaus maksoi lukemattomien ihmisten hengen ja merkitsi samalla Euroopassa natsihallinnon kukistumista. Sodan jälkeen entisten liittolaisten suhteet kiristyivät kylmäksi sodaksi. Muistomerkin olemassaolo länsisektorilla osoittaa, että sodan aikaiset sopimukset ja muistamisen käytännöt jatkuivat poliittisesta vastakkainasettelusta huolimatta.',
  'Portti sijaitsee Unter den Linden -bulevardin länsipäässä. Sen kautta kulkeminen oli aikoinaan osa kaupungin liikennettä, mutta muurin vuosina suora yhteys kaupunginpuoliskojen välillä oli poikki. Nykyinen avoin jalankulkualue tekee näkyväksi muutoksen, joka seurasi rajajärjestelmän purkamista.',
  'Muistomerkin syntyä edelsi pitkä julkinen keskustelu siitä, miten joukkomurhaa pitäisi muistaa Saksan pääkaupungissa. Tietokeskuksen henkilötarinat täydentävät abstraktia kivikenttää ja muistuttavat, että tilastojen takana oli yksittäisiä ihmisiä, perheitä ja kokonaisia yhteisöjä, joiden elämä tuhottiin.',
  'Bunkkeri oli yhteydessä vanhempaan maanalaiseen suojaan valtakunnankanslian läheisyydessä. Huhtikuussa 1945 kaupunki oli jo saarrettu ja tuhansia ihmisiä kuoli taisteluissa. Paikan historiaa on mielekästä tarkastella osana natsien vallan, vainon ja hyökkäyssodan kokonaisuutta, ei irrallisena johtajiensa viimeisten päivien tarinana.',
  'Ennen sotaa ympäristössä oli hotelleja, ravintoloita, teattereita ja tärkeitä liikenneväyliä. Muurin aikana tämän kaupunkikeskuksen paikalla oli suuri tyhjä rajavyöhyke. Uuden alueen rakentaminen herätti keskustelua muun muassa siitä, kenelle jälleen yhdistyneen keskustan tilaa suunnitellaan ja miten menneisyys pidetään näkyvissä.',
  'Vuoden 1953 protestit alkoivat työoloihin ja tuotantotavoitteisiin kohdistuneesta tyytymättömyydestä ja laajenivat poliittisiksi vaatimuksiksi monilla DDR:n paikkakunnilla. Rakennuksen eri käyttötarkoitukset tarjoavat poikkeuksellisen näkymän siihen, kuinka sama virastotalo palveli peräkkäin erilaisia valtioita ja vallankäytön muotoja.',
  'Muurin rakentaminen erotti perheitä, ystäviä ja työpaikkoja toisistaan. Rajalla kuoli ihmisiä pakoja yrittäessään, ja monet muut joutuivat pidätetyiksi. Säilynyt betoniosa ei yksin näytä koko rajajärjestelmän leveyttä; sen ympärillä olleet valvotut alueet ovat suurelta osin kadonneet.',
  'Gestapon päämajan yhteydessä toimi vankila, jossa kuulusteltiin ja pidettiin natsihallinnon vastustajia ja muita vainottuja. Keskuksen dokumentit auttavat ymmärtämään, ettei terrori ollut vain yksittäisten johtajien toimintaa: se perustui virastoihin, määräyksiin ja monien ihmisten osallistumiseen.',
  'Rajanylityspaikan säännöt vaihtelivat matkustajan kansalaisuuden ja aseman mukaan. Muuri ja tarkastukset eivät olleet vain suurvaltapolitiikkaa: ne vaikuttivat ihmisten mahdollisuuksiin tavata läheisiään ja liikkua omassa kaupungissaan. Paikan muistaminen auttaa erottamaan historiallisen rajajärjestelyn nykyisistä jäljennöksistä.',
  'Preussin hallitsijat kutsuivat 1600-luvulla alueelle Ranskasta paenneita protestantteja. Tulokkaat toivat mukanaan ammatteja, kieliä ja uskonnollisia perinteitä, jotka vaikuttivat Berliinin kehitykseen. Aukion rakennuksia on sen jälkeen korjattu ja käytetty uudelleen, joten nykyinen näkymä yhdistää usean eri aikakauden.',
  'Samankaltaisia kirjarovioita järjestettiin myös muualla Saksassa. Niiden tarkoitus oli julkisesti erotella hyväksytyiksi ja ei-toivotuiksi katsotut ajatukset. Kirjojen hävittäminen liittyi laajempaan vainoon: kirjailijoita ja tutkijoita erotettiin, heidän työtään kiellettiin ja monet joutuivat maanpakoon tai joutuivat vainon uhreiksi.',
  'Muistopaikan historia heijastaa muuttuvia käsityksiä siitä, ketä ja miten muistetaan. DDR:n aikana rakennus oli fasismin ja militarismin uhrien muistomerkki. Yhdistymisen jälkeen sisätila järjestettiin uudelleen, ja nykyinen Kollwitzin teokseen perustuva veistos sijoitettiin sinne vuonna 1993.',
  'Kokonaisuuden rakennukset ovat syntyneet eri arkkitehtien ja museoajatusten pohjalta. Altes Museum avattiin vuonna 1830, ja myöhemmät museot laajensivat kokoelmien esittelyä. Saaren historian rinnalla on tärkeää tarkastella esineiden hankintatapoja ja niiden yhteyttä alkuperäisiin yhteisöihin.',
  'Kirkon historia liittyy läheisesti vastapäisen kuninkaallisen palatsin ja Preussin hallitsijoiden historiaan. Hohenzollernien hautakrypta on merkittävä osa rakennusta, vaikka sen vierailumahdollisuudet voivat vaihdella kunnostusten vuoksi. Ympäröivä Lustgarten on puolestaan toiminut eri aikakausina puistona, paraatialueena ja kokoontumispaikkana.',
  'Marx ja Engels analysoivat teollistumisen ajan taloutta ja yhteiskuntaa. He eivät itse nähneet 1900-luvun valtioita, jotka myöhemmin vetosivat heidän ajatuksiinsa. Veistosryhmää voi siksi tarkastella sekä heidän aatehistoriansa että DDR:n oman historian ja julkisen muistamisen näkökulmasta.',
  'Vuoden 1989 mielenosoituksessa puhujat vaativat muun muassa sananvapautta ja demokraattisia muutoksia. Tapahtuma oli osa laajempaa rauhanomaista liikettä, joka haastoi DDR:n johdon. Aukion nykyinen kiireinen kaupunkielämä voi peittää alleen sen, miten keskeinen näyttämö se oli tuolle poliittiselle murrokselle.',
  'DDR:n johdolle torni oli myös kilpailun ja kansainvälisen näkyvyyden symboli kylmän sodan aikana. Näköalasta voi hahmottaa, kuinka lähellä toisiaan Berliinin hallintokortteli, historiallinen keskusta ja entiset rajalinjat sijaitsevat. Kaupunkikuvan moninaiset kerrokset kertovat kuitenkin hyvin erilaisista aikakausista.',
]

const institutions = [
  'https://www.visitberlin.de/en/berlin-central-station', 'https://www.bundestag.de/en/visittheBundestag', 'https://www.bundestag.de/en/parliament/buildings/paul_loebe_building/loebe_building-197648',
  'https://www.bundestag.de/en/visittheBundestag', 'https://www.visitberlin.de/en',
  'https://www.visitberlin.de/en/brandenburg-gate', 'https://www.visitberlin.de/en/memorial-murdered-jews-europe', 'https://www.topographie.de/en/topography-of-terror/',
  'https://www.visitberlin.de/en/potsdamer-platz', 'https://www.hdg.de/lemo/', 'https://www.berlin.de/mauer/en/history/',
  'https://www.topographie.de/en/topography-of-terror/', 'https://www.visitberlin.de/en/checkpoint-charlie', 'https://www.visitberlin.de/en/gendarmenmarkt',
  'https://www.visitberlin.de/en/bebelplatz', 'https://www.stiftung-denkmal.de/en/', 'https://www.visitberlin.de/en/museum-island',
  'https://www.visitberlin.de/en/berlin-cathedral', 'https://www.hdg.de/lemo/', 'https://www.visitberlin.de/en/alexanderplatz', 'https://www.visitberlin.de/en',
]

export const destinations: Destination[] = data.map(({ article, osm, ...destination }, index) => ({
  ...destination,
  history: [...destination.history, historicalContext[index]],
  id: index + 1,
  sources: [
    { label: 'Historia: Wikipedia', url: `https://${index === 2 ? 'de' : 'en'}.wikipedia.org/wiki/${article}` },
    { label: 'Lisätietoa: virallinen lähde', url: institutions[index] },
    { label: 'Sijainti: OpenStreetMap', url: `https://www.openstreetmap.org/${osm}` },
  ],
}))

export interface ExtraDestination {
  id: string
  name: string
  description: string
  latitude: number
  longitude: number
  address?: string
  note?: string
  sourceUrl: string
  sourceLabel: string
}

export const extraDestinations: ExtraDestination[] = [
  {
    id: 'siegessaeule', name: 'Siegessäule',
    description: 'Voitonpylväs pystytettiin alun perin 1800-luvulla Preussin sotilaallisten voittojen muistomerkiksi. Sen huipulla oleva kullattu Victoria-hahmo liittyy Tanskaa, Itävaltaa ja Ranskaa vastaan käytyjen sotien aikakauteen sekä Saksan keisarikunnan syntyyn. Pylväs seisoi aluksi lähempänä valtiopäivätaloa. Natsihallinto siirsi sen nykyiselle Großer Stern -liikenneympyrälle 1930-luvulla osana suurisuuntaisia pääkaupunkisuunnitelmiaan. Muistomerkki säilyi toisessa maailmansodassa ja jäi myöhemmin Länsi-Berliiniin. Alkuperäinen sijainti korosti yhteyttä Preussin sotilaallisen vallan ja uuden Saksan keisarikunnan välillä. Pylvään koristeissa sotasaalista käytettiin voiton esittämiseen. Nykyinen sijainti muistuttaa myös siitä, kuinka natsien suunnittelijat pyrkivät muokkaamaan kaupunkia näyttävien akselien ja massatapahtumien tarpeisiin.',
    latitude: 52.5145082, longitude: 13.3501108,
    note: 'Pylväs kohoaa Tiergartenin puiden keskeltä. Liikenneympyrän keskelle pääsee turvallisesti alikulkutunneleita pitkin, ja portaita pitkin voi nousta näköalatasanteelle aukioloaikoina. Victoria-patsasta kutsutaan berliiniläisittäin nimellä Goldelse, ”kultainen Else”.',
    sourceUrl: 'https://en.wikipedia.org/wiki/Berlin_Victory_Column', sourceLabel: 'Historia: Wikipedia',
  },
  {
    id: 'kudamm', name: "Kurfürstendamm (Ku'damm)",
    description: 'Berliinin kuuluisa ostosbulevardi ja länsipuolen kaupallinen keskusta.',
    latitude: 52.5012777, longitude: 13.3178396,
    sourceUrl: 'https://www.openstreetmap.org/way/1100788244', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'kadewe', name: 'KaDeWe (Kaufhaus des Westens)',
    description: 'Yksi Euroopan tunnetuimmista tavarataloista. Erityisesti ruokakerros on vierailun arvoinen.',
    latitude: 52.5015753, longitude: 13.3410035,
    sourceUrl: 'https://www.openstreetmap.org/way/60541581', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'freie-universitat', name: 'Jussin yliopisto',
    description: 'Freie Universität Berlinin pääkampus Dahlemissa.',
    latitude: 52.4516783, longitude: 13.2887411,
    address: 'Rostlaube, Habelschwerdter Allee 45, 14195 Berlin',
    sourceUrl: 'https://www.openstreetmap.org/relation/32590', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'olympiastadion', name: 'Olympiastadion Berlin',
    description: 'Vuoden 1936 olympialaisia varten rakennettu historiallinen olympiastadion.',
    latitude: 52.5145846, longitude: 13.2398144,
    sourceUrl: 'https://www.openstreetmap.org/way/38862723', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'east-side-gallery', name: 'East Side Gallery',
    description: 'Berliinin muurin pitkä säilynyt osuus, jonka seinämaalauksista on tullut maailmankuuluja.',
    latitude: 52.5044542, longitude: 13.4408392,
    sourceUrl: 'https://www.openstreetmap.org/relation/6807791', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'raw', name: 'Täällä Jussi bailasi Erasmus-vaihdossa',
    description: 'RAW-Gelände on Warschauer Straßen lähellä sijaitseva tunnettu yöelämän, klubien, baarien, katutaiteen ja vaihtoehtoisen kulttuurin keskus.',
    latitude: 52.5070127, longitude: 13.4543002,
    sourceUrl: 'https://www.openstreetmap.org/way/130277322', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'mauerpark-market', name: 'Mauerpark Flea Market',
    description: 'Suosittu sunnuntaikirpputori, jossa myydään vintage-tuotteita, vaatteita, designia ja muuta tavaraa.',
    latitude: 52.5415157, longitude: 13.4023137,
    note: 'Kirpputori järjestetään sunnuntaisin, yleensä klo 10–18. Ajat voivat muuttua.',
    sourceUrl: 'https://www.berlin.de/en/shopping/markets/flea-markets/1998222-2983302-flea-market-at-mauerpark.en.html',
    sourceLabel: 'Aukioloajat: Berlin.de',
  },
  {
    id: 'wall-memorial', name: 'Gedenkstätte Berliner Mauer',
    description: 'Bernauer Straßen varrella sijaitseva Berliinin muurin virallinen muistopaikka ja ulkoilmamuseo.',
    latitude: 52.5375133, longitude: 13.3946755,
    note: 'Sijaitsee lähellä Mauerparkia.',
    sourceUrl: 'https://www.openstreetmap.org/relation/14375945', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'mustafas', name: "Mustafa's Gemüse Kebap",
    description: 'Berliinin kuuluisa kebabkoju, joka tunnetaan erityisesti kasvis- ja kanakebabeistaan. Vierailuun voi liittyä (Jussin terkut: AINA LIITTYY) jonottamista.',
    latitude: 52.493485, longitude: 13.3885619,
    address: 'Mehringdamm 33, 10961 Berlin',
    sourceUrl: 'https://mustafas.de/', sourceLabel: 'Nykyinen osoite: Mustafa’s',
  },
  {
    id: 'eberswalder', name: 'Eberswalder Straße – pieni ostosalue',
    description: 'Prenzlauer Bergin viihtyisä alue, jossa on pieniä putiikkeja, kahviloita, vintage-kauppoja ja ravintoloita. Läheiset Kastanienallee ja Oderberger Straße kuuluvat samaan kiinnostavaan alueeseen.',
    latitude: 52.5410403, longitude: 13.4114305,
    sourceUrl: 'https://www.openstreetmap.org/way/370361883', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'tempelhofer-feld', name: 'Tempelhofer Feld',
    description: 'Entinen Tempelhofin lentokenttä, jonka kiitotiet ja laajat avoimet alueet ovat nykyään suosittu kaupunkipuisto.',
    latitude: 52.4744192, longitude: 13.4026007,
    sourceUrl: 'https://www.openstreetmap.org/relation/7317281', sourceLabel: 'Sijainti: OpenStreetMap',
  },
  {
    id: 'charlottenburg', name: 'Schloss Charlottenburg',
    description: 'Preussilainen kuninkaanlinna ja sen kaunis puisto. Erilainen historiallinen nähtävyys kuin Berliinin keskustan sotahistorialliset kohteet.',
    latitude: 52.5206424, longitude: 13.2927104,
    sourceUrl: 'https://www.openstreetmap.org/way/186517395', sourceLabel: 'Sijainti: OpenStreetMap',
  },
]

export const nearbyStreets: { name: string; coordinates: [number, number][] }[] = [
  { name: 'Kastanienallee', coordinates: [[52.5401628, 13.4113781], [52.5399557, 13.4111650]] },
  { name: 'Oderberger Straße', coordinates: [[52.5378696, 13.4115730], [52.5380549, 13.4110697], [52.5382936, 13.4104474], [52.5385165, 13.4098588]] },
]

export type MapFilter = 'tour' | 'extra' | 'all'

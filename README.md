# KontrollRadar - Ruter Billettkontrollvarsler
## Introduksjon
Denne nettsiden er et samarbeidsprosjekt gjort i kontekst av investoruker der målet er å lage og utvikle et produkt som kan hjelpe unge i Oslo. Hensikten med denne nettsiden, MVP, er å
vise et kart over hele Oslo med markører over alle buss-stoppene, der brukeren kan markere hvilke buss-stopp de har sett billettkontroll på. Dette for å hjelpe unge som ikke har råd,
til å unngå billettkontroll om de har glemt.

## Teknisk informasjon
Nettsiden er bygd med vanlig HTML, CSS og JavaScript og har benyttet seg av Ruter sin offisielle API, entur.org, for å lagre en statisk JSON-fil over alle busstoppene i Oslo.
Komponenter har først blitt laget i Svelte, men grunnet inkompatibiliteter har blitt migrert til vanilla.

### Installasjon
Du kan enten besøke nettsiden på https://allsers.github.io/ruter-varsel eller kjøre programmet lokalt med disse stegene:
1. Hent repositorien:
   ```bash
   git clone https://github.com/allsers/ruter-varsel.git
   cd ruter-varsel

2. Åpne HTML-filen eller kjør en Live Server fra VSC.

### Bruk
Her kan du utforske kartet av Oslo, få oversikt over alle buss-stoppene i Oslo og markere om det er billettkontroll. Du kan også søke gjennom databasen ved å bruke søkemenyen øverst i 
høyre hjørne for å søke etter stoppet du vil markere billettkontroll på.
Prosjektet benytter seg ikke av en live database, så endringene du gjør er ikke synlige på andre instanser av nettsiden.

### Kontakt
For spørsmål eller tilbakemeldinger, vennligst kontakt meg på aleksander.ekman1@gmail.com. Takk for at du besøker KontrollRadar-nettsiden!

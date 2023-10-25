# VizStream
 En smidig-prosjekts oppgave laget i React Native for å fjernstyre OBS(Open Broadcaster Software) til Vizrt. 

 Den bruker WebSockets for å etablere en tilkobling til OBS-websocket controller som er en del av OBS sitt miljø. 
 
![image](https://github.com/mojitoen/VizStream/assets/66651087/0373a12c-1912-4102-8681-eaad35460c17)

Knapper selv-programmeres av brukeren slik:

![image](https://github.com/mojitoen/VizStream/assets/66651087/7d12ec9c-1eee-4576-998e-217c0e509b0b)

Og kan i etterkant enkelt aktiveres ved å klikke på knappen:

![image](https://github.com/mojitoen/VizStream/assets/66651087/c5e437ac-260c-4e12-911f-b68450eac9cd)


Vi har brukt Expo Go for dev-miljøet: du kan teste og installere her.

 
 # Installasjon
 iOS
 https://apps.apple.com/us/app/expo-go/id982107779
 
 Android
 https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US
 
 Installer appen, kjør ```npm install``` og deretter ```npx expo start```.
 Da får du en QR-kode i terminalen du kan skanne fra mobil-appen og appen burde åpne seg.
 
 OBS! Denne løsningen bruker det interne nettverket, og vil sannsynligvis ha problemer på skolenettet.

# Oppsett: 
 OBS: 
 Åpne opp OBS -> Tools -> Websocket Server Settings
 Tick Enable WebSocket Server
 Porten er valgfri, men anbefaler 4455.
 Applikasjonen har for øyeblikket ikke støtte for autentisering, så untick Enable Authentication
 Finn frem IP-addresse med valgri metode

 Applikasjon:
 Sørg for at applikasjonen og klienten som kjører OBS er på samme nettverk, legg inn IP-addresse i connection-feltet og legg til en kolon med porten.
 Eksempel: 

 ![image](https://github.com/mojitoen/VizStream/assets/66651087/96625815-0de0-454f-8363-1a293a5f0fa7)


Design-sprinten vår: 
[Google Design Sprint](https://github.com/mojitoen/VizStream/files/13166103/Google-design-sprint.pdf)


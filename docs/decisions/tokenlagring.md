# Beslut av token-lagring

Kort sammanfattning av hur vi sparar våra access-tokens i frontend, vilka andra alternativ vi kollade på och varför vi landade i det vi gjorde.

## Bakgrund och status

Vi behövde bestämma var vi ska göra av vår access token när användaren har loggat in, så att vi kan skicka med den i våra API-anrop på ett säkert och smidigt sätt.

**Status:** Implementerat och klart.

## Alternativen vi kollade på

- **localStorage:** Inbyggt och väldigt enkelt eftersom token ligger kvar även om man laddar om sidan. Nackdelen är att det är vidöppet för XSS-attacker. Om någon lyckas köra skadlig kod på vår sajt är det superenkelt att stjäla token därifrån.
- **Vanliga cookies:** Rätt smidigt, men lider av liknande problem som localStorage om de inte ställs in rätt, och kan dessutom ställa till det med CSRF-attacker (att någon fejkar anrop från en annan sajt).
- **I applikationens minne (State):** Att bara spara token i en vanlig variabel eller i vårt state (Vue etc.). Supertufft för hackare att komma åt via XSS. Det stora minuset är att allt försvinner så fort användaren trycker på F5 eller uppdaterar sidan.

## Vårt beslut och hur vi löste det

Vi valde att **lagra vår access token i minnet (in-memory state)**.

Eftersom nackdelen är att minnet rensas vid en sidomladdning, har vi byggt bort det genom att kombinera minneslagringen med en **Refresh Token i en HttpOnly-cookie**:

- Vår kortlivade access-token lever i minnet och skickas med i alla vanliga API-anrop.
- Vi har satt upp en **automatisk refresh-lösning**. Om sidan laddas om, eller om access-token går ut, gör frontend ett tyst anrop till backend i bakgrunden. Backend kollar på vår säkra cookie (som JavaScript inte kan läsa eller stjäla) och skickar tillbaka en ny access-token direkt in i minnet.
  Appen är nu säkrare om en XSS attack sker.

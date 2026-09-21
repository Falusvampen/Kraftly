# 2026-09-21

Gjort:
Vi ser över vad vi kan ha missat och testkör igen enligt 1.9
Fortsätter till spår 2
Tom gör rollback.yml PR #65
Louise gör samtliga dokumentfiler, vissa enbart med mall, utan ifyllda gemensamma beslut.
Branch M4-pipeline skapad, kommenterar ut gammal kod i yml filen och lägger till den nya men filen stashas,
då den inte kan pushas pga inställningarna som vi inte kan ändra.

Grönt:
Toms PR #65 rollback, från idag
Kvar:
Fylla i gemensamma beslut i dokumentation.
Sätta tag M4 när allt är klart.

Teamets reflektion:
Vi stötte på patrull då M4-pipeline skulle mergas då vi inte kunde ändra inställningarna i Github.
Vi fick jobba vidare med annat och hoppas kunna leverera M4 i tid trots detta. Kom ihåg att alla ska ha access.

2026-09-20

Gjort:
Louise gjorde 1.8 2 som vi missat.
Fick först röd PR #63 pga prettier men löste det.

Grönt:
PR #63

Kvar:
Fördela kvarvarande uppgifter.
Sätta tag M4 när allt är klart.

Teamets reflektion:

2026-09-18

Gjort:
Senaste PR röd, vi löste detta genom ett kortare möte på lördagen.

Grönt:
PR #62 remove key etc är nu fixad.

Kvar:
Fördela kvarvarande uppgifter.
Sätta tag M4 när allt är klart.

Teamets reflektion:
Det flyter på bra men vissa saker är svårare.

2026-09-17

Gjort:
Hela spår 1 tillsammans digitalt.
Tom gjorde sen 1.8 1 som vi hade missat, tog bort det och Axel la till det igen.
Louise skapade sitt Render-konto

Grönt:

Kvar:
En hel del kvar att göra då vi alla var frånvarande från skolan denna dag och arbetade en stund tillsammans på
eftermiddag/kväll.
Sätta tag M4 längre fram

Teamets reflektion:
Det flyter på bra.

2026-09-15

Gjort:
Kollat igenom den sista PRn tillsammans med Liveshare.
Suttit i Docker och jämfört storlek på Image, på Github och VS code.
Docks/container.md är fixad
Fyllt i alla loggar.
Beslut taget om ny tech lead för kommande 4 veckor: Louise

Grönt:
Allt ser grönt ut.

Kvar:
Gå igenom inför inlämning så att allt är med.
Sätta tag M3

Teamets reflektion:
Det flyter på bra.
Vi reflekterade och blev förvånade över att våra Images blev så olika stora på våra olika devices.
Vi satt ganska länge med denna jämförelse och testade tex docker compose down --rmi local, docker builder prune -a -f men problemet kvarstod.

2026-09-14

Gjort:
Liveshare tillsammans: gick igenom docker, docker compose, testade omit dev, pratade portar och milestones.md
kollade arkitetur. Inte exportera api, tillgängligt i container via proxy.
Tog bort base url. Deamon off, dockerignore uppdaterad.
Uppdaterat README.
Uppdaterad/fyllt i milestones.md med M1, M2 och M3.

Grönt:

Kvar:
Docks/container.md
Sätta tag M3

Teamets reflektion:
Fortsatt fint samarbete och förståelse.

2026-09-10

Gjort:
Lektioner, testar docker och downsizade image.

Grönt:

Kvar:
Docks/container.md
Uppdatera README
Skicka upp ovanstående som PR
Sätta tag M3

Teamets reflektion:
Tom och Axel fick en del gjort på lektionen då Louise jobbade med Suzan.

2026-09-09

Gjort:
Louise har skapat dockerfile, .dockerignore och nginx.conf
Tom ser över, rättar stavfel och liknande samt kompletterar utifrån vårt projekt.

Grönt:
Ovanstående PR grön

Kvar:
Docks/container.md
Uppdatera README
Skicka upp ovanstående som PR
Sätta tag M3

Teamets reflektion:
Vi jobbar mycket tillsammans digitalt och har givande samtal.

2026-09-08

Gjort:
Fyllt i det sista pipeline.md

Grönt:
CI och tester funkar.

Kvar:
Fylla i dagens daily log.
Lägga in det sista i pipeline.md
Checka av mot samtliga punkter inför kommande inlämning.
Skicka upp ovanstående som PR
Sätta M2-tag

Teamets reflektion:
Inget skav i detta team.

2026-09-07

Gjort:
Kort stand up på morgonen.
Dagens instuderingsuppgifter och frågor.
Mergat PR

Grönt:

Kvar:
Fylla i daily log samt pipeline.md
Checka av mot samtliga punkter inför kommande inlämning.

Teamets reflektion:
Det flyter på bra!

2026-09-04

Gjort:
Var och en arbetade enskilt.
Såg över den sista uppgiften från förmiddagen på torsdagen.
LIA-sök

Grönt:

Kvar:
Fylla i daily log samt pipeline.md
Checka av mot samtliga punkter inför kommande inlämning.

Teamets reflektion:

2026-09-03

Gjort:
Vi arbetade tillsammans, digitalt,med torsdagens uppgifter.
Fick först rött och sen grönt.

Grönt:
Grönt i PR
Prettier failade pga radasvslut men det löstes.

Kvar:
Fylla i daily log samt pipeline.md
Checka av mot samtliga punkter inför kommande inlämning.

Teamets reflektion:
Samarbetet flyter på bra!

2026-09-01

Gjort:
M1- PR och merge
Löst git-problem, sammanställt och gått igenom inlämning

Grönt:
Samtliga tester fungerar hos alla

Kvar:
Pusha denna log och tagga M1 efter det.

Teamets reflektion:
Vi är väldigt nöjda med flowet och samarbetet i teamet. Det är avspänt, alla lyssnar på varandra och hjälps åt.
Testet på Statuschip är relativt enkelt och tydligt.

2026-08-31

Gjort:
M1- Färdigställa testerna
Löst git-problem

Grönt:
Några av testerna är klara och fungerar efter merge

Kvar:
Ett par PR ska approvas och mergas

2026-08-28 · Boiler Room 1

Gjort:

- M1- dela upp testerna inför inlämning tis 1/9, började jobba med dessa.
- Följa planen för boilerroom som vi fick i Slack i morse.
- E2E med Cypress som vi beslutade att använda.
- La till Eslint och Prettier att köras innan varje commit
- Installerade Vitest

Grönt:
<https://github.com/Falusvampen/Kraftly/pull/28>
<https://github.com/Falusvampen/Kraftly/pull/29>
<https://github.com/Falusvampen/Kraftly/pull/31>
<https://github.com/Falusvampen/Kraftly/pull/32>
<https://github.com/Falusvampen/Kraftly/pull/33>

Kvar till M1-taggen tisdag: Testerna
E2E: Vi valde Cypress· smoke + mockat test gröna: ja
Fastnat på: Vi har fastnat på vissa tester som vi arbetar vidare med.

Logg - 2026-08-24

Vad vi har gjort:

- Satt upp repot utefter anvisningarna och skapat en branch protection rule på main.
- Sett till att alla kan köra koden lokalt, bl.a. godkänt ytterligare dependencies för npm install.
- Skapat en README och skrivit in mötestider, var kommunikationen ska ske, hur PR:er ska se ut och tech lead för de kommande 3 veckorna.
- Skapat en kanban board för skuldinventering och börjat skriva in det vi har hittat hittills.

Det som var svårt

- Vi kunde först inte logga in på sidan och behövde hitta en alternativ väg.

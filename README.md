# Coeziunea Țărilor Europene
Anul acesta pe 1 ianuarie am preluat Președinția Consiliului UE, iar timp de șase luni vom conduce reuniunile la toate nivelurile în Consiliu, contribuind la asigurarea continuității lucrărilor UE în cadrul Consiliului. 
Prioritățile președinției române se înscriu în sfera următorului motto: coeziunea, o valoare europeană comună, înțeleasă ca unitate, egalitate de tratament și convergență. Astfel, am creat un website format dintr-o pagina care transmite informaţiile într-un mod dinamic,  încurajează cunoaşterea și promovează identitate românească. Am ales să ilustrez COEZIUNEA în proiectul meu prin valorificarea istoriei Uniunii Europene şi a președințiilor trecute. „Coeziunea Țărilor Europene” este o platformă de tip one page formată din mai multe secțiuni: Introducere, Președinția Consiliului UE, Harta UE, Promovarea identității, Prioritățile președinției, Istoria UE.
Pentru partea de backend am folosit Node.js și MongoDB. Președințiile și orașele sunt preluate din baza de date MongoDB, iar pe baza unui API cu ajutorul AngularJS sunt dispuse în pagină.


## Tehnologiile folosite
Pentru realizarea paginii am folosit urmatoarele tehnologii:
- HTML5
- CSS3
- JavaScript
- AngularJS
- Node.js
- jQuery
- Bootstrap
- JSON
- MongoDB
- Leaflet
- Font Awesome
- Socket.io
- Chart.js

## Instalare
Pentru a rula sunt necesare NodeJS și baza de date MongoDB
- se descarcă repo-ul
- se creează o bază de date în Mongo cu numele „EUmap” și 2 colecții „City”, „Presidency” și în fiecare colecție se importează json-ul cu nume sugestiv din folderul mongo-imports
- se pornește baza de date (MongoDB trebuie pornită cu „mongod” din MongoBD/Server/3.6/bin) 
- apoi în folderul proiectului `npm install` 
- `node index.js`
- http://localhost:8000
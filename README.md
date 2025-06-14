# ProgettoSS
# 🧪 01 - OWASP NodeGoat ("AS IS")


## 🧩 Descrizione Generale

[OWASP Node.js Goat](https://github.com/OWASP/NodeGoat) è un'applicazione web volutamente vulnerabile. Il suo obiettivo principale è quello di fornire un ambiente pratico per comprendere e identificare le vulnerabilità più comuni
relative alle applicazioni web sviluppate con Node.js. 
In particolare, le vulnerabilità presenti in questa applicazione fanno riferimento alla [OWASP Top 10 - 2013](https://github.com/OWASP/Top10/blob/master/2013/OWASP%20Top%2010%20-%202013.pdf).

### Struttura del repository:
- `server.js`: punto di ingresso. Configura Express, i middleware, il template engine (Swig), inizializza la connessione al database MongoDB e monta le rotte.
- `app/`: cuore dell'applicazione
- `config/`: contiene configurazioni come la porta su cui si mette in ascolto il server, la stringa di connessione al database e il cookieSecret.

### Struttura dell'applicazione `app/`:
- `app/assets`: contiene risorse come file CSS, immagini, script JavaScript, favicon e altri asset utilizzati dall'applicazione lato client per l’interattività e lo stile delle pagine.
- `app/data`: include i DAO (Data Access Object), ovvero moduli che gestiscono l’accesso e la manipolazione dei dati nel database (operazioni CRUD).
- `app/routes`: definisce le rotte dell’applicazione. 
- `app/views`: contiene i template HTML elaborati da Swig per il rendering delle pagine.
 
---

## 🏗️ Architettura

### Componenti principali:
- **Frontend**: HTML/CSS/Bootstrap
- **Backend**: Node.js/express/Swig (template engine per Node.js)
- **Database**: MongoDB
- **Sessioni**: Memorizzate lato server in memoria attraverso il middleware express-session

### Flusso di una richiesta:
1. **Connessione**: `server.js` crea app Express, connette MongoDB e attiva i middleware.

2. **Static e parsing**: gestisce asset statici, parsing JSON/form, session-cookie.

3. **Routing**: le rotte configurate in `app/routes/index.js` definiscono `app.get/post(...)` e collegano i rispettivi handler.

4. **Handler/DAO**: l’handler interagisce con i DAO per recuperare dati.

5. **Rendering**: l’handler chiama `res.render("view.html", { ... })` per generare la risposta HTML.

6. **Risposta**: Express invia l’HTML compilato al client.

---

## 🐋 Eseguire NodeGoat con Docker

1. Installare [docker](https://docs.docker.com/installation/) e [docker compose](https://docs.docker.com/compose/install/) 

2. Clonare la repository github:
   ```
   git clone https://github.com/OWASP/NodeGoat.git
   ```

3. Spostarsi nella directory:
   ```
   cd NodeGoat
   ```

4. Eseguire la build delle immagini:
   ```
   docker-compose build
   ```

5. Eseguire l'app, il punto di ingresso dell'applicazione è: http://localhost:4000/:
   ```
   docker-compose up
   ```


## ⚠️ Vulnerabilità presenti

### [A1 - Injection](doc/A1-Injection.md)
- **Descrizione**: L'injection si verifica quando dati non attendibili vengono inviati a un interprete come parte di un comando o di una query. I dati malevoli dell'attaccante possono indurre l'interprete a eseguire comandi non previsti o ad accedere a dati sensibili senza la dovuta autorizzazione.


### [A2 - Broken Authentication and Session Management ](doc/A2-BrokenAuth.md)
- **Descrizione**: Il Broken Authentication and Session Management si verifica quando un'applicazione gestisce in modo non sicuro credenziali, token di sessione o identificatori utente, permettendo a un attaccante di impersonare altri utenti e accedere a funzionalità riservate.


### [A3 - Cross-Site Scripting (XSS) ](doc/A3-XSS.md)
- **Descrizione**: Il Cross-Site Scripting (XSS) si verifica quando un’applicazione accetta input non sanificati e li restituisce all’utente senza adeguata validazione o escaping, permettendo a un attaccante di iniettare script malevoli eseguiti nel browser delle vittime.


### [A4 - Insecure Direct Object References](doc/A4-Insecure-DOR.md)
- **Descrizione**: L’Insecure Direct Object References si verifica quando un’applicazione espone direttamente riferimenti a oggetti interni (come file, database o URL) senza controllare adeguatamente i permessi, permettendo a un attaccante di accedere o modificare risorse non autorizzate.

### [ A5 - Security Misconfiguration](doc/A5-Misconfiguration.md)
- **Descrizione**: La Security Misconfiguration si verifica quando un’applicazione, server o ambiente è configurato in modo errato o con impostazioni di sicurezza insufficienti, permettendo a un attaccante di sfruttare queste debolezze per compromettere il sistema.

### [A6 - Sensitive Data Exposure ](doc/A6-SensitiveData.md)
- **Descrizione**: La Sensitive Data Exposure si verifica quando un’applicazione non protegge adeguatamente dati sensibili, come informazioni personali o finanziarie, permettendo a un attaccante di intercettare, accedere o rubare queste informazioni.

### [A7 - Missing Function Level Access Control](doc/A7-AccessControl.md)
- **Descrizione**: Il Missing Function Level Access Control si verifica quando un’applicazione non verifica correttamente i permessi degli utenti per accedere a funzionalità o risorse, permettendo a un attaccante di utilizzare funzioni riservate senza autorizzazione.

### [A8 - Cross-Site Request Forgery (CSRF)](doc/A8-CSRF.md)
- **Descrizione**: Il Cross-Site Request Forgery (CSRF) si verifica quando un’applicazione non verifica adeguatamente l’origine delle richieste, permettendo a un attaccante di far eseguire azioni non autorizzate a un utente autenticato senza il suo consenso.

### [A9 - Using Components with Known Vulnerabilities](doc/A9-InsecureComponents.md)
- **Descrizione**: L’Using Components with Known Vulnerabilities si verifica quando un’applicazione utilizza librerie, framework o componenti con vulnerabilità note, esponendosi al rischio che un attaccante sfrutti tali falle per compromettere il sistema.

### [A10 - Unvalidated Redirects and Forwards](doc/A10-Redirects.md)
- **Descrizione**: L’Unvalidated Redirects and Forwards si verifica quando un’applicazione permette di reindirizzare o inoltrare gli utenti a URL esterni senza validare adeguatamente la destinazione, permettendo a un attaccante di indirizzare le vittime verso siti malevoli.

---


# 🧪 01 - Stato Attuale dell'Applicazione ("AS IS")


## 🧩 Descrizione Generale

OWASP Node.js Goat è un'applicazione web volutamente vulnerabile. Il suo obiettivo principale è quello di fornire un ambiente pratico per comprendere e identificare le vulnerabilità più comuni
relative alle applicazioni web sviluppate con Node.js. 
In particolare, le vulnerabilità presenti in questa applicazione fanno riferimento alla OWASP Top 10 - 2013.

---

## 🏗️ Architettura

### Componenti principali:
- **Frontend**: HTML/CSS/Bootstrap
- **Backend**: Node.js/express
- **Database**: MongoDB
- **Sessioni**: Memorizzate lato server in memoria attraverso il middleware express-session

### Flussi principali:
1. L'utente accede tramite login o registra un account.
2. Può effettuare ricerche, modificare dati, visualizzare contenuti.
3. Il server interagisce direttamente con MongoDB per gestire i dati.

---

## Vulnerabilità presenti

### A1 - Injection
- **Descrizione**: L'injection si verifica quando un'applicazione accetta input non validato o non filtrato e lo invia a un interprete permettendo a un attaccante di eseguire comandi arbitrari o accedere a dati sensibili.
- 

### A2 - Broken Authentication and Session Management 
- **Descrizione**: Il Broken Authentication and Session Management si verifica quando un'applicazione gestisce in modo non sicuro credenziali, token di sessione o identificatori utente, permettendo a un attaccante di impersonare altri utenti e accedere a funzionalità riservate.

### A3 - Cross-Site Scripting (XSS) 
- **Descrizione**: Il Cross-Site Scripting (XSS) si verifica quando un’applicazione accetta input non sanificati e li restituisce all’utente senza adeguata validazione o escaping, permettendo a un attaccante di iniettare script malevoli eseguiti nel browser delle vittime.

### A4 - Insecure Direct Object References
- **Descrizione**: L’Insecure Direct Object References si verifica quando un’applicazione espone direttamente riferimenti a oggetti interni (come file, database o URL) senza controllare adeguatamente i permessi, permettendo a un attaccante di accedere o modificare risorse non autorizzate.

### A5 - Security Misconfiguration
- **Descrizione**: La Security Misconfiguration si verifica quando un’applicazione, server o ambiente è configurato in modo errato o con impostazioni di sicurezza insufficienti, permettendo a un attaccante di sfruttare queste debolezze per compromettere il sistema.

### A6 - Sensitive Data Exposure 
- **Descrizione**: La Sensitive Data Exposure si verifica quando un’applicazione non protegge adeguatamente dati sensibili, come informazioni personali o finanziarie, permettendo a un attaccante di intercettare, accedere o rubare queste informazioni.

### A7 - Missing Function Level Access Control 
- **Descrizione**: Il Missing Function Level Access Control si verifica quando un’applicazione non verifica correttamente i permessi degli utenti per accedere a funzionalità o risorse, permettendo a un attaccante di utilizzare funzioni riservate senza autorizzazione.

### A8 - Cross-Site Request Forgery (CSRF) 
- **Descrizione**: Il Cross-Site Request Forgery (CSRF) si verifica quando un’applicazione non verifica adeguatamente l’origine delle richieste, permettendo a un attaccante di far eseguire azioni non autorizzate a un utente autenticato senza il suo consenso.

### A9 - Using Components with Known Vulnerabilities
- **Descrizione**: L’Using Components with Known Vulnerabilities si verifica quando un’applicazione utilizza librerie, framework o componenti con vulnerabilità note, esponendosi al rischio che un attaccante sfrutti tali falle per compromettere il sistema.

### A10 - Unvalidated Redirects and Forwards
- **Descrizione**: L’Unvalidated Redirects and Forwards si verifica quando un’applicazione permette di reindirizzare o inoltrare gli utenti a URL esterni senza validare adeguatamente la destinazione, permettendo a un attaccante di indirizzare le vittime verso siti malevoli.

---

## 🛡️ Funzionalità principali (esposte a vulnerabilità)

| Funzionalità | Descrizione | Vulnerabilità note |
|--------------|-------------|---------------------|
| **Login** | Autenticazione utente con email/password | NoSQL Injection |
| **Registrazione** | Creazione nuovo account | Weak Password Policy, Injection |
| **Ricerca utenti** | Ricerca via input utente | XSS riflesso |
| **Profilo utente** | Visualizzazione e modifica dati | No controllo accesso diretto |
| **Reset password** | Recupero via email | User enumeration |
| **Sessioni** | Gestione in cookie | Mancanza attributi `HttpOnly`, `Secure`, `SameSite` |

---

## 🕳️ Vulnerabilità Identificate

| ID | Tipo | Descrizione |
|----|------|-------------|
| V1 | **NoSQL Injection** | Query dinamica su MongoDB non sanificata (`req.body.email`) |
| V2 | **Reflected XSS** | Ricerca utenti non sanifica input (`/search?term=...`) |
| V3 | **User Enumeration** | Reset password restituisce messaggi diversi se email esiste o meno |
| V4 | **Session Hijacking** | I cookie non hanno flag di sicurezza (`HttpOnly`, `Secure`) |
| V5 | **Password Storage Debole** | Password salvate senza hash (o con MD5 obsoleto) |
| V6 | **Mancanza Rate Limiting** | Login/registrazione vulnerabili a brute-force |
| V7 | **Broken Access Control** | Qualsiasi utente autenticato può accedere a dati di altri utenti |

---



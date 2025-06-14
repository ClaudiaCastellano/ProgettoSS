# A10 - Unvalidated Redirects and Forwards
Un attaccante può utilizzare link reindirizzati non validati per spingere le vittime verso contenuti dannosi. 

Nell'applicazione, il link `Learning Resources` ( /learn?url=...) reindirizza a un altro sito web senza validarne l'url.

```js
// Handle redirect for learning resources link
app.get("/learn", isLoggedIn, (req, res) => {
    // Insecure way to handle redirects by taking redirect url from query string
    return res.redirect(req.query.url);
});
```
💡 **Spiegazione**: 
Un attaccante può modificare il parametro url nella query string per fare in modo che punti a un sito web dannoso. Se condivide questo link, le vittime sono più propense a cliccarci sopra, poiché la parte iniziale (prima della query string) punta a un sito affidabile.
Ad esempio:
`http://localhost:4000/learn?url=https://www.malicious.com`

#### 🛡️ Mitigation
Alcune possibili mitogations sono le seguenti:
- Evitare l'uso di reindirizzamenti.
- Se utilizzati, non permettere che input untrusted possano determinare il target del reindirizzamento.
- Se questo non è possibile, validare l'input per assicurarsi che sia una destinazione valida e autorizzata.

In `routes/index.js` questo codice non permette che input untrusted determino il target del reindirizzamento.
```js
app.get("/learn", isLoggedIn, (req, res) => {
        // Insecure way to handle redirects by taking redirect url from query string
        //return res.redirect(req.query.url);
        return res.redirect("https://www.khanacademy.org/economics-finance-domain/core-finance/investment-vehicles-tutorial/ira-401ks/v/traditional-iras");
})
```
💡 **Spiegazione**:
- ✅ in questo modo la rotta `/learn` esegue un reindirizzamento sempre verso lo stesso sito trusted di default. Gli utenti non possono modificare questo comportamento.

![](../img/Mitigation/redirect.png)

<!--[🔙](01-as-is.md#a10---unvalidated-redirects-and-forwards)-->
[🔙](../README.md#a10---unvalidated-redirects-and-forwards)
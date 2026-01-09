# Sito Web Enrico Massoterapista

Sito web professionale per massoterapista, sviluppato con HTML5, CSS3 e JavaScript vanilla.

## Struttura del progetto

```
Enrico_massoterapista/
├── index.html                 # Homepage
├── pages/                     # Pagine secondarie
│   ├── chi-sono.html
│   ├── trattamenti.html
│   ├── ms.html
│   ├── consulenza.html
│   └── appuntamenti.html
├── assets/
│   ├── css/
│   │   └── style.css         # Stili principali
│   ├── js/
│   │   ├── main.js           # Script generali
│   │   └── booking.js        # Script prenotazione
│   ├── images/               # Immagini (da aggiungere)
│   └── fonts/                # Font personalizzati (da aggiungere)
└── README.md
```

## Caratteristiche

- **Design responsive** adatto a tutti i dispositivi
- **Navigazione intuitiva** con menu mobile
- **Pagine separate** per ogni sezione del sito
- **Form di prenotazione** a step con validazione
- **Palette colori professionale** rilassante
- **Performance ottimizzate** (no framework pesanti)
- **Codice pulito e manutenibile** con variabili CSS e commenti

## Pagine

1. **Homepage**: Presentazione generale, trattamenti principali, chi sono, MS, mappa, contatti
2. **Chi Sono**: Biografia, formazione, esperienze professionali
3. **Trattamenti**: Dettaglio di tutti i trattamenti offerti con FAQ
4. **MS**: Presentazione del Metodo Speciale con benefici e testimonianze
5. **Consulenza**: Informazioni sulla consulenza iniziale gratuita e form di richiesta
6. **Appuntamenti**: Sistema di prenotazione online con selezione trattamento, data e ora

## Personalizzazione

### Colori
I colori sono definiti come variabili CSS nel file `assets/css/style.css`:

```css
:root {
    --color-primary: #2a6e6c;        /* Verde acqua scuro */
    --color-primary-dark: #1d4f4d;
    --color-primary-light: #3a8e8b;
    --color-secondary: #f5f1e8;      /* Beige chiaro */
    --color-secondary-dark: #e8e2d4;
    --color-accent: #d4a574;         /* Terra */
    --color-accent-dark: #c08c5a;
    /* ... */
}
```

### Contenuti
Per modificare i testi, aprire i rispettivi file HTML e aggiornare i contenuti.

### Immagini
Sostituire le immagini placeholder nelle cartelle `assets/images/`. I placeholder attuali usano icone FontAwesome.

### Logo
Il logo attuale è un testo. Per inserire un logo grafico:
1. Aggiungere il file logo in `assets/images/`
2. Modificare il codice nel file `index.html` e nelle altre pagine:
```html
<a href="index.html" class="logo">
    <img src="assets/images/logo.png" alt="Enrico Massoterapista">
</a>
```

## Requisiti tecnici

- Browser moderni (Chrome, Firefox, Safari, Edge)
- Connessione internet per font Google e FontAwesome
- Server web per il deploy (Apache, Nginx, Netlify, Vercel, ecc.)

## Deployment

Il sito è statico e può essere deployato su qualsiasi servizio di hosting statico:

1. **Netlify**: Drag & drop della cartella `Enrico_massoterapista/`
2. **Vercel**: Importa repository Git
3. **GitHub Pages**: Push su repository e abilita Pages
4. **Hosting tradizionale**: Upload via FTP

## Sviluppo futuro

- Integrazione con calendario (Google Calendar, Calendly)
- Sistema di pagamento online
- Blog per articoli sul benessere
- Area riservata clienti
- Multilingua (inglese)

## Crediti

- Font: Google Fonts (Inter, Playfair Display)
- Icone: FontAwesome 6
- Ispirazione design: takemihome.it
- Palette colori: Personalizzata per settore benessere

## Licenza

© 2025 Enrico Massoterapista. Tutti i diritti riservati.

---

**Nota**: Questo sito è stato sviluppato come progetto professionale. Per assistenza tecnica, contattare lo sviluppatore.
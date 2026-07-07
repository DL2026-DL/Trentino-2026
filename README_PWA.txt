# TravelBook – Val di Fiemme 2026 PWA

Questa versione è stata trasformata in Progressive Web App.

## Cosa è incluso
- Manifest PWA completo
- Icone app per Android/iPhone
- Service worker con cache offline dei file principali
- Banner di installazione per browser compatibili
- Supporto “Aggiungi a schermata Home” su iPhone
- Meteo live Open-Meteo con fallback cache quando disponibile

## Importante
La PWA funziona correttamente solo se aperta tramite un piccolo server web o pubblicata online, non aprendo `index.html` direttamente come file locale.

### Test veloce sul computer
Dentro questa cartella, esegui:

```bash
python3 -m http.server 8000
```

Poi apri:

```text
http://localhost:8000
```

### iPhone
Per installarla su iPhone serve pubblicarla online oppure aprirla da un server locale raggiungibile dall'iPhone. Poi: Safari → Condividi → Aggiungi a Home.

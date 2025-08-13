

## 🔑 Konfiguracja GitHub OAuth

Aby umożliwić logowanie przez GitHub w projekcie, musisz uzyskać **Client ID** i **Client Secret** z GitHub.

### ✅ 1. Zaloguj się na GitHub

Przejdź na [github.com/login](https://github.com/login) i zaloguj się na swoje konto.

---

### ✅ 2. Utwórz nową aplikację OAuth

1. Wejdź w **Settings** → **Developer settings** → **OAuth Apps**
   (lub bezpośredni link: [https://github.com/settings/developers](https://github.com/settings/developers)).

2. Kliknij **New OAuth App**.

3. Uzupełnij pola:

   * **Application name:** np. `Photo Album App`
   * **Homepage URL:** `http://localhost:3000`
   * **Authorization callback URL:**

     ```
     http://localhost:5000/auth/github/callback
     ```

4. Kliknij **Register application**.

---

### ✅ 3. Skopiuj klucze

* **Client ID** – znajdziesz w szczegółach aplikacji.
* **Client Secret** – kliknij **Generate a new client secret**, skopiuj i zapisz (nie zobaczysz go ponownie!).

---

### ✅ 4. Dodaj dane do pliku `.env`

W katalogu głównym projektu utwórz (lub edytuj) plik `.env` i dodaj:

```
GITHUB_CLIENT_ID=TWÓJ_CLIENT_ID
GITHUB_CLIENT_SECRET=TWÓJ_CLIENT_SECRET
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
```

Pamiętaj, aby **nigdy nie commitować pliku `.env`** – dodaj go do `.gitignore`.

---

### ✅ 5. Restart serwera

Po zapisaniu zmian uruchom ponownie aplikację:

```bash
npm run dev
```

---

📌 **Wskazówka:** Jeśli `.env` nie działa, upewnij się, że w głównym pliku serwera (np. `server.js`) masz:

```javascript
require('dotenv').config();
```


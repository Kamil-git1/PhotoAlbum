
## 🔐 GitHub OAuth Configuration

Aby umożliwić logowanie przez GitHub:

1. **Zaloguj się na GitHub**  
   Przejdź na [github.com/login](https://github.com/login) i zaloguj się.

2. **Utwórz aplikację OAuth**  
   Wejdź w:  
   `Settings → Developer settings → OAuth Apps`  
   lub bezpośrednio: [https://github.com/settings/developers](https://github.com/settings/developers)

   Kliknij **New OAuth App** i uzupełnij:

   - **Application name**: np. `Photo Album App`  
   - **Homepage URL**: `http://localhost:3000`  
   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`

   Kliknij **Register application**.

3. **Skopiuj dane**  
   - `Client ID` – znajdziesz w szczegółach aplikacji  
   - `Client Secret` – kliknij **Generate a new client secret**, skopiuj i zapisz

4. **Dodaj dane do pliku `.env`**  
   W katalogu głównym projektu utwórz plik `.env` i dodaj:

   ```env
   GITHUB_CLIENT_ID=TWÓJ_CLIENT_ID
   GITHUB_CLIENT_SECRET=TWÓJ_CLIENT_SECRET
   GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
   ```

   > 📌 **Uwaga**: Nie commituj pliku `.env`. Dodaj go do `.gitignore`.

5. **Restart serwera**  
   Po zapisaniu zmian uruchom ponownie aplikację:

   ```bash
   npm run dev
   ```

---

## 🗄️ Konfiguracja MongoDB

Aby aplikacja mogła połączyć się z bazą danych MongoDB:

1. **Utwórz konto na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**  
   Załóż darmowy klaster.

2. **Skonfiguruj dostęp**  
   - Dodaj użytkownika bazy danych  
   - Dodaj swój adres IP do whitelisty (`0.0.0.0/0` dla testów lokalnych)

3. **Skopiuj connection string**  
   Wybierz opcję "Connect → Connect your application" i skopiuj link, np.:

   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Dodaj do pliku `.env`**:

   ```env
   DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

5. **Upewnij się, że masz w kodzie:**

   ```js
   require('dotenv').config();
   ```

   oraz że połączenie z MongoDB jest wykonywane przy starcie aplikacji.

---


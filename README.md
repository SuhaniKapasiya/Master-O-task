# 7UP 7DOWN Game Backend API

This backend powers the 7UP 7DOWN dice game with user authentication, game logic, and game history logging.

## Authentication Endpoints

### Register
- **POST** `/api/auth/register`
- Body: `{ "username": "string", "email": "string", "password": "string" }`
- Registers a new user and sends a verification email.

### Verify Email
- **GET** `/api/auth/verify/:token`
- Verifies the user's email address.

### Login
- **POST** `/api/auth/login`
- Body: `{ "email": "string", "password": "string" }`
- Returns JWT token if credentials and email verification are valid.

---

## Game Endpoints (All require Bearer JWT token)

### Play Game (Bet, Roll, Log, Update)
- **POST** `/api/play`
- Body: `{ "betType": "7up" | "7down" | "7", "betAmount": 100 | 200 | 500 }`
- Validates bet, rolls dice, updates points atomically, logs the round, and returns result:
  - `{ die1, die2, total, win, payout, points }`

### Get Game History
- **GET** `/api/history`
- Returns an array of previous rounds for the authenticated user.

### Roll Dice (Legacy)
- **POST** `/api/roll`
- Rolls two dice and returns their values and total.

### Calculate Result (Legacy)
- **POST** `/api/result`
- Body: `{ "betType": "7up" | "7down" | "7", "betAmount": number, "total": number }`
- Returns win/loss and payout for a given bet and dice total.

### Update Player Points (Legacy)
- **POST** `/api/update`
- Body: `{ "userId": "string", "newPoints": number }`
- Updates the user's points (admin/legacy use).

---

## API Documentation
- Swagger UI: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
- Postman Collection: See `postman_file/7up7down-api.postman_collection.json`

---

## Security & Features
- JWT authentication for all protected endpoints
- Email verification required for login
- Rate limiting and logging enabled
- Input validation for all bets
- Game history and analytics support

---

## Environment Variables
- See `.env` for required variables: `MONGO_URI`, `PORT`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `FRONTEND_URL`

---

## Running the Server
```sh
cd backend
npm install
npm run dev
```

---

## License
MIT

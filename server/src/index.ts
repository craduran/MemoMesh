import * as functions from 'firebase-functions';
import app from './app';

// Local dev server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT ?? 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Cloud Functions export
export const api = functions.https.onRequest(app);

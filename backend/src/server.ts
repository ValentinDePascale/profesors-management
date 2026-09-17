import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db.js';
import { errorHandler } from './middlewares/error.middleware.js';
import licenseRoutes from './routes/license.routes.js';
import profesorRoutes from './routes/profesor.routes.js';
import subjectRoutes from './routes/subject.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/licenses', licenseRoutes);
app.use('/api/profesors', profesorRoutes);
app.use('/api/subjects', subjectRoutes);
app.use(errorHandler);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

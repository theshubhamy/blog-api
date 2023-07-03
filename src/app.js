
import  express  from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
// routes
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from'./routes/commentRoutes.js';
// database config
import { sequelize } from './models/config.js';
// error handlers
import { corsError } from './middleware/error-handlers/corsError.js';
import { centralError } from './middleware/error-handlers/centralError.js';

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const PORT = process.env.PORT|| 3300;



app.use(corsError);
app.use(centralError);
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', blogRoutes);

app.use('/api', commentRoutes);
  // sync with database
  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`); 
      })
    })
    .catch((err) => {
      console.log(err);
    });



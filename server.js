import express from 'express';
import bodyParser from 'body-parser';
import formRoutes from './routes/formRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', formRoutes);

// default routes for invalid requests
app.all("*", (req, res)=> {
  res.status(404).send("invalid route");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

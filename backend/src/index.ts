import express from 'express'
import { config } from 'dotenv';
config()
const app = express();
app.use(express.json())
app.post("/hello", (req, res, next) =>{
  console.log(req);
  return res.send('Heeey there you are');
})

app.listen(5000, ()=> console.log('Server Open'));

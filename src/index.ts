import express from 'express';
import { env } from 'process';
import users from './routes/users'
import { logRequest } from './middleware/logs';

const app = express();
const PORT = env.PORT;

//middleware
app.use(express.json())
app.use(logRequest)

//app
app.use('/users', users)

//SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
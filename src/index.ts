import express from 'express';
import { env } from 'process';
import { accessValidation, logRequest } from './middleware';
import users from './routes/users'
import auth from './routes/auth'

const app = express();
const PORT = env.PORT;

//middleware
app.use(express.json())
app.use(logRequest)

//app
app.use('/', auth)
app.use('/users', accessValidation, users)

//SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
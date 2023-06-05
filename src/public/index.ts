import app from '../config/app';

const port = process.env.APP_PORT || 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log('Server Started'));




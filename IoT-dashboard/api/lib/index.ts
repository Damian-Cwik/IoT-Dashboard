import DataController from './controllers/DataController';
import App from './app';

const app: App = new App([new DataController()]);

app.listen();
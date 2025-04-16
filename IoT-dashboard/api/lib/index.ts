import App from './app';
import DataController from './controllers/DataController';
import IndexController from "./controllers/index.controller";
import ReadingController from './controllers/reading.controller';
import { Server } from 'socket.io';

const app: App = new App([]);
const io = app.getIo();


const controllers = [
   new DataController(),
   new IndexController(io),
   new ReadingController(io),
];


controllers.forEach((controller) => {
   app.app.use("/", controller.router);
});


app.listen();


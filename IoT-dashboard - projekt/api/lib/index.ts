import App from './app';
import IndexController from "./controllers/index.controller";
import DataController from './controllers/data.controller';
import UserController from './controllers/user.controller';
import DataService from './modules/services/data.service';
import UserService from "./modules/services/user.service";
import PasswordService from "./modules/services/password.service";
import TokenService from "./modules/services/token.service";
import EmailService from './modules/services/email.service';

const app: App = new App([
   new UserController(new PasswordService(), new UserService(), new TokenService(), new EmailService()),
   new DataController(new DataService()),
   new IndexController()
]);

app.listen()
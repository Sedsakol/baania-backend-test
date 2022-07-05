import ExpressApp from "./@core/app/express.app";
import homeRoutes from "./module/home/home.routes";
import postCodeRoutes from "./module/postcode/post-code.routes";

declare global {
  namespace Express {
      interface Request {
          context: any;
      }
  }
}

const port: number = +process.env.PORT || 8000;

const app: ExpressApp = new ExpressApp([ ...homeRoutes, ...postCodeRoutes ], port);
app.listen();
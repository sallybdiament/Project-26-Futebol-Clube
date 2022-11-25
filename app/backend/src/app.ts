import * as express from 'express';
import routers from './routers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    // this.routes();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  // private routes(): void {
  //   this.app.use('/', routers);
  //   console.log('oi, teste routers');
  // }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/', routers);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;

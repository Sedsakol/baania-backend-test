import * as express from 'express';
import { IResQueryData, IResQueyStat } from '../../../@core/interfaces/house.interface';
import { PostCodeService } from '../service/post-code.service';

export class PostCodeController {
    public router: express.Router = express.Router();
    public path: string;
    private postCodeService: PostCodeService;

    constructor() {
      this.initializeConfigs();
      this.initializeServices();
      this.initializeRoutes();
    }

    private initializeConfigs(): void {
      this.path = 'postCode';
    }

    private initializeServices(): void {
      this.postCodeService = new PostCodeService();
    }

    private initializeRoutes(): void {
      this.router.get('/:id', (req, res, next) => this.getPriceStatByPostCode(req, res, next));
      this.router.get('', (req, res, next) => this.getPostCodeList(req, res, next));
    }

    public async getPostCodeList(request: express.Request, response: express.Response, next: express.NextFunction): Promise<any> {
      try {
        const data: IResQueryData = await this.postCodeService.getPostCode();
        response.status(200).send(data);
      } catch (err: any) {
        console.error(err);
        next(err);
      }
    }

    public async getPriceStatByPostCode(request: express.Request, response: express.Response, next: express.NextFunction): Promise<any> {
      try {
        const postCode: string = request.params.id || '';
        const data: IResQueyStat = await this.postCodeService.getPriceStatByPostCode(postCode);
        response.status(200).send(data);
      } catch (err: any) {
        console.error(err);
        next(err);
      }
    }
}


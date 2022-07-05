import { HouseModel } from "../../../@core/database/models/house.model";
import { IResQueryData } from "../../../@core/interfaces/house.interface";

export class HomeService {

  constructor() {
  }

  public async insertHouse(houseBody: HouseModel): Promise<HouseModel> {
    const newHouse: HouseModel = await HouseModel.create(houseBody);
    return newHouse;
  }

  public async getHouse(skip: number = 0, limit: number = 5): Promise<IResQueryData> {
    const data: { rows: HouseModel[], count: number } = await HouseModel.findAndCountAll({ limit, offset: skip });
    return { payload: data.rows, count: data.count };
  }

  public async deleteHouseById(houseId: number): Promise<void> {
    await HouseModel.destroy({ where: { id: houseId}});
  }

  public async updateHouse(houseBody: HouseModel): Promise<void> {
    await HouseModel.update(houseBody, { where: { id: houseBody.id } });
  }
}
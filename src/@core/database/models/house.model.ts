import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { PostgresDB } from "../postgres.database";

class HouseModel extends Model<InferAttributes<HouseModel>, InferCreationAttributes<HouseModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare desc: string;
  declare price: number;
  declare post_code: string;

  declare average?: number;
  declare median?: number;
}

const DB: PostgresDB = new PostgresDB();

HouseModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: false },
    post_code: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize: DB.DB,
    tableName: 'House',
    timestamps: true
  }
);
HouseModel.sync();
export { HouseModel };


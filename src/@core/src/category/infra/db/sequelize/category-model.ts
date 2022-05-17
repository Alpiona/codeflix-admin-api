import {Model} from 'sequelize'
import {Column, DataType, PrimaryKey, Table} from 'sequelize-typescript'

type CategoryModelProperties = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
}

@Table({tableName: 'categories', timestamps: false})
class CategoryModel extends Model<CategoryModelProperties>{
  @PrimaryKey
  @Column({type: DataType.UUID})
  id: string;

  @Column({allowNull: false, type: DataType.STRING(255)})
  name: string;

  @Column({type: DataType.TEXT})
  description: string | null;

  @Column({allowNull: false})
  is_active: boolean;
  
  @Column({allowNull: false})
  created_at: Date;
}
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { faker } from '@faker-js/faker';

// Conexão com o banco (altere conforme necessário)
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/brain_ag',
  {
    logging: false,
  },
);

// --- Tipagens ---

interface ProducerAttributes {
  id: number;
  cpfOrCnpj: string;
  name: string;
}

type ProducerCreationAttributes = Optional<ProducerAttributes, 'id'>;

class Producer
  extends Model<ProducerAttributes, ProducerCreationAttributes>
  implements ProducerAttributes
{
  public id!: number;
  public cpfOrCnpj!: string;
  public name!: string;
}

Producer.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cpfOrCnpj: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Producer',
    tableName: 'producer',
  },
);

interface FarmAttributes {
  id: number;
  name: string;
  city: string;
  state: string;
  fieldSize: number;
  cultivableField: number;
  vegetationField: number;
  owner: number;
}

type FarmCreationAttributes = Optional<FarmAttributes, 'id'>;

class Farm
  extends Model<FarmAttributes, FarmCreationAttributes>
  implements FarmAttributes
{
  public id!: number;
  public name!: string;
  public city!: string;
  public state!: string;
  public fieldSize!: number;
  public cultivableField!: number;
  public vegetationField!: number;
  public owner!: number;
}

Farm.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    fieldSize: DataTypes.FLOAT,
    cultivableField: DataTypes.FLOAT,
    vegetationField: DataTypes.FLOAT,
    owner: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Farm',
    tableName: 'farm',
  },
);

interface HarvestAttributes {
  id: number;
  year: number;
  culture: string;
  farm: number;
}

type HarvestCreationAttributes = Optional<HarvestAttributes, 'id'>;

class Harvest
  extends Model<HarvestAttributes, HarvestCreationAttributes>
  implements HarvestAttributes
{
  public id!: number;
  public year!: number;
  public culture!: string;
  public farm!: number;
}

Harvest.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    year: DataTypes.INTEGER,
    culture: DataTypes.STRING,
    farm: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Harvest',
    tableName: 'harvest',
  },
);

// --- Associações ---
Producer.hasMany(Farm, { foreignKey: 'owner' });
Farm.belongsTo(Producer, { foreignKey: 'owner' });

Farm.hasMany(Harvest, { foreignKey: 'farm' });
Harvest.belongsTo(Farm, { foreignKey: 'farm' });

// --- Seed Function ---
async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    for (let i = 0; i < 100; i++) {
      const producer = await Producer.create({
        cpfOrCnpj: faker.string
          .numeric(11)
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
        name: faker.person.fullName(),
      });

      for (let j = 0; j < 2; j++) {
        const fieldSize = faker.number.float({
          min: 50,
          max: 500,
        });
        const cultivableField = faker.number.float({
          min: 10,
          max: fieldSize,
        });
        const vegetationField = Number(
          (fieldSize - cultivableField).toFixed(2),
        );

        const farm = await Farm.create({
          name: faker.company.name(),
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          fieldSize,
          cultivableField,
          vegetationField,
          owner: producer.dataValues.id,
        });

        for (let k = 0; k < 3; k++) {
          await Harvest.create({
            year: faker.number.int({ min: 2000, max: 2100 }),
            culture: faker.helpers.arrayElement([
              'Soja',
              'Milho',
              'Café',
              'Trigo',
              'Algodão',
            ]),
            farm: farm.dataValues.id,
          });
        }
      }
    }

    console.log('✅ Banco populado com sucesso!');
    await sequelize.close();
  } catch (error) {
    console.error('❌ Erro ao popular o banco:', error);
  }
}

seedDatabase();

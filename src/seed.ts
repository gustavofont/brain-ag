import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { faker } from '@faker-js/faker';

const numberOfProducers = 100;
const farmsByProducr = 2;
const harverstByFarm = 3;

/**
 * Generates N distinct year
 * @param N Number os distinct years
 * @param min Year min
 * @param max Year max
 * @returns Array os years
 */
function generateDistinctYear(N: number, min: number, max: number): number[] {
  const distinctNumbers = new Set<number>();

  while (distinctNumbers.size < N) {
    const num = faker.number.int({ min, max });
    distinctNumbers.add(num);
  }

  return Array.from(distinctNumbers);
}

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
    fieldSize: DataTypes.INTEGER,
    cultivableField: DataTypes.INTEGER,
    vegetationField: DataTypes.INTEGER,
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
    for (let i = 0; i < numberOfProducers; i++) {
      const producer = await Producer.create({
        cpfOrCnpj: faker.string
          .numeric(11)
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
        name: faker.person.fullName(),
      });

      for (let j = 0; j < farmsByProducr; j++) {
        const fieldSize = faker.number.int({
          min: 50,
          max: 500,
        });
        const cultivableField = faker.number.int({
          min: 10,
          max: fieldSize,
        });
        const vegetationField = Number(fieldSize - cultivableField);

        const farm = await Farm.create({
          name: faker.company.name(),
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          fieldSize,
          cultivableField,
          vegetationField,
          owner: producer.dataValues.id,
        });

        const harvestYear = generateDistinctYear(harverstByFarm, 2000, 2100);

        for (let k = 0; k < harverstByFarm; k++) {
          await Harvest.create({
            year: harvestYear[k],
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

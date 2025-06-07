import { CreateFarmDto } from './dto/create-farm.dto';
import { CreateHarvestDto } from '@src/harvest/dto/create-harvest.dto';

type Farm = {
  dataValues: CreateFarmDto & { harvests: { dataValues: CreateHarvestDto }[] };
};

type FarmStatistics = {
  totalFarms: number;
  totalHectares: number;
  percentageByState: Record<string, number>;
  percentageByCultureByYear: Record<string, Record<string, number>>;
  percentageLandUse: {
    cultivable: number;
    vegetation: number;
  };
};

/**
 * Returns farms Estatistics
 * @param farms Array of Farms
 * @returns Object of estatistics
 */
export function farmStatistics(farms: Farm[]): FarmStatistics {
  // Calculates number of farms
  const totalFarms = farms.length;
  let totalHectares = 0;

  const hectaresByState: Record<string, number> = {};

  let totalCultivable = 0;
  let totalVegetation = 0;

  const hectaresByCultureByYear: Record<string, Record<string, number>> = {};
  const totalCultivableHectaresByYear: Record<string, number> = {};

  farms.forEach(({ dataValues: farm }) => {
    const state = farm.state;
    const fieldSize = farm.fieldSize;
    const cultivable = farm.cultivableField;
    const vegetation = farm.vegetationField;

    totalHectares += fieldSize;

    // Add sum to state record
    hectaresByState[state] = (hectaresByState[state] || 0) + fieldSize;

    // Harvest
    farm.harvests.forEach(({ dataValues: harvest }) => {
      const year = harvest.year.toString();
      const culture = harvest.culture;

      // Add Year if is missing
      if (!hectaresByCultureByYear[year]) {
        hectaresByCultureByYear[year] = {};
        totalCultivableHectaresByYear[year] = 0;
      }
      // Sum cultivableField
      hectaresByCultureByYear[year][culture] =
        (hectaresByCultureByYear[year][culture] || 0) + cultivable;
      totalCultivableHectaresByYear[year] += cultivable;
    });

    // Uso do solo
    totalCultivable += cultivable;
    totalVegetation += vegetation;
  });

  const percentageByState = Object.fromEntries(
    Object.entries(hectaresByState).map(([key, value]) => [
      key,
      (value / totalHectares) * 100,
    ]),
  );

  const percentageByCultureByYear: Record<string, Record<string, number>> = {};
  for (const [year, cultureMap] of Object.entries(hectaresByCultureByYear)) {
    const totalYearCultivableHectares = totalCultivableHectaresByYear[year];
    percentageByCultureByYear[year] = {};
    for (const [culture, value] of Object.entries(cultureMap)) {
      percentageByCultureByYear[year][culture] =
        (value / totalYearCultivableHectares) * 100;
    }
  }

  const percentageLandUse = {
    cultivable: (totalCultivable / totalHectares) * 100,
    vegetation: (totalVegetation / totalHectares) * 100,
    unused: 0,
  };

  percentageLandUse.unused =
    100 - percentageLandUse.cultivable - percentageLandUse.vegetation;

  return {
    totalFarms,
    totalHectares,
    percentageByState,
    percentageByCultureByYear,
    percentageLandUse,
  };
}

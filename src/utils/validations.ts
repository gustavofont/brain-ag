import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';

/**
 * Validates producerCreate data
 * @param input Object
 * @returns Zod schema
 */
export const validateProducerCreate = (input: unknown) => {
  const schema = z
    .object({
      name: z.string().min(2, 'Nome muito curto'),
      cpfOrCnpj: z
        .string()
        .transform((value) => value.replace(/[^\d]/g, '')) // clear data
        .refine((value) => cpf.isValid(value) || cnpj.isValid(value), {
          message: 'CPF ou CNPJ inválido',
        }),
    })
    .strict(); // Do not allow other keys

  return schema.safeParse(input);
};

/**
 * Validates producerCreate data
 * @param input Object
 * @returns Zod schema
 */
export const validateProducerUpdate = (input: unknown) => {
  const schema = z
    .object({
      name: z.string().min(2, 'Name to short').optional(),
      cpfOrCnpj: z
        .string()
        .transform((value) => value.replace(/[^\d]/g, '')) // clear data
        .refine((value) => cpf.isValid(value) || cnpj.isValid(value), {
          message: 'Invalid CPF/CNPJ ',
        })
        .optional(),
    })
    .strict(); // Do not allow other keys

  return schema.safeParse(input);
};

/**
 * Validates farmCreate data
 * @param input Object
 * @returns Zod schema
 */
export const validateFarmCreate = (input: unknown) => {
  const schema = z
    .object({
      name: z.string().min(2, 'Name to short'),
      city: z.string().min(2, 'City name to short'),
      state: z.string().min(2, 'State name to short'),
      fieldSize: z.number(),
      cultivableField: z.number(),
      vegetationField: z.number(),
      owner: z.number(),
    })
    .strict(); // Do not allow other keys

  return schema.safeParse(input);
};

/**
 * Validates farmCreate data
 * @param input Object
 * @returns Zod schema
 */
export const validateFarmUpdate = (input: unknown) => {
  const schema = z
    .object({
      name: z.string().min(2, 'Name to short').optional(),
      city: z.string().min(2, 'City name to short').optional(),
      state: z.string().min(2, 'State name to short').optional(),
      fieldSize: z.number().optional(),
      cultivableField: z.number().optional(),
      vegetationField: z.number().optional(),
      owner: z.number().optional(),
    })
    .strict(); // Do not allow other keys

  return schema.safeParse(input);
};

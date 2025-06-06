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
      name: z.string().min(2, 'Nome muito curto').optional(),
      cpfOrCnpj: z
        .string()
        .transform((value) => value.replace(/[^\d]/g, '')) // clear data
        .refine((value) => cpf.isValid(value) || cnpj.isValid(value), {
          message: 'CPF ou CNPJ inválido',
        })
        .optional(),
    })
    .strict(); // Do not allow other keys

  return schema.safeParse(input);
};

import { z } from 'zod';

// Auth validation
export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Zadejte platnou emailovou adresu' })
    .max(255, { message: 'Email musí být kratší než 255 znaků' }),
  password: z
    .string()
    .min(6, { message: 'Heslo musí mít alespoň 6 znaků' })
    .max(100, { message: 'Heslo musí být kratší než 100 znaků' }),
});

// Newsletter validation
export const newsletterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Název newsletteru je povinný' })
    .max(200, { message: 'Název musí být kratší než 200 znaků' }),
  blocks: z.array(z.any()).max(50, { message: 'Newsletter může mít maximálně 50 bloků' }),
});

// Rich text validation
export const richTextSchema = z
  .string()
  .max(10000, { message: 'Text musí být kratší než 10 000 znaků' });

// Image upload validation
export const imageUploadSchema = z.object({
  filename: z.string().max(255),
  original_name: z.string().max(255),
  file_size: z.number().max(5 * 1024 * 1024, { message: 'Soubor musí být menší než 5MB' }),
  mime_type: z.string().refine(type => type.startsWith('image/'), {
    message: 'Soubor musí být obrázek',
  }),
});

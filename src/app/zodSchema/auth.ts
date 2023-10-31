import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Name must contain at least 3 character'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, ' password must contain at least 8 character'),
});
export const productSchema = z.object({
  id: z.string(), // You can use z.number() for numerical IDs
  name: z.string().min(3, 'Name must contain at least 3 characters'),
  price: z.number().positive('Price must be a positive number'),
  description: z.string().min(10, 'Description must contain at least 10 characters'),
  image: z.string().url('Invalid image URL format'),
  // Add more properties based on your product structure
});

export type loginFormData = z.infer<typeof loginSchema>;
export type registerFormData = z.infer<typeof registerSchema>;
export type productFormData = z.infer<typeof productSchema>;

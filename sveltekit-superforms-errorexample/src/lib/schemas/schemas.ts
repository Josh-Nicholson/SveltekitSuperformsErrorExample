import { z } from 'zod';

export const createUserSchema = z
	.object({
		username: z
			.string({ required_error: 'Username is required' })
			.min(2, { message: 'Username must be at least 2 characters' })
			.max(64, { message: 'Username must be 64 characters or less' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(12, { message: 'Password must be at least 12 characters' })
			.regex(new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+)$/), {
				message: 'Password must contain at least one letter and one number (symbols are optional)'
			}),
		confirmPassword: z.string({ required_error: 'Confirm Password is required' }),
		roles: z.string().array().nonempty({ message: 'User must have at least one role' })
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match!',
				path: ['confirmPassword']
			});
		}
	});

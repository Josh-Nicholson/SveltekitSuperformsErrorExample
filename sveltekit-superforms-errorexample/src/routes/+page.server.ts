import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';
import { createUserSchema } from '../lib/schemas/schemas';

///// Load //////////////////////////////////////////////////////////

export const load: PageServerLoad = async () => {
	const form = await superValidate(createUserSchema);
	return { form };
};

///// Form actions //////////////////////////////////////////////////

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, createUserSchema);

		console.log('POST', form);

		if (!form.valid) return fail(400, { form });

		return { form };
	}
};

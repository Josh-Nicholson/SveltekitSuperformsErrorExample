<script lang="ts">
	import type { FieldPath, UnwrapEffects } from 'sveltekit-superforms';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import type { z, AnyZodObject } from 'zod';

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<UnwrapEffects<T>, unknown>;
	export let field: keyof z.infer<T> | FieldPath<z.infer<T>>;
	export let label = '';
	export let labelClasses = '';
	const { path, value, errors, constraints } = formFieldProxy(form, field);
</script>

<label class="label {labelClasses}">
	{label}
	<input
		class="input {$errors ? 'input-error' : ''}"
		type="text"
		data-invalid={$errors}
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
	/>
</label>
{#if $errors}
	<div class="flex flex-col">
		{#each $errors as error}
			<span class="flex text-red-500 font-medium">{error}</span>
		{/each}
	</div>
{/if}

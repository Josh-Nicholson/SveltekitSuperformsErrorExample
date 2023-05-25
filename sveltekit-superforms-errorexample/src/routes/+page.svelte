<script lang="ts">
  import { page } from '$app/stores';
  import { formFieldProxy, superForm } from 'sveltekit-superforms/client';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { createUserSchema } from '../lib/schemas/schemas.js';
	import TextField from '../lib/components/TextField.svelte';
	import PasswordField from '../lib/components/PasswordField.svelte';
	import type { PageData } from './$types.js';

  export let data: PageData;

  const grantableRoles = ["Basic", "Admin", "SuperAdmin"];

  const form = superForm(data.form, {
		validators: createUserSchema,
		defaultValidator: 'clear'
	});
	const enhance = form.enhance;
	const { value: rolesValue, errors: rolesErrors } = formFieldProxy(form, 'roles');
	const debug = form.form;
</script>

<h3>Superforms bug reporting</h3>

<SuperDebug data={$debug} />

<form method="POST" use:enhance>
  <label for="username">
    Username
    <TextField {form} field="username" name="username" />
  </label>

  <label for="password">
    Password
    <PasswordField {form} field="password" name="password" />
  </label>

  <label for="confirmPassword">
    Confirm Password
    <PasswordField {form} field="confirmPassword" name="confirmPassword" />
  </label>

  {#each grantableRoles as role}
    <label>
      <input
        type="checkbox"
        class="checkbox"
        bind:group={$rolesValue}
        name="roles"
        value={role}
      />
      {role}
    </label>
  {/each}
  {#if $rolesErrors}
    {#each $rolesErrors as error}
      <label for="profileImage" class="label py-0">
        <div class="flex text-red-500 font-medium">{error}</div>
      </label>
    {/each}
  {/if}
  <button>Submit</button>
</form>



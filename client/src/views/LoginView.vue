<script setup>
import { useAuthStore } from '@/stores'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'

const authStore = useAuthStore()

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const onSubmit = ({ username, password }, { setErrors }) => {
  return authStore
    .login(username, password)
    .catch((error) => setErrors({ apiError: error }))
}
</script>

<template>
  <div class="view">
    <header class="alert">
      Username: test <br />
      Password: test
    </header>
    <h2>Login</h2>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="form"
      v-slot="{ errors, isSubmitting }"
    >
      <fieldset class="user">
        <label>Username</label>
        <Field name="username" type="text" />
        <Transition name="error">
          <small v-show="errors.username" class="invalid">
            {{ errors.username }}
          </small>
        </Transition>
      </fieldset>
      <fieldset class="pass">
        <label>Password</label>
        <Field name="password" type="password" />
        <Transition name="error">
          <small v-show="errors.password" class="invalid">
            {{ errors.password }}
          </small>
        </Transition>
      </fieldset>
      <button class="submit" :disabled="isSubmitting">
        <span v-show="isSubmitting" class="loading">loading...</span>
        Login
      </button>
      <div v-if="errors.apiError" class="invalid">
        {{ errors.apiError }}
      </div>
    </Form>
  </div>
</template>

<style scoped>
form {
  display: grid;
  grid-template-areas:
    'user pass'
    'user pass'
    'submit submit';
}

fieldset {
  margin-bottom: 2rem;
}

.user {
  grid-area: user;
}

.pass {
  grid-area: pass;
}

.invalid {
  position: absolute;
}

.alert {
  position: fixed;
  top: 1rem;
  right: 1rem;
}

.submit {
  position: absolute;
  bottom: 1rem;
  justify-self: flex-end;
}

.error-enter-active {
  transition: all 0.3s ease-out;
}

.error-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.error-enter-from,
.error-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

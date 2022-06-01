<template>
  <div class="flex flex-wrap bg-gray-800">
    <div class="bg-gray-900">
      <div class="flex flex-col justify-around items-center py-8">
        <img
          class="w-32 rounded-full my-4"
          src="~/assets/logos/logo.png"
          alt=""
        />
        <h1 class="text-5xl font-thin p-2">Box</h1>
      </div>

      <div class="flex flex-wrap justify-around items-center">
        <div
          v-if="!manage"
          class="flex flex-wrap justify-around items-center text-center bg-gray-800 h-auto p-4 rounded-lg"
        >
          <p class="w-full">Login or Register</p>
          <div
            class="flex flex-wrap justify-around items-center py-2 px-4 mb-2 rounded"
          >
            <button
              class="flex justify-center items-center w-full hidden md:block md:w-1/3 hover:bg-gray-700 rounded p-2 m-2"
              @click="getStarted('metamask')"
            >
              <img
                class="w-32"
                src="~/assets/svg/metamask.svg"
                alt="Metamask"
              />
            </button>
            <!-- <button class="flex justify-center items-center w-full md:w-1/3 hover:bg-gray-700 rounded p-2 m-2" @click="getStarted()">
              <img class="w-32" src="~/assets/logos/LOGO.png" alt="authic">
            </button> -->
          </div>
        </div>
      </div>
      <div v-if="manage" class="flex flex-wrap justify-around items-center">
        <section
          class="w-full md:w-1/3 bg-gray-800 shadow-inner rounded-xl p-2 m-4"
        >
          <div
            class="flex flex-wrap w-full"
            @submit="manage === 'login' ? login() : register()"
          >
            <input
              v-model="username"
              class="w-full bg-transparent p-4 active:border-b border-gray-600"
              placeholder="Username"
            />
            <input
              v-if="manage === 'register'"
              v-model="mail"
              class="w-full bg-transparent p-4 active:border-b border-gray-600"
              placeholder="E-Mail"
            />
            <input
              v-model="password"
              class="w-full bg-transparent p-4 active:border-b border-gray-600"
              placeholder="Password"
              type="password"
            />
            <input
              v-if="manage === 'register'"
              v-model="password2"
              class="w-full bg-transparent p-4 active:border-b border-gray-600"
              placeholder="Confirm Password"
              type="password"
            />
            <button
              v-if="full()"
              class="w-full bg-green-600 hover:bg-green-500 rounded-xl p-2 m-2"
              @click="manage === 'login' ? login() : register()"
            >
              {{ capitalizeFirstLetter(manage) }}
            </button>
          </div>
        </section>
        <button class="w-full text-center" @click="change()">
          {{ manage === 'login' ? 'Register instead' : 'Login instead' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      manage: '',
      username: '',
      mail: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.password2) {
          throw new Error('Passwords are not identical!')
        }

        await this.$account.register({
          username: this.username,
          mail: this.mail,
          password: this.password
        })

        // PW Strength Check

        this.$toast.success('Registered!')
        this.change()
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async login() {
      try {
        const user = await this.$account.logIn({
          username: this.username,
          password: this.password
        })

        if (user) {
          this.$router.push('/')
        }
      } catch (e) {
        this.$toast.error('Username or Password wrong!')
      }
    },
    async getStarted(providerName) {
      if (providerName === 'metamask') {
        const user = await this.$account.authenticate()
        if (user) {
          this.$router.push('/')
        }
      }
      this.manage = 'login'
    },
    change() {
      this.manage === 'login'
        ? (this.manage = 'register')
        : (this.manage = 'login')
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    full() {
      if (this.manage === 'login' && this.username && this.password) {
        return true
      } else if (
        this.manage === 'register' &&
        this.username &&
        this.mail &&
        this.password &&
        this.password2
      ) {
        return true
      }
    }
  }
}
</script>

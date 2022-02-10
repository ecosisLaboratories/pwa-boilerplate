<template>
  <main class="container mx-auto px-4 lg:px-8 pt-4 h-screen">
    <div class="flex flex-wrap relative">
      <nuxt class="max-h-screen overflow-y-scroll w-full lg:w-4/5" />
    </div>
    <app-switch-theme />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import AppSwitchTheme from '~/components/AppSwitchTheme.vue'

export default defineComponent({
  components: {
    AppSwitchTheme
  },
  setup() {
    const links = ref([
      { to: '/', text: 'Home' },
      { to: '/random-image', text: 'Random Image' }
    ])
    return {
      links
    }
  },
  head() {
    return {
      bodyAttrs: {
        class:
          'antialiased text-gray-700 leading-normal bg-white dark:bg-gray-900 dark:text-gray-300'
      }
    }
  }
})
</script>

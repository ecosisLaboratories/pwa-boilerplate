<template>
  <div class="h-screen safe-top safe-left safe-right safe-bottom">
    <nav
      class="flex flex-row-reserve w-full container mx-auto px-4 lg:px-8 pb-2"
    >
      <AppSwitchTheme />
    </nav>
    <main class="disable-scrollbars max-h-screen h-full overflow-y-scroll p-4">
      <nuxt
        class="container mx-auto bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white rounded rounded-full p-8"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import AppSwitchTheme from '~/components/AppSwitchTheme.vue'

export default defineComponent({
  components: {
    AppSwitchTheme
  },
  setup() {
    const links = ref([{ to: '/', text: 'Home' }])
    return {
      links
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'antialiased text-gray-700 dark:text-white leading-normal'
      }
    }
  }
})
</script>

<style>
body {
  @apply gradient;
}

input {
  @apply outline-none;
}
textarea {
  @apply outline-none;
}

.gradient {
  background: radial-gradient(circle at 80% 20%, #31493c 0%, #011638 100%);
  background-attachment: fixed;
}
</style>

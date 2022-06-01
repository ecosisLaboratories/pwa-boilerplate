<template>
  <section>
    <div class="">hi</div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { useText, useMousePosition } from '~/compositions'

export default defineComponent({
  setup() {
    const {
      app: { $accessor }
    } = useContext()

    useAsync(() => $accessor.GET_USER(), 'get-user')

    const { text } = useText($accessor)

    const { x: coordinateX, y: coordinateY } = useMousePosition()

    return {
      coordinateX,
      coordinateY,
      text
    }
  },
  head() {
    return {
      title: 'Home'
    }
  }
})
</script>

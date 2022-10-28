<template>

</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import http from '@/plugins/axios'

export default {
  name: 'Login',
  setup() {
    const state = reactive({

    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss">

</style>
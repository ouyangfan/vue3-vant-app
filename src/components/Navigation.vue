<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="home">首页</van-tabbar-item>
    <van-tabbar-item icon="cart-o" name="shopping-cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="orders-o" name="orders">订单</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="personal">我的</van-tabbar-item>
  </van-tabbar>

</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import http from '@/plugins/axios'
import { useRouter } from 'vue-router'

export default {
  name: 'Navigation',
  props: ['currentIndex'],
  setup(props: any) {
    const state = reactive({
      active: props.currentIndex,
    })
    const router = useRouter()
    const onChange = (value: string) => {
      router.push({ path: '/' + value })

    }

    return {
      ...toRefs(state),
      onChange
    }
  }
}
</script>

<style lang="scss">

</style>
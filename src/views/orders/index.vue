<template>
  <van-nav-bar title="我的订单" />
  <div class="orders">
    <div class="order-detail" v-for="item in orderList" :key="item.shopId">
      <div class="order__title">{{ item.shopName }} <span class="order__status">已下单</span></div>
      <div class="order__content">
        <div class="order__content__imgs">
          <img class="order__content__img" v-for="(p, index) in item.products" :key="index"
            :src="`/src/assets/cart/${p.product.imgUrl}`">
        </div>
        <div class="order__content__info">
          <div class="order__content__price">¥ {{ getTotal(item.products, 'price') }}</div>
          <div class="order__content__count">共 {{ getTotal(item.products, 'count') }} 件</div>
        </div>
      </div>
    </div>
  </div>
  <Navigation currentIndex="orders"></Navigation>

</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import http from '@/plugins/axios'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Personal', components: { Navigation },
  setup() {
    const state = reactive({
      orderList: [] as any
    })

    http.get('/order').then((res: any) => {
      state.orderList = res
    })

    const getTotal = (products: any, type: string) => {
      if (type === 'count') {
        return products.reduce((previousValue: number, current: any) => {
          return previousValue + current.orderSales
        }, 0)
      } else if (type === 'price') {
        const totalPrice = products.reduce((previousValue: number, current: any) => {
          return previousValue + current.product.price * current.orderSales
        }, 0)
        return totalPrice.toFixed(2)
      }
    }

    return {
      ...toRefs(state),
      getTotal
    }
  }
}
</script>

<style lang="scss">
.order-detail {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background: #FFF;

  .order__title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: #333;

    .order__status {
      float: right;
      font-size: 0.14rem;
      color: #999;
    }
  }

  .order__content {
    display: flex;

    .order__content__imgs {
      flex: 1;

      .order__content__img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.12rem;
      }
    }

    .order__content__info {
      width: .7rem;

      .order__content__price {
        margin-bottom: 0.04rem;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #E93B3B;
        text-align: right;
      }

      .order__content__count {
        line-height: 0.14rem;
        font-size: 0.12rem;
        color: #333;
        text-align: right;
      }
    }
  }
}
</style>
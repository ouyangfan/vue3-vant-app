<template>
  <van-nav-bar title="我的全部购物车" />

  <div class="shops">
    <div class="">
      <div class="shop__title">沃尔玛</div>
      <div class="products">
        <div class="products__list">
          <div class="products__item" v-for="(value, key) in cartProducts" :key="key">
            <img class="products__item__img" :src="`/src/assets/cart/${value.img}`">
            <div class="products__item__detail">
              <h4 class="products__item__title">{{ value.name }}</h4>
              <p class="products__item__price">
                <span>
                  <span class="products__item__yen">¥ </span>
                  {{ value.price }} x {{ value.count }}
                </span>
                <span class="products__item__total">
                  <span class="products__item__yen">¥ </span>
                  {{ value.price * value.count}}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Navigation currentIndex="shopping-cart"></Navigation>
</template>

<script lang="ts">
import { reactive, ref, toRefs, computed } from 'vue'
import http from '@/plugins/axios'
import Navigation from '@/components/Navigation.vue'
import { useStore } from 'vuex'

export default {
  name: 'ShopCart',
  components: { Navigation },
  setup() {
    const store = useStore()
    const state = reactive({
      cartProducts: computed(() => store.state.cartProducts),
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.shops {
  overflow-y: scroll;
  position: absolute;
  top: 0.6rem;
  right: 0.18rem;
  bottom: 0.1rem;
  left: 0.18rem;
  background: #FFF;

  .shop__title {
    padding: 0.16rem;
    font-size: 0.16rem;
    color: #333;
  }

  .products {
    .products__item {
      position: relative;
      display: flex;
      padding: 0 0.16rem 0.16rem 0.16rem;

      .products__item__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }

      .products__item__detail {
        flex: 1;

        .products__item__title {
          margin: 0;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .products__item__price {
          display: flex;
          margin: 0.06rem 0 0 0;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #E93B3B;

          .products__item__total {
            flex: 1;
            text-align: right;
            color: #000;

            .products__item__yen {
              font-size: 0.12rem;
            }
          }
        }
      }
    }
  }
}
</style>
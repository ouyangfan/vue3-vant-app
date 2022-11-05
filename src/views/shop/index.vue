<template>
  <div class="shop-wrapper">
    <div class="wrapper__header">
      <van-icon name="arrow-left" @click="onClickLeft" />
      <van-search v-model="keywords" shape="round" placeholder="请输入商品名称……" />
    </div>
    <!-- 商家 -->
    <div class="shop">
      <img src="/src/assets/home/near.png" class="shop__img" />
      <div class="shop__content">
        <div class="shop__content__title">沃尔玛</div>
        <div class="shop__content__tags">
          <span class="shop__content__tag">月售: 1000</span>
          <span class="shop__content__tag">起送: 0</span>
          <span class="shop__content__tag">基础运费: 5</span>
        </div>
        <p class="shop__content__highlight">VIP尊享满89元减4元运费券</p>
      </div>
    </div>
  </div>
  <!-- 详情 -->
  <div class="tree-select">
    <van-tree-select v-model:main-active-index="activeIndex" :items="items" height="calc(100vh - 198px)">
      <template #content>
        <div class="product">
          <div class="product__item" v-for="item in list" :key="item._id">
            <img class="product__item__img" :src="`/src/assets/cart/${item.img}`" />
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ item.name }}</h4>
              <p class="product__item__sales">月售 {{ item.sales }} 件</p>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{ item.price }}
                <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
              </p>
            </div>
            <div class="product__number">
              <i class="fa fa-minus-square-o" @click="changeCart(item, 'minus')"></i>
              <span class="ml-5 mr-5">{{ cartProducts[item._id]?.count || 0 }}</span>
              <i class="fa fa-plus-square primary-text" @click="changeCart(item, 'plus')"></i>
            </div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
  <!-- 底部购物车 -->
  <div class="mask" v-show="showCartDetail && Object.keys(cartProducts).length" @click="showCartDetail = false"></div>
  <div class="cart">
    <div class="product" v-show="showCartDetail && Object.keys(cartProducts).length">
      <div class="product__header">
        <div class="product__header__all">
          <van-checkbox v-model="allChecked" icon-size="14px" @click="toggleAllChecked">全选</van-checkbox>
        </div>
        <div class="product__header__clear">
          <span @click="clearCart">清空购物车</span>
        </div>
      </div>
      <div class="product__item" v-for="(value, key) in cartProducts" :key="key">
        <van-checkbox v-model="value.checked" icon-size="14px" @click="changeSingleChecked(value.checked)">
        </van-checkbox>
        <img class="product__item__img ml-10" :src="`/src/assets/cart/${value.img}`" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ value.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">¥</span>{{ value.price }}
            <span class="product__item__origin">¥{{ value.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <i class="fa fa-minus-square-o" @click="changeCart(value, 'minus')"></i>
          <span class="ml-5 mr-5">{{ value.count }}</span>
          <i class="fa fa-plus-square primary-text" @click="changeCart(value, 'plus')"></i>
        </div>
      </div>
    </div>

    <div class="check">
      <div class="check__icon" @click="toggleCartDetail">
        <img src="/src/assets/cart/basket.png" class="check__icon__img" />
        <div class="check__icon__tag">
          {{ Object.keys(cartProducts).length }}
        </div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price"> ¥ {{ totalPrice }} </span>
      </div>
      <div class="check__btn">
        <router-link :to="{ path: `/order-confirmation/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs, watchEffect, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import http from '@/plugins/axios'

const useCartEffect = () => {
  const store = useStore()
  const state = reactive({
    allChecked: true,
    cartProducts: computed(() => store.state.cartProducts),
    totalPrice: computed(() => store.getters.totalPrice)
  })
  const changeCart = (item: any, type: string) => {
    const id = state.cartProducts[item._id]
    if (id) {
      let count = state.cartProducts[item._id].count
      state.cartProducts[item._id].count = type === 'plus' ? ++count : count >= 1 ? --count : 0
    } else {
      state.cartProducts[item._id] = {
        ...item,
        count: type === 'plus' ? 1 : 0,
        checked: true
      }
    }
    store.commit('setCartProducts', state.cartProducts)
  }
  const toggleAllChecked = () => {
    Object.keys(state.cartProducts).forEach((key: string) => {
      state.cartProducts[key].checked = state.allChecked
    })
  }
  const changeSingleChecked = (value: boolean) => {
    const flag = Object.keys(state.cartProducts).every((key: string) => state.cartProducts[key].checked === value)
    state.allChecked = flag
  }
  return {
    ...toRefs(state),
    changeCart,
    toggleAllChecked,
    changeSingleChecked,
  }
}

export default {
  name: 'Shop',
  setup() {
    const route = useRoute()
    const store = useStore()

    const state = reactive({
      keywords: '',
      items: [
        { text: '全部商品', category: 'all' },
        { text: '五谷杂粮', category: 'grain' },
        {
          text: '新鲜蔬菜',
          category: 'vegetable'
        },
        { text: '新鲜水果', category: 'fruit' },
        { text: '海鲜', category: 'seafood' }
      ] as any,
      activeIndex: 0,
      list: [] as any,
      shopId: route.params.id,
      showCartDetail: false
    })

    const onClickLeft = () => history.back();
    const getContentData = (category: string = 'all') => {
      const id = route.params.id
      http.get(`/shop/${id}/products?tab=${category}`).then((res: any) => {
        state.list = res
      })
    }
    watchEffect(() => {
      const index = state.activeIndex
      const category = state.items[index].category
      getContentData(category)
    })

    const toggleCartDetail = () => {
      state.showCartDetail = !state.showCartDetail
    }
    const clearCart = () => {
      store.commit('setCartProducts', {})
    }

    // 购物车业务逻辑
    const {
      allChecked,
      cartProducts,
      totalPrice,
      changeCart,
      toggleAllChecked,
      changeSingleChecked,
    } = useCartEffect()

    return {
      ...toRefs(state),
      onClickLeft,
      getContentData,
      allChecked,
      cartProducts,
      totalPrice,
      changeCart,
      toggleCartDetail,
      toggleAllChecked,
      changeSingleChecked,
      clearCart
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-wrapper {
  padding: 16px 20px 0 20px;
  font-size: 0.14rem;

  .wrapper__header {
    display: flex;

    .van-icon-arrow-left {
      line-height: 34px;
    }

    .van-search {
      padding: 0 0 0 20px;
      width: 100%;
    }
  }
}

.tree-select {
  .van-sidebar {}

  .van-tree-select__nav {
    flex: none;
  }

  .product {
    overflow-y: scroll;
    flex: 1;

    .product__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 0.01rem solid #f1f1f1;

      &__img {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
      }

      &__detail {
        overflow: hidden;

        .product__item__title {
          margin: 0;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .product__item__sales {
          margin: 0.06rem 0;
          font-size: 0.12rem;
          color: #333;
        }

        .product__item__price {
          margin: 0;
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #e93b3b;
        }
      }

      .product__number {
        position: absolute;
        right: 0;
        bottom: 0.12rem;
        line-height: 0.18rem;
      }
    }
  }
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;

  .product {
    .product__header {
      display: flex;
      line-height: 0.52rem;
      border-bottom: 0.01rem solid #f1f1f1;
      font-size: 0.14rem;
      color: #333;

      .product__header__all {
        width: 0.64rem;
        margin-left: 0.18rem;

        .van-checkbox {
          position: relative;
          top: 16px;
        }
      }

      .product__header__clear {
        flex: 1;
        margin-right: 0.16rem;
        text-align: right;
      }
    }

    .product__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 0.01rem solid #f1f1f1;

      .product__item__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }

      .product__item__title {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .product__item__price {
        margin: 0.06rem 0 0 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #e93b3b;
      }

      .product__number {
        position: absolute;
        right: 0;
        bottom: 0.26rem;
      }
    }
  }

  .check {
    display: flex;
    height: 0.49rem;
    border-top: 0.01rem solid #f1f1f1;
    line-height: 0.49rem;

    .check__icon {
      position: relative;
      width: 0.84rem;
    }

    .check__icon__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }

    .check__icon__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: #e93b3b;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      transform: scale(0.5);
      transform-origin: left center;
    }

    .check__info {
      flex: 1;
      color: #333;
      font-size: 0.12rem;

      .check__info__price {
        line-height: 0.49rem;
        color: #e93b3b;
        font-size: 0.18rem;
      }
    }

    .check__btn {
      width: 0.98rem;
      background-color: #0091ff;
      text-align: center;
      font-size: 0.14rem;

      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
}

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.product__item__origin {
  margin-left: 0.06rem;
  line-height: 0.2rem;
  font-size: 0.12rem;
  color: #999;
  text-decoration: line-through;
}
</style>

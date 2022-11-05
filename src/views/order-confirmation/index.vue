<template>
  <!-- 确认订单 -->
  <div class="confirm-wrapper">
    <div class="top">
      <div class="top__header">
        <van-icon name="arrow-left " @click="onClickLeft" class="top__header__back" />
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div>
          <div class="top__receiver__address">北京海淀区西三环北路2号院北京理工大学国防科技园2号楼10号
          </div>
          <div class="top__receiver__info"><span class="top__receiver__info__name">小慕</span><span
              class="top__receiver__info__name">18611112222</span>
          </div>
        </div>
      </div>
    </div>
    <div class="products">
      <div class="products__title">沃尔玛</div>
      <div class="products__wrapper">
        <div class="products__list">
          <div class="products__item" v-for="(item, key) in cartProducts">
            <img :src="`/src/assets/cart/${item.img}`" alt="" class="products__item__img">
            <div class="products__item__detail">
              <h4 class="products__item__title">{{ item.name }}</h4>
              <p class="products__item__price">
                <span>
                  <span class="products__item__yen">¥ </span>
                  {{ item.price }} * {{ item.count }}
                </span>
                <span class="products__item__total">
                  <span class="products__item__yen">¥ </span>
                  {{ (item.price * item.count).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order__price">
        实付金额
        <b>¥ {{ totalPrice }}</b>
      </div>
      <div class="order__btn" @click="confirm">提交订单</div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs, computed } from 'vue'
import http from '@/plugins/axios'
import { useStore } from 'vuex'
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      cartProducts: store.state.cartProducts,
      totalPrice: store.getters.totalPrice
    })

    const onClickLeft = () => history.back();

    const confirm = () => {
      Dialog.confirm({
        title: '确认要离开收银台吗？',
        confirmButtonText: '确认支付',
        cancelButtonText: '取消订单',
        message:
          '请尽快完成支付，否则将被取消',
      })
        .then(() => {
          // on confirm
          router.push({ name: 'Orders' })
        })
        .catch(() => {
          // on cancel
        });
    }

    return {
      ...toRefs(state),
      onClickLeft,
      confirm
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-wrapper {
  height: 100vh;
  background-color: #F8F8F8;

  .top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091FF 50%);
    background-repeat: no-repeat;

    .top__header {
      position: relative;
      padding-top: 0.2rem;
      line-height: 0.24rem;
      color: #FFF;
      text-align: center;
      font-size: 0.16rem;

      .top__header__back {
        position: absolute;
        left: 0.18rem;
        font-size: 0.22rem;
      }
    }

    .top__receiver {
      position: absolute;
      left: 0.18rem;
      right: 0.18rem;
      bottom: 0;
      height: 1.11rem;
      background: #FFF;
      border-radius: 0.04rem;

      .top__receiver__title {
        line-height: 0.22rem;
        padding: 0.16rem 0 0.14rem 0.16rem;
        font-size: 0.16rem;
        color: #333;
      }

      .top__receiver__address {
        line-height: 0.2rem;
        padding: 0 0.4rem 0 0.16rem;
        font-size: 0.14rem;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .top__receiver__info {
        padding: 0.06rem 0 0 0.16rem;

        .top__receiver__info__name {
          margin-right: 0.06rem;
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: #666;
        }
      }
    }
  }

  .products {
    margin: 0.16rem 0.18rem 0.1rem 0.18rem;
    background: #FFF;

    .products__title {
      padding: 0.16rem;
      font-size: 0.16rem;
      color: #333;
    }

    .products__wrapper {
      overflow-y: scroll;
      margin: 0 0.18rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.6rem rem;
      top: 2.6rem;

      .products__list {
        background: #FFF;

        .products__item {
          position: relative;
          display: flex;
          padding: 0 0.16rem 0.16rem 0.16rem;
        }

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

  .order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    background: #FFF;

    .order__price {
      flex: 1;
      text-indent: 0.24rem;
      font-size: 0.14rem;
      color: #333;
    }

    .order__btn {
      width: 0.98rem;
      background: #0091FF;
      color: #FFF;
      text-align: center;
      font-size: 0.14rem;
    }
  }
}
</style>
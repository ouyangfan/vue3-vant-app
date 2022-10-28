<template>
  <div class="personal">
    <div class="header">
      <div class="header__info">
        <div class="header__info__user">
          Jack
        </div>
        <div class="header__info__id">
          ID:000001
        </div>
      </div>
      <img src="/src/assets/avatar.jpeg" alt="" class="header__avatar">
    </div>
    <van-cell-group inset>
      <van-cell title="我的地址" value="" icon="location-o" is-link @click="linkAddressList" />
    </van-cell-group>
    <div class="wrapper__logout">
      <van-button type="primary" round style="width:100%" @click="logout">退出登录</van-button>
    </div>
  </div>

  <Navigation currentIndex="personal"></Navigation>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/plugins/axios'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Personal', components: { Navigation },

  setup() {
    const state = reactive({

    })
    const router = useRouter()
    const logout = () => {
      localStorage.removeItem('isLogin')
      router.push({ path: '/login' })
    }
    const linkAddressList = () => {
      router.push({ path: '/address-list' })
    }
    return {
      ...toRefs(state),
      logout,
      linkAddressList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';

.personal {
  background-color: $dark-bgColor;
  height: 100vh;

  .header {
    position: relative;
    height: 1.5rem;
    background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
    padding-top: 0.4rem;
    margin-bottom: 20px;

    .header__info {
      margin: 0.3rem 0.18rem 0 0.18rem;
      padding-top: 0.46rem;
      height: 0.66rem;
      background: #FFF;
      border-radius: 0.08rem;

      .header__info__user {
        font-size: 0.24rem;
        color: #262628;
        text-align: center;
        line-height: 0.36rem;
      }

      .header__info__id {
        margin-top: 0.04rem;
        font-size: 0.14rem;
        color: #C1C0C9;
        text-align: center;
      }


    }

    .header__avatar {
      position: absolute;
      left: 50%;
      top: 0.2rem;
      transform: translateX(-50%);
      width: 0.94rem;
      height: 0.94rem;
      border-radius: 50%;
    }
  }

  .wrapper__logout {
    padding: 20px;
  }
}
</style>
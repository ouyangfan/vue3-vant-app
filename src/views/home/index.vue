<template>
  <div class="wrapper">
    <div class="position">
      <van-icon name="location-o" class="pull-left line-height-20" />
      <span class="ml-5 line-height-20"> 北京理工大学国防科技园2号楼19层</span>
      <van-icon name="comment-o" class="pull-right line-height-20" />
    </div>
    <div class="search">
      <van-search v-model="keywords" placeholder="山姆会员商店优惠商品" shape="round" />
    </div>
    <div class="banner">
      <img class="banner__img" src="@/assets/home/banner.jpg" />
    </div>

    <div class="category clearfix">
      <div class="category__item pull-left ">
        <img src="@/assets/home/超市.png" alt="" class="category__item__img">
        <p>超市便利</p>
      </div>
      <div class="category__item pull-left">
        <img src="@/assets/home/菜市场.png" alt="" class="category__item__img">
        <p>菜市场</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/水果.png" alt="" class="category__item__img">
        <p>水果店</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/鲜花.png" alt="" class="category__item__img">
        <p>鲜花绿植</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/医药.png" alt="" class="category__item__img">
        <p>医药健康</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/家居.png" alt="" class="category__item__img">
        <p>家居时尚</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/蛋糕.png" alt="" class="category__item__img">
        <p>烘焙蛋糕</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/签到.png" alt="" class="category__item__img">
        <p>签到</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/大牌免运.png" alt="" class="category__item__img">
        <p>大牌免运</p>
      </div>
      <div class="category__item pull-left ">
        <img src="@/assets/home/红包.png" alt="" class="category__item__img">
        <p>红包套餐</p>
      </div>
    </div>
  </div>

  <div class="nearby">
    <p class="nearby__title">附近店铺</p>

    <div class="shop" v-for="item in nearbyList" :key="item._id" @click="linkShop(item._id)">
      <img :src="`/src/assets/home/${item.imgUrl}`" class="shop__img">
      <div :class="{ 'shop__content': true, 'shop__content--bordered': true }">
        <div class="shop__content__title">{{ item.name }}</div>
        <div class="shop__content__tags">
          <span class="shop__content__tag">月售: {{ item.sales }}</span>
          <span class="shop__content__tag">起送: {{ item.expressLimit }}</span>
          <span class="shop__content__tag">基础运费: {{ item.expressPrice }}</span>
        </div>
        <p class="shop__content__highlight">{{ item.slogan}}</p>
      </div>
    </div>
  </div>


  <Navigation currentIndex="home"></Navigation>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/plugins/axios'
import Navigation from '@/components/Navigation.vue'
const useNearbyListEffect = () => {
  const nearbyList = ref([] as any);
  const getNearbyList = async () => {
    const result = await http.get('/shop/hot-list') as any;
    nearbyList.value = result
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Home',
  components: { Navigation },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();

    const router = useRouter()
    const linkShop = (id: number) => {
      router.push({ path: '/shop/' + id })

    }
    const state = reactive({
      keywords: '',
      nearbyList
    })

    return {
      ...toRefs(state),
      linkShop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';

.wrapper {

  .banner {
    .banner__img {
      width: 100%;
    }
  }

  .category {
    &__item {
      width: 20%;
      padding: 10px 6px;
      box-sizing: border-box;

      &__img {
        width: 100%;
      }

      p {
        text-align: center;
        font-size: .14em;
      }
    }
  }
}

.search .van-search {
  padding: 10px 0;
}

.nearby {
  padding: 0 20px 10px 20px;

  .van-card {
    background-color: #fff;
  }
}
</style>
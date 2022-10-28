<template>
  <van-nav-bar title="管理收货地址" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="warpper">
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
      :switchable="false" />
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import http from '@/plugins/axios'
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

export default {
  name: 'address-list',
  setup() {
    const state = reactive({
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ]
    })
    const router = useRouter()
    const onClickLeft = () => history.back();

    const onAdd = () => {
      router.push({ name: 'CreateAddress' })
    }
    const onEdit = (item: any, index: string) => {
      router.push({ name: 'UpdateAddress' })
    };

    return {
      ...toRefs(state),
      onClickLeft,
      onAdd,
      onEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.warpper {
  height: calc(100vh - .96em);
  background-color: #F8F8F8;
}
</style>
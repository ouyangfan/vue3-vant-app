<template>
  <van-nav-bar title="新建收货地址" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="warpper">
    <van-address-edit :area-list="areaList" show-postal show-set-default show-search-result
      :address-info="addressEditInfo" :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave" @delete="onDelete" />
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import http from '@/plugins/axios'
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';

export default {
  name: 'update-address',
  setup() {
    const state = reactive({
      areaList,
      searchResult: [] as any,
      addressEditInfo: {

      }
    })

    const onClickLeft = () => history.back();

    const onSave = () => Toast('save');
    const onDelete = () => Toast('delete');


    return {
      ...toRefs(state),
      onClickLeft,
      onSave,
      onDelete,

    }
  }
}
</script>

<style lang="scss" scoped>
.warpper {}
</style>
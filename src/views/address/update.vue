<template>
  <van-nav-bar title="编辑收货地址" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="warpper">
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
      :address-info="addressEditInfo" :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
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
        name: '张三',
        tel: '18734567890',
        province: '陕西省',
        city: '西安市',
        county: '碑林区',
        addressDetail: '北大街50号',
        areaCode: '610103',
        postalCode: '1234567',
        isDefault: true
      }
    })

    const onClickLeft = () => history.back();

    const onSave = () => Toast('save');
    const onDelete = () => Toast('delete');
    const onChangeDetail = (val: any) => {
      if (val) {
        state.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        state.searchResult = [];
      }
    }

    return {
      ...toRefs(state),
      onClickLeft,
      onSave,
      onDelete,
      onChangeDetail,
    }
  }
}
</script>

<style lang="scss" scoped>
.warpper {}
</style>
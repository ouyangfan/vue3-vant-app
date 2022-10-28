<template>
  <div class="user-wrapper">
    <img src="@/assets/user.png" alt="">
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
    </van-cell-group>
    <div style="margin: 16px 32px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
  <div class="login-link">
    <span @click="linkRegister">立即注册</span>
  </div>
</template>

<script lang="ts" >
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/plugins/axios'
import { Toast } from 'vant';

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const state = reactive({
      username: '',
      password: '',
    })

    const onSubmit = (values: any) => {
      http.post('/user/login', values).then((res: any) => {
        console.log(res);
        Toast.success('登录成功！');
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      })
    };

    const linkRegister = () => {
      router.push({ name: 'Register' })
    }

    return {
      ...toRefs(state),
      onSubmit,
      linkRegister
    }
  }
}
</script>

<style lang="scss" scoped>
.user-wrapper {
  margin: 120px 0 30px 0;
  text-align: center;
}

.login-link {
  text-align: center;
  font-size: 0.14rem;
  color: #777;
}
</style>
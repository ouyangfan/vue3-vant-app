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
      <van-field v-model="password" type="password" name="confirmPassword" label="确认密码" placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
    </van-cell-group>
    <div style="margin: 16px 32px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
  <div class="login-link">
    <span @click="linkLogin">已有账号去登录</span>
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
      confirmPassword: ''
    })

    const onSubmit = (values: any) => {
      http.post('/user/register', values).then((res: any) => {
        Toast.success('注册成功！跳转到登录');
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 300)
      })
    };

    const linkLogin = () => {
      router.push({ name: 'Login' })
    }

    return {
      ...toRefs(state),
      onSubmit,
      linkLogin
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
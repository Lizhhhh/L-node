<template>
  <div>
    <van-nav-bar title='用户登录' left-text="返回" left-arrow @click-left='goBack' />
    <div class="register-panel">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username=''"
        :error-message="usernameErrorMsg" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required @click-icon="username=''"
        :error-message="passwordErrorMsg" />
    </div>
    <div lcass="register-button">
      <van-button type="primary" @click="loginAction" size="large" :loading="openLoading">登录</van-button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      username: '',
      password: '',
      openLoading: false,   // 是否开启用户注册的Loading状态
      usernameErrorMsg: '',  // 注册,当用户名出现错误时显示的信息
      passwordErrorMsg: '',  // 注册,当密码出现错误的时候提示的信息


    }
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success('登录成功')
      this.$router.push('/');
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 先验证,然后再调用注册
    loginAction() {
      this.checkForm() && this.axiosLoginUser()
    },

    // 注册用户的方法
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code === 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 0.5 * 1000);
            }).then(() => {
              Toast.success('登录成功');
              this.$router.push('/')
            }).catch(err => {
              Toast.fail('登录状态保存失败');
              console.log(err);
            })
          } else {
            Toast.fail('登陆失败');
            this.openLoading = false;
          }
        })
        .catch((error) => {
          Toast.fail('登录失败');
          this.openLoading = false;
        })
    },

    // 验证表单中的数据是否合法
    checkForm() {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位"
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位"
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    }

  }
}
</script>

<style  scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.register-button {
  padding-top: 10px;
}
</style>

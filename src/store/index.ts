import { getTotalPrice } from '@/utils'
import { createStore } from 'vuex'

const setLocalCartList = (state: any) => {
  const { cartProducts } = state
  const cartProductsString = JSON.stringify(cartProducts)
  localStorage.cartProducts = cartProductsString
}

const getLocaCartList = () => {
  try {
    return JSON.parse(localStorage.cartProducts);
  } catch (e) {
    return {}
  }
}

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      cartProducts: getLocaCartList()
    }
  },
  getters: {
    totalPrice: (state: any) => {
      const carts = state.cartProducts;
      let total = 0
      Object.keys(carts).forEach((key: string) => {
        if (carts[key].checked) {
          total += carts[key].count * carts[key].price
        }
      })
      return total.toFixed(2)
    }
  },
  mutations: {
    setCartProducts(state: any, payload: any) {
      state.cartProducts = payload
      setLocalCartList(state)
    }
  }
})

export default store;
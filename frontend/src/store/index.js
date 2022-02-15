import { createStore } from 'vuex'

const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

let user = localStorage.getItem('user')
let product = localStorage.getItem('product')
if (!user) {
  user = {
    userId: -1,
    token: '',
  }
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    }
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      firstName: '',
      lastName: '',
      email: '',
      postal_code: '',
      city: '',
      phone_number: '',
      avatar: '',
    },
    product: product,
    products:[],
    productInfos: {
      name: '',
      price: '',
      description: '',
      img: '',
      thumbImg1: '',
      thumbImg2: '',
      thumbImg3: '',
      thumbVideo: '',
    },
    orders:[],
    orderInfos: {
      product: '',
      quantity: '',
      amount: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    product: function (state, product) {
      localStorage.setItem('product', JSON.stringify(product));
      state.product = product;
    },
    productInfos: function (state, productInfos) {
      state.productInfos = productInfos
    },
    products: function (state, products) {
      state.products = products;
    },
    orderInfos: function (state, orderInfos) {
      state.orderInfos = orderInfos
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user')
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('users/login', userInfos)
          .then(function (response) {
            commit('setStatus', '')
            commit('logUser', response.data)
            resolve(response)
          })
          .catch(function (error) {
            commit('setStatus', 'error_login')
            reject(error)
          })
      })
    },
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('users/signup', userInfos)
          .then(function (response) {
            commit('setStatus', 'created')
            resolve(response)
          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },
    getUserInfos: ({ commit }) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.get(`users/${user.userId}`)
          .then(function (response) {
            commit('userInfos', response.data)
          })
          .catch(function () { })
      })
    },
    getProducts: ({ commit }) => {
      commit('setStatus', 'loading')
        instance.get(`products`)
          .then(function (response) {
            commit('products', response.data)
            commit('product', response.data)
          })
          .catch(function () {  })
      
    },
  }
  })


export default store

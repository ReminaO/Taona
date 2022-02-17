import { createStore } from 'vuex'

const axios = require('axios')


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
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    }
  }
}
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {'Authorization': 'Bearer '+ `${user.token}`}
})

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
      isAdmin:''
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
      localStorage.clear()
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
        instance.get(`users/${user.userId}`)
          .then(function (response) {
            commit('userInfos', response.data)
          })
          .catch(function () { })
    },
    getProducts: ({ commit }) => {
      commit('setStatus', 'loading')
        instance.get(`products`)
          .then(function (response) {
            commit('products', response.data)
          })
          .catch(function () {})
      
    }, 
    createProduct: ({ commit }, payload) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('prodImg', payload.img);
        formData.append('prodImg', payload.thumbImg1);
        formData.append('prodImg', payload.thumbImg2);
        formData.append('prodImg', payload.thumbImg3);
        formData.append('prodImg', payload.thumbVideo);
        formData.append('name', payload.name);
        formData.append('description', payload.description);
        formData.append('price', payload.price);
        instance.post(`products/${user.userId}`, formData)
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
  }
  })


export default store

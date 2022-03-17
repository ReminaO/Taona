import { createStore } from 'vuex'
import vuejsStorage from 'vuejs-storage'


const axios = require('axios')


let user = localStorage.getItem('user')
let cart = localStorage.getItem('cart')
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
    products:[],
    productInfos: {
      id:'',
      name: '',
      price: '',
      description: '',
      quantity: 1,
      img: '',
      thumbImg1: '',
      thumbImg2: '',
      thumbImg3: '',
      thumbVideo: '',
      liked: false
    },
    orders:[],
    orderInfos: {
      product: '',
      quantity: '',
      amount: '',
    },
    cart: [],
    carts: cart,
    comments: [],
    commentInfos: {
      userId: '',
      productId: '',
      username: '',
      content: '',

    },
    likes: [],
    likeInfos: {
      userId: '',
      productId: '',
      likeState: '',
    },
  },
  plugins: [
    vuejsStorage({
      keys: ['cart'],
      //keep state.count in localStorage
      namespace: 'cartItem',
      driver: vuejsStorage.drivers.localStorage
      //if you want to use sessionStorage instead of localStorage
    })
  ],
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
    productInfos: function (state, data) {
      state.productInfos.id = data.id;
      state.productInfos.name = data.name;
      state.productInfos.price = data.price;
      state.productInfos.description = data.description;
      state.productInfos.quantity = 1;
      state.productInfos.img = data.img;
      state.productInfos.thumbImg1 = data.thumbImg1;
      state.productInfos.thumbImg2 = data.thumbImg2;
      state.productInfos.thumbImg3 = data.thumbImg3;
      state.productInfos.thumbVideo = data.thumbVideo;
      state.productInfos.liked= false
      for (let like of state.likes) {
        if (like.UserId === user.userId) {
          if (like.likeState) {
            state.productInfos.liked = true;
          }
          break;
        }
     }
    },
    products: function (state, products) {
      state.products = products;
    },
    commentInfos: function (state, commentInfos) {
      state.commentInfos = commentInfos
    },
    comments: function (state, comments) {
      state.comments = comments;
    },
    likes: function (state, likes) {
      state.likes = likes;
    },
    likeInfos: function (state, likeInfos) {
      state.likeInfos = likeInfos
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
      state.cart.splice(0, 100)
    },
    deleteInfos: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.clear();
    },
    addToCart: function (state, payload) {
      let item = payload;
      item = { ...item }
      let bool = state.cart.some(i => i.id === item.id)
      if (!bool) {
          
          state.cart.push(item)
      }
    },
    addItem: function (state, payload) {
      let item = payload;
      item = { ...item, quantity:1 }
      if (state.cart.length > 0) {
        let bool = state.cart.some(i => i.id === item.id)
        if (bool) {
          let itemIndex = state.cart.findIndex(el => el.id === item.id)
          state.cart[itemIndex]["quantity"] += 1
        } else {
          state.cart.push(item)
        }
      }
    },
    removeItem: function (state, payload) {
      if (state.cart.length > 0) {
        let bool = state.cart.some(i => i.id === payload.id)
        if (bool) {
          let index = state.cart.findIndex(el => el.id === payload.id)
          if (state.cart[index]["quantity"] !== 0){
            state.cart[index]["quantity"] -= 1
          }
          if (state.cart[index]["quantity"] === 0) {
            state.cart.splice(index, 1)
          }
        }
      }
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
    modifyAvatar: ({ commit }, payload) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', payload.avatar);
        instance.put(`users/${user.userId}/profile`, formData)
          .then(function (response) {
            commit('userInfos')
            resolve(response)
          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },
    modifyAddress: ({ commit }, payload) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.put(`users/${user.userId}/address`, payload)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },
    modifyPassword: ({ commit }, payload) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.put(`users/${user.userId}/password`, payload)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },
    deleteProfile: ({ commit, payload }) => {
      instance.delete(`users/${user.userId}`,{ data : payload})
        .then(() => {
          commit('deleteInfos')
      })
      .catch(function () {
      });
    },
    getProducts: ({ commit }) => {
      commit('setStatus', 'loading')
        instance.get(`products`)
          .then(function (response) {
            commit('products', response.data)
            commit('productInfos', response.data)
          })
          .catch(function () {})
    }, 
    getOneProduct: ({ commit },id) => {
      commit('setStatus', 'loading')
        instance.get(`products/${id}`)
          .then(function (response) {
            commit('products', response.data)
            commit('productInfos', response.data)
          })
          .catch(function () {})
      
    }, 
    createProduct: ({ commit }, payload) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('prodImg', payload.img)
        formData.append('prodImg', payload.thumbImg1)
        formData.append('prodImg', payload.thumbImg2)
        formData.append('prodImg', payload.thumbImg3)
        formData.append('prodImg', payload.thumbVideo)
        formData.append('name', payload.name)
        formData.append('description', payload.description)
        formData.append('price', payload.price)
        instance.post(`products/${user.userId}`, formData)
          .then(function (response) {
            commit('setStatus', 'created')
            commit('products', response.data)
            commit('productInfos', response.data)

          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },
    deleteProduct: ({ commit }, id) => {
      instance.delete(`products/${user.userId}/${id}`)
        .then(() => {
          commit('products', response.data)
      })
      .catch(function () {
      });
    },
    addItem({ commit }, payload) {
      commit("addItem", payload)
      commit("addToCart", payload)
    },
    removeItem({ commit }, payload) {
      commit("removeItem", payload)
    },
    getAllComments: ({ commit }) => {
      commit('setStatus', 'loading')
        instance.get(`comments`)
          .then(function (response) {
            commit('comments', response.data)
          })
          .catch(function () {})
    },
    productLike({ commit }, productId) {
      instance.post(`likes/${user.userId}/${productId}/like`).then((response) => {
        commit('likes', response.data);
      });
    },
    productDislike({ commit }, id) {
      instance.post(`likes/${user.userId}/${productId}/dislike`).then((response) => {
        commit('likes', response.data);
      });
    },
  }  
  })


export default store

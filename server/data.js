export const nearbyList = [
  {
    _id: '1',
    name: '沃尔玛',
    imgUrl: 'near.png',
    sales: 10000,
    expressLimit: 0,
    expressPrice: 5,
    slogan: 'VIP尊享满89元减4元运费券'
  },
  {
    _id: '2',
    name: '华润万家',
    imgUrl: 'vanguard.png',
    sales: 2000,
    expressLimit: 0,
    expressPrice: 5,
    slogan: '联合利华洗护满10减5'
  }
]

export const accountList = [
  { username: 'tom', password: '000000' },
  { username: 'jerry', password: '999999' }
]

export const products = [
  {
    _id: '1',
    name: '番茄 250g / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    img: 'tomato.png',
    sales: 10,
    price: 33.6,
    oldPrice: 39.6,
    category: 'vegetable'
  },
  {
    _id: '2',
    name: '车厘子 500g / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/cherry.png',
    img: 'cherry.png',
    sales: 10,
    price: 99.6,
    oldPrice: 119.6,
    category: 'fruit'
  },
  {
    _id: '3',
    name: '橙子 500g/份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/orange.png',
    img: 'orange.png',
    sales: 110,
    price: 12.6,
    oldPrice: 22.6,
    category: 'fruit'
  },
  {
    _id: '4',
    name: '帝王蟹 250g / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
    img: 'crab.png',
    sales: 10,
    price: 199.9,
    oldPrice: 299.9,
    category: 'seafood'
  },
  {
    _id: '5',
    name: '五常大米 5kg / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
    img: 'rice.jpeg',
    sales: 60,
    price: 29.8,
    oldPrice: 36,
    category: 'grain'
  },
  {
    _id: '6',
    name: '精品黑豆 1kg / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
    img: 'bean.jpeg',
    sales: 90,
    price: 16,
    oldPrice: 19,
    category: 'grain'
  },
  {
    _id: '7',
    name: '青菜 1kg / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
    img: 'green_vegetable.jpeg',
    sales: 100,
    price: 4,
    oldPrice: 5,
    category: 'vegetable'
  },
  {
    _id: '8',
    name: '土豆 1kg / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
    img: 'potato.jpeg',
    sales: 90,
    price: 3,
    oldPrice: 4,
    category: 'vegetable'
  },
  {
    _id: '9',
    name: '南瓜 1kg / 份',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
    img: 'pumpkin.jpeg',
    sales: 30,
    price: 6,
    oldPrice: 8,
    category: 'vegetable'
  }
]

export const orderList = [
  {
    address: {
      city: '北京',
      department: 'xx小区',
      houseNumber: '门牌号',
      name: '张三',
      phone: '18611112222'
    },
    shopId: '1',
    shopName: '沃尔玛',
    isCanceled: false,
    products: [
      {
        orderSales: 5,
        product: {
          name: '番茄 250g / 份',
          img: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
          imgUrl: 'tomato.png',
          price: 33.6,
          sales: 6
        }
      },
      {
        orderSales: 10,
        product: {
          name: '车厘子 500g / 份',
          img: 'http://www.dell-lee.com/imgs/vue3/cherry.png',
          imgUrl: 'cherry.png',
          price: 33.6,
          sales: 6
        }
      }
    ]
  }
]

export const address = []

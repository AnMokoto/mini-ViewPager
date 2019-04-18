// components/tabIndicator/tabIndicator.js
/**
 * @param  bind:onTabSelect(currentIndex) Function
 * @param  tab                            Array
 * @param  tabDirection                   String
 * @param  currentIndex                   Number
 */
/* eslint-disable */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab: {
      type: Array,
      value: []
    },
    tabDirection: {
      type: String,
      value: 'left'
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: [],
    localTab: [],
    localCurrentIndex: 0,
    scrollLeft: 0
  },

  ready() {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    createAnimations() {
      const array = new Array(...this.properties.tab)

      const animations = array.map(function () {
        return wx.createAnimation({
          duration: '200',
          timingFunction: 'ease-in-out',
          delay: '50'
        })
      })

      this.setData({
        animation: animations
      })

      this.onInvalidate()
    },

    onInvalidate() {
      const map = new Array(...this.properties.tab)
      map.map((value, index) => {
        let scale = 1
        if (index === this.data.localCurrentIndex) {
          scale = 1.5
        }
        const animation = this.data.animation[index]
        value.animation = animation.scale(scale).step().export()
        return value
      })

      this.setData({
        localTab: map
      })

      const obj = this

      this.loadViewMaxWidth('#tabIndicator').then((res) => {
        const radius = (res.width >> 1)
        obj.loadViewRect(`#tab-item-${this.data.localCurrentIndex}`).then((view) => {
          const offsetLeft = view.left

          const scroll = obj.data.scrollLeft + offsetLeft - radius
          obj.setData({
            scrollLeft: Math.max(0, scroll)
          })
        })
      })
    },

    onTabClick(event) {
      const current = event.currentTarget.dataset.index
      // this.properties.currentIndex = current
      this.setData({
        localCurrentIndex: current
      })

      this.triggerEvent('onTabSelect', {
        currentIndex: current
      })
    },

    loadViewRect(tag) {
      const query = wx.createSelectorQuery().in(this)

      const promise = new Promise((resolve, reject) => {
        query.select(tag).fields({
          size: true,
          rect: true,
          scrollOffset: true,
          id: true
        }, function (res) {
          resolve(res)
        }).exec()
      })

      return promise
    },

    loadViewMaxWidth(tag) {
      const query = wx.createSelectorQuery().in(this)

      const promise = new Promise((resolve, reject) => {
        query.select(tag).boundingClientRect(function (res) {
          resolve(res)
        }).exec()
      })

      return promise
    }
  },

  /**
   * Vue watch
   * tips:外部可直接修改的监听不可设置回调方法，只能直接设置本地变量的值
   */
  observers: {

    tab(val) {
      this.createAnimations()
    },

    currentIndex(val) {
      this.setData({
        localCurrentIndex: val
      })
    },

    localCurrentIndex(val) {
      wx.nextTick(() => {
        this.onInvalidate()
      })
    }
  },

  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'isolated' // 组件样式隔离
  }


})

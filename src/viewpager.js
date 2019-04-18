// components/viewpager.js

const PageState = {
  IDEL: 0,
  SCROLL: 1
}
/* eslint-disable */
function PagerChange(onPageSelected, onPageScrolled, onPageScrollStateChanged) {
  /**
   * 当前显示的下标
   * @param index 当前界面显示的下标
   */
  this.onPageSelected =
    typeof onPageSelected !== 'undefined' ? onPageSelected : function (index) {
      console.log('current select index --->' + index)
    }

  /**
   * 滑动进度
   * @param preIndex 当前显示的下标
   * @param ratio 滑动进度，左滑负数，右滑正数，[-1,1]
   * @param px 滑动的像素
   */
  this.onPageScrolled =
    typeof onPageScrolled !== 'undefined' ? onPageScrolled : function (preIndex, ratio, px) {
      console.log('current previous index --->' + preIndex + ' current scroll ratio ---->' + ratio + ' current scroll px ---->' + px)
    }


  /**
   * 状态回调
   * @param state [PageStat]
   */
  this.onPageScrollStateChanged =
    typeof onPageScrollStateChanged !== 'undefined' ? onPageScrollStateChanged : function (state) {
      console.log('scroll state --->' + state)
    }
}
/**
 * @param  bind:onPagerChange             PagerChange
 * @param  count                          Number
 * @param  easing                         String
 * @param  currentIndex                   Number
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    easing: {
      type: String,
      value: 'easeInOutCubic'
    },
    count: {
      type: Number,
      value: 0
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    onPagerChange: {
      type: PagerChange,
      value: undefined
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageChange: new PagerChange(),
    scrollRatio: 0,
    scrollPx: 0,
    pageState: PageState.IDEL,
  },

  /**
   * Vue watch
   * tips:外部可直接修改的监听不可设置回调方法，只能直接设置本地变量的值
   */
  observers: {

    onPagerChange(val) {
      this.setData({
        pageChange: val
      })
    },

    pageState(val) {
      wx.nextTick(() => {
        this.data.pageChange.onPageScrollStateChanged(val)
      })

      if (this.data.pageState === PageState.IDEL) {
        this.setData({
          scrollRatio: 0,
          scrollPx: 0
        })
      }
    },

    'scrollRatio,scrollPx': function (ratio, px) {
      wx.nextTick(() => {
        this.data.pageChange.onPageScrolled(this.data.currentIndex, this.data.scrollRatio, this.data.scrollPx)
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ////////////////////////////// event ///////////////////////////////////////////

    onViewChange(event) {
      // event.detail = {current, source}
      const currentIndex = event.detail.current
      this.setData({
        currentIndex,
        pageState: PageState.IDEL
      })

      wx.nextTick(() => {
        this.data.pageChange.onPageSelected(currentIndex)
      })
    },

    onViewTransition(event) {
      // event.detail = {dx: dx, dy: dy}

    },


    onViewAnimationFinish(event) {
      // var currentIndex = event.detail.current
      // this.setData({
      //   currentIndex: currentIndex,
      //   pageState: PageState.IDEL
      // })

      // wx.nextTick(() => {
      //   this.data.pageChange.onPageSelected(currentIndex)
      // })

    },


  },

  created() {},

  attached() {


  },

  ready() {

  },

  detached() {

  },
  error() {},

  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'isolated' // 组件样式隔离
  }


})

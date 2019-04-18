# mini-viewpager
[![npm](https://img.shields.io/npm/v/mini-viewpager.svg)](https://www.npmjs.com/package/mini-viewpager)  [![Package Control](https://img.shields.io/packagecontrol/dm/mini-viewpager.svg)](https://github.com/mini-plug/mini-ViewPager.git)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/mini-plug/mini-ViewPager/master.svg)

## 使用方法
 1.  `npm i mini-viewpager` or `yarn add mini-viewpager`
 2. 在`Page`的json文件内添加配置
    ```json
     {
      "usingComponents": {
      "viewpager": "mini-viewpager/viewpager",
      "tabIndicator": "mini-viewpager/tabIndicator"
      }
    }
    ```
 3. [在布局中配置](./tools/demo/pages/index/index.wxml)
    ```xml
     <tabIndicator tab="{{tab}}" 
                      bind:onTabSelect='onTabSelect'
                      currentIndex="{{tabCurrentIndex}}">
                  
     </tabIndicator>
     <viewpager currentIndex="{{currentIndex}}" 
                count="{{tab.length}}" 
                onPagerChange="{{onPagerChange}}">
        <block wx:for="{{tab}}" wx:for-item="item" wx:key="{{index}}">
            <view slot="viewpager-{{index}}">{{item.name}}</view>
        </block>
     </viewpager>
    
    ```
 4. 属性
 
    * `properties`
    
        字段名|类型|必填|描述
        :----:|:----:|:----:|:----:
        tab|Array|是|tab显示的内容
        currentIndex|Number|是|当前需要显示的index
        count|Number|是|数量,与tab数量对应
        bind:onTabSelect|Function|否|状态回调
        onPagerChange|Function|否|状态回调

## 测试
    `npm run dev`


    




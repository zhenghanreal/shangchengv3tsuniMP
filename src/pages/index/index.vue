<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
//组件
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components//HotPanel.vue'
import Skeleton from './components/Skeleton.vue'
//接口
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'

const isShow = ref(false)
onLoad(async () => {
  isShow.value = true
  await Promise.all([getBannerList(), getCategoryList(), getHotList()])
  isShow.value = false
})
//获取轮播图列表
const bannerList = ref<BannerItem[]>([])
const getBannerList = async () => {
  let res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//获取分类列表
const categoryList = ref<CategoryItem[]>([])
const getCategoryList = async () => {
  let res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
//获取热门推荐列表
const hotList = ref<HotItem[]>([])
const getHotList = async () => {
  let res = await getHomeHotAPI()
  hotList.value = res.result
}
//猜你喜欢触底加载
const guessRef = ref<XtxGuessInstance>()
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
//下拉刷新
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  //重置猜你喜欢数据
  guessRef.value?.resetData()
  //重新获取首页数据完成刷新
  await Promise.all([guessRef.value?.getMore(), getBannerList(), getCategoryList(), getHotList()])
  isTriggered.value = false
}
</script>

<template>
  <!-- 引入自定义导航栏 -->
  <CustomNavbar></CustomNavbar>
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    class="scrollView"
    scroll-y
  >
    <!-- 引入骨架屏 -->
    <Skeleton v-if="isShow"></Skeleton>
    <template v-else>
      <!-- 引入轮播图 -->
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <!-- 引入分类 -->
      <CategoryPanel :list="categoryList"></CategoryPanel>
      <!-- 引入热门推荐 -->
      <HotPanel :list="hotList"></HotPanel>
      <!-- 引入猜你喜欢 -->
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scrollView {
  flex: 1;
}
</style>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
//组件
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components//HotPanel.vue'
//接口
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'

onLoad(() => {
  getBannerList()
  getCategoryList()
  getHotList()
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
</script>

<template>
  <!-- 引入自定义导航栏 -->
  <CustomNavbar></CustomNavbar>
  <scroll-view @scrolltolower="onScrolltolower" class="scrollView" scroll-y>
    <!-- 引入轮播图 -->
    <XtxSwiper :list="bannerList"></XtxSwiper>
    <!-- 引入分类 -->
    <CategoryPanel :list="categoryList"></CategoryPanel>
    <!-- 引入热门推荐 -->
    <HotPanel :list="hotList"></HotPanel>
    <!-- 引入猜你喜欢 -->
    <XtxGuess ref="guessRef"></XtxGuess>
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

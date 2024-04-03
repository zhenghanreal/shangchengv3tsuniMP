<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem } from '@/types/home'
//组件
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
//接口
import { getHomeBannerAPI, getHomeCategoryMutli } from '@/services/home'

//轮播图列表
const bannerList = ref<BannerItem[]>([])
//获取轮播图列表
const getBannerList = async () => {
  let res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//分类列表
const categoryList = ref<CategoryItem[]>([])
//获取分类列表
const getCategoryList = async () => {
  let res = await getHomeCategoryMutli()
  categoryList.value = res.result
}
onLoad(() => {
  getBannerList()
  getCategoryList()
})
</script>

<template>
  <!-- 引入自定义导航栏 -->
  <CustomNavbar></CustomNavbar>
  <!-- 引入轮播图 -->
  <XtxSwiper :list="bannerList"></XtxSwiper>
  <CategoryPanel :list="categoryList"></CategoryPanel>
  <view class="index">index</view>
</template>

<style lang="scss"></style>

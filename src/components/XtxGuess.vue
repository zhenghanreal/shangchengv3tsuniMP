<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import type { GuessItem } from '@/types/home'
import { onMounted, ref } from 'vue'

onMounted(() => {
  getGuessLikeList()
})
//获取猜你喜欢列表
const guessLikeList = ref<GuessItem[]>([])
const finish = ref(false)
const PageParams = {
  page: 1,
  pagesize: 10,
}
const getGuessLikeList = async () => {
  //加载条件
  if (finish.value) {
    return uni.showToast({ icon: 'none', title: '没用更多数据了' })
  }
  let res = await getHomeGoodsGuessLikeAPI(PageParams)
  //数组追加
  guessLikeList.value.push(...res.result.items)
  //分页条件
  if (res.result.page < 35) {
    //页码自增
    PageParams.page++
  } else {
    finish.value = true
  }
}
//下拉刷新事件,重置数据，页数
const resetData = () => {
  PageParams.page = 1
  finish.value = false
  guessLikeList.value = []
}
//暴露方法给父组件
defineExpose({
  resetData,
  getMore: getGuessLikeList,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessLikeList"
      :key="item.id"
      :url="`/pages/goods/goods?id=4007498`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">
    {{ finish ? '' : '正在加载中...' }}
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}

/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;

  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }

  .image {
    width: 304rpx;
    height: 304rpx;
  }

  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }

  .small {
    font-size: 80%;
  }
}

// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>

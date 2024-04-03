import type { BannerItem, CategoryItem } from '@/types/home'
import { http } from '@/utils/http'

//首页轮播图接口
export const getHomeBannerAPI = () => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner?distributionSite=1',
  })
}

export const getHomeCategoryMutli = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

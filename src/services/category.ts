import type { CategoryTopItem } from '@/types/categroy'
import { http } from '@/utils/http'

//商品分类接口
export const gatCategoryTop = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}

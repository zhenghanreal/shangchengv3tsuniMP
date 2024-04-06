import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

//通过id获取商品详细信息
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: {
      id,
    },
  })
}

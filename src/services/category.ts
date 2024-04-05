import type { CategoryTopItem } from '@/types/categroy'
import { http } from '@/utils/http'

export const gatCategoryTop = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}

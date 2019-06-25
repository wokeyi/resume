import * as React from 'react'
import { ApiService } from 'src/services'

export interface IUseFetchOptions<T> {
  routeName: string
  path?: string
  params?: object
  formatter?: (oldData: T | null, newData: T) => T
}

export interface IUseFetchResults<T> {
  data: T
  loading: boolean
}

export function useFetch<T = any>(opts: IUseFetchOptions<T>): IUseFetchResults<T> {
  const { routeName, path, params } = opts
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const fetchData = async () => {
    try {
      setLoading(true)
      const service = new ApiService(routeName)
      const results = await service.get({
        path,
        data: params,
      })
      setData(results)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    fetchData()
  }, [routeName, path])
  return { data, loading }
}

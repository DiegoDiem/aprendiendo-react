/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`)
    .then(async res => {
      if (!res.ok) throw new Error('error de la petición ')
      return await res.json()
    })

    .then(res => {
      const currentPage = Number(res.info.page)
      const nextCursor = currentPage > 5 ? undefined : currentPage + 1
      return {
        users: res.results,
        nextCursor
      }
    })
}

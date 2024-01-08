/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useUsers } from '../hooks/useUsers'

const Results = () => {
  const { users } = useUsers()
  return (
    <div>Results {users.length} users</div>
  )
}

export default Results

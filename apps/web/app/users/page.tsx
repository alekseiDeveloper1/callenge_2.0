
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { cookies } from 'next/headers';
import { User } from '../lib/auth';
async function getCurrentUsers(): Promise<User[] | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  if (!accessToken) return null
  // TODO move
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken.trim()}`);
  headers.append('Content-Type', 'application/json');
  const apiBase = process.env.NODE_ENV === 'production'
      ? 'http://api:3000' // имя сервиса в Docker
      : 'http://localhost:3000';
  const response = await fetch(`${apiBase}/users`, {
    method: 'GET',
    headers,
    credentials: 'include'
  })
  if (!response.ok) return null

  return response.json()
}
export default async function UsersPage() {
  const users:User[] | null = await getCurrentUsers()

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((user:any) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
      </div>
    </ProtectedRoute>
  )
}
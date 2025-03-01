import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function UserIndex({ users }: { users: User[] }) {
  const { props: { flash } } = usePage();

  return (
    <AppLayout>
      <Head title="Users" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Users</h1>
          <Link href={route('users.create')}>
            <Button asChild><span>Create User</span></Button>
          </Link>

        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 rounded-md bg-white shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                    <TextLink href={route('users.show', user.id)}>{user.email}</TextLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

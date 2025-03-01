import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UserShow({ user }: { user: User }) {
  const { delete: destroy, processing } = useForm();

  const deleteUser: FormEventHandler = e => {
    e.preventDefault();
    destroy(route('users.destroy', user.id));
  };

  return (
    <AppLayout>
      <Head title={user.name} />
      <div className="flex flex-col items-center space-y-6 p-6">
        <Avatar className="h-32 w-32 border-4 border-gray-200 shadow-lg dark:border-gray-700">
          <AvatarImage
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
            alt={user.name}
          />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">ID: {user.id}</p>
        </div>

        <div className="flex space-x-4">
          <Link href={route('users.edit', user.id)}>
            <Button variant="default" asChild>
              <span>Edit Profile</span>
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Are you sure you want to delete this account?</DialogTitle>
              <DialogDescription>
                Once deleted, this user’s data will be permanently removed. This action cannot be
                undone.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} onClick={deleteUser}>
                  {processing ? 'Deleting...' : 'Delete Account'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold">User Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-medium text-gray-600 dark:text-gray-300">Email Verified</div>
            <div className="text-gray-900 dark:text-white">
              {user.email_verified_at ? 'Yes' : 'No'}
            </div>

            <div className="font-medium text-gray-600 dark:text-gray-300">Created At</div>
            <div className="text-gray-900 dark:text-white">
              {new Date(user.created_at).toLocaleDateString()}
            </div>

            <div className="font-medium text-gray-600 dark:text-gray-300">Updated At</div>
            <div className="text-gray-900 dark:text-white">
              {new Date(user.updated_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

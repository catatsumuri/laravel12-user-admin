import { type BreadcrumbItem, type User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

import { useLaravelReactI18n } from 'laravel-react-i18n';

interface EditUserForm {
  [key: string]: string | undefined;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}



export default function UserEdit({ user }: { user: User }) {
  const { t } = useLaravelReactI18n();

  const { data, setData, patch, processing, errors, reset } = useForm<EditUserForm>({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = e => {
    e.preventDefault();
    patch(route('users.update', user.id), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AppLayout>
      <Head title="Edit User" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">{t('Name')}</Label>
              <Input
                id="name"
                type="text"
                required
                autoFocus
                tabIndex={1}
                autoComplete="name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                disabled={processing}
                placeholder={t('Full name')}
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">{t('Email address')}</Label>
              <Input
                id="email"
                type="email"
                required
                tabIndex={2}
                autoComplete="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                disabled={processing}
                placeholder="email@example.com"
              />
              <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">{t('Password')}</Label>
              <Input
                id="password"
                type="password"
                tabIndex={3}
                autoComplete="new-password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                disabled={processing}
                placeholder={t('Leave blank to keep current password')}
              />
              <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">{t('Confirm password')}</Label>
              <Input
                id="password_confirmation"
                type="password"
                tabIndex={4}
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={e => setData('password_confirmation', e.target.value)}
                disabled={processing}
                placeholder={t('Confirm new password')}
              />
              <InputError message={errors.password_confirmation} />
            </div>

            <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              {t('Update User')}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

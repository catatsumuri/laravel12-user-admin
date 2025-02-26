import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface UserMenuContentProps {
  user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const { t } = useLaravelReactI18n();
  const cleanup = useMobileNavigation();

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo user={user} showEmail={true} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            className="block w-full"
            href={route('profile.edit')}
            as="button"
            prefetch
            onClick={cleanup}
          >
            <Settings className="mr-2" />
            {t("Settings")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          className="block w-full"
          method="post"
          href={route('logout')}
          as="button"
          onClick={cleanup}
        >
          <LogOut className="mr-2" />
          {t("Log out")}
        </Link>
      </DropdownMenuItem>
    </>
  );
}

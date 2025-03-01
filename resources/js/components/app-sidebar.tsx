import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { BookOpen, Folder, LayoutGrid, Users } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
  const { t } = useLaravelReactI18n();

  const mainNavItems: NavItem[] = [
    {
      title: t('Dashboard'),
      url: route('dashboard'),
      icon: LayoutGrid,
    },
    {
      title: t('Users'),
      url: route('users.index'),
      icon: Users,
    },
  ];

  const footerNavItems: NavItem[] = [
    {
      title: t('Repository'),
      url: 'https://github.com/laravel/react-starter-kit',
      icon: Folder,
    },
    {
      title: t('Documentation'),
      url: 'https://laravel.com/docs/starter-kits',
      icon: BookOpen,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

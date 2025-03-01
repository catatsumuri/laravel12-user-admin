import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

interface PageProps {
  breadcrumbs?: { title: string; url: string }[];
  [key: string]: any;
}

export default function AppLayout({ children, ...props }: AppLayoutProps) {
  const { props: { breadcrumbs = [] } } = usePage<PageProps>();
  const formattedBreadcrumbs: BreadcrumbItem[] = breadcrumbs.map((b: any) => ({
    title: b.title,
    href: b.url,
  }));

  return (
    <AppLayoutTemplate breadcrumbs={formattedBreadcrumbs} {...props}>
      {children}
    </AppLayoutTemplate>
  );
}

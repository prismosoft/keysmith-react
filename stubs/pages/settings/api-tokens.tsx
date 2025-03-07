import { Head } from "@inertiajs/react";

import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";
import { type BreadcrumbItem } from "@/types";

import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import CreateApiTokenForm from "../../components/create-api-token-form";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "API Tokens",
    href: "/settings/api-tokens",
  },
];

export default function ApiTokens({
  tokens,
  availablePermissions,
  defaultPermissions,
}: {
  tokens: [];
  availablePermissions: string[];
  defaultPermissions: string[];
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="API Tokens" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="API Tokens"
            description="Manage your API tokens"
          />
          <CreateApiTokenForm
            availablePermissions={availablePermissions}
            defaultPermissions={defaultPermissions}
          />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}

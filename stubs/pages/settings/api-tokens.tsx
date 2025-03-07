import { Head } from "@inertiajs/react";

import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";
import { type BreadcrumbItem } from "@/types";

import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import CreateApiTokenForm from "../../components/create-api-token-form";
import ManageApiTokens from "../../components/manage-api-tokens";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "API Tokens",
    href: "/settings/api-tokens",
  },
];

interface Token {
  id: number;
  tokenable_type: string;
  tokenable_id: number;
  name: string;
  abilities: string[];
  last_used_at: string;
}

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
          <ManageApiTokens
            tokens={tokens}
            availablePermissions={availablePermissions}
          />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}

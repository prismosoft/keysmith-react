import { Head } from "@inertiajs/react";

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

export default function APITokens() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="API Tokens" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="API Tokens"
            description="Manage your API tokens."
          />
          <div className="space-y-6">
            <CreateApiTokenForm />
            <ManageApiTokens />
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}

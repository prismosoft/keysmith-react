import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import Heading from "@/components/heading";
import CreateApiTokenForm from "@/components/create-api-token-form";
import ManageApiTokens from "@/components/manage-api-tokens";
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "API Tokens",
    href: "/api-tokens",
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
  tokens: Token[];
  availablePermissions: string[];
  defaultPermissions: string[];
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="API Tokens" />
      <div className="px-4 py-6 space-y-6">
        <Heading title="API Tokens" description="Manage your API tokens" />
        <div className="flex flex-col gap-6 w-full md:w-3/4">
          <CreateApiTokenForm
            availablePermissions={availablePermissions}
            defaultPermissions={defaultPermissions}
          />
          <ManageApiTokens
            tokens={tokens}
            availablePermissions={availablePermissions}
          />
        </div>
      </div>
    </AppLayout>
  );
}

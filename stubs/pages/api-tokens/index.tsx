import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import Heading from "@/components/heading";
import CreateApiTokenForm from "@/components/create-api-token-form";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "API Tokens",
    href: "/api-tokens",
  },
];

export default function ApiTokens({
  tokens,
  availablePermissions,
  defaultPermissions,
}: {
  tokens: any[];
  availablePermissions: any[];
  defaultPermissions: any[];
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="API Tokens" />
      <div class="px-4 py-6 space-y-6">
        <Heading title="API Tokens" description="Manage your API tokens" />
        <div class="flex flex-col gap-6 w-full md:w-3/4">
          <CreateApiTokenForm
            availablePermissions={availablePermissions}
            defaultPermissions={defaultPermissions}
          />
        </div>
      </div>
    </AppLayout>
  );
}

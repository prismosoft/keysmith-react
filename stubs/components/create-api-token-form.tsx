import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateApiTokenForm(
  availablePermissions: string[],
  defaultPermissions: string[]
) {
  const form = useForm({
    name: "",
    permissions: defaultPermissions,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    form.post(route("api-tokens.store"), {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Card class="w-full">
      <CardHeader>
        <CardTitle>Create API Token</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          API tokens allow third-party services to authenticate with our
          application on your behalf.
        </CardDescription>
        <form onSubmit={submit} className="mt-6 space-y-6">
          <div>
            <Label for="name" value="Name" />
            <Input
              type="text"
              name="name"
              required
              autoFocus
              placeholder="Token Name"
              value={form.name}
              onChange={(e) => (form.name = e.target.value)}
            />
            <InputError message="form.errors.name" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateApiTokenForm({
  availablePermissions,
  defaultPermissions,
}: {
  availablePermissions: string[];
  defaultPermissions: string[];
}) {
  const { data, errors, post, reset, setData, processing } = useForm({
    name: "",
    permissions: defaultPermissions || [],
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("api-tokens.store"), {
      onSuccess: () => reset(),
    });
  };

  return (
    <Card className="w-full">
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
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              required
              autoFocus
              tabIndex={1}
              placeholder="Token Name"
              value={data.name}
              onChange={(e) => (data.name = e.target.value)}
            />
            <InputError message={errors.name} />
          </div>

          <div>
            {availablePermissions &&
              Object.keys(availablePermissions).length > 0 && (
                <div className="col-span-6">
                  <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {Object.values(availablePermissions).map((permission) => (
                      <Label
                        key={permission}
                        htmlFor={permission}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          checked={data.permissions.includes(permission)}
                          tabIndex={4}
                          onCheckedChange={(checked) => {
                            console.log("Checkbox clicked:", permission);
                            const updatedPermissions = checked
                              ? [...data.permissions, permission]
                              : data.permissions.filter(
                                  (p) => p !== permission
                                );
                            setData("permissions", updatedPermissions);
                          }}
                        />
                        <span>{permission}</span>
                      </Label>
                    ))}
                  </div>
                </div>
              )}
          </div>
          <Button
            type="submit"
            className="mt-4"
            tabIndex={5}
            disabled={processing}
          >
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

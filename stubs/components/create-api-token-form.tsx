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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Copy } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function CreateApiTokenForm({
  availablePermissions,
  defaultPermissions,
}: {
  availablePermissions: string[];
  defaultPermissions: string[];
}) {
  const { data, errors, post, reset, setData, processing } = useForm({
    name: "",
    permissions: defaultPermissions,
  });

  const { flash } = usePage<SharedData>().props;

  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);

  const [recentlyCopied, setRecentlyCopied] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("api-tokens.store"), {
      preserveScroll: true,
      onSuccess: () => {
        console.log("Form submitted successfully");
        setIsTokenDialogOpen(true);
        console.log("Dialog state:", isTokenDialogOpen);
        reset();
      },
    });
  };

  const copyToken = () => {
    setRecentlyCopied(true);
    navigator.clipboard.writeText(flash.api_token);
    setTimeout(() => {
      setRecentlyCopied(false);
    }, 2000);
  };

  const closeModal = () => {
    setIsTokenDialogOpen(false);
    reset();
  };

  return (
    <div>
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
                id="name"
                type="text"
                name="name"
                required
                autoFocus
                tabIndex={1}
                placeholder="Token Name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
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
                            id={permission}
                            tabIndex={4}
                            name={permission}
                            checked={data.permissions.includes(permission)}
                            onCheckedChange={(checked) => {
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

      {isTokenDialogOpen && (
        <Dialog open={isTokenDialogOpen} onOpenChange={setIsTokenDialogOpen}>
          <DialogContent className="min-w-xl">
            <DialogHeader className="space-y-3">
              <DialogTitle>API Token</DialogTitle>
              <DialogDescription>
                Please copy your new API token. For your security, it won't be
                shown again.
              </DialogDescription>
            </DialogHeader>
            {flash.api_token && (
              <div className="dark:bg-background mt-4 flex items-center justify-between rounded border border-gray-200 bg-gray-100 px-4 py-2 font-mono text-sm break-all text-gray-500 dark:border-gray-400 dark:text-gray-400">
                {flash.api_token}
                <button
                  onClick={copyToken}
                  type="button"
                  className="flex cursor-pointer items-center rounded bg-gray-300 px-3 py-1 text-xs hover:opacity-75"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            )}
            {recentlyCopied && (
              <div
                className={`mt-2 mr-2 flex justify-end text-xs text-gray-600 transition-opacity duration-300 dark:text-gray-400 ${
                  recentlyCopied ? "opacity-100" : "opacity-0"
                }`}
              >
                Token copied to clipboard.
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

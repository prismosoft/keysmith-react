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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

interface Token {
  id: number;
  tokenable_type: string;
  tokenable_id: number;
  name: string;
  abilities: string[];
  last_used_at: string;
}

export default function ManageApiTokens({
  tokens,
  availablePermissions,
}: {
  tokens: Token[];
  availablePermissions: string[];
}) {
  const [isTokenBeingEdited, setIsTokenBeingEdited] = useState<boolean>(false);

  const [tokenBeingEdited, setTokenBeingEdited] = useState<Token | null>(null);

  const [isTokenBeingDeleted, setIsTokenBeingDeleted] =
    useState<boolean>(false);

  const [tokenBeingDeleted, setTokenBeingDeleted] = useState<Token | null>(
    null
  );

  const deleteApiTokenForm = useForm({});

  const { data, put, processing, setData } = useForm({
    permissions: [] as string[],
  });

  const confirmTokenDeletion = (token: Token) => {
    setTokenBeingDeleted(token);
    setIsTokenBeingDeleted(true);
  };

  const updateApiToken = () => {
    if (!tokenBeingEdited) return;
    put(route("api-tokens.update", { token: tokenBeingEdited }), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => (
        setTokenBeingEdited(null), setIsTokenBeingEdited(false)
      ),
    });
  };

  const editToken = (token: Token) => {
    setTokenBeingEdited(token);
    setIsTokenBeingEdited(true);
    data.permissions = token.abilities;
  };

  const deleteToken = () => {
    if (!tokenBeingDeleted) return;
    deleteApiTokenForm.delete(
      route("api-tokens.destroy", { token: tokenBeingDeleted }),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (
          setTokenBeingDeleted(null), setIsTokenBeingDeleted(false)
        ),
      }
    );
  };

  return (
    <>
      {tokens && tokens.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Manage API Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              You may delete any of your existing tokens if they are no longer
              needed.
            </CardDescription>
            <div className="mt-6 space-y-6">
              {Object.entries(tokens).map(([key, token]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="break-all">{token.name}</div>
                  <div className="ms-2 flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Last used |{" "}
                      {token.last_used_at
                        ? new Date(token.last_used_at).toLocaleString()
                        : "Never"}
                    </div>
                    {availablePermissions.length > 0 && (
                      <Button onClick={() => editToken(token)}>Edit</Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => confirmTokenDeletion(token)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isTokenBeingEdited && (
        <Dialog open={isTokenBeingEdited} onOpenChange={setIsTokenBeingEdited}>
          <DialogContent className="min-w-xl">
            <DialogHeader className="space-y-3">
              <DialogTitle>API Token Permissions</DialogTitle>
              <DialogDescription>
                Manage the permissions for this API token.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 text-sm">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.values(availablePermissions).map((permission) => (
                  <Label
                    key={permission}
                    htmlFor={permission}
                    className="flex items-center"
                  >
                    <Checkbox
                      key={permission}
                      id={permission}
                      tabIndex={4}
                      name={permission}
                      checked={data.permissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        const updatedPermissions = checked
                          ? [...data.permissions, permission]
                          : data.permissions.filter((p) => p !== permission);
                        setData("permissions", updatedPermissions);
                      }}
                    />
                    <span className="ms-2 text-sm">{permission}</span>
                  </Label>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsTokenBeingEdited(false)}
              >
                Close
              </Button>
              <form onSubmit={updateApiToken}>
                <Button type="submit" className="ms-3" disabled={processing}>
                  Save
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isTokenBeingDeleted && (
        <Dialog
          open={isTokenBeingDeleted}
          onOpenChange={setIsTokenBeingDeleted}
        >
          <DialogContent className="max-w-xl">
            <DialogHeader className="space-y-3">
              <DialogTitle>Delete API Token</DialogTitle>
              <DialogDescription>
                Are you sure you would like to delete this API token?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsTokenBeingDeleted(false)}
              >
                Close
              </Button>
              <form onSubmit={deleteToken}>
                <Button
                  variant="destructive"
                  type="submit"
                  className="ms-3"
                  disabled={deleteApiTokenForm.processing}
                >
                  Delete
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

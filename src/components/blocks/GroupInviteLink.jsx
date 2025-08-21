import { Copy, Link } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TertiaryLabel from "../ui/TertiaryLabel";

export default function GroupInviteLink() {
    return (
        <div className="p-3 bg-card border rounded-lg">
            <div className="mb-3">
                <TertiaryLabel>Invitation Link</TertiaryLabel>
            </div>

            <p className="text-xs text-muted-foreground mb-2">
                Invite students to create an account for this group
            </p>
            <Input readOnly value="https://sabuag.vercel.app" />

            <div className="flex items-center mt-4 mb-1 gap-2">
                <Button size="sm" variant="destructive">
                    <Link />
                    Deactivate Link
                </Button>
                <Button size="sm" variant="secondary">
                    <Copy />
                    Copy
                </Button>
            </div>
        </div>
    );
}

import React, { useContext } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/auth/AuthContext";
import { LogOut } from "lucide-react";

const SignOutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const auth = useContext(AuthContext);
        return (
            <Button
                variant={variant}
                size={size}
                className={cn(className)}
                ref={ref}
                asChild={asChild}
                {...props}
                onClick={() => auth?.signOut(() => {})}
            >
                <LogOut className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        );
    }
);

SignOutButton.displayName = "SignOutButton";

export default SignOutButton;

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth-actions"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  showIcon?: boolean
}

export function LogoutButton({ variant = "ghost", size = "default", showIcon = true }: LogoutButtonProps) {
  return (
    <form action={logout}>
      <Button type="submit" variant={variant} size={size}>
        {showIcon && <LogOut className="w-4 h-4 mr-2" />}
        Logout
      </Button>
    </form>
  )
}

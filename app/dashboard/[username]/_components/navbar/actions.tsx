import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { LogOut } from "lucide-react"

export const Actions = async () => {

    return (
        <div className="flex items-center justify-end gap-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
                <Link href="/">
                    <LogOut className="mr-2" />
                    <p className="hidden lg:block text-base">
                        На главную
                    </p>
                </Link>
            </Button>

            <UserButton
                afterSignOutUrl="/"
            />
        </div>

    )
}

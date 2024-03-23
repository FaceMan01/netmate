import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clapperboard } from "lucide-react"

export const Actions = async () => {
    const user  = await currentUser()

    return (
        <div className="flex item-center justify-end gap-x-2 ml-4 lg:ml-0">
            <b>
            {!user ? (
                <SignInButton>
                    <Button>
                        Login
                    </Button>
                </SignInButton>
            ):
            (
                <div className="flex item-center gap-x-4">
                    <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                        asChild
                    >
                        <Link href={`/dashboard/${user.username}`}>
                            <Clapperboard className="mr-2"/>
                            <span className="hidden lg:block text-base">
                                Студия
                            </span>
                        </Link>
                    </Button>
                    <UserButton 
                        afterSignOutUrl="/"
                    />
                </div>
            )}
            </b>
        </div>
    )
} 
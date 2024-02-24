import { UserButton } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <h1>Account</h1>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}
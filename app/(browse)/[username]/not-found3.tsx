import { Button } from "@/components/ui/button"
import Link from "next/link"


const NotFound = () => {
    return (
        <div className="h-full flex flex-col item-center justify-center">
            <h1 className="text-4xl">404</h1>
            <Button>
                <Link href="/">На главную</Link>
            </Button>
        </div>
    )
} 

export default NotFound
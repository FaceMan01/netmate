import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center">
            <h1 className="text-4xl">404</h1>
            <p>
                Указанная страница не найдена
            </p>
            <Button asChild>
                <Link href="/">
                    Go back home
                </Link>
            </Button>
        </div>
    );
};

export default NotFoundPage;
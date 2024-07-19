import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-x-4 hover:opacity-75 transition">
            <div>
                <Image
                    src="/logo.svg"
                    alt="netmate"
                    height="70"
                    width="70"   
                />
            </div>
            <div className={cn("hidden lg:block", font.className)}> 
                <p className="font-semibold text-xl">
                    Net|Mate
                </p>
            </div>
        </Link>
    );
};
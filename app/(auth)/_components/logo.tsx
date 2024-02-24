import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const Logo = () => {
    return (
        <div className="flex flex-col items-center">  
            <div>
                <Image 
                    src="/logo.svg"
                    alt="NetMate"
                    height="160"
                    width="160"
                />
            </div>
            <div className={cn(
                "flex flex-col item-center",
                font.className
            )}>
                <p className="text-3xl font-semibold">
                    Net|Mate
                </p>
            </div>
            <br/>
        </div>
    );
};
"use client"

import { Button } from "@/components/ui/button";

interface CopyButtonProps {
    value?: string
}

export const CopyButton = ({
    value
}: CopyButtonProps) => {
    const onCopy = () => {
        if (!value) return;
        navigator.clipboard.writeText(value)
    }

    return (
        <Button onClick={onCopy} variant="link">
            Копировать
        </Button>
    )
} 
"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { IngressInput } from "livekit-server-sdk"
import { useState, useTransition } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

export const GenerateButton = () => {
    const [isPending, startTransition] = useTransition()
    const [ingressType, setIngressType] = useState<IngressType>(RTMP)

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => toast.success("Ключ сгенерирован"))
                .catch(() => toast.error("Не удалось cгенерировать ключ"))
        })
    } 

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Генерировать ключ
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Генерировать ключ
                    </DialogTitle>
                </DialogHeader>
                <Select disabled={isPending} value={ingressType} onValueChange={(value) => setIngressType(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите тип трансляции"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTitle>
                        Внимание!
                    </AlertTitle>
                    <AlertDescription>
                        Это действие приведёт к сбросу всех существующих трансляций
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose asChild>
                        <Button variant="ghost">
                            Отменить
                        </Button>
                    </DialogClose>
                    <Button disabled={isPending} onClick={onSubmit}>
                        Генерировать
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
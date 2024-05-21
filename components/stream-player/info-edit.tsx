"use client"

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"

interface InfoEditProps {
    streamName: string
    streamThumbnailUrl: string | null
}

export const InfoEdit = ({
    streamName,
    streamThumbnailUrl
}: InfoEditProps) => {
    const [name, setName] = useState(streamName)
    const [thumbnailUrl, setThumbnailUrl] = useState(streamThumbnailUrl)
    const [isPending, startTransition] = useTransition()

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateStream({
                name: name,
                thumbnailUrl: thumbnailUrl
            })
            .then(() => {toast.success("Изменения сохранены")})
            .catch(() => {toast.error("Что-то пошло не так")})
        })
    }

    return (
            <Dialog>
                <DialogTrigger>
                        <Button>
                            Редактировать
                        </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Изменить информацию о стриме
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <h1>
                                Название
                            </h1>
                            <Input
                                disabled={isPending}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="space-y-4">
                            <h1>
                                Обложка
                            </h1>
                            <Input
                                disabled={isPending}
                                onChange={(e) => setThumbnailUrl(e.target.value)}
                                value={thumbnailUrl ? thumbnailUrl : ""}
                            />
                        </div>
                        <div className="flex justify-between">
                            <DialogClose>
                                <Button type="button" variant="outline">
                                    Отмена
                                </Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit" className="ml-auto">
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
    )
} 
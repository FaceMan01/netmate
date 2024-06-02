import { createViewerToken } from "@/actions/token"
import { JwtPayload, jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const useViewerToken = (hostId: string) => {
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostId)
                setToken(viewerToken)

                const decodeToken = jwtDecode(viewerToken) as JwtPayload & { name: string }
                const name = decodeToken.name
                const id = decodeToken.jti

                if (id) {
                    setId(id)
                }

                if (name) {
                    setName(name)
                }

            } catch {
                toast.error("Не удалось создать токен")
            }
        }

        createToken()
    }, [hostId])

    return { token, name, id }
}
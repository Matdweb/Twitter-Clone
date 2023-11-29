import { IconType } from "react-icons"
import { CSSProperties } from "react"

export type PostOptions = {
    id: number,
    name: string,
    icons: {
        Icon: IconType,
        style: CSSProperties
    }[],
    clickable: boolean,
    active?: boolean
}
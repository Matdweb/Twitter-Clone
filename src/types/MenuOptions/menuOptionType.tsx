export type MenuOptionType = {
    id: number,
    name: string,
    href?: string,
    icon: {
      ligth: JSX.Element,
      bold: JSX.Element
    },
    active: boolean
  }
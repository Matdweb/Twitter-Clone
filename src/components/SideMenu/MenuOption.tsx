import Link from "next/link"
import type { MenuOptionType } from '@/types/MenuOptions/menuOptionType';
import { useAppSelector } from '@/redux/hook';

type Props = MenuOptionType & {
    onClick: () => void,
}

function MenuOption({ href = "#", name, icon, onClick, active }: Props) {

    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);

    return (
        <Link
            href={active ? "#" : href}
            className={`p-3.5 pl-3 ${responsiveMenu && `ml-1`} lg:ml-1 rounded-full flex justify-start items-center flex-nowrap flex-row hover:bg-primary-gray dark:hover:bg-primary-dark-gray/20`}
            onClick={onClick}
        >
            {active ? icon.bold : icon.ligth}
            {windowWidth > 1024 || responsiveMenu ? <p className={`pl-4 ${active && `font-bold`}`}>{name}</p> : ''}
        </Link>
    )
}

export default MenuOption
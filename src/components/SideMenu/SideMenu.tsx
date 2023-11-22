'use client'
import { useState } from "react"
import { useAppSelector } from '@/redux/hook';
import { menuOptions as Options } from "@/lib/MenuOptions";
import type { MenuOptionType } from '@/types/MenuOptions/menuOptionType';
import TweetButton from "../Buttons/TweetButton";
import TwitterIcon from '../TwitterIcon';
import MenuOption from "./MenuOption";
import UserAccout from "./UserAccout";
import ModeToggleButton from "../Buttons/ModeToggleButton";

function SideMenu() {
    const [menuOptions, setMenuOptions] = useState<MenuOptionType[]>(Options);
    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);

    const toggleActive = (id: number) => {
        const options = menuOptions.map(({ active, id: idActive, ...rest }) => {
            if (idActive === id) {
                return {
                    id: idActive,
                    ...rest,
                    active: true
                }
            } else {
                return {
                    id: idActive,
                    ...rest,
                    active: false
                }
            }
        });

        setMenuOptions([...options])
    }

    return (
        <section className={`${responsiveMenu ? `flex min-w-[16rem]` : `hidden sm:flex`} w-16 lg:w-auto min-h-screen p-1 m-1 sm:flex shrink justify-between items-start flex-col flex-nowrap`}>
            {
                responsiveMenu &&
                <UserAccout />
            }
            <nav className={`w-full ${!responsiveMenu && `lg:w-60`} max-h-[37rem] flex items-start flex-nowrap flex-col`}>

                {
                    !responsiveMenu &&
                    <TwitterIcon fontSize="2.5rem" marginLeft={windowWidth > 1024 ? "1rem" : "0.3rem"} marginBottom="2rem" marginTop="2rem" />
                }

                {
                    menuOptions.map(({ id, icon, href, active, name }) => {
                        return (
                            <MenuOption
                                key={id}
                                id={id}
                                href={href}
                                name={name}
                                icon={icon}
                                active={active}
                                onClick={() => toggleActive(id)}
                            />
                        )
                    })
                }
                <TweetButton className='w-full' />
            </nav>

            {!responsiveMenu && <UserAccout />}
            {responsiveMenu && <ModeToggleButton className='pt-3' />}
        </section>
    )
}

export default SideMenu
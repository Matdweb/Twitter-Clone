'use client'
import { useState } from "react"
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';
import { menuOptions as Options } from "@/lib/MenuOptions";
import type { MenuOptionType } from '@/types/MenuOptions/menuOptionType';
import { TbPencilPlus } from 'react-icons/tb';
import TwitterIcon from '../TwitterIcon';
import MenuOption from "./MenuOption";
import UserAccout from "./UserAccout";

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
        <section className={`${windowWidth < 640 && !responsiveMenu ? `hidden` : windowWidth < 1024 ? `w-16 p-2` : `w-1/4`} ${responsiveMenu && `min-w-[16rem]`} min-h-screen outline outline-2 outline-black dark:outline-white rounded-md p-1 m-1 shrink flex justify-between items-start flex-col flex-nowrap`}>

            <nav className={`${windowWidth > 1024 || responsiveMenu ? `w-60` : `w-full`} max-h-[37rem] mt-8 flex items-start flex-nowrap flex-col`}>
                <TwitterIcon fontSize="2.5rem" marginLeft={windowWidth > 1024 ? "1rem" : "0.3rem"} marginBottom="2rem" />

                {
                    menuOptions.map(({ id, icon, href, active, name }) => {
                        return (
                            <MenuOption
                                key={id} id={id}
                                href={href}
                                name={name}
                                icon={icon}
                                active={active}
                                onClick={() => toggleActive(id)}
                            />
                        )
                    })
                }

                <button className='btn-primary mt-4 w-full p-4'>
                    {windowWidth > 1024 || responsiveMenu ?
                        'Tweet' :
                        <TbPencilPlus style={{ fontSize: "1rem" }} />}
                </button>
            </nav>

            <UserAccout />
        </section>
    )
}

export default SideMenu
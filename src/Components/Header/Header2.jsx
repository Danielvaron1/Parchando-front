import React, {useState} from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu, NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";

const Header2 = () => {

    const [activeItem, setActiveItem] = useState("Inicio");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const menuItems = [
        "Perfil",
        "Mensajes",
        "Notificaciones",
        "Inicio",
        "Eventos",
        "Mis eventos",
        "Acerca De",
        "Salir",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="Header">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="menu"
                />
                <NavbarBrand >
                    <Link to="" onClick={() => handleItemClick("Inicio")} className="logo text-inherit">
                        Parchando.com
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="navbar-middle sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        to={""}
                        className={`${activeItem === "Inicio" ? "active" : ""}`}
                        onClick={() => handleItemClick("Inicio")}
                    >
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        to={""}
                        className={`${activeItem === "Eventos" ? "active" : ""}`}
                        onClick={() => handleItemClick("Eventos")}
                    >

                        Eventos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        to={""}
                        className={`${activeItem === "Mis Eventos" ? "active" : ""}`}
                        onClick={() => handleItemClick("Mis Eventos")}
                    >
                        Mis Eventos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        to={""}
                        className={`${activeItem === "Acerca De" ? "active" : ""}`}
                        onClick={() => handleItemClick("Acerca De")}
                    >
                        Acerca De
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} to={"/login"} color="secondary">
                        Entra
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default Header2;
import React  from "react";
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
const MenuLeilao = () => {const itemRenderer = (item) => (
    <div className='p-menuitem-content' onClick={logout}>
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    </div>
);
let items = [
    {
        label: 'Profile',
        items: [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                shortcut: '⌘+Q',
                template: itemRenderer
            }
        ]
    },
    {
        separator: true
    },
        {
            command: () => {
               
                Toast.current.show({ severity: 'info', summary: 'Info', detail: 'Item Selected', life: 3000 });
            },
            template: (item, options) => {
                return (
                    
                    <button onClick={() => navigate('/home/porfile', '_blank')} className={(options.className, 'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround')}>
                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="mr-2" shape="circle" />
                        <div className="flex flex-column align">
                            <span className="font-bold">Keren Apuque</span>
                            <span className="text-sm">Agent</span>
                        </div>
                    </button>
                );
            }
        }
    ];
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
                            
    }
    return (
        <div className="card flex justify-content-center">
            <Menu model={items} className="w-full md:w-15rem" />
        </div>
    )
}
export default MenuLeilao;
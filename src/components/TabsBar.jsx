import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink } from "react-router-dom";

function TabsBar(props)
{

    const tabs = [
        {
            value: 0,
            label: "All Products",
            to: "all-products",
        },
        {
            value: 1,
            label: "Limited Products",
            to: "limited-products",
        }
    ];
    let url = window.location.pathname;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) =>
    {
        setValue(newValue);
    };
    return (
        <Tabs
            value={value}
            onChange={handleChange}
        >
            {tabs.map(({ value, label, to }) =>
            {
                return (
                    <Tab
                        value={value}
                        label={label}
                        key={value}
                        component={NavLink}
                        to={to}
                    />
                );
            })}
        </Tabs>
    );
}

export default TabsBar;

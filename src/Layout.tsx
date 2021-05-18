import * as React from 'react';
import { forwardRef, memo } from 'react';
import { Layout, AppBar, UserMenu, useLocale, useSetLocale } from 'react-admin';
import { MenuItem, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Language from '@material-ui/icons/Language';

const useStyles = makeStyles(theme => ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    icon: { minWidth: theme.spacing(5) },
}));

const SwitchLanguage = forwardRef((props, ref) => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    return (
        <MenuItem
          // @ts-ignore
            ref={ref}
            className={classes.menuItem}
            onClick={() => {
                setLocale(locale === 'en' ? 'fr' : 'en');
              // @ts-ignore
                props.onClick();
            }}
        >
            <ListItemIcon className={classes.icon}>
                <Language />
            </ListItemIcon>
            Switch Language
        </MenuItem>
    );
});

// @ts-ignore
const MyUserMenu = props => (
    <UserMenu {...props}>
        <SwitchLanguage />
    </UserMenu>
);

const MyAppBar = memo(props => <AppBar {...props} userMenu={<MyUserMenu />} />);

// @ts-ignore
export default props => <Layout {...props} appBar={MyAppBar} />;

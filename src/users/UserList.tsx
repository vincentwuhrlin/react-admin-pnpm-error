/* eslint react/jsx-key: off */
import PeopleIcon from '@material-ui/icons/People';
// @ts-ignore
import { useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import {
    BulkDeleteWithConfirmButton,
    Datagrid,
    Filter,
    List,
    SearchInput,
    SimpleList,
    TextField,
    TextInput,
} from 'react-admin';

import Aside from './Aside';
import UserEditEmbedded from './UserEditEmbedded';
export const UserIcon = PeopleIcon;

// @ts-ignore
const UserFilter = ({ permissions, ...props }) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <TextInput source="name" />
        {permissions === 'admin' ? <TextInput source="role" /> : null}
    </Filter>
);

// @ts-ignore
const UserBulkActionButtons = props => (
    <BulkDeleteWithConfirmButton {...props} />
);

// @ts-ignore
const rowClick = permissions => (id, basePath, record) => {
    return permissions === 'admin'
        ? Promise.resolve('edit')
        : Promise.resolve('show');
};

// @ts-ignore
const UserList = ({ permissions, ...props }) => (
    <List
        {...props}
        filters={<UserFilter permissions={permissions} />}
        filterDefaultValues={{ role: 'user' }}
        sort={{ field: 'name', order: 'ASC' }}
        aside={<Aside />}
        bulkActionButtons={<UserBulkActionButtons />}
    >

        {
            // @ts-ignore
            useMediaQuery(theme => theme.breakpoints.down('sm')) ? (
            <SimpleList
                primaryText={record => record.name}
                secondaryText={record =>
                    permissions === 'admin' ? record.role : null
                }
            />
        ) : (
            <Datagrid
                rowClick={rowClick(permissions)}
              // @ts-ignore
                expand={<UserEditEmbedded />}
                optimized
            >
                <TextField source="id" />
                <TextField source="name" />
                {permissions === 'admin' && <TextField source="role" />}
            </Datagrid>
        )}
    </List>
);

export default UserList;

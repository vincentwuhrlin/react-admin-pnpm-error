/* eslint react/jsx-key: off */
import * as React from 'react';
import { useTranslate } from 'react-admin';

// @ts-ignore
const UserTitle = ({ record }) => {
    const translate = useTranslate();
    return (
        <span>
            {record ? translate('user.edit.title', { title: record.name }) : ''}
        </span>
    );
};

export default UserTitle;

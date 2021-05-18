/* eslint react/jsx-key: off */
import * as React from 'react';
import { Admin, Resource, RouteWithoutLayout } from 'react-admin';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';

import authProvider from './authProvider';
import comments from './comments';
import CustomRouteLayout from './customRouteLayout';
import CustomRouteNoLayout from './customRouteNoLayout';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import Layout from './Layout';
import posts from './posts';
import users from './users';
import tags from './tags';

render(
    <Admin
      // @ts-ignore
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        title="Example Admin"
        layout={Layout}
        customRoutes={[
          // @ts-ignore
            <RouteWithoutLayout
                exact
                path="/custom"
              // @ts-ignore
                component={props => <CustomRouteNoLayout {...props} />}
            />,
            <Route
                exact
                path="/custom2"
              // @ts-ignore
                component={props => <CustomRouteLayout {...props} />}
            />,
        ]}
    >
        {permissions => [
          // @ts-ignore
            <Resource name="posts" {...posts} />,
            <Resource name="comments" {...comments} />,
          // @ts-ignore
            permissions ? <Resource name="users" {...users} /> : null,
            <Resource name="tags" {...tags} />,
        ]}
    </Admin>,
    document.getElementById('root')
);

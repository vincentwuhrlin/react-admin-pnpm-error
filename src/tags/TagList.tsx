import * as React from 'react';
import { Fragment, useState } from 'react';
import {
    ListBase,
    ListActions,
    useListContext,
    EditButton,
    Title,
} from 'react-admin';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Collapse,
    Card,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// @ts-ignore
const TagList = props => (
    <ListBase perPage={1000} {...props}>
        <ListActions />
        <Box maxWidth="20em" marginTop="1em">
            <Card>
                <Tree />
            </Card>
        </Box>
    </ListBase>
);

const Tree = () => {
    const { ids, data, defaultTitle } = useListContext();
    const [openChildren, setOpenChildren] = useState([]);
    // @ts-ignore
    const toggleNode = node =>
      // @ts-ignore
        setOpenChildren(state => {
            // @ts-ignore
            if (state.includes(node.id)) {
                return [
                    // @ts-ignore
                    ...state.splice(0, state.indexOf(node.id)),
                    // @ts-ignore
                    ...state.splice(state.indexOf(node.id) + 1, state.length),
                ];
            } else {
                return [...state, node.id];
            }
        });
    const nodes = ids.map(id => data[id]);
    const roots = nodes.filter(node => typeof node.parent_id === 'undefined');
    // @ts-ignore
    const getChildNodes = root =>
        nodes.filter(node => node.parent_id === root.id);
    return (
        <List>
            <Title defaultTitle={defaultTitle} />
            {roots.map(root => (
              // @ts-ignore
                <SubTree
                    key={root.id}
                    root={root}
                    getChildNodes={getChildNodes}
                    openChildren={openChildren}
                    toggleNode={toggleNode}
                    level={1}
                />
            ))}
        </List>
    );
};

const SubTree = ({
                     // @ts-ignore
    level,
                     // @ts-ignore
    root,
                     // @ts-ignore
    getChildNodes,
                     // @ts-ignore
    openChildren,
                     // @ts-ignore
    toggleNode,
                     // @ts-ignore
    defaultTitle,
}) => {
    const childNodes = getChildNodes(root);
    const hasChildren = childNodes.length > 0;
    const open = openChildren.includes(root.id);
    return (
        <Fragment>
            <ListItem
              // @ts-ignore
                button={hasChildren}
                onClick={() => hasChildren && toggleNode(root)}
                style={{ paddingLeft: level * 16 }}
            >
                {hasChildren && open && <ExpandLess />}
                {hasChildren && !open && <ExpandMore />}
                {!hasChildren && <div style={{ width: 24 }}>&nbsp;</div>}
                <ListItemText primary={root.name.en} />

                <ListItemSecondaryAction>
                    <EditButton record={root} basePath="/tags" />
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    {childNodes.map((node: any) => (
                      // @ts-ignore
                        <SubTree
                            key={node.id}
                            root={node}
                            getChildNodes={getChildNodes}
                            openChildren={openChildren}
                            toggleNode={toggleNode}
                            level={level + 1}
                        />
                    ))}
                </List>
            </Collapse>
        </Fragment>
    );
};

export default TagList;

import * as React from 'react';
import { useMemo } from 'react';
import RichTextInput from 'ra-input-rich-text';
import {
    ArrayInput,
    AutocompleteInput,
    BooleanInput,
    Create,
    DateInput,
    FormDataConsumer,
    NumberInput,
    ReferenceInput,
    SaveButton,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    Toolbar,
    required,
    FileInput,
    FileField,
} from 'react-admin';
import { FormSpy } from 'react-final-form';

// @ts-ignore
const PostCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="post.action.save_and_edit"
            redirect="edit"
            submitOnEnter={true}
        />
        <SaveButton
            label="post.action.save_and_show"
            redirect="show"
            submitOnEnter={false}
            variant="text"
        />
        <SaveButton
            label="post.action.save_and_add"
            redirect={false}
            submitOnEnter={false}
            variant="text"
        />
        <SaveButton
            label="post.action.save_with_average_note"
            transform={data => ({ ...data, average_note: 10 })}
            redirect="show"
            submitOnEnter={false}
            variant="text"
        />
    </Toolbar>
);

const backlinksDefaultValue = [
    {
        date: new Date(),
        url: 'http://google.com',
    },
];

// @ts-ignore
const PostCreate = ({ permissions, ...props }) => {
    const initialValues = useMemo(
        () => ({
            average_note: 0,
        }),
        []
    );

    const dateDefaultValue = useMemo(() => new Date(), []);

    // @ts-ignore
  // @ts-ignore
  return (
        <Create {...props}>
            <SimpleForm
                toolbar={<PostCreateToolbar />}
                initialValues={initialValues}
              // @ts-ignore
                validate={values => {

                  const errors = {}
                    // @ts-ignore
                    /*
                    ['title', 'teaser'].forEach(field => {
                        if (!values[field]) {
                            errors[field] = 'Required field';
                        }
                    });*/

                    if (values.average_note < 0 || values.average_note > 5) {
                      // @ts-ignore
                        errors.average_note = 'Should be between 0 and 5';
                    }

                    return errors;
                }}
            >
                <FileInput
                    source="pdffile"
                    label="PDF-Template"
                    accept="application/pdf"
                >
                    <FileField source="src" title="title" />
                </FileInput>
                <TextInput autoFocus source="title" />
                <TextInput source="teaser" fullWidth={true} multiline={true} />
                <RichTextInput source="body" validate={required()} />
                <FormSpy subscription={{ values: true }}>
                    {({ values }) =>
                        values.title ? (
                            <NumberInput source="average_note" />
                        ) : null
                    }
                </FormSpy>

                <DateInput
                    source="published_at"
                    defaultValue={dateDefaultValue}
                />
                <BooleanInput source="commentable" defaultValue />
                <ArrayInput
                    source="backlinks"
                    defaultValue={backlinksDefaultValue}
                    validate={[required()]}
                >
                    <SimpleFormIterator>
                        <DateInput source="date" />
                        <TextInput source="url" />
                    </SimpleFormIterator>
                </ArrayInput>
                {permissions === 'admin' && (
                    <ArrayInput source="authors">
                        <SimpleFormIterator>
                            <ReferenceInput
                                label="User"
                                source="user_id"
                                reference="users"
                            >
                                <AutocompleteInput />
                            </ReferenceInput>
                            <FormDataConsumer>
                                {({
                                    formData,
                                    scopedFormData,
                                    getSource,
                                    ...rest
                                }) =>
                                    scopedFormData && scopedFormData.user_id ? (
                                        <SelectInput
                                            label="Role"
                                          // @ts-ignore
                                            source={getSource('role')}
                                            choices={[
                                                {
                                                    id: 'headwriter',
                                                    name: 'Head Writer',
                                                },
                                                {
                                                    id: 'proofreader',
                                                    name: 'Proof reader',
                                                },
                                                {
                                                    id: 'cowriter',
                                                    name: 'Co-Writer',
                                                },
                                            ]}
                                            {...rest}
                                        />
                                    ) : null
                                }
                            </FormDataConsumer>
                        </SimpleFormIterator>
                    </ArrayInput>
                )}
            </SimpleForm>
        </Create>
    );
};

export default PostCreate;

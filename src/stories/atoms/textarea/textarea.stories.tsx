import { Story } from '@storybook/react';
import { TextArea, TextAreaProps } from './textarea';
import styles from './textarea.module.scss';

export default {
    component: TextArea,
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        additionalClasses: {
            control: { type: 'text' },
        },
        placeholder: {
            control: { type: 'text' },
        },
        error: {
            control: { type: 'text' },
        },
    },
};

const Template: Story<TextAreaProps> = ({ children, ...props }: TextAreaProps) => (
    <TextArea {...props}>{children}</TextArea>
);

export const TemplateArea = Template.bind({});

export const FormTextArea = Template.bind({});

FormTextArea.args = {
    additionalClasses: styles.form,
    error: 'Some error occurred',
    labelText: 'Label',
};

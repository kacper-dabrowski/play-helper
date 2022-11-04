import { Story } from '@storybook/react';
import { Input, InputProps } from './input';
import styles from './input.module.scss';

export default {
    title: 'stories/atoms/input/text-input',
    component: Input,
    argTypes: {
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

const Template: Story<InputProps> = ({ ...props }: InputProps) => <Input {...props} />;

export const FormInput = Template.bind({});

FormInput.args = {
    additionalClasses: styles.form,
    labelText: 'label text',
};

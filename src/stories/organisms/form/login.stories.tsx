import { Story } from '@storybook/react';
import { LoginForm, LoginFormProps } from './login';

export default {
    component: LoginForm,
    argTypes: {
        loading: { type: 'boolean' },
    },
};

const Template: Story<LoginFormProps> = ({ ...props }: LoginFormProps) => <LoginForm {...props} />;

export const Default = Template.bind({});

Default.args = {
    loading: false,
};

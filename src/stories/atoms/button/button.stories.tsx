import { Story } from '@storybook/react';
import { Button, ButtonProps, ButtonVariant } from './button';
import styles from './button.module.scss';

export default {
    component: Button,
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        variant: {
            control: { type: 'radio', options: [ButtonVariant.Allowed, ButtonVariant.Forbidden, ButtonVariant.Submit] },
        },
        loading: {
            control: {
                type: 'boolean',
            },
        },
    },
};

const Template: Story<ButtonProps> = ({ children, ...props }: ButtonProps) => <Button {...props}>{children}</Button>;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Button',
    additionalClasses: styles.fullWidth,
    variant: ButtonVariant.Allowed,
};

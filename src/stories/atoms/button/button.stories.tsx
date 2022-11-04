import { Story } from '@storybook/react';
import { Button, ButtonProps } from './button';
import styles from './button.module.scss';

export default {
    component: Button,
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        variant: {
            control: { type: 'radio', options: ['allowed', 'forbidden'] },
        },
    },
};

const Template: Story<ButtonProps> = ({ children, ...props }: ButtonProps) => <Button {...props}>{children}</Button>;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Button',
    additionalClasses: styles.fullWidth,
    variant: 'allowed',
};

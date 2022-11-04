import { Story } from '@storybook/react';
import { Checkbox, CheckboxProps } from './input';

export default {
    title: 'stories/atoms/input/checkbox',
    component: Checkbox,
    argTypes: {
        additionalClasses: {
            control: { type: 'text' },
        },
    },
};

const Template: Story<CheckboxProps> = ({ ...props }: CheckboxProps) => <Checkbox {...props} />;

export const CheckboxInput = Template.bind({});

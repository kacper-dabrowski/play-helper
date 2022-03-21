import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../../components/UI/Navbars/PageNavbar/Navbar';
import { BaseLayout } from '../BaseLayout/BaseLayout';
import { SimpleGrid } from '@chakra-ui/react';

const SupportLayout = ({ children, routes, backgroundImage }) => {
    const authStore = useSelector((state) => state.auth);

    return (
        <BaseLayout backgroundImage={backgroundImage}>
            <Navbar routes={routes} username={authStore.user.fullName} />
            <SimpleGrid columns={2} placeItems={'center'} width={'80%'} textAlign={'center'} margin="auto">
                {children}
            </SimpleGrid>
        </BaseLayout>
    );
};

export default SupportLayout;

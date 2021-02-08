const routes = {
    support: {
        main: { title: '', exact: true, path: '/support' },
        basic: { title: 'Zamknięcie zwykłe', exact: true, path: '/support/basic' },
        doubleOpened: { title: 'Dubel do otwartego', exact: true, path: '/support/double-opened' },
        doubleClosed: { title: 'Dubel do zamkniętego', exact: true, path: '/support/double-closed' },
        payments: { title: 'Raty', exact: true, path: '/support/payments' },
        srq: { title: 'SRQ', exact: true, path: '/support/srq' },
        solutions: { title: 'Zapisane zamknięcia', exact: true, path: '/support/solutions' },
    },
    userPanel: {
        solution: { title: 'Własne zamknięcia', exact: true, path: '/user-panel/solutions' },
        srq: { title: 'SRQ', exact: true, path: '/user-panel/srq' },
    },
    playNext: {},
};
export default routes;

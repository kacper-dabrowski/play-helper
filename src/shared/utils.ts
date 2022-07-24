export const convertDate = (date: string) => {
    const dateObject = new Date(date);
    const months = [
        'stycznia',
        'lutego',
        'marca',
        'kwietnia',
        'maja',
        'czerwca',
        'lipca',
        'sierpnia',
        'września',
        'października',
        'listopada',
        'grudnia',
    ];

    const day = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();

    return `${day} ${months[month]} ${year} roku`;
};

export const getJoiningSign = ({
    index,
    array = [],
    sign = ',',
    lastSign = '.',
}: {
    index: number;
    array?: Array<unknown>;
    sign?: string;
    lastSign?: string;
}): string => (index === array?.length - 1 ? lastSign : sign);

function convertSignStringToUnSignString(str: string): string {
    const convertedStr = str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    const lowerCaseStr = convertedStr.toLowerCase();
    return lowerCaseStr;
}

export default convertSignStringToUnSignString;

const daysCount = 24 * 60 * 60 * 1000;
const interval = 7;
const titleLength = 33;
const textLength = 110;
const commitText = 110;
const week = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const month = [
	'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];
const monthIP = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
const diagramWidth = 85;
const countArticles = 100;
const stepShow = 3;
const errorMessage = {
	requiredText: "Это обязательное поле",
	lengthText: "Должно быть от 2 символов"
}
export {
	errorMessage, daysCount, interval, titleLength, textLength, commitText, month, monthIP, week, diagramWidth, countArticles, stepShow
};
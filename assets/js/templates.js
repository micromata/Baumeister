const name = 'Max Mustermann';
const templateString = `Hi my name is ${name}!`;

export const templates = {
	render() {
		return templateString;
	}
};

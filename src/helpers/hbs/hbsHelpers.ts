export default class CustomHelpers {
    static formatDate(str: string): string {
        const data = new Date(str),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano = data.getFullYear();
        return dia + "/" + mes + "/" + ano;
    }

    static contains(array: string[], value, options) {
        if (array && array.indexOf(value) !== -1) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
    }
}
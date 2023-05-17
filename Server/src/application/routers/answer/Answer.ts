export default class Answer {
    private CODES: { [key: number]: any } = {
        404: 'Page not found',
        9000: 'Unknown error'
    }
    constructor(){
    }

    good(data:any){
        return {
            result: 'ok',
            data
        }
    }

    bad(code: number){
        const errCode: number = (code || this.CODES[code]) ? code : 9000;
        return {
            result: 'error',
            data: {
                code: code,
                text: this.CODES[errCode]
            }
        }
    }
}
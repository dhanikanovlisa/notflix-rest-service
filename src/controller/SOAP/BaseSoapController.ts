
class BaseSoapController {
    async createHeader() {
        return {
            headers: {
                'Content-Type': 'text/xml',
                'API-Key':`${process.env.SOAP_API_KEY}`,
            },
        };
    }

    async createBody(method: string, params: any) {
        const envelopeNS = 'http://schemas.xmlsoap.org/soap/envelope/';
        const serviceNS = 'http://service/';

        const body = `
            <soapenv:Envelope xmlns:soapenv="${envelopeNS}" xmlns:web="${serviceNS}">
                <soapenv:Body>
                    <web:${method}>
                        ${params}
                    </web:${method}>
                </soapenv:Body>
            </soapenv:Envelope>
        `;

        return body;
    }

    async createParams(param: string, value: string) {
        return `<${param} xmlns="">${value}</${param}>`;
    }

    async createManyParams(params: Record<string, object>){
        let xmlString = '';
        for (const [param, value] of Object.entries(params)){
            xmlString += `<${param} xmlns="">${value}</${param}>`
        }
        return xmlString;
    }


    async parseXmlResponse(xmlData: string) {
        const { parseString } = require('xml2js');
        return new Promise((resolve, reject) => {
            parseString(xmlData, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async getResponse(result: any, method: string){
        if(method == ""){
            const responseBody = result['S:Envelope']['S:Body'];
            return responseBody;
        } else {
            const responseBody = result['S:Envelope']['S:Body'][0][`ns2:${method}Response`][0];
            return responseBody;
        }
    }

    async formatToJSON(result:any){
        const responseBody:any = [];
        result.forEach((res:any) => {
            const resObject:any = {};
            Object.keys(res).forEach((key) => {
                resObject[key] = res[key][0];
            });
            responseBody.push(resObject);
        });
        return responseBody;
    }



}

export default BaseSoapController;

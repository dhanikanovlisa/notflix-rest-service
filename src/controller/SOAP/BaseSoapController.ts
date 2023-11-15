
class BaseSoapController {
    async createHeader() {
        return {
            headers: {
                'Content-Type': 'text/xml',
                'Api-key':`${process.env.SOAP_API_KEY}`,
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
}

export default BaseSoapController;

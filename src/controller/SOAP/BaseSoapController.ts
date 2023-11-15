import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

class BaseSoapController {
    async createHeader() {
        return {
            headers: {
                'Content-Type': 'text/xml',
                'Api-key': `${process.env.SOAP_API_KEY}`,
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

    async createManyParams(params: Record<string, object>) {
        let xmlString = '';
        for (const [param, value] of Object.entries(params)) {
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

    parseXmlObject(xmlResponse: any): object {
        const soapBody = xmlResponse['S:Envelope']['S:Body'];
        const methodNamespace = Object.keys(soapBody[0])[0];

        const responseBody = soapBody[0][methodNamespace][0]['return'];
        const parsedResponse: object[] = [];
        if (responseBody) {
            responseBody.forEach((el: any) => {
                const obj: any = {};
                Object.keys(el).forEach((key) => {
                    obj[key] = el[key][0];
                });
                parsedResponse.push(obj);
            });
            if (parsedResponse.length === 1) {
                return parsedResponse[0];
            }
        }


        return parsedResponse;
    }

    protected async dispatchSoapRequest(method: string, serviceUrl: string, parameters?: Record<string, any>) {
        const header = await this.createHeader();
        const params = parameters === undefined ? '' : await this.createManyParams(parameters);
        const body = await this.createBody(method, params);

        const response = await axios.post(serviceUrl, body, {
            headers: header.headers
        });

        if (response.status === 200) {
            const parsedXmlResponse: any = await this.parseXmlResponse(response.data);
            const parsedXmlObject: object = this.parseXmlObject(parsedXmlResponse);

            return {
                responseStatus: 200,
                message: "Success",
                data: parsedXmlObject
            };
        } else {
            return {
                responseStatus: response.status,
                message: response.statusText,
                data: []
            };
        }
    }

    protected async errorHandlingWrapper(fun: () => Promise<any>, req: Request, res: Response) {
        try {
            await fun();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError = error;
                console.error('Error calling SOAP service:', axiosError);
                if (axiosError.response) {
                    res.status(axiosError.response.status).send(axiosError.response.statusText);
                } else {
                    res.status(500).send('Internal Server Error');
                }
            } else {
                console.error('Unknown error', error);
                res.status(500).send('Internal Server Error');
            }
        }
    }
}

export default BaseSoapController;

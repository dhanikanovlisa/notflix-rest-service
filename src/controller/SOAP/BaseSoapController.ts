class BaseSoapController {

    async createHeader() {
        return {
            headers: {
              'Content-Type': 'text/xml',
              'API-Key': process.env.SOAP_API_KEY,
            }
          };

    }
    async createBody(method: string, params: any) {
        const body = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://service/">
                <soapenv:Header/>
                <soapenv:Body>
                    <web:${method}>
                        ${params}
                    </web:${method}>
                </soapenv:Body>
            </soapenv:Envelope>
        `;
    
        return body;
    }
    

    async createParams($param: string, $value: string) {
        return `
        <${$param} xmlns="">${$value}</${$param}>
    `;
    }
}

export default BaseSoapController;

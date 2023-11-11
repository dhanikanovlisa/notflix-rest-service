class BaseSoapController {

    protected url = process.env.SOAP_URL;
    protected api_key = process.env.SOAP_API_KEY;

    async createHeader() {
        return {
            headers: {
              'Content-Type': 'text/xml',
              'API-Key': '7e588ca133d33870bf37813863686615',
            }
          };

    }
    async createBody(method: string, params: any) {
        const body = `
            <Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://service/">
                <Body>
                    <${method} xmlns="http://service/">
                        ${params}
                    </${method}>
                </Body>
            </Envelope>
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

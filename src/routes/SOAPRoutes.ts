import express from 'express';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import SoapController from '../controller/SOAP/SOAPController';

const soapRouter = express.Router();
const soapController = new SoapController();



export default soapRouter;
import express from 'express';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import SoapController from '../controller/SOAP/BaseSoapController';

const soapRouter = express.Router();



export default soapRouter;
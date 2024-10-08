import express from 'express';
import { payment } from './payment.controller';

const router = express.Router();

router.post('/pay', payment.createPayment);
router.post('/success', payment.successPayment);

export const paymentRoute = router;

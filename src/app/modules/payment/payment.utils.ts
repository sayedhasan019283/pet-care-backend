/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../../config';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

type TPaymentData = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail: string;
  amount: number;
  rentalId: string;
  transId: string;
};

export const initialPayment = async (paymentData: TPaymentData) => {
  try {
    const response = await axios.post(config.payment_url as string, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transId,
      success_url: `https://backend-assignment-6.vercel.app/api/rental-pay/success?rentalId=${paymentData.rentalId}&transId=${paymentData.transId}&status=success`,
      fail_url:
        'https://backend-assignment-6.vercel.app/api/rental-pay/success?status=failed',
      cancel_url: 'https://animal-care-chi.vercel.app',
      amount: paymentData.amount,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/1',
      cus_country: 'Bangladesh',
      cus_phone: paymentData.customerPhone,
      type: 'json',
    });
    return response.data;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'fail payment ');
  }
};

export const verifyPayment = async (id: string) => {
  try {
    const response = await axios.get(config.payment_verify_url as string, {
      params: {
        request_id: id,
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
      },
    });
    return response.data;
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'fail payment ');
  }
};

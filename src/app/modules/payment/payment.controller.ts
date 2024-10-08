/* eslint-disable prefer-const */
/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { initialPayment, verifyPayment } from './payment.utils';
import { join } from 'path';
import { readFileSync } from 'fs';
import { User } from '../user/user.model';

const createPayment = catchAsync(async (req, res) => {
  const bodyData = req.body;

  const paymentData = {
    ...bodyData,
    transId: `TRX_${Date.now()}`,
  };

  const result = await initialPayment(paymentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'payment created successfully',
    data: result,
  });
});

const successPayment = catchAsync(async (req, res) => {
  const { rentalId, transId } = req.query;
  const verifyData = await verifyPayment(transId as string);

  let message = '';
  if (verifyData && verifyData?.pay_status === 'Successful') {
    await User.findByIdAndUpdate(
      { _id: rentalId },
      {
        payment: 'paid',
      },
      { new: true },
    );
    message = 'Congratulation Your Payment Successfully done!!';
  } else {
    message = 'Sorry!! Your Payment Failed..!! Please Try again';
  }

  const filePath = join(__dirname, '../../../../public/payment.html');
  let template = readFileSync(filePath, 'utf-8');
  template = template.replace('{{message}}', message);

  res.send(template);

  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'payment created successfully',
  //     data: result,
  //   });
});

export const payment = {
  createPayment,
  successPayment,
};

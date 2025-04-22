import PaymentDTO from "../dto/paymentDTO";
import dataSource from "../../../db/dataSource";
import PaymentModel from "../models/PaymentModel";
import CommonService from "../../common/service/commonService";


const paymentService = new CommonService<PaymentModel, PaymentDTO>(
    PaymentModel,
    dataSource,
    PaymentDTO,
    []
);

export default paymentService;
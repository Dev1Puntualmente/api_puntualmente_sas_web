import PaymentDTO from "../dto/paymentDTO";
import paymentService from "../services/paymentService";
import CommonController from "../../common/controller/commonController";


const paymentController = new CommonController<PaymentDTO>(paymentService);

export default paymentController;
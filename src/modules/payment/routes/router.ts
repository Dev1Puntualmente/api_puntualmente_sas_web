import { PaymentCreateDTO } from "../dto/paymentDTO";
import paymentController from "../controllers/paymentController";
import createCommonRouter from "../../common/router/createCommonRouter";


const router = createCommonRouter(paymentController, PaymentCreateDTO);

export default router;
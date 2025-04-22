import contactController from "../controllers/contactController";
import {ContactCreateDTO} from "../dto/contactDTO";
import createCommonRouter from "../../common/router/createCommonRouter";



const contactRouter = createCommonRouter(contactController, ContactCreateDTO);

export default contactRouter;
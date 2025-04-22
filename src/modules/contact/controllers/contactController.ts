import contactService from "../services/contactService";
import ContactDTO from "../dto/contactDTO";
import CommonController from "../../common/controller/commonController";

const contactController = new CommonController<ContactDTO>(contactService);

export default contactController;
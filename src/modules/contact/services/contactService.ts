import ContactDTO from "../dto/contactDTO";
import dataSource from "../../../db/dataSource";
import ContactModel from "../models/ContactModel";
import CommonService from "../../common/service/commonService";

const contactService = new CommonService<ContactModel, ContactDTO>(
    ContactModel,
    dataSource,
    ContactDTO,
    []
);

export default contactService;
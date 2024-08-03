import DatabaseCore from "../../cores/DatabaseCore";
import MCSessionsEntity from "../entity/MCSessionsEntity";

const MCSessionsRepository = DatabaseCore.pool.getRepository(MCSessionsEntity);
export default MCSessionsRepository;
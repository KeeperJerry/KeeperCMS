import DatabaseCore from "../../cores/DatabaseCore";
import MCPlayersEntity from "../entity/MCPlayersEntity";

const MCPlayersRepository = DatabaseCore.pool.getRepository(MCPlayersEntity);
export default MCPlayersRepository;
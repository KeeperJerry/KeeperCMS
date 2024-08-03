import DatabaseCore from "../../cores/DatabaseCore";
import UsersEntity from "../entity/UsersEntity";

const UsersRepository = DatabaseCore.pool.getRepository(UsersEntity);
export default UsersRepository;
import Axios from "../config/axiosConfig";
import { LIST_MESSAGE_IN_FRIEND,  SEND_MESSAGE} from "../API/api";

const UserService = {

    // messageAllFriend: async (fromUserId, toUserId) => {
    //     return await Axios.post("/allFriend?fromUserId="+fromUserId+"&&toUserId="+toUserId);
    // },


    messageAllFriend: async (fromUserId) => {
        return await Axios.get("/allFriend/"+fromUserId);
    },

    createMessage : async  (fromUserId, toUserId) => {
        return await Axios.post("/create?fromUserId="+fromUserId + "&&toUserId="+toUserId)
    },



    messageAllInFriend: async (id,principal) => {
        return await Axios.post(LIST_MESSAGE_IN_FRIEND+id,principal);
    },

    // messageAllInFriend: async (id,principal, toUserId1) => {
    //     return await Axios.post("all/"+id+"/"+toUserId1,principal);
    // },
    sendMessage: async (message) => {
        return await Axios.post(SEND_MESSAGE,message);
    },
}
export default UserService;
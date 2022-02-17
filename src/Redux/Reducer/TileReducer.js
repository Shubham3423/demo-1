import { userdata } from "../../components/userdata";

const initialState = userdata;

const tileReducer = (state = initialState, action) => {



    switch (action.type) {
        case "UPDATE_USER":

            const userUpdate = state.filter((user) =>

                user.id === action.payload.id

                    ? Object.assign(user, action.payload)

                    : user
            );

            state = userUpdate;
            return state;

        case "DELETE_USER":

            const filterUser = state.filter((user) =>

                user.id === action.payload

                    ? null : user
            );


            state = filterUser;
            return state;
        default:
            return state;
    }
}

export default tileReducer;
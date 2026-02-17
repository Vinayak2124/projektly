import api from "../../Config/api";
import { GET_USER_FAILURE } from "../Auth/ActionType";
import { GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_USER_SUBSCRIPTION_FAILURE, UPGRADE_USER_SUBSCRIPTION_REQUEST, UPGRADE_USER_SUBSCRIPTION_SUCCESS } from "./ActionType";


export const getUserSubcription = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST })

        try {
            const jwt = localStorage.getItem('jwt')
            const response = await api.get("/api/subcription/user", {
                headers: {
                    "Authorization": `Bearer ${jwt}`
               }
            }) 
            
            console.log("get the subscription by jwt",response.data);
            dispatch({type:GET_USER_SUBSCRIPTION_SUCCESS, payload:response.data})
        } catch (error) {
            console.log(error)
            dispatch({type:GET_USER_FAILURE,error:error.message})
        }
    }
}

export const upgradeUserSubcription = ({planType}) => {
    return async (dispatch) => {
        dispatch({ type: UPGRADE_USER_SUBSCRIPTION_REQUEST })
        try {
            const response = await api.patch("/api/subcription/upgrade",null, {
                params: {
                    "PlanType": planType
               }
            }) 
            
            console.log("upgrade the subscription ");
            dispatch({type:UPGRADE_USER_SUBSCRIPTION_SUCCESS, payload:response.data})
        } catch (error) {
            console.log(error)
            dispatch({type:UPGRADE_USER_SUBSCRIPTION_FAILURE,error:error.message})
        }
    }
}
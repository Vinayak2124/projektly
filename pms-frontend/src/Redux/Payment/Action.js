import api from "../../Config/api";

export const createPayment =async (planType) => {
    
try {
    const jwt = localStorage.getItem('jwt')

    const { data } = await api.post(`/api/payments/${planType}`)

    if (data.payment_link_url) {
        window.location.href = data.payment_link_url;
    }
} catch (error) {
   console.log(error) 
}

}
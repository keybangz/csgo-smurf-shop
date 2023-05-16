import Stripe from "stripe";
import sessId from "../../components/Cart";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    request_session = await getSession({ req });

    console.log(req);
    console.log(request_session);
    console.log(request_session.stripe_data);
}
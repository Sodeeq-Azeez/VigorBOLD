import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationProps {
  firstName: string;
  orderId: string;
  packageName: string;
  totalAmount: number;
  paymentMethod: string;
  address: string;
  state: string;
}

export const OrderConfirmationEmail = ({
  firstName,
  orderId,
  packageName,
  totalAmount,
  paymentMethod,
  address,
  state,
}: OrderConfirmationProps) => {
  const isPOD = paymentMethod === "pay_on_delivery";

  return (
    <Html>
      <Head />
      <Preview>Your VigorBOLD Order Confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Order Confirmed!</Heading>
          
          <Text style={text}>Hi {firstName},</Text>
          <Text style={text}>
            Thank you for ordering VigorBOLD. Your order <strong>#{orderId.substring(0, 8).toUpperCase()}</strong> has been successfully received and is being processed.
          </Text>

          <Section style={orderBox}>
            <Heading as="h3" style={h3}>Order Summary</Heading>
            <Text style={itemText}><strong>Item:</strong> {packageName}</Text>
            <Text style={itemText}><strong>Total:</strong> ₦{totalAmount.toLocaleString()}</Text>
            <Text style={itemText}>
              <strong>Payment Method:</strong> {isPOD ? "Payment on Delivery" : "Online Payment (Paystack)"}
            </Text>
          </Section>

          <Section style={orderBox}>
            <Heading as="h3" style={h3}>Delivery Details</Heading>
            <Text style={itemText}><strong>Address:</strong> {address}, {state}</Text>
          </Section>

          <Text style={text}>
            {isPOD 
              ? "Our dispatch rider will contact you soon. Please have your payment ready (Cash or Transfer) upon delivery."
              : "Your payment has been secured. Our dispatch rider will contact you soon regarding your delivery."}
          </Text>

          <Hr style={hr} />
          
          <Text style={footer}>
            If you have any questions, please reply to this email or contact us on WhatsApp.
          </Text>
          <Text style={footer}>
            VigorBOLD &copy; 2026. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "40px",
  borderRadius: "8px",
  border: "1px solid #e6ebf1",
  maxWidth: "600px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const h3 = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 15px",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const itemText = {
  color: "#525f7f",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "5px 0",
};

const orderBox = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "5px",
  margin: "20px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};

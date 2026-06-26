import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

interface AdminNotificationProps {
  orderId: string
  customerName: string
  phone: string
  state: string
  address: string
  packageName: string
  totalAmount: number
  paymentMethod: string
}

export const AdminNotificationEmail = ({
  orderId,
  customerName,
  phone,
  state,
  address,
  packageName,
  totalAmount,
  paymentMethod,
}: AdminNotificationProps) => {
  const previewText = `🚨 New Order: ${packageName} from ${customerName}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Order Received! 💰</Heading>
          
          <Text style={text}>
            You just received a new order for VigorBOLD.
          </Text>

          <Section style={detailsContainer}>
            <Heading as="h2" style={h2}>Order Details</Heading>
            <Text style={detailText}><strong>Order ID:</strong> {orderId}</Text>
            <Text style={detailText}><strong>Package:</strong> {packageName}</Text>
            <Text style={detailText}><strong>Amount:</strong> ₦{totalAmount.toLocaleString()}</Text>
            <Text style={detailText}>
              <strong>Payment Method:</strong> {paymentMethod === "paystack" ? "Paid Online (Paystack)" : "Payment on Delivery"}
            </Text>
          </Section>

          <Section style={detailsContainer}>
            <Heading as="h2" style={h2}>Customer Details</Heading>
            <Text style={detailText}><strong>Name:</strong> {customerName}</Text>
            <Text style={detailText}><strong>Phone:</strong> {phone}</Text>
            <Text style={detailText}><strong>State:</strong> {state}</Text>
            <Text style={detailText}><strong>Address:</strong> {address}</Text>
          </Section>

          <Text style={footer}>
            VigorBOLD Automated Order System
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default AdminNotificationEmail

const main = {
  backgroundColor: "#f9f9f9",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  marginTop: "40px",
  marginBottom: "40px",
}

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px 0",
  padding: "0",
  textAlign: "center" as const,
}

const h2 = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 10px 0",
}

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
}

const detailsContainer = {
  backgroundColor: "#fafafa",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
}

const detailText = {
  color: "#4a4a4a",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 8px 0",
}

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "16px",
  marginTop: "30px",
  textAlign: "center" as const,
}

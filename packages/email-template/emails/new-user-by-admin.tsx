import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Row,
    Column,
    Html,
    Button,
    Preview,
    Font,
    Text,
    Link,
  } from '@react-email/components';
  interface RegisterEmailProps {
    email: string;
    password: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  
  export default function RegisterEmail({
    email,
    password,
  }: RegisterEmailProps): React.ReactNode {
    return (
      <Html>
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
  
        <Body style={main}> 
          <Preview>Nexura Email Verification</Preview>
          <Container style={container}>
            <Container style={{ backgroundColor: '#fff' }}>
              <Row>
                <Column style={imageSection}>
                  <Heading style={h1}>NEXURA</Heading>
                </Column>
              </Row>
              <div style={{ padding: '25px 35px' }}>
                <Heading as="h2" style={h1}>Welcome to Nexura</Heading>
                <Text style={mainText}>
                  You have been successfully registered as a new user. This is your account information:
                  <br />
                  Email: {email}
                  <br />
                  Password: {password}
                  <br />
                  We hope you change password as soon as you login.
                  <br />
                  <Link href={`${baseUrl}/login`}>Click here to login to your account</Link>
                  <br />
                  Wish you a happy shopping experience!
                </Text>
              </div>
              <Hr />
              <div style={{ padding: '25px 35px' }}>
                <Text style={cautionText}>
                  Nexura will never email you and ask you to disclose
                  or verify your password, credit card, or banking account number.
                </Text>
              </div>
            </Container>
          </Container>
        </Body>
      </Html>
    );
  }
  
  RegisterEmail.PreviewProps = {
    email: 'test@gmail.com',
    password: '123456',
  } satisfies RegisterEmailProps;
  
  const button = {
    color: '#fff',
    padding: '10px 20px',
    backgroundColor: '#009966',
    borderRadius: '5px',
    border: 'none',
    margin: '20px 0px',
  
    fontSize: '20px',  
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }
  const main = {
    backgroundColor: '#fff',
    color: '#212121',
  };
  
  const container = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
  };
  
  const h1 = {
    fontWeight: 'bold',
  };
  
  const text = {
    color: '#333',
    fontSize: '14px',
    margin: '24px 0',
  };
  
  const imageSection = {
    backgroundColor: '#009966',
    padding: '20px 0',
    textAlign: 'center',
  };
  
  
  
  const mainText = { ...text, marginBottom: '14px' };
  
  const cautionText = { ...text, margin: '0px' };
  
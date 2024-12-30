import React, { useState, useEffect } from "react";
import { Box, Flex, Spinner, IconButton, Text, ListItem, OrderedList } from "@chakra-ui/react";
// import { Box, Text, ListItem, OrderedList } from "@chakra-ui/react";
import { LuChevronLeftCircle } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getBasketDetails } from "../Redux/basketReducer/action";
import BasketHeader from "../Components/BasketDetails/BasketHeader/BasketHeader";
import Loader from "../Components/Loader/Loader";

const Disclosure = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiLoading, setApiLoading] = useState(true);
  // const [basketData, setBasketData] = useState(null);
  const token = Cookies.get("login_token_client");
  const dispatch = useDispatch();


  const { isLoading, newInstrumentsData, basketData } = useSelector(
    (store) => store.basketReducer
  );

  const goBack = () => {
    navigate(`/basket/${id}`);
  };

  useEffect(() => {
    dispatch(getBasketDetails(id, token));
  }, [id, token, dispatch]);

  return (
    <Box
      bg="rgba(23, 26, 31, 1)"
      color="white"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      padding="0"
      width="100%"
      height="auto"
    >
      {Object.keys(basketData).length === 0 ? (
        <Flex justify="center" align="center" height="100vh">
          <Loader  />
        </Flex>
      ) : (
        <Box padding="20px">
          <IconButton
            aria-label="Go back"
            icon={<LuChevronLeftCircle />}
            onClick={goBack}
            size="30px"
            variant="link"
            color="rgba(241, 155, 93, 1)"
            fontSize="24px"
            _hover={{ cursor: "pointer" }}
          />

          <BasketHeader basketData={basketData} />

          <Box color="silver" fontSize="14px" padding="10px">
      {/* Disclosure Section */}
      <Text fontSize="16px" fontWeight="bold" mb={4}>
        Disclosure and Terms & Conditions for Centrum Broking Limited
      </Text>

      <OrderedList spacing={4}>
        <ListItem>
          <Text fontWeight="bold">Regulatory Authority:</Text>
          Centrum Broking Limited ("Centrum") is a registered stock broker with the Securities and Exchange Board of India (SEBI) under registration number INH000001469 and is a member of the Bombay Stock Exchange (BSE), National Stock Exchange (NSE), and Multi Commodity Exchange (MCX).
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Registered Office:</Text>
          <OrderedList pl={4}>
            <ListItem>Centrum Broking Limited</ListItem>
            <ListItem>Centrum House, CST Road, Vidya Nagari Marg, Kalina, Santacruz (E),</ListItem>
            <ListItem>Mumbai - 400098, Maharashtra, India</ListItem>
          </OrderedList>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Contact Information:</Text>
          <OrderedList pl={4}>
            <ListItem>Phone: +91-22-4215 9000</ListItem>
            <ListItem>Email: support@centrum.co.in</ListItem>
          </OrderedList>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Nature of Business:</Text>
          Centrum provides various financial services including but not limited to, stock broking, depository services, distribution of financial products, and investment advisory.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Investor Grievance Redressal:</Text>
          In case of any grievances or complaints, investors can write to us at grievances@centrum.co.in or contact our customer service team at the given phone number. We are committed to resolving all grievances within the stipulated time frame.
        </ListItem>
      </OrderedList>

      {/* Terms and Conditions Section */}
      <Text fontSize="16px" fontWeight="bold" mt={6} mb={4}>
        Terms & Conditions
      </Text>

      <OrderedList spacing={4}>
        <ListItem>
          <Text fontWeight="bold">Acceptance of Terms:</Text>
          By accessing or using the services provided by Centrum, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our services.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Account Opening:</Text>
          Clients must complete the account opening process as mandated by SEBI, including Know Your Customer (KYC) documentation. Centrum reserves the right to accept or reject any application for opening an account.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Trading and Settlement:</Text>
          All trades executed through Centrum are subject to the rules and regulations of SEBI, BSE, NSE, MCX, and any other relevant regulatory authority. Clients must ensure sufficient funds in their accounts to cover their trading activities.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Risk Disclosure:</Text>
          Investing in the stock market involves a significant degree of risk. The value of investments may fluctuate, and investors may not get back the amount invested. Past performance is not indicative of future results. Clients should consult with their financial advisors before making any investment decisions.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Privacy Policy:</Text>
          Centrum is committed to protecting the privacy of its clients. We collect, store, and use personal information in accordance with our privacy policy, which is available on our website.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Third-Party Services:</Text>
          Centrum may provide access to third-party content, products, or services. We are not responsible for any third-party services and do not guarantee their accuracy, completeness, or reliability.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Limitation of Liability:</Text>
          Centrum, its directors, employees, and agents shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Amendments:</Text>
          Centrum reserves the right to modify these terms and conditions at any time without prior notice. Continued use of our services constitutes acceptance of the revised terms.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Governing Law:</Text>
          These terms and conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai.
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">Termination:</Text>
          Centrum reserves the right to terminate or suspend any client's account at its discretion, without notice, for any violation of these terms and conditions or any other reason deemed appropriate.
        </ListItem>
      </OrderedList>

      <Text fontSize="14px" color="white" mt={6}>
        By using the services of Centrum Broking Limited, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
      </Text>
    </Box>
        </Box>
      )}
    </Box>
  );
};

export default Disclosure;

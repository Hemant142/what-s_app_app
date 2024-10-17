import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { getBasketDetails } from "../Redux/basketReducer/action";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import DesktopWarning from "../Components/BasketDetails/DesktopWarning/DesktopWarning";
import BackArrow from "../Components/BasketDetails/BackArrow/BackArrow";
import BasketComponent from "../Components/BasketDetails/BasketComponent/BasketComponent";
import StatsComponent from "../Components/BasketDetails/StatsComponent/StatsComponent";
import LineGraph from "../Components/BasketDetails/LineGraph/LineGraph";
import InvestmentInfo from "../Components/BasketDetails/InvestmentInfo/InvestmentInfo";
import BasketConstituents from "../Components/BasketDetails/BasketConstituents/BasketConstituents";
import Activity from "../Components/BasketDetails/Activity/Activity";
import AboutCentrum from "../Components/BasketDetails/AboutCentrum/AboutCentrum";
import InvestmentSection from "../Components/BasketDetails/InvestmentSection/InvestmentSection";
import axios from "axios";

export default function BasketDetails() {
  const [apiLoading, setApiLoading] = useState(true);
  const [basketData, setBasketData] = useState(null);
  const [instrumentList, setInstrumentList] = useState([]);
  const [brokerageData, setBrokerageData] = useState([]);
   const [minAmount,setMinAmount]=useState(0)
  const [brokerage, setBrokerage] = useState(0);
  const [upsidePotential,setUpsidePotential]=useState(0)
  const [upsidePotentialPercentage,setUpsidePotentialPercentage]=useState(0)

  const { id } = useParams(); // Get the basket ID from the route params


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const basket = params.get("/");


  // Get token from cookies
  let token = Cookies.get('whats_app_token');
  const basicAuth = Cookies.get('login_token_stoqclub');

  // Cookies.set('whats_app_token','')
  // Cookies.set('basketId','')
  useEffect(() => {
    if (id&&token) {
    
        // If basketId is present, set it in cookies
        Cookies.set("basketId", id);
     
    }

    if(!token){
      navigate(`/${id}`)
    }
  }, [id, token]);


  let userId = Cookies.get("userId");


// console.log(userId,"UserId")
 
useEffect(() => {
  if (basketData) {
    // Calculate the total required fund
    const total = basketData.instrumentList.reduce(
      (acc, instrument) => acc + calculateFundREquired(instrument),
      0
    );

    // Calculate the sum of all upside potential percentages
    const totalUpsidePotentialPercentage = basketData.instrumentList.reduce(
      (acc, instrument) => acc + handleUpsidePotentialPercentage(instrument),
      0
    );

    const totalUpsidePotential = basketData.instrumentList.reduce(
      (acc, instrument) => acc + handleUpsidePotential(instrument),
      0
    );

    // Set the calculated values in the state
    setMinAmount(total);
    setUpsidePotentialPercentage(totalUpsidePotentialPercentage); // Assuming you have a state for upside potential
    setUpsidePotential(totalUpsidePotential)
    // console.log("Total Upside Potential:", totalUpsidePotential);
  }
}, [basketData]);

// console.log(upsidePotential,"upsidePotential")



  // let userId="E0002160"
  // let currentBalance = Cookies.get("balance");
  let currentBalance = 100000
  // Function to handle each brokerage API call

  if(userId==="H0002444"){
    userId="E0002160"
  }



  // const fetchBrokerage = async (instrument) => {
  //   const brokerageRequestData = {
  //     userId: "E0002160",
  //     exchange: "NSE_EQ",
  //     tradingSymbol: "IDEAFORGE",
  //     qty: 12,
  //     price: 684.5,
  //     product: "delivery",
  //     transType: "buy"
  // }
    
    
  //   // {
  //   //   userId: userId, // Use the value from cookies
  //   //   exchange: "NSE_EQ", // Hardcoded
  //   //   tradingSymbol: instrument.name, // From instrumentList
  //   //   qty: Number(instrument.quantity), // From instrumentList
  //   //   price: instrument.currentPrice, // From instrumentList
  //   //   product: "delivery", // Hardcoded
  //   //   transType: "buy", // Hardcoded
  //   // };

   

  //   try {
  //     const response = await axios.post(
  //       "https://centralizedapi.centrumgalaxc.com/Advance/Brokerage/GetBrokerage",
  //       brokerageRequestData
  //     );
  //     // console.log(response, "response");

  //     if (response.data && response.data.length > 0) {
  //       const brokerData = response.data[0]; // Assuming the API returns data in an array
  //       const otherPrices =
  //         brokerData.STT +
  //         brokerData.transactionCharges +
  //         brokerData.StampDuty +
  //         brokerData.SebiCharges +
  //         brokerData.DPcharges +
  //         brokerData.ClearingCharges;

  //       // Return the broker data along with calculated other prices
  //       return {
  //         ...brokerData,
  //         otherPrices,
  //       };
  //     } else {
  //       console.error("No data found in brokerage response");
  //       return null;
  //     }
  //   } catch (error) {
  //     // console.log("Error fetching brokerage:", error);
  //     return null;
  //   }
  // };
// console.log(userId,"id", id)
  useEffect(() => {
    dispatch(getBasketDetails(id, token))
      .then((res) => {
      
        if (res.data.status === "success") {
          setApiLoading(false);
          Cookies.set("basketData", JSON.stringify(res.data.data), {
            expires: 7, // Cookie expires in 7 days
          });
          setBasketData(res.data.data.basketList[0]);
          setInstrumentList(res.data.data.basketList[0].instrumentList); // Set the instrumentList from the response

          // If instrumentList exists and has length > 0
          if (
            res.data.data.instrumentList &&
            res.data.data.instrumentList.length > 0
          ) {
            // const fetchBrokerageOneByOne = async () => {
            //   for (let instrument of res.data.data.instrumentList) {
            //     const brokerData = await fetchBrokerage(instrument);

            //     if (brokerData !== null) {
            //       setBrokerageData((prevState) => [...prevState, brokerData]); // Append each brokerData to the brokerageData array
            //     }
            //   }
            // };

            // fetchBrokerageOneByOne(); // Call the function to fetch brokerages one by one
          }
        }
      })
      .catch((error) => {
        setApiLoading(false);
        console.log(error, "getBasketDetails error");
      });
      // fetchBrokerage()

  }, [dispatch, id, userId]);
  // console.log(basketData,"basket data")

  const calculateFundREquired = (instrumentListData) => {
    const qty = instrumentListData.quantity;
    const cmp = instrumentListData.currentPrice;
    const fundRequired = Math.floor(cmp * qty);

    return fundRequired;
  };



  const handleUpsidePotentialPercentage = (instrumentListData) => {
    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit);
  
    let upsidePotential = ((takeProfit - cmp) / cmp) * 100;
    let upsidePotentialPercentage = Math.floor(upsidePotential);
  
    // If the upside potential is less than 0, return 0 to avoid summing a negative value
    if (upsidePotentialPercentage < 0) {
      return 0; // or you can handle this differently based on your requirement
    }
  // console.log(upsidePotentialPercentage)
    return upsidePotentialPercentage;
  };



  const handleUpsidePotential = (instrumentListData) => {
    console.log(instrumentListData,"instrumentListData")
    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit);
    let qty=Number(instrumentListData.quantity)
  
    let upsidePotential = ((takeProfit - cmp)*qty).toFixed(2)
 
  // console.log(upsidePotential,"upsidePotential")
    return Number(upsidePotential);
  };
  // console.log(upsidePotential)

  return (
    <Box>
      {apiLoading ? (
        <Loader />
      ) : (
        // <InvestmentSection
        // id={basketData._id}
        // minReq={basketData.fundRequired}
        // basketName={basketData.title}
        // currentBalance={basketData.currentBalance}
        // />

        <Box
          color="#fff"
          width="100%"
          overflowX="hidden"
          height="100vh"
          backgroundColor="rgba(23, 26, 31, 1)"
          boxShadow="0px 3px 6px 0px rgba(18, 15, 40, 0.12)"
          // paddingBottom="20px"
        >
          {basketData === null ? (
            <Flex
              direction="column"
              justify="center"
              align="center"
              marginTop="5rem"
              height="100%"
            >
              <Text className="no_data_box" fontSize="lg">
                Basket Details Not Available.
              </Text>
            </Flex>
          ) : (
            // Render your basket details here when basketData is available
            <Box>
              {/* <BackArrow /> */}
              <DesktopWarning />
              <BasketComponent basketData={basketData} />
              <StatsComponent basketData={basketData}  
              upsidePotential={upsidePotential || 0}
              upsidePotentialPercentage={upsidePotentialPercentage || 0}
              minAmount={minAmount || 0}/>
              {/* <LineGraph data={basketData.lineChartData} /> */}
              <Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />
              <InvestmentInfo basketData={basketData} />

              <Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />

              <BasketConstituents basketData={basketData} />

              <Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />

              {/* <Activity basketData={basketData} /> */}

              <Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />

              {/* <AboutCentrum basketData={basketData} id={id} /> */}

               <InvestmentSection
                basketId={id}
                minReq={minAmount || 0} // Provide a default value if fundRequired is undefined
                basketName={basketData.title || "N/A"} // Provide a default if title is undefined
                currentBalance={Number(currentBalance) || 0} // Provide a default if currentBalance is undefined
                instrumentList={basketData.instrumentList || []} // Provide a default if instrumentList is undefined
              /> 
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

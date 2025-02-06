import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

import {
  fetchLatestBasketList,
  getBasketCalculation,
  getBasketDetails,
  getBasketHistory,
  getOrderHistory,
  getOrderHoldings,
  getSingleBasketInfo,
  RebalancingNewOrder,
} from "../Redux/basketReducer/action";
import { useDispatch, useSelector } from "react-redux";
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
import {
  clientInvestmentData,
  getBalance,
  getUserInfo,
} from "../Redux/authReducer/action";
import Rebalancing from "../Components/BasketDetails/Rebalancing/Rebalancing";
import MyBasketConstituents from "../Components/BasketDetails/BasketConstituents/MyBasketConstituents";
import YourActivity from "../Components/BasketDetails/Activity/YourActivity";

export default function BasketDetails() {
  const [apiLoading, setApiLoading] = useState(true);
  const [apiLoader, setApiLoader] = useState(false);
  // const [basketData, setBasketData] = useState(null);
  const [brokerage, setBrokerage] = useState(0);
  const [instrumentList, setInstrumentList] = useState([]);
  const [lotMultiplier, setLotMultiplier] = useState(null);
  const token = Cookies.get("whats_app_token");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [upsidePotential, setUpsidePotential] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [upsidePotentialPercentage, setUpsidePotentialPercentage] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [basketHistory, setBasketHistory] = useState([]);
  const [basketCalculation, setBasketCalculation] = useState({});
  const [underlyingIndexLineChart, setUnderlyingIndexLineChart] = useState([]);
  const [rebalancingList, setRebalancingList] = useState([]);
  const [rebalancingTime, setRebalancingTime] = useState(null);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [isRebalancingSuccess, setIsRebalancingSuccess] = useState(true);
  const [basketExpired, setBasketExpired] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  let userId = Cookies.get("user2Id_client");
  const navigate = useNavigate();
  // const currentBalance = useSelector((store) => store.authReducer.userBalance);
  let userDetails = useSelector((store) => store.authReducer.userdata);
  // const currentBalance= 2000
  const {
    isLoading,
    newInstrumentsData,
    basketData,
    singleBasketInfo,
    orderHoldings,
  } = useSelector((store) => store.basketReducer);

  // const currentBalance = userDetails?.clientInfo?.TotalBalance
console.log(id,"ID")
console.log(token,"Token")
          
  useEffect(() => {
    dispatch(getBasketDetails(id, token));
    dispatch(getUserInfo(token));
    dispatch(fetchLatestBasketList(id, token));
    dispatch(getOrderHoldings(id, token));
    dispatch(getOrderHistory(id, token))
      .then((res) => {
        if (res.data.status === "success") {
          setOrderHistory(res.data.data.list);
          // if (res.data.data.orderHistory.length > 0) {
          //   // Step 1: Group instruments by name
          //   const groupedInstruments = res.data.data.orderHistory.reduce(
          //     (acc, instrument) => {
          //       if (!acc[instrument.instrument]) {
          //         acc[instrument.instrument] = [];
          //       }
          //       acc[instrument.instrument].push(instrument);
          //       return acc;
          //     },
          //     {}
          //   );

          //   // Step 2: Sort by date in descending order and pick the latest date for each name group
          //   const uniqueInstruments = Object.values(groupedInstruments).map(
          //     (group) => {
          //       // Sort by date in descending order (latest first)
          //       group.sort((a, b) => new Date(b.date) - new Date(a.date));
          //       // Step 3: Return the instrument with the latest date (first item in the sorted array)
          //       return group[0];
          //     }
          //   );

          //   setOrderHistory(uniqueInstruments);
          // }
        }
      })
      .catch((error) => {
        console.log(error, "Get ORder History Error");
      });
    dispatch(getSingleBasketInfo(id, token));

    // dispatch(getBasketHistory(id, token))
    //   .then((res) => {
    //     if (res.data.status === "success") {
    //       setBasketHistory(res.data.data.orderList);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "Get Basket History Error");
    //   });

    // dispatch(getBasketCalculation(id, token))
    //   .then((res) => {
    //     if (res.data.status === "success") {
    //       setBasketCalculation(res.data.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "Get Basket History Error");
    //   });

    // dispatch(getBalance(token));
  }, [token, isRebalancingSuccess]);

  // const RebalancingSuccess = () => {
  //   setIsRebalancingSuccess(!isRebalancingSuccess);
  // };

 
  useEffect(() => {
    if (basketData && newInstrumentsData) {
      // Calculate the total required fund
      const total = newInstrumentsData.reduce(
        (acc, instrument) => acc + calculateFundREquired(instrument),
        0
      );

      // Calculate the sum of all upside potential percentages
      const totalUpsidePotentialPercentage = newInstrumentsData.reduce(
        (acc, instrument) => acc + handleUpsidePotentialPercentage(instrument),
        0
      );

      const totalUpsidePotential = newInstrumentsData.reduce(
        (acc, instrument) => acc + handleUpsidePotential(instrument),
        0
      );

      // Set the calculated values in the state
      setMinAmount(Math.ceil(total));
      setUpsidePotentialPercentage(Math.floor(totalUpsidePotentialPercentage/newInstrumentsData.length)); // Assuming you have a state for upside potential
      setUpsidePotential(totalUpsidePotential);
    }

    if (basketData) {
      setApiLoading(false);
    } else {
      setApiLoading(true);
    }

    setCurrentBalance(userDetails?.clientInfo?.TotalBalance);
    // let basketHistory = basketData?.concerns?.flatMap(
    //   (concern) => concern.instruments
    // );
    let basketHistory = (basketData?.concerns ?? []).flatMap(
      (concern) => concern.instruments || []
    );
    
    setBasketHistory(basketHistory);
  }, [basketData, newInstrumentsData,userDetails]);

  useEffect(() => {
    async function fetchClientInvestmentData() {
      try {
        const response = await dispatch(clientInvestmentData(id, token));
        
        if (response) {
          if (response.data.totalLotMultiplier > 0) {
            setLotMultiplier(response.data.totalLotMultiplier);
          }
          // Additional logic based on the fetched data can be added here.
        }
      } catch (error) {
        console.error("Error fetching client investment data:", error);
      }
    }

    fetchClientInvestmentData();
  }, [token, id, dispatch]);

  useEffect(() => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const checkIfExpired = () => {
      const expiryDate = new Date(basketData.expiryTime + "T15:30:00");

      const isExpired =
        expiryDate <= currentDate ||
        (expiryDate.toDateString() === currentDate.toDateString() &&
          (currentHours > 15 || (currentHours === 15 && currentMinutes >= 30)));

      setBasketExpired(isExpired);
    };

    checkIfExpired();

    // Optional: Check every minute to update expiration in real-time
    const intervalId = setInterval(checkIfExpired, 60000);
    return () => clearInterval(intervalId);
  }, [basketData]);

  useEffect(() => {
    const now = new Date(); // Get the current date and time

    const filteredRebalancingList = (newInstrumentsData || []).filter(
      (newInstrument) => {
        const statusDate = new Date(newInstrument.createdAt); // Convert createdAt to a Date object

        // Check if the instrument is within the last 12 hours
        const isWithin12Hours = now - statusDate <= 24 * 60 * 60 * 1000; // 12 hours in milliseconds

        // Check if the instrument is not in orderHoldings
        const isNotInOrderHoldings = !orderHoldings.some(
          (order) => order.instrument === newInstrument.instrument
        );

        // Return true if both conditions are met
        return isWithin12Hours && isNotInOrderHoldings;
      }
    );

    // Update the isRebalancing state if any items match the criteria

    // Include the latest EXIT instrument from orderHistory if applicable
    const latestExitInstrument = (basketHistory || [])
      .filter((history) => history.orderType === "EXIT") // Get only EXIT orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt (latest first)
      .find((history) => {
        const historyDate = new Date(history.createdAt);
        const isWithin12Hours = now - historyDate <= 24 * 60 * 60 * 1000; // Check if within 12 hours

        // Ensure the instrument is not already in filteredRebalancingList
        const isNotInFilteredList = !filteredRebalancingList.some(
          (item) => item.instrument === history.instrument
        );

        return isWithin12Hours && isNotInFilteredList;
      });
    // Add the latest EXIT instrument to the filtered list if it exists
    if (latestExitInstrument) {
      filteredRebalancingList.push(latestExitInstrument);
    }

    if (orderHoldings.length > 0 && filteredRebalancingList.length > 0) {
      setIsRebalancing(true);
    } else {
      setIsRebalancing(false);
    }

    // Update the rebalancing list state with the filtered instruments
    setRebalancingList(filteredRebalancingList);
  }, [
    newInstrumentsData,
    orderHoldings,
    basketData.instrumentList,
    isRebalancingSuccess,
    basketHistory,
  ]);

  // Function to generate last 6 months data for both Basket and Underlying Index
  const generateLast6MonthsData = () => {
    const currentDate = new Date();
    const dataBasket = [];
    const dataUnderlying = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - i);
      const month = date.toLocaleString("default", { month: "long" }); // Month name

      // Random values for Basket and Underlying Index
      const basketValue = Math.ceil(Math.random() * 100); // Random value for Basket
      const underlyingValue = Math.ceil(Math.random() * 100); // Random value for Underlying Index

      dataBasket.push({ month, basketValue });
      dataUnderlying.push({ month, underlyingValue });
    }

    return { dataBasket, dataUnderlying };
  };

  useEffect(() => {
    const { dataBasket, dataUnderlying } = generateLast6MonthsData();
    setLineChartData(dataBasket);
    setUnderlyingIndexLineChart(dataUnderlying);
  }, []);

  const calculateFundREquired = (instrumentListData) => {
    
    const qty = instrumentListData.quantity;
    const cmp = instrumentListData.cmp;
    const fundRequired = cmp * qty;

    return fundRequired;
  };
  

  const handleUpsidePotentialPercentage = (instrumentListData) => {
    let cmp = Number(instrumentListData.creationPrice);
    let takeProfit = Number(instrumentListData.takeProfit);

    let upsidePotential = ((takeProfit - cmp) / cmp) * 100;
    let upsidePotentialPercentage = Math.ceil(upsidePotential);

    // If the upside potential is less than 0, return 0 to avoid summing a negative value
    if (upsidePotentialPercentage < 0) {
      return 0; // or you can handle this differently based on your requirement
    }

    return upsidePotentialPercentage;
  };

  const handleUpsidePotential = (instrumentListData) => {
    let cmp = Number(instrumentListData.creationPrice);
    let takeProfit = Number(instrumentListData.takeProfit);
    let qty = Number(instrumentListData.quantity);

    let upsidePotential = ((takeProfit - cmp) * qty).toFixed(2);

    return Number(upsidePotential);
  };

  const handleExitClick = () => {
    Cookies.set("lots", lotMultiplier);
    Cookies.set("basket-state", "Exit");
    navigate(`/confirm-order/${id}`, {
      state: {
        // lots: lots,
        currentBalance: currentBalance,
        // amountToInvest: amountToInvest,
        basketId: id,
        // basketName: props.basketName, // In case you want to pass the basket name too
        // instrumentList: props.instrumentList,
      },
    });
  };

  const underlyingIndex = "NIFTY 50";
  const sixMonthsReturns = 5.7; // Example performance percentage

  return (
    <Box>
      {Object.keys(basketData)?.length === 0 ? (
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
          paddingBottom="20px"
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
              <BasketComponent
                basketData={basketData}
                basketLastMonthReturn={singleBasketInfo.lastMonthReturn}
              />

              {Object.keys(singleBasketInfo)?.length > 0 && (
                <StatsComponent
                  basketData={basketData}
                  upsidePotential={upsidePotential || 0}
                  upsidePotentialPercentage={upsidePotentialPercentage || 0}
                  minAmount={minAmount || 0}
                  threeYearCAGR={singleBasketInfo?.["3YearCAGR"] || 0}
                  oneYearReturn={singleBasketInfo?.["oneYearReturn"] || 0}
                />
              )}

              <LineGraph
                // lineChartData={(basketCalculation.basketValue || [])
                //   .slice()
                //   .reverse()}
                // underlyingIndexLineChart={(
                //   basketCalculation.underlineValue || []
                // )
                //   .slice()
                //   .reverse()}
                // sixMonthsReturns={basketCalculation.sixMonthsReturns || 0}
                // underlyingIndex={basketData.underlyingIndex || ""}

                lineChartData={singleBasketInfo}
                underlyingIndexLineChart={underlyingIndexLineChart}
                underlyingIndex={basketData.underlineIndex}
                sixMonthsReturns={singleBasketInfo.sixMonthReturn}
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
              {orderHoldings?.length > 0 && (
                <MyBasketConstituents
                  basketData={basketData}
                  newInstrumentsData={newInstrumentsData}
                  orderHoldings={orderHoldings}
                />
              )}
              {orderHoldings?.length === 0 && (
                <BasketConstituents
                  basketData={basketData}
                  newInstrumentsData={newInstrumentsData}
                  orderHistory={orderHistory}
                />
              )}

              {orderHoldings?.length > 0 &&
              rebalancingList?.length > 0 &&
              isRebalancing ? (
                <Box>
                  <Divider
                    ml={2}
                    mr={2}
                    m="auto"
                    width="350px" // Sets the width
                    border="1px solid #BCC1CA" // Adds the solid border with the specified color
                    position="relative"
                  />

                  <Rebalancing
                    rebalancingList={rebalancingList}
                    id={id}
                    // RebalancingSuccess={RebalancingSuccess}
                  />

                  <Divider
                    ml={2}
                    mr={2}
                    m="auto"
                    width="350px" // Sets the width
                    border="1px solid #BCC1CA" // Adds the solid border with the specified color
                    position="relative"
                  />
                </Box>
              ) : (
                <Divider
                  ml={2}
                  mr={2}
                  m="auto"
                  width="350px" // Sets the width
                  border="1px solid #BCC1CA" // Adds the solid border with the specified color
                  position="relative"
                />
              )}

              <Activity basketData={basketData} orderHistory={orderHistory} />

              <Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />

              {orderHistory?.length > 0 && (
                <Box>
                  <YourActivity basketHistory={orderHistory.reverse()} />

                  <Divider
                    ml={2}
                    mr={2}
                    m="auto"
                    width="350px" // Sets the width
                    border="1px solid #BCC1CA" // Adds the solid border with the specified color
                    position="relative"
                  />
                </Box>
              )}

              <AboutCentrum basketData={basketData} id={id} />
             {basketExpired === false &&rebalancingList?.length > 0 &&
              !isRebalancing  && (
  <InvestmentSection
    basketId={id}
    isRebalancing={isRebalancing}
    orderHoldings={orderHoldings}
    minReq={minAmount || 0}
    basketName={basketData.title || "N/A"}
    currentBalance={Number(currentBalance) || 0}
    instrumentList={newInstrumentsData || []}
    upsidePotential={upsidePotential || 0}
    orderHistory={orderHistory?.length}
    upsidePotentialPercentage={Number(upsidePotentialPercentage) || 0}
  />

)}

            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

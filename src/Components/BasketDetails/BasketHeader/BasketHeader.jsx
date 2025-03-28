import { Flex, Heading } from '@chakra-ui/react';
// import ArrowIcon from './ArrowIcon';
// import PercentageChange from './PercentageChange';
import { Badge } from '@chakra-ui/react';
import ArrowIcon from './ArrowIcon';
import PercentageChange from './PercentageChange';

const getPreviousMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toLocaleString('en-US', { month: 'short' });
};

const BasketHeader = ({ basketData,basketLastMonthReturn }) => {
  const month = basketLastMonthReturn?.month 
  ? basketLastMonthReturn.month.slice(0, 3).toUpperCase()
  : getPreviousMonth().toUpperCase();
const underlyingValue = basketLastMonthReturn ?? 0;
  return (
    <Flex
    textAlign={"left"}
    border={"2px solid red"}
      width="100%"
      mt={2}
      p={2}
      height="43px"
      alignItems="center"
      backgroundColor="rgba(238, 253, 243, 1)"
      borderWidth="1px"
      borderColor="rgba(184, 245, 205, 1)"
      borderRadius="8px"
      boxShadow="0px 0px 2px rgba(23, 26, 31, 0.12)"
      // fontFamily={"Epilogue"}
      fontFamily={"Arial, Helvetica, sans-serif"}
    //   fontWeight={"normal"}
    >
      <Heading
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        color="rgba(23, 26, 31, 1)"
        fontSize="20px"
        fontWeight="700"
        noOfLines={1}
        marginLeft="8%"
        flex="1"
      >
        {basketData.title}
      </Heading>
      <ArrowIcon monthProfitFlag={underlyingValue} />
      <PercentageChange
      monthProfitFlag={underlyingValue}
      />
      <Badge
       fontFamily={"Epilogue"}
     
        fontSize="11px"
        backgroundColor="rgba(29, 215, 91, 1)"
        color="rgba(10, 77, 32, 1)"
        borderRadius="full"
        paddingX={2}
        textAlign={"center"}
        paddingTop={1}
        marginRight={2}
      >
        {/* {basketData.month} */}
        {month}
      </Badge>
    </Flex>
  );
};

export default BasketHeader;

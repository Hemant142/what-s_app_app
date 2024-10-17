import { Text } from '@chakra-ui/react';

const PercentageChange = ({ monthProfitFlag, monthPercentageReturns }) => {
  return (
    <Text
      marginX={2}
      // color={monthProfitFlag === "green" ? "rgba(29, 215, 91, 1)" : "red"}
      color={"rgba(29, 215, 91, 1)"}
      fontSize="14px"
      fontWeight="700"
      className={`percentage-change ${monthProfitFlag === "green" ? "" : "red-color"}`}
    >
      {/* {monthPercentageReturns}% */}
      0%
    </Text>
  );
};

export default PercentageChange;

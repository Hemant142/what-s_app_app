import { Text } from '@chakra-ui/react';

const PercentageChange = ({ monthProfitFlag }) => {
 
  return (
    <Text
      marginX={2}
      color={monthProfitFlag >0 ? "rgba(29, 215, 91, 1)" :  "#E05858"}
      
      fontSize="14px"
      fontWeight="700"
      className={`percentage-change ${monthProfitFlag === "" ? "" : "red-color"}`}
    >
      {Math.abs(monthProfitFlag)}%
    
    </Text>
  );
};

export default PercentageChange;

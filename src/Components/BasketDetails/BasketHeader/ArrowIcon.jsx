import { Icon } from '@chakra-ui/react';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';

const ArrowIcon = ({ monthProfitFlag }) => {
  return (
    <Icon
      // as={monthProfitFlag === "green" ? IoIosArrowRoundUp : IoIosArrowRoundDown}
      as={IoIosArrowRoundUp}
      // color={monthProfitFlag === "green" ? "green" : "red"}
      color={"green"}
      className="arrow-icon"
      
      height="auto"
    />
  );
};

export default ArrowIcon;

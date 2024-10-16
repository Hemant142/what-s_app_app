import { Icon } from '@chakra-ui/react';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';

const ArrowIcon = ({ monthProfitFlag }) => {
  return (
    <Icon
      as={monthProfitFlag === "green" ? IoIosArrowRoundUp : IoIosArrowRoundDown}
      color={monthProfitFlag === "green" ? "green" : "red"}
      className="arrow-icon"
      
      height="auto"
    />
  );
};

export default ArrowIcon;

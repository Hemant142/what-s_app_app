import { Icon } from '@chakra-ui/react';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';

const ArrowIcon = ({ monthProfitFlag }) => {
  return (
    <Icon
      as={monthProfitFlag >0 ? IoIosArrowRoundUp : IoIosArrowRoundDown}
      // as={IoIosArrowRoundUp}
      color={monthProfitFlag >0 ? "#1DD75B" : "#E05858"}
      // color={"green"}
      className="arrow-icon"
      
      height="auto"
    />
  );
};

export default ArrowIcon;

import { Box } from '@chakra-ui/react';
import BasketHeader from '../BasketHeader/BasketHeader';
import CompanyIntro from '../CompanyIntro/CompanyIntro';
import BackArrow from '../BackArrow/BackArrow';


const BasketComponent = ({ basketData }) => {
  return (
  
        
        <Box
        //  paddingLeft={2}
        //  paddingRight={2}
         p={2}
        //  border={"1px solid red"}
         marginLeft="20px"
         borderRadius="10px"

          mt={2}
         margin="0 auto"
         width="100%"
        >
       
      <BasketHeader basketData={basketData} />
      <CompanyIntro description={basketData.description} />
      </Box>
 
  );
};

export default BasketComponent;

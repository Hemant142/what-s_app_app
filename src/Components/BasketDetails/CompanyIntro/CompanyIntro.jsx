import { Text } from '@chakra-ui/react';

const CompanyIntro = ({ description }) => {
  return (
    <Text
    p={2}
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      fontSize="14px"
      fontWeight="400"
      lineHeight="22px"
      textAlign="left"
      width="100%"
      color="rgba(222, 225, 230, 1)"
      marginTop={2}
    >
      {description}
    </Text>
  );
};

export default CompanyIntro;

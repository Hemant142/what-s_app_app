import React from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import { LuChevronLeftCircle } from 'react-icons/lu'; // Import your icon
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const BackArrow = () => {
    const navigate = useNavigate();

  const goBack = () => {
    const userId = Cookies.get("userId")
    navigate(
      `/home/?UserId=${userId}&SessionId=SessionId=&Link=5&Calling_App=&partnerId=&Product=ODIN WAVE`
    );
  };

  return (
    <Box  pt={3} pb={0} pl={3} mb={2} >
      <IconButton
        aria-label="Go back"
        icon={<LuChevronLeftCircle />}
        onClick={goBack}
        size="30px" // Use the size prop for the icon button
        variant="link" // Use variant="link" to remove button styling
        color="rgba(241, 155, 93, 1)" // Custom color for the icon
        fontSize="24px" // Font size of the icon
        _hover={{ cursor: 'pointer' }} // Ensure cursor is a pointer on hover
      />
    </Box>
  );
};

export default BackArrow;

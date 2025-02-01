import React, { useState } from "react";
import { Box, Text, Flex, Icon, IconButton } from "@chakra-ui/react";
import { CiCircleCheck } from "react-icons/ci";
import { motion } from "framer-motion";  // Import motion for animation
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";  // Pagination icons

const Activity = ({ basketData }) => {
  // const totalData = [...basketData?.instrumentList, ...basketData?.instrumentList];

  // const instrumentList = basketData.concerns.flatMap(concern => concern.instruments);
  const instrumentList = (basketData?.concerns ?? []).flatMap(
    (concern) => concern?.instruments ?? []
  );
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  // const totalPages = Math.ceil(instrumentList.length / itemsPerPage);
  const totalPages = instrumentList.length > 0 ? Math.ceil(instrumentList.length / itemsPerPage) : 1;


  const historyFormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Handle page change (next/previous)
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = instrumentList.slice(startIndex, endIndex);

  return (
    <Box p={4}>
      <Text fontSize="md" fontWeight="bold" fontFamily={"Helvetica"} mb={4}> {/* Reduced from 2xl to xl */}
        Basket Activity
      </Text>
      <Box
        backgroundColor="rgba(38, 42, 51, 1)"
        border="1px solid rgba(86, 94, 108, 1)"
        borderRadius="md"
        boxShadow="md"
      >
        <Box m={"4%"} display="flex" alignItems="center" gap={2} width="100%">
          <Flex align="center" gap={2} width="40%">
            <Icon as={CiCircleCheck} boxSize={5} color="#1DD75B" /> {/* Reduced icon size */}
            <Text fontFamily="Inter" fontSize="12px" fontWeight="500" textAlign="left">
              {historyFormatDate(basketData?.creationTime)}
            </Text>
          </Flex>

          <Text
            fontFamily="Inter"
            fontSize="12px"  // Reduced from 14px to 12px
            fontWeight="500"
            textAlign="left"
            width="50%"
          >
            Basket Created
          </Text>
        </Box>

        <motion.div
          key={currentPage} // Trigger re-render for each page change
          initial={{ x: 100 }}  // Start from right
          animate={{ x: 0 }}  // Move to center
          exit={{ x: -100 }}  // Slide out to left
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {currentItems?.length > 0 ? (
            [...currentItems].reverse().map((inst, index) => (
              <Box
                key={`inst_${index}`}
                m={"4%"}
                display="flex"
                alignItems="center"
                gap={4}
                width="100%"
              >
                <Flex align="center" gap={2} width="40%">
                  <Icon as={CiCircleCheck} boxSize={5} color="#1DD75B" /> {/* Reduced icon size */}
                  <Text fontFamily="Inter" fontSize="12px" fontWeight="500" textAlign="left">
                    {historyFormatDate(inst?.createdAt)}
                  </Text>
                </Flex>

                <Text
                  fontFamily="Inter"
                  fontSize="12px"  // Reduced from 14px to 12px
                  fontWeight="500"
                  textAlign="left"
                  width="60%"
                >
                  {inst?.instrument} {inst?.orderType === "ENTRY" ? "Added" : "Removed"}
                </Text>
              </Box>
            ))
          ) : (
            <Text fontSize="12px" textAlign="center" color="gray.500"> {/* Reduced from 14px to 12px */}
              Please Start Investment
            </Text>
          )}
        </motion.div>
      </Box>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Flex alignItems="center" justifyContent="center" mt={4} gap={4}>
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            icon={<FaChevronLeft />}
            size="sm"
            colorScheme="white"
            variant="outline"
            _hover={{ backgroundColor: "#171A1F", color: "#ffffff" }}
            borderColor="rgba(86, 94, 108, 1)"
          />
          <Text fontSize="14px">
            Page {currentPage} / {totalPages}
          </Text>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            icon={<FaChevronRight />}
            size="sm"
            colorScheme="white"
            variant="outline"
            _hover={{ backgroundColor: "#171A1F", color: "#ffffff" }}
            borderColor="rgba(86, 94, 108, 1)"
          />
        </Flex>
      )}
    </Box>
  );
};

export default Activity;

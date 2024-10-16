import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({ data }) => {
  return (
    <Box
      className="chart"
      height="123px"
      mb={4}
      p={4}
      border="0px solid rgba(188, 193, 202, 1)"
      padding="20px"
      textAlign="center"
      paddingLeft="0"
      paddingRight="0"
    >
      <ResponsiveContainer height={123}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 40,
            left: 20,
            bottom: 25,
          }}
        >
          <XAxis dataKey="month" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1DD75B"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

      <Text
        className="line_inv_text"
        margin="0"
        color="rgba(144, 149, 160, 1)"
        fontSize="12px"
        mt={2}
        mb={4}
      >
        6 months price movement of the basket
      </Text>

      <Divider
             
             ml={2}
             mr={2}
             m={"auto"}
     width="350px"            // Sets the width
     border="1px solid #BCC1CA"  // Adds the solid border with the specified color
     // opacity="0"              // Sets the opacity to 0 (hidden by default, adjust if needed)
     position="relative"
    
   
   />
    </Box>
  );
};

export default LineGraph;

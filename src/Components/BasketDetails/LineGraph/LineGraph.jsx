import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const LineGraph = ({ lineChartData, underlyingIndexLineChart, underlyingIndex,sixMonthsReturns }) => {
  
  // Merging data based on month

  // const mergedData = lineChartData.map((d) => {
  //   const correspondingUnderlying = underlyingIndexLineChart.find(
  //     (underlying) => underlying.month === d.month
  //   );
  //   return {
  //     month: d.month,
  //     basketValue: d.underlyingValue, // This is basketValue in your original data
  //     underlyingValue: correspondingUnderlying ? correspondingUnderlying.underlyingValue : 0, // Default to 0 if no match
  //   };
  // });

  const mergedData =lineChartData.graphData

  // Function to abbreviate month names
  const abbreviateMonth = (month) => {
    const monthAbbreviations = {
      January: "JAN",
      February: "FEB",
      March: "MAR",
      April: "APR",
      May: "MAY",
      June: "JUN",
      July: "JUL",
      August: "AUG",
      September: "SEP",
      October: "OCT",
      November: "NOV",
      December: "DEC"
    };
    return monthAbbreviations[month] || month;
  };

  return (
    <Box
      className="chart"
      p={4} // Reduced padding for better fit on mobile
      textAlign="center"
    >
      <ResponsiveContainer height={150} width="100%">
        <LineChart
          data={mergedData} // Using the merged data
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 25,
          }}
        >
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }} // Smaller font size for mobile
            interval={0} // Show all ticks
            tickFormatter={abbreviateMonth} // Format month abbreviations
          />
          <Tooltip />

          {/* Line for Basket */}
          <Line
            type="monotone"
            dataKey="basketValue"
            stroke="#1DD75B"
            strokeWidth={3}
            name="Basket"
          />

          {/* Line for Underlying Index */}
          <Line
            type="monotone"
            dataKey="underlyingValue"
            stroke="#ED7D2D"
            strokeWidth={3}
            name={underlyingIndex}
          />
        </LineChart>
      </ResponsiveContainer>

      <Text
        className="line_inv_text"
        color={"#A7ADB7"}
        fontSize="14px"
        fontWeight="300"
        lineHeight="22px"
        fontFamily={"Helvetica"}
        textAlign="left"
        mb={4}
      >
        In the last 6 months, the <span style={{ color: "#1DD75B" }}>Basket</span>{" "}
        outperformed the <span style={{ color: "#ED7D2D" }}>{underlyingIndex}</span>{" "}
        Index by <span style={{ color: sixMonthsReturns>0?"#1DD75B": "" }}>{sixMonthsReturns}%</span>
      </Text>
      <Divider
        ml={2}
        mr={2}
        m={"auto"}
        width="100%" // Set to 100% for mobile responsiveness
        border="1px solid #BCC1CA"
        position="relative"
      />
    </Box>
  );
};

export default LineGraph;

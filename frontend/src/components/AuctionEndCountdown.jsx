import { useEffect, useState } from "react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export function AuctionEndCountdown({
  didAuctionEnd,
  auctionEndTime = Date.now() / 1000,
}) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!didAuctionEnd) {
      const intervalId = setInterval(() => {
        const duration = dayjs.duration(
          dayjs(Date.now()).diff(dayjs.unix(auctionEndTime))
        );
        setCountdown(
          `${duration.format("D").replace("-", "")} d ${duration
            .format("HH")
            .replace("-", "")} h ${duration
            .format("mm")
            .replace("-", "")} min ${duration
            .format("ss")
            .replace("-", "")} sec`
        );
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setCountdown(dayjs.unix(auctionEndTime).fromNow());
    }
  }, [auctionEndTime, didAuctionEnd]);

  return (
    <Stat>
      <StatLabel>
        {didAuctionEnd ? "Auction ended" : "Auction ends in"}
      </StatLabel>
      <StatNumber>{countdown}</StatNumber>
    </Stat>
  );
}

import { useEffect, useState } from "react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function AuctionEndCountdown({
  didAuctionEnd,
  auctionEndTime = Date.now() / 1000,
}) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!didAuctionEnd) {
      const intervalId = setInterval(() => {
        setCountdown(dayjs(Date.now()).to(dayjs.unix(auctionEndTime)));
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
